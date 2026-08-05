import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface ImprovedPromptProps {
	improvedPrompt: string;
	onReplaceOriginal: (prompt: string) => void;
}

function ImprovedPrompt({
	improvedPrompt,
	onReplaceOriginal,
}: ImprovedPromptProps) {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(improvedPrompt);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy text:", err);
		}
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center justify-end gap-3">
				<button
					type="button"
					onClick={handleCopy}
					className="flex items-center gap-1.5 text-xs font-semibold text-content-muted hover:text-content-primary transition-colors cursor-pointer"
				>
					{isCopied ?
						<>
							<Check className="h-3.5 w-3.5" />
							<span>Copied</span>
						</>
					:	<>
							<Copy className="h-3.5 w-3.5" />
							<span>Copy</span>
						</>
					}
				</button>
				<button
					type="button"
					onClick={() => onReplaceOriginal(improvedPrompt)}
					className="text-xs font-semibold text-content-muted hover:text-content-primary transition-colors cursor-pointer"
				>
					Apply to editor
				</button>
			</div>

			<div className="bg-surface-tinted p-5 rounded-md border border-border">
				<p className="whitespace-pre-wrap text-[15px] font-sans leading-relaxed text-content-primary">
					{improvedPrompt}
				</p>
			</div>
		</div>
	);
}

export default ImprovedPrompt;
