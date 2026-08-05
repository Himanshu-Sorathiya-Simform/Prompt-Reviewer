interface PromptTextareaProps {
	value: string;
	onChange: (value: string) => void;
	isLoading: boolean;
}

export default function PromptTextarea({
	value,
	onChange,
	isLoading,
}: PromptTextareaProps) {
	return (
		<div className="flex-1 flex flex-col min-h-[250px] mb-4">
			<textarea
				id="prompt-input"
				name="prompt"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				disabled={isLoading}
				placeholder="Enter your prompt here..."
				aria-label="Enter your prompt for review"
				className="flex-1 w-full h-full p-4 text-[15px] font-sans leading-relaxed text-content-primary placeholder:text-content-muted/60 focus:outline-none disabled:opacity-60 bg-surface-tinted resize-none rounded-md border border-transparent focus:border-border transition-colors"
				spellCheck
			/>
		</div>
	);
}
