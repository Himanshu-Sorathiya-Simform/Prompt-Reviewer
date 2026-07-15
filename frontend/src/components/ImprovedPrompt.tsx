import { useState } from "react";

interface ImprovedPromptProps {
	improvedPrompt: string;
	onReplaceOriginal: (text: string) => void;
}

export default function ImprovedPrompt({
	improvedPrompt,
	onReplaceOriginal,
}: ImprovedPromptProps) {
	const [copied, setCopied] = useState(false);

	const charCount = improvedPrompt.length;

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(improvedPrompt);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Clipboard API unavailable — silent fallback
		}
	};

	return (
		<div className="rounded-xl border border-brand/20 bg-brand/[0.06] backdrop-blur-sm">
			{/* Header */}
			<div className="flex items-center justify-between border-b border-brand/15 px-4 py-3">
				<div className="flex items-center gap-2">
					<svg
						className="h-4 w-4 text-brand"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
					</svg>
					<h3 className="text-sm font-semibold text-content-primary">
						Improved Prompt
					</h3>
				</div>

				<div className="flex items-center gap-2">
					<span className="text-xs tabular-nums text-content-muted">
						{charCount.toLocaleString()} chars
					</span>

					{/* Copy button */}
					<button
						type="button"
						onClick={handleCopy}
						aria-label={
							copied ? "Copied to clipboard" : "Copy improved prompt"
						}
						className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-content-secondary transition-colors hover:bg-surface-overlay hover:text-content-primary"
					>
						{copied ?
							<>
								<svg
									className="h-3.5 w-3.5 text-success"
									viewBox="0 0 16 16"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 011.04-.207z"
										clipRule="evenodd"
									/>
								</svg>
								Copied!
							</>
						:	<>
								<svg
									className="h-3.5 w-3.5"
									viewBox="0 0 16 16"
									fill="currentColor"
									aria-hidden="true"
								>
									<path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z" />
									<path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z" />
								</svg>
								Copy
							</>
						}
					</button>

					{/* Replace button */}
					<button
						type="button"
						onClick={() => onReplaceOriginal(improvedPrompt)}
						className="flex items-center gap-1.5 rounded-md bg-brand px-2.5 py-1.5 text-xs font-semibold text-content-inverted transition-colors hover:bg-brand-hover"
					>
						<svg
							className="h-3.5 w-3.5"
							viewBox="0 0 16 16"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M1.705 8.005a.75.75 0 01.834-.664l6.46.745-1.31-3.93a.75.75 0 011.42-.473l2 6a.75.75 0 01-.947.957l-6-2a.75.75 0 01-.457-1.635z"
								clipRule="evenodd"
							/>
						</svg>
						Use This
					</button>
				</div>
			</div>

			{/* Prompt text */}
			<pre className="whitespace-pre-wrap break-words p-4 font-mono text-sm leading-relaxed text-content-primary">
				{improvedPrompt}
			</pre>
		</div>
	);
}
