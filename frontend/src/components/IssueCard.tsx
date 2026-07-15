import type { Issue, IssueType, Severity } from "../types/index";

interface IssueCardProps {
	issue: Issue;
}

const severityConfig: Record<
	Severity,
	{ label: string; borderClass: string; textClass: string }
> = {
	high: {
		label: "High",
		borderClass: "border-l-severity-high-border",
		textClass: "text-severity-high",
	},
	medium: {
		label: "Medium",
		borderClass: "border-l-severity-medium-border",
		textClass: "text-severity-medium",
	},
	low: {
		label: "Low",
		borderClass: "border-l-severity-low-border",
		textClass: "text-severity-low",
	},
};

const typeLabels: Record<IssueType, string> = {
	clarity: "Clarity",
	specificity: "Specificity",
	structure: "Structure",
	context: "Context",
	goal_alignment: "Goal Alignment",
	safety: "Safety",
	other: "Other",
};

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
