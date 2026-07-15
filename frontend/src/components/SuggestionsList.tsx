interface SuggestionsListProps {
	suggestions: string[];
}

export default function SuggestionsList({ suggestions }: SuggestionsListProps) {
	if (suggestions.length === 0) {
		return (
			<p className="text-sm text-content-muted">
				No suggestions — the prompt is already well-optimised.
			</p>
		);
	}

	return (
		<ul className="space-y-3">
			{suggestions.map((suggestion, i) => (
				<li
					key={i}
					className="flex items-start gap-3"
				>
					<svg
						className="mt-0.5 h-4 w-4 shrink-0 text-skill-advanced"
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
					<span className="text-sm leading-relaxed text-content-secondary">
						{suggestion}
					</span>
				</li>
			))}
		</ul>
	);
}
