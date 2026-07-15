export default function AiDisclaimer() {
	return (
		<p
			className="flex items-center gap-1.5 text-xs text-content-muted"
			role="note"
		>
			<svg
				className="h-3.5 w-3.5 shrink-0 text-severity-medium"
				viewBox="0 0 16 16"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fillRule="evenodd"
					d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 01-1.299 2.25H2.804a1.5 1.5 0 01-1.3-2.25l5.197-9zM8 5a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 018 5zm0 7a1 1 0 100-2 1 1 0 000 2z"
					clipRule="evenodd"
				/>
			</svg>
			AI-generated analysis — results may be inaccurate. Use as a guide, not
			ground truth.
		</p>
	);
}
