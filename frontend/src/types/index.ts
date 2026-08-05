export type SkillLevel =
	"Beginner" | "Developing" | "Intermediate" | "Advanced" | "Expert";

export type IssueType =
	| "clarity"
	| "specificity"
	| "structure"
	| "context"
	| "goal_alignment"
	| "safety"
	| "other";

export type Severity = "low" | "medium" | "high";

export interface Issue {
	type: IssueType;
	severity: Severity;
	description: string;
}

export interface ReviewReport {
	score: number;
	skillLevel: SkillLevel;
	summary: string;
	issues: Issue[];
	suggestions: string[];
	improvedPrompt: string;
}

export interface UsageMetadata {
	userPromptTokens: number;
	outputTokens: number;
	thoughtTokens: number;
	totalTokens: number;
}

export interface ReviewApiResponse {
	success: true;
	data: ReviewReport;
	usage: UsageMetadata;
}

/* ─── App State ───────────────────────────────────────────────────────────── */

export type AppState = "idle" | "loading" | "success" | "error";

/* ─── Example Prompts ─────────────────────────────────────────────────────── */

export interface ExamplePrompt {
	label: string;
	badge: SkillLevel;
	prompt: string;
}
