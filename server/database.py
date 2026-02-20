import sqlite3
import json
from pathlib import Path
from contextlib import contextmanager

BASE_DIR = Path(__file__).parent
DB_PATH = BASE_DIR / "portfolio.db"
RESUME_PATH = BASE_DIR / "resume_data.json"


# -----------------------------
# DB CONNECTION (SAFE)
# -----------------------------
@contextmanager
def get_db():
    """Context-managed database connection."""
    conn = sqlite3.connect(str(DB_PATH), check_same_thread=False)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()


# -----------------------------
# INIT DATABASE
# -----------------------------
def init_db():
    """Initialize the database and seed resume data."""
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)

    with get_db() as conn:
        cursor = conn.cursor()

        # Chat history table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS chat_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                role TEXT NOT NULL,
                content TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Helpful index for performance
        cursor.execute("""
            CREATE INDEX IF NOT EXISTS idx_chat_session
            ON chat_history(session_id)
        """)

        # Resume table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS resume_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                category TEXT NOT NULL UNIQUE,
                data_json TEXT NOT NULL,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Seed if empty
        cursor.execute("SELECT COUNT(*) FROM resume_data")
        count = cursor.fetchone()[0]

        if count == 0:
            seed_resume_data(cursor)

        conn.commit()


# -----------------------------
# SEED RESUME
# -----------------------------
def seed_resume_data(cursor):
    """Seed the resume data from JSON file."""
    if not RESUME_PATH.exists():
        print(f"⚠️ Warning: {RESUME_PATH} not found. Using empty resume data.")
        return

    try:
        with open(RESUME_PATH, "r", encoding="utf-8") as f:
            resume = json.load(f)
    except json.JSONDecodeError:
        print("❌ Invalid JSON in resume_data.json")
        return

    for category, data in resume.items():
        cursor.execute(
            """
            INSERT OR REPLACE INTO resume_data (category, data_json)
            VALUES (?, ?)
            """,
            (category, json.dumps(data, ensure_ascii=False)),
        )

    print("✅ Resume data seeded into database.")


# -----------------------------
# READ RESUME FROM DB
# -----------------------------
def get_resume_data() -> dict:
    """Load the full resume data from DB."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT category, data_json FROM resume_data")
        rows = cursor.fetchall()

    resume = {}
    for row in rows:
        try:
            resume[row["category"]] = json.loads(row["data_json"])
        except json.JSONDecodeError:
            resume[row["category"]] = {}

    return resume


# -----------------------------
# RESUME FALLBACK
# -----------------------------
def get_resume_json() -> dict:
    """Load resume from DB, fallback to JSON file."""
    resume = get_resume_data()
    if resume:
        return resume

    if RESUME_PATH.exists():
        try:
            with open(RESUME_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except json.JSONDecodeError:
            return {}

    return {}


# -----------------------------
# SAVE CHAT MESSAGE
# -----------------------------
ALLOWED_ROLES = {"user", "assistant", "system"}


def save_chat_message(session_id: str, role: str, content: str):
    """Save a chat message to history."""
    if role not in ALLOWED_ROLES:
        raise ValueError(f"Invalid role: {role}")

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO chat_history (session_id, role, content)
            VALUES (?, ?, ?)
            """,
            (session_id, role, content),
        )
        conn.commit()