import type { ExamplePrompt } from "../../types";

interface EmptyStateProps {
	onSelectExample: (prompt: string) => void;
}

const EXAMPLES: ExamplePrompt[] = [
	{
		label: "Vague",
		badge: "Beginner",
		prompt: "Write me a story.",
	},
	{
		label: "Decent",
		badge: "Intermediate",
		prompt: "Write a short story about a detective who solves a mystery in a small town. Make it suspenseful and around 500 words.",
	},
	{
		label: "Expert",
		badge: "Expert",
		prompt: "You are a noir fiction writer. Write a 600-word short story set in 1940s San Francisco featuring a cynical private detective named Marlowe who discovers that a missing person case is connected to a city-wide political corruption ring. Use first-person narration, period-appropriate slang, and end with an ambiguous moral conclusion.",
	},
];

const badgeConfig: Record<string, { textClass: string; bgClass: string }> = {
	Beginner: { textClass: "text-skill-beginner", bgClass: "bg-skill-beginner-bg" },
	Intermediate: {
		textClass: "text-skill-intermediate",
		bgClass: "bg-skill-intermediate-bg",
	},
	Expert: { textClass: "text-skill-expert", bgClass: "bg-skill-expert-bg" },
};

export default function EmptyState({ onSelectExample }: EmptyStateProps) {
	return (
		<div className="flex h-full flex-col items-center justify-center px-6 py-12">
			{/* Illustration */}
			<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-subtle">
				<svg
					className="h-8 w-8 text-brand"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
					/>
				</svg>
			</div>

			<h2 className="mb-1 text-base font-semibold text-content-primary">
				Your analysis will appear here
			</h2>
			<p className="mb-8 max-w-xs text-center text-sm text-content-muted">
				Type a prompt on the left and click <strong>Analyze Prompt</strong> —
				or try one of these examples:
			</p>

			{/* Example cards */}
			<div className="w-full max-w-sm space-y-3">
				{EXAMPLES.map((example) => {
					const badge =
						badgeConfig[example.badge] ?? badgeConfig["Intermediate"];

					return (
						<button
							key={example.label}
							type="button"
							onClick={() => onSelectExample(example.prompt)}
							className="w-full rounded-xl border border-border bg-surface-raised p-4 text-left transition-all hover:border-brand hover:bg-brand-subtle hover:shadow-sm"
						>
							<div className="mb-2 flex items-center justify-between">
								<span className="text-xs font-semibold text-content-secondary">
									{example.label} prompt
								</span>
								<span
									className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge?.textClass} ${badge?.bgClass}`}
								>
									{example.badge}
								</span>
							</div>
							<p className="line-clamp-2 text-xs leading-relaxed text-content-muted">
								{example.prompt}
							</p>
						</button>
					);
				})}
			</div>
		</div>
	);
}
