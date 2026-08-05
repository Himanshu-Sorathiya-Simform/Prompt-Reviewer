# PromptLens

> AI-powered prompt quality reviewer. Paste any AI prompt and get an instant detailed report — score, skill level, issues, suggestions, and an improved version.

---

## What It Does

PromptLens evaluates your AI prompts against quality dimensions like clarity, specificity, structure, context, and goal alignment. It uses Groq (Llama 3 models) to return a structured report with:

- **Score (1–100)** with a clean typographic display
- **Skill level** (Beginner → Expert)
- **Executive Summary** of the prompt's overall quality
- **Diagnostics list** mapping specific issues with severity levels (High / Medium / Low)
- **Actionable recommendations** to improve
- **Revised prompt** — a rewritten version you can copy or iterate on

---

## Features

- **Ultra-minimalist single-column UI** — clean writing surface, flat design layout
- **Example prompts** — 3 clickable chips using real React prompts
- **Token usage** — shows how many tokens your prompt used directly in the toolbar
- **Rate limit countdown** — 15 reviews/hr, shows reset timer when limit is hit
- **Seamless model fallback** — backend automatically switches Groq Llama models on quota exhaustion
- **Skeleton loading** — precisely matches the clean minimal result layout

---

## Quick Start

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (separate terminal)
cd frontend && npm install && npm run dev
```

- Backend: http://localhost:5000
- Frontend: http://localhost:5173

See full setup in each sub-project:
- [backend/README.md](./backend/README.md)
- [frontend/README.md](./frontend/README.md)

---

## Project Structure

```
Prompt-Reviewer/
├── backend/          ← Express API (Node.js + Groq SDK)
├── frontend/         ← React 19 + Tailwind v4 SPA
└── README.md
```
