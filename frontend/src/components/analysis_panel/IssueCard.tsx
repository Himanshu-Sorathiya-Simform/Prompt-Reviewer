import { severityConfig, typeLabels } from "../../constants/config";
import type { Issue } from "../../types/index";

interface IssueCardProps {
	issue: Issue;
}

export default function IssueCard({ issue }: IssueCardProps) {
	const config = severityConfig[issue.severity];

	return (
		<div
			className={`border-l-4 py-3 pl-4 ${config.borderClass}`}
			role="listitem"
		>
			<div className="mb-1.5 flex flex-wrap items-center gap-2">
				<span className={`text-xs font-semibold ${config.textClass}`}>
					{config.label}
				</span>
				<span className="text-content-muted">·</span>
				<span className="text-xs font-medium text-content-muted">
					{typeLabels[issue.type]}
				</span>
			</div>
			<p className="text-sm leading-relaxed text-content-secondary">
				{issue.description}
			</p>
		</div>
	);
}
