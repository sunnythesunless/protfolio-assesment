# Portfolio with AI Chat

> Personal portfolio website with AI-powered resume chat. Built with React, TypeScript, Tailwind CSS, Python FastAPI, SQLite, and OpenRouter.

## Architecture

For this assignment's scale, a **direct prompt-injection approach** is used instead of full vector RAG to keep latency low and architecture clean. Resume data is stored as structured JSON — a single source of truth used by both the frontend (for displaying portfolio sections) and backend (for constructing the AI system prompt with complete context).

```
├── client/          # React + TypeScript + Tailwind CSS (Vite)
│   ├── src/
│   │   ├── components/   # Navbar, Hero, About, Skills, Projects, Experience, Contact, ChatWidget
│   │   ├── data/         # resume.json (single source of truth)
│   │   └── services/     # API client
│   └── ...
└── server/          # Python FastAPI
    ├── main.py           # API server with CORS
    ├── chat_service.py   # OpenRouter integration + system prompt
    ├── database.py       # SQLite setup + resume storage
    └── models.py         # Pydantic request/response models
```

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- OpenRouter API key (free at [openrouter.ai](https://openrouter.ai))

### Backend

```bash
cd server
pip install -r requirements.txt
# Edit .env and add your OPENROUTER_API_KEY
python main.py
```

Server runs on `http://localhost:8000`

### Frontend

```bash
cd client
npm install
npm run dev
```

App runs on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check + AI config status |
| `GET` | `/api/resume` | Full resume JSON |
| `POST` | `/api/chat` | Send message, get AI response |

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS v4, Framer Motion, React Markdown
- **Backend**: Python, FastAPI, SQLite, httpx
- **AI**: OpenRouter API (meta-llama/llama-3.1-8b-instruct:free)
- **Deployment**: Vercel (frontend) + Render (backend)

## Features

- 🎨 Dark glassmorphism design with gradient accents
- 💬 AI chat widget with markdown rendering
- ⚡ Scroll-triggered animations
- 📱 Fully responsive
- 🛡️ Robust error handling
- 🔗 Single source of truth (resume.json)

## License

MIT
