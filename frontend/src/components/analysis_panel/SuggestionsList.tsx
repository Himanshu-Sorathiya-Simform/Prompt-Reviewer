interface SuggestionsListProps {
	suggestions: string[];
}

function SuggestionsList({ suggestions }: SuggestionsListProps) {
	if (suggestions.length === 0) {
		return null;
	}

	return (
		<ul className="list-disc list-inside space-y-3">
			{suggestions.map((suggestion, i) => (
				<li
					key={i}
					className="text-sm font-medium leading-relaxed text-content-secondary"
				>
					{suggestion}
				</li>
			))}
		</ul>
	);
}

export default SuggestionsList;
