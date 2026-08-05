import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import {
	globalErrorHandler,
	notFoundHandler,
} from './src/middlewares/errorHandler.js';
import { limiter } from './src/middlewares/rateLimiter.js';
import reviewRoutes from './src/routes/reviewRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Rate Limiter ─────────────────────────────────────────────────────────────
app.use(limiter);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
	res.json({
		success: true,
		message: 'Prompt Lens API is running.',
		version: '1.0.0',
	});
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/review', reviewRoutes);

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(globalErrorHandler);

// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
	console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
