import { ArrowRight, Check, Copy, Sparkles } from "lucide-react";
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
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand/15 px-4 py-3">
				<div className="flex items-center gap-2">
					<Sparkles
						className="h-4 w-4 text-brand"
						aria-hidden="true"
					/>
					<h3 className="text-sm font-semibold text-content-primary">
						Improved Prompt
					</h3>
				</div>

				<div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
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
						className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-content-secondary transition-colors hover:bg-surface-overlay hover:text-content-primary cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
					>
						{copied ?
							<>
								<Check
									className="h-3.5 w-3.5 text-success"
									aria-hidden="true"
								/>
								Copied!
							</>
						:	<>
								<Copy
									className="h-3.5 w-3.5"
									aria-hidden="true"
								/>
								Copy
							</>
						}
					</button>

					{/* Replace button */}
					<button
						type="button"
						onClick={() => onReplaceOriginal(improvedPrompt)}
						className="flex items-center gap-1.5 rounded-md bg-brand px-2.5 py-1.5 text-xs font-semibold text-content-inverted transition-colors hover:bg-brand-hover cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1"
					>
						<ArrowRight
							className="h-3.5 w-3.5"
							aria-hidden="true"
						/>
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
