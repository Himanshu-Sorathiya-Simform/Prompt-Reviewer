# PromptLens

> AI-powered prompt quality reviewer. Paste any AI prompt and get an instant detailed report — score, skill level, issues, suggestions, and an improved version.

---

## What It Does

PromptLens evaluates your AI prompts against quality dimensions like clarity, specificity, structure, context, and goal alignment. It uses Google Gemini to return a structured report with:

- **Score (1–10)** with a visual progress ring
- **Skill level badge** (Beginner → Expert)
- **Summary** of the prompt's overall quality
- **Issue list** with severity levels (High / Medium / Low)
- **Actionable suggestions** to improve
- **Improved prompt** — a rewritten version you can copy or iterate on

---

## Features

- **Single-column stacked UI** — clean writing surface, results appear below
- **Example prompts** — 3 clickable chips using real React prompts
- **Light + Dark mode** with persistence to `localStorage`
- **Token usage** — shows how many tokens your prompt used
- **Rate limit countdown** — 15 reviews/hr, shows reset timer when limit is hit
- **Seamless model fallback** — backend automatically switches Gemini models on quota exhaustion
- **Skeleton loading** — matches the result layout exactly

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
├── backend/          ← Express API (Node.js + Gemini)
├── frontend/         ← React 19 + Tailwind v4 SPA
└── README.md
```
