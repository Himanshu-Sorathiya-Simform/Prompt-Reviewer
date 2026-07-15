const API_BASE_URL = "http://localhost:5000";

export function buildReviewRequest(prompt: string): {
	url: string;
	options: RequestInit;
} {
	return {
		url: `${API_BASE_URL}/api/review`,
		options: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt }),
		},
	};
}
