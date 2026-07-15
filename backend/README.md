# PromptLens — Backend

Express API that powers the AI prompt review service. Accepts a user prompt and returns a structured quality report via the Gemini API.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ES Modules) |
| Framework | Express v5 |
| AI | `@google/genai` (Gemini) |
| Rate Limiting | `express-rate-limit` |
| Dev Server | `nodemon` |

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Create a `.env` file in `backend/`:
```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

Get your API key at [aistudio.google.com](https://aistudio.google.com/app/apikey).

### 3. Run the dev server
```bash
npm run dev
```
The server starts at `http://localhost:5000`.

---

## API Reference

### `POST /api/review`

Submits a prompt for AI quality review.

**Request**
```json
{
  "prompt": "Explain React hooks."
}
```

**Success Response** `200 OK`
```json
{
  "success": true,
  "data": {
    "score": 3,
    "skillLevel": "Beginner",
    "summary": "The prompt is vague and lacks context or constraints.",
    "issues": [
      {
        "type": "specificity",
        "severity": "high",
        "description": "No specific use case or depth requested."
      }
    ],
    "suggestions": [
      "Specify what kind of hook explanation you need (overview, implementation, comparison).",
      "Add constraints such as TypeScript or target audience."
    ],
    "improvedPrompt": "You are a senior React engineer. Explain the useState and useEffect hooks in TypeScript, covering their signatures, when to use each, common pitfalls, and include a practical example."
  },
  "usage": {
    "userPromptTokens": 4,
    "outputTokens": 312,
    "thoughtTokens": 198,
    "totalTokens": 584
  }
}
```

**Error Responses**

| Status | Meaning |
|---|---|
| `400` | Missing or empty `prompt` field |
| `429` | Rate limit exceeded (15 req/hr) |
| `502` | Gemini API returned an unexpected error |
| `503` | All fallback models are rate-limited |

---

## Rate Limiting

- **Limit:** 15 requests per hour per IP
- **Headers:** Standard `RateLimit-*` headers returned on every response (RFC-9110 draft-8 format)
- **Frontend usage:** The `RateLimit-Reset` header value (Unix timestamp) is used to display a live countdown in the UI

---

## Model Fallback

The server maintains a prioritised list of Gemini models in `constants/models.js`. When a model returns a `RESOURCE_EXHAUSTED` (quota exceeded) error, the server automatically retries with the next model in the list. The frontend sees a single seamless response — no error is surfaced until all models are exhausted.

---

## Project Structure

```
backend/
├── index.js              ← Express app, single POST /api/review route
├── constants/
│   └── models.js         ← Ordered list of fallback Gemini model IDs
├── .env                  ← GEMINI_API_KEY, PORT (not committed)
└── package.json
```
