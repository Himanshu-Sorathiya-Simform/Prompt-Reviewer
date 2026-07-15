import { Loader2, Sparkles } from "lucide-react";
import { EXAMPLES } from "../../constants/examples";

interface PromptToolbarProps {
	charCount: number;
	promptTokens: number | null;
	isEmpty: boolean;
	isLoading: boolean;
	appState: string;
	onReset: () => void;
	onSelectExample: (prompt: string) => void;
}

export default function PromptToolbar({
	charCount,
	promptTokens,
	isEmpty,
	isLoading,
	appState,
	onReset,
	onSelectExample,
}: PromptToolbarProps) {
	const showReset = appState !== "idle";

	return (
		<div className="mt-3 space-y-3">
			{/* Example chips */}
			<div className="flex flex-wrap items-center gap-2">
				<span className="text-xs text-content-muted">Try an example:</span>
				{EXAMPLES.map((ex) => (
					<button
						key={ex.label}
						type="button"
						onClick={() => onSelectExample(ex.prompt)}
						className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-content-secondary transition-colors hover:border-brand hover:text-brand cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
					>
						{ex.label}
					</button>
				))}
			</div>

			{/* Action row */}
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2">
				{/* Left: char count + token count */}
				<div className="flex items-center gap-3 text-xs tabular-nums text-content-muted">
					<span aria-live="polite">
						{charCount > 0 ?
							`${charCount.toLocaleString()} chars`
						:	"Start typing…"}
					</span>
					{promptTokens !== null && (
						<>
							<span aria-hidden="true">·</span>
							<span className="font-medium text-content-secondary">
								{promptTokens.toLocaleString()} tokens
							</span>
						</>
					)}
				</div>

				{/* Right: Reset + Analyze */}
				<div className="flex items-center gap-2 w-full sm:w-auto justify-end">
					{showReset && (
						<button
							type="button"
							onClick={onReset}
							disabled={isLoading}
							className="rounded-lg px-3 py-2 text-sm font-medium text-content-secondary transition-colors hover:bg-surface-overlay hover:text-content-primary disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
						>
							Reset
						</button>
					)}
					<button
						type="submit"
						disabled={isEmpty || isLoading}
						aria-busy={isLoading}
						className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-content-inverted transition-colors hover:bg-brand-hover disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
					>
						{isLoading ?
							<>
								<Loader2 className="h-4 w-4 animate-spin opacity-75" aria-hidden="true" />
								Analyzing…
							</>
						:	<>
								<Sparkles className="h-4 w-4" aria-hidden="true" />
								Analyze Prompt
							</>
						}
					</button>
				</div>
			</div>
		</div>
	);
}
