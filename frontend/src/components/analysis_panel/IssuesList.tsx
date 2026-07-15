import { useState } from "react";
import type { Issue } from "../../types/index";
import IssueCard from "./IssueCard";

interface IssuesListProps {
	issues: Issue[];
}

const VISIBLE_LIMIT = 3;

export default function IssuesList({ issues }: IssuesListProps) {
	const [showAll, setShowAll] = useState(false);

	const visibleIssues = showAll ? issues : issues.slice(0, VISIBLE_LIMIT);
	const hiddenCount = issues.length - VISIBLE_LIMIT;

	if (issues.length === 0) {
		return (
			<p className="text-sm text-content-muted">
				No issues found — this is an exceptionally well-crafted prompt.
			</p>
		);
	}

	return (
		<div>
			<div
				className="space-y-4"
				role="list"
			>
				{visibleIssues.map((issue, i) => (
					<IssueCard
						key={i}
						issue={issue}
					/>
				))}
			</div>

			{hiddenCount > 0 && (
				<button
					type="button"
					onClick={() => setShowAll((prev) => !prev)}
					className="mt-4 text-sm font-medium text-brand transition-colors hover:text-brand-hover"
				>
					{showAll ?
						"Show fewer ↑"
					:	`Show ${hiddenCount} more issue${hiddenCount > 1 ? "s" : ""} ↓`}
				</button>
			)}
		</div>
	);
}
