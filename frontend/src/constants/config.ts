import type { IssueType, Severity, SkillLevel } from "../types/index";

export const skillConfig: Record<SkillLevel, { textClass: string; bgClass: string }> = {
	Beginner: {
		textClass: "text-skill-beginner",
		bgClass: "bg-skill-beginner-bg",
	},
	Developing: {
		textClass: "text-skill-developing",
		bgClass: "bg-skill-developing-bg",
	},
	Intermediate: {
		textClass: "text-skill-intermediate",
		bgClass: "bg-skill-intermediate-bg",
	},
	Advanced: {
		textClass: "text-skill-advanced",
		bgClass: "bg-skill-advanced-bg",
	},
	Expert: {
		textClass: "text-skill-expert",
		bgClass: "bg-skill-expert-bg",
	},
};

export const severityConfig: Record<
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

export const typeLabels: Record<IssueType, string> = {
	clarity: "Clarity",
	specificity: "Specificity",
	structure: "Structure",
	context: "Context",
	goal_alignment: "Goal Alignment",
	safety: "Safety",
	other: "Other",
};
