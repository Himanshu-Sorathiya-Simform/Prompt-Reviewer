import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	limit: 15,
	standardHeaders: 'draft-8',
	message: {
		success: false,
		message:
			'Too many requests. You have exceeded the limit of 15 requests per hour. Please try again later.',
	},
});
