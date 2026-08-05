export function notFoundHandler(req, res) {
	res.status(404).json({
		success: false,
		message: `Route ${req.method} ${req.originalUrl} not found.`,
	});
}

// eslint-disable-next-line no-unused-vars
export function globalErrorHandler(err, req, res, next) {
	console.error(err.stack);
	res.status(err.status || 500).json({
		success: false,
		message: err.message || 'Internal server error.',
	});
}
