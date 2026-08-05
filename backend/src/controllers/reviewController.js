import { analyzePrompt } from '../services/aiService.js';

export async function createReview(req, res, next) {
	const { prompt } = req.body;

	if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
		return res.status(400).json({
			success: false,
			message: 'Request body must include a non-empty "prompt" string.',
		});
	}

	try {
		const { report, usage } = await analyzePrompt(prompt.trim());

		return res.status(200).json({
			success: true,
			data: report,
			usage,
		});
	} catch (error) {
		next(error);
	}
}
