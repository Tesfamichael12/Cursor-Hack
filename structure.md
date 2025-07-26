# Project Structure

This document outlines the directory and file structure for the AI Therapist application.

## Root

```
.
├── .github/
│   └── workflows/
│       └── ci.yml          # Continuous integration pipeline
├── frontend/               # Next.js application
├── backend/                # FastAPI application
├── scripts/                # Utility scripts (e.g., deployment)
├── .env.example            # Example environment variables
├── .gitignore
├── docker-compose.yml
├── prd.md
├── structure.md
├── implementation-plan.md
├── changelog.md
└── README.md
```

## Frontend (`frontend/`)

```
frontend/
├── app/
│   ├── (therapy)/
│   │   ├── [roomName]/
│   │   │   ├── page.tsx      # Main therapy session view
│   │   │   └── layout.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   └── token/
│   │       └── route.ts      # API route to generate LiveKit token
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Landing/entry page
├── components/
│   ├── ui/                   # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── ...
│   ├── ChromaCalm.tsx        # Handles the adaptive background
│   ├── Controls.tsx          # Media controls (mute, captions, etc.)
│   ├── ModeSelector.tsx      # Component to switch therapy modes
│   └── VideoView.tsx         # Renders user and AI therapist video
├── hooks/
│   └── useChromaCalm.ts      # Logic for the ChromaCalm™ feature
├── lib/
│   ├── livekit.ts            # LiveKit client-side utilities
│   └── utils.ts              # General utilities (e.g., Shadcn)
├── context/
│   └── TherapyContext.tsx    # React context for session state
├── public/
│   └── assets/               # Static assets (images, etc.)
├── tailwind.config.ts
├── postcss.config.js
├── next.config.mjs
├── components.json           # Shadcn UI configuration
├── tsconfig.json
└── package.json
```

## Backend (`backend/`)

```
backend/
├── app/
│   ├── api/
│   │   ├── endpoints/
│   │   │   └── therapy.py    # WebSocket and HTTP endpoints
│   │   └── router.py         # API router setup
│   ├── core/
│   │   ├── config.py         # Configuration management
│   │   └── security.py       # JWT and security functions
│   ├── schemas/
│   │   ├── session.py        # Pydantic schemas for session data
│   │   └── token.py          # Pydantic schemas for tokens
│   ├── services/
│   │   ├── ai_orchestrator.py # Logic to call Gemini/other AI APIs
│   │   ├── livekit_service.py # LiveKit server-side utilities
│   │   └── sentiment.py      # Sentiment analysis logic
│   ├── main.py               # FastAPI application entrypoint
│   └── deps.py               # FastAPI dependencies
├── tests/                    # Unit and integration tests
├── .env
├── requirements.txt
└── Dockerfile
```
