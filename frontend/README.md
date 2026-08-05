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

All state is managed via a single React Context:

| Context         | Responsibility                                                                        |
| --------------- | ------------------------------------------------------------------------------------- |
| `ReviewContext` | Owns the data fetching lifecycle (`useFetch`), all handlers, and derived `appState`   |

Components consume context via typed hooks (e.g. `useReview`). **No prop drilling.**

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
├── App.tsx                     ← Thin layout shell (ReviewProvider)
├── main.tsx                    ← Entry point
│
├── styles/
│   └── index.css               ← Tailwind @theme tokens
│
├── types/
│   └── appTypes.ts             ← All TypeScript interfaces and types
│
├── api/
│   └── reviewApi.ts            ← Request builder (config only, no fetch call)
│
├── context/
│   └── ReviewContext.tsx       ← Review data + useFetch + all handlers
│
├── hooks/
│   └── useFetch.ts             ← Generic fetch hook
│
├── constants/
│   ├── configConstants.ts      ← Domain configuration
│   └── exampleConstants.ts     ← Example prompts
│
├── utils/
│   ├── apiUtils.ts             ← Utilities for processing headers
│   └── appUtils.ts             ← Common app logic utilities
│
└── components/
    ├── Header.tsx               ← Minimal app header
    ├── input_panel/
    │   ├── InputPanel.tsx       ← Container for the input section
    │   ├── PromptHeader.tsx     ← Header with state feedback
    │   ├── PromptTextarea.tsx   ← Auto-resizing text area
    │   └── PromptToolbar.tsx    ← Action buttons and token usage
    │
    ├── analysis_panel/
    │   ├── AnalysisPanel.tsx    ← Analysis layout container
    │   ├── Scoreboard.tsx       ← Clean typography score + skill badge
    │   ├── IssueCard.tsx        ← Diagnostics mapping with severity
    │   ├── SuggestionsList.tsx  ← Flat checklist of suggestions
    │   ├── ImprovedPrompt.tsx   ← Revised prompt box with copy button
    │   └── AiDisclaimer.tsx     ← One-line AI accuracy disclaimer
    │
    └── ui/
        ├── ErrorBanner.tsx      ← Error display with rate-limit countdown
        ├── SectionDivider.tsx   ← Simple labeled horizontal rule
        ├── SkeletonLine.tsx     ← Base atomic animated skeleton component
        └── SkeletonLoader.tsx   ← Loading skeleton matching the minimal result layout
```

---

## Design System

All colors, typography, and spacing are defined as Tailwind v4 `@theme` tokens in `styles/index.css`. Zero hardcoded color values in component JSX. The UI uses an ultra-minimalist single-column stacked layout with a clean Manrope font.
