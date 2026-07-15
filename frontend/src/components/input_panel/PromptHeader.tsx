export default function PromptHeader() {
	return (
		<div className="mb-3">
			<label
				htmlFor="prompt-input"
				className="block text-lg font-semibold text-content-primary"
			>
				Your Prompt
			</label>
			<p className="mt-0.5 text-sm text-content-muted">
				Paste any AI prompt and get a detailed quality review.
			</p>
		</div>
	);
}
