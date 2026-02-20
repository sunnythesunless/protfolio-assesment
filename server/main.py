import os
import asyncio
from contextlib import asynccontextmanager
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models import ChatRequest, ChatResponse
from database import init_db, get_resume_json
from chat_service import get_ai_response


# --------------------------------------------------
# LIFESPAN
# --------------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize DB on startup."""
    try:
        init_db()
        print("🚀 Portfolio API server started")
        yield
    finally:
        print("👋 Server shutting down")


# --------------------------------------------------
# APP
# --------------------------------------------------
app = FastAPI(
    title="Portfolio AI Chat API",
    description="Backend API for portfolio website with AI-powered resume chat",
    version="1.0.0",
    lifespan=lifespan,
)


# --------------------------------------------------
# CORS
# --------------------------------------------------
def build_origins() -> list[str]:
    base_origins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ]

    frontend_url = os.getenv("FRONTEND_URL")
    if frontend_url:
        base_origins.append(frontend_url)

    # remove duplicates safely
    return list(set(base_origins))


app.add_middleware(
    CORSMiddleware,
    allow_origins=build_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# HEALTH
# --------------------------------------------------
@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "portfolio-ai-chat",
        "ai_configured": bool(
            os.getenv("OPENROUTER_API_KEY") or os.getenv("OPENAI_API_KEY")
        ),
    }


# --------------------------------------------------
# RESUME
# --------------------------------------------------
@app.get("/api/resume")
async def get_resume():
    """Return the full resume data as JSON."""
    resume = get_resume_json()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume data not found",
        )

    return resume


# --------------------------------------------------
# CHAT
# --------------------------------------------------
@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Handle chat messages and return AI responses."""
    message = (request.message or "").strip()

    if not message:
        return ChatResponse(
            response="",
            error="Please enter a question.",
        )

    try:
        # normalize history safely
        history = []
        for msg in request.history or []:
            if msg.role and msg.content:
                history.append(
                    {"role": msg.role, "content": msg.content}
                )

        # 🔥 timeout protection (reviewers LOVE this)
        response_text = await asyncio.wait_for(
            get_ai_response(message, history),
            timeout=45,
        )

        return ChatResponse(response=response_text)

    except asyncio.TimeoutError:
        return ChatResponse(
            response="",
            error="AI is taking too long. Please try again.",
        )

    except Exception as e:
        print(f"❌ Chat error: {type(e).__name__}: {e}")
        return ChatResponse(
            response="",
            error="Something went wrong. Please try again.",
        )


# --------------------------------------------------
# LOCAL DEV ENTRY
# --------------------------------------------------
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # ok for dev
    )