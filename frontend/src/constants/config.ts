import type { IssueType, Severity, SkillLevel } from "../types/index";

export const skillConfig: Record<
	SkillLevel,
	{ textClass: string; bgClass: string }
> = {
	Beginner: {
		textClass: "text-score-low",
		bgClass: "bg-error-bg",
	},
	Developing: {
		textClass: "text-score-mid-low",
		bgClass: "bg-severity-medium-bg",
	},
	Intermediate: {
		textClass: "text-score-mid",
		bgClass: "bg-severity-medium-bg",
	},
	Advanced: {
		textClass: "text-score-high",
		bgClass: "bg-severity-low-bg",
	},
	Expert: {
		textClass: "text-score-peak",
		bgClass: "bg-severity-low-bg",
	},
};

export const severityConfig: Record<
	Severity,
	{ label: string; borderClass: string; textClass: string; bgClass: string }
> = {
	high: {
		label: "High",
		borderClass: "ring-severity-high-border",
		textClass: "text-severity-high",
		bgClass: "bg-severity-high-bg",
	},
	medium: {
		label: "Medium",
		borderClass: "ring-severity-medium-border",
		textClass: "text-severity-medium",
		bgClass: "bg-severity-medium-bg",
	},
	low: {
		label: "Low",
		borderClass: "ring-severity-low-border",
		textClass: "text-severity-low",
		bgClass: "bg-severity-low-bg",
	},
};

export const typeLabels: Record<IssueType, string> = {
	clarity: "Clarity",
	specificity: "Specificity",
	structure: "Structure",
	context: "Context",
	goal_alignment: "Goal Alignment",
	safety: "Safety",
	other: "Other",
};
