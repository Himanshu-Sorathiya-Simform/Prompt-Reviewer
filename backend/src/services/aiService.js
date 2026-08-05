import { groq } from '../config/groq.js';
import { models } from '../constants/models.js';
import { RESPONSE_SCHEMA, SYSTEM_PROMPT } from '../constants/prompts.js';

let currentModelIndex = 0;

function isRateLimitError(error) {
	const status = error?.status;
	const errorType = error?.error?.type;
	return status === 429 || errorType === 'rate_limit_exceeded';
}

export async function analyzePrompt(promptText) {
	const systemPromptWithSchema = `${SYSTEM_PROMPT}\n\nMust output JSON that matches this schema:\n\n${JSON.stringify(RESPONSE_SCHEMA, null, 2)}`;

	while (currentModelIndex < models.length) {
		const model = models[currentModelIndex];

		try {
			const completion = await groq.chat.completions.create({
				messages: [
					{ role: 'system', content: systemPromptWithSchema },
					{
						role: 'user',
						content: `Please review this prompt:\n\n${promptText}`,
					},
				],
				model: model,
				response_format: { type: 'json_object' },
			});

			const content = completion.choices[0].message.content;
			const report = JSON.parse(content);
			const usage = completion.usage;

			return {
				report,
				usage: {
					userPromptTokens: usage.prompt_tokens,
					outputTokens: usage.completion_tokens,
					totalTokens: usage.total_tokens,
				},
			};
		} catch (error) {
			const rateLimited = isRateLimitError(error);

			if (rateLimited && currentModelIndex < models.length - 1) {
				console.warn(
					`[Model Fallback] "${model}" is rate-limited. Switching to "${models[currentModelIndex + 1]}".`,
				);
				currentModelIndex++;
			} else {
				console.error(`Groq API error on model "${model}":`, error);

				const status = rateLimited ? 503 : 502;
				const message =
					rateLimited ?
						'All available AI models are currently rate-limited. Please try again later.'
					:	'Failed to get a response from the AI model. Please try again.';

				const err = new Error(message);
				err.status = status;
				throw err;
			}
		}
	}
}
