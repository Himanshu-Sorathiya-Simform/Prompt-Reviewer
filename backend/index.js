import cors from "cors";
import "dotenv/config";
import rateLimit from "express-rate-limit";
import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(cors());
app.use(express.json());

// ─── Rate Limiter ─────────────────────────────────────────────────────────────
// 15 requests per hour per IP — applied globally to all endpoints

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 15,
  standardHeaders: "draft-8", // RateLimit headers (RFC 9110)
  message: {
    success: false,
    message:
      "Too many requests. You have exceeded the limit of 15 requests per hour. Please try again later.",
  },
});

app.use(limiter);

// ─── Health Check ─────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Prompt Reviewer API is running.",
    version: "1.0.0",
  });
});

// ─── Routes ───────────────────────────────────────────────────────────────────

// POST /api/review
// Controller logic will be added in the next iteration.
app.post("/api/review", (req, res) => {
  res.status(501).json({
    success: false,
    message: "Not implemented yet. Controller logic coming in the next iteration.",
  });
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// ─── Global Error Handler ────────────────────────────────────────────────────

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// ─── Start Server ────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
