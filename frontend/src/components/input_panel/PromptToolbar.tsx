import { Loader2 } from "lucide-react";
import { EXAMPLES } from "../../constants/exampleConstants";

interface PromptToolbarProps {
	charCount: number;
	promptTokens: number | null;
	isEmpty: boolean;
	isLoading: boolean;
	appState: string;
	onReset: () => void;
	onSelectExample: (prompt: string) => void;
}

function PromptToolbar({
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
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap items-center gap-2">
				<span className="text-xs font-medium text-content-muted mr-2">
					Presets:
				</span>
				{EXAMPLES.map((ex) => (
					<button
						key={ex.label}
						type="button"
						onClick={() => onSelectExample(ex.prompt)}
						className="rounded-md border border-border px-3 py-1 text-xs text-content-secondary transition-colors hover:bg-surface-tinted hover:text-content-primary cursor-pointer"
					>
						{ex.label}
					</button>
				))}
			</div>

			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
				<div className="flex items-center gap-3 text-xs font-sans text-content-muted">
					<span aria-live="polite">
						{charCount > 0 ?
							`${charCount.toLocaleString()} chars`
						:	"0 chars"}
					</span>
					{promptTokens !== null && (
						<>
							<span
								aria-hidden="true"
								className="text-border"
							>
								/
							</span>
							<span className="text-content-secondary">
								{promptTokens.toLocaleString()} tokens
							</span>
						</>
					)}
				</div>

				<div className="flex items-center gap-3 w-full sm:w-auto justify-end">
					{showReset && (
						<button
							type="button"
							onClick={onReset}
							disabled={isLoading}
							className="rounded-md px-4 py-2 text-sm font-medium text-content-secondary transition-colors hover:bg-surface-tinted hover:text-content-primary disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
						>
							Clear
						</button>
					)}
					<button
						type="submit"
						disabled={isEmpty || isLoading}
						aria-busy={isLoading}
						className="flex items-center gap-2 rounded-md bg-brand px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-hover disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
					>
						{isLoading ?
							<>
								<Loader2
									className="h-4 w-4 animate-spin"
									aria-hidden="true"
								/>
								<span>Running...</span>
							</>
						:	<>
								<span>Review Prompt</span>
							</>
						}
					</button>
				</div>
			</div>
		</div>
	);
}

export default PromptToolbar;
