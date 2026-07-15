# PromptLens — Frontend

React 19 + Tailwind CSS v4 single-page application for the AI Prompt Reviewer.

---

## Tech Stack

| Layer      | Technology                                             |
| ---------- | ------------------------------------------------------ |
| Framework  | React 19                                               |
| Language   | TypeScript (strict)                                    |
| Styling    | Tailwind CSS v4 (`@theme` tokens, no hardcoded colors) |
| Build Tool | Vite 8                                                 |
| Linting    | ESLint + typescript-eslint                             |
| Formatting | Prettier                                               |

---

## Setup

```bash
npm install
npm run dev        # Dev server → http://localhost:5173
npm run build      # Production build
npm run lint       # ESLint
npm run format     # Prettier
```

---

## Architecture

### State Management — Context

All state is managed via two React Contexts:

| Context         | Responsibility                                                                        |
| --------------- | ------------------------------------------------------------------------------------- |
| `ThemeContext`  | Light/dark theme toggle, persists to `localStorage`, applies `data-theme` on `<html>` |
| `ReviewContext` | Owns the data fetching lifecycle (`useFetch`), all handlers, and derived `appState`   |

Components consume context via typed hooks (`useTheme`, `useReview`). **No prop drilling.**

### Data Fetching — `useFetch`

A generic, demand-driven hook that manages `loading / data / error / statusCode / responseHeaders` state. The hook knows nothing about the review domain — it just executes a given fetch request and exposes the result. `ReviewContext` wires the domain logic on top.

### `AppState` derivation

`appState` is **derived inline** from `useFetch` state — no `useEffect` sync:

```ts
function deriveAppState(loading, error, data): AppState {
	if (loading) return "loading";
	if (error) return "error";
	if (data?.success) return "success";
	return "idle";
}
```

---

## Folder Structure

```
src/
├── App.tsx                     ← Thin layout shell (ThemeProvider + ReviewProvider)
├── main.tsx                    ← Entry point
│
├── styles/
│   └── index.css               ← Tailwind @theme tokens + dark mode overrides
│
├── types/
│   └── index.ts                ← All TypeScript interfaces and types
│
├── api/
│   └── reviewApi.ts            ← Request builder (config only, no fetch call)
│
├── context/
│   ├── ThemeContext.tsx         ← Theme state + localStorage persistence
│   └── ReviewContext.tsx       ← Review data + useFetch + all handlers
│
├── hooks/
│   ├── useFetch.ts             ← Generic fetch hook
│   ├── useTheme.ts             ← Typed ThemeContext hook
│   └── useReview.ts     ← Typed ReviewContext hook
│
└── components/
    ├── Header.tsx               ← App header + theme toggle button
    ├── InputPanel.tsx           ← InputSection (3 private sub-components)
    ├── AnalysisPanel.tsx        ← AnalysisSection (conditionally rendered)
    ├── Scoreboard.tsx           ← Score ring + skill badge + summary
    ├── ScoreRing.tsx            ← SVG circular progress ring
    ├── IssuesList.tsx           ← Collapsible issues list
    ├── IssueCard.tsx            ← Individual issue with severity border
    ├── SuggestionsList.tsx      ← Checklist of suggestions
    ├── ImprovedPrompt.tsx       ← Solid-glassmorphism improved prompt box
    ├── SkeletonLoader.tsx       ← Loading skeleton matching result layout
    ├── ErrorBanner.tsx          ← Error display with rate-limit countdown
    └── AiDisclaimer.tsx         ← One-line AI accuracy disclaimer
```

---

## Design System

All colors, typography, and spacing are defined as Tailwind v4 `@theme` tokens in `styles/index.css`. Zero hardcoded color values in component JSX. Dark mode overrides via `[data-theme="dark"]` selector.
