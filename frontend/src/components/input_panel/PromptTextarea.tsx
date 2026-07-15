interface PromptTextareaProps {
	value: string;
	onChange: (value: string) => void;
	isLoading: boolean;
}

export default function PromptTextarea({ value, onChange, isLoading }: PromptTextareaProps) {
	return (
		<div className="group relative">
			<textarea
				id="prompt-input"
				name="prompt"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				disabled={isLoading}
				placeholder="e.g. You are a senior engineer. Explain how to implement..."
				rows={6}
				aria-label="Enter your prompt for review"
				className="w-full min-h-40 rounded-xl border border-border bg-surface-raised px-4 py-4 text-sm leading-relaxed text-content-primary placeholder:text-content-muted transition-colors focus:border-brand focus:outline-none disabled:opacity-60"
				spellCheck
			/>
		</div>
	);
}
