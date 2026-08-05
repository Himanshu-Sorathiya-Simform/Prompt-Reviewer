export default function PromptHeader() {
	return (
		<div className="flex items-center justify-between pb-2 mb-2">
			<label
				htmlFor="prompt-input"
				className="text-xl font-bold text-content-primary"
			>
				Prompt
			</label>
			<span className="text-xs text-content-muted">Awaiting input</span>
		</div>
	);
}
