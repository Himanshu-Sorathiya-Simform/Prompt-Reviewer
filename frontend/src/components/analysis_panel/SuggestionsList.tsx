import { Lightbulb } from "lucide-react";

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
					<Lightbulb
						className="mt-0.5 h-4 w-4 shrink-0 text-skill-advanced"
						aria-hidden="true"
					/>
					<span className="text-sm leading-relaxed text-content-secondary">
						{suggestion}
					</span>
				</li>
			))}
		</ul>
	);
}
