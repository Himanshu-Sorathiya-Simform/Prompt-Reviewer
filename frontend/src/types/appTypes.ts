type SkillLevel = "Beginner" | "Developing" | "Intermediate" | "Advanced" | "Expert";

type IssueType =
	| "clarity"
	| "specificity"
	| "structure"
	| "context"
	| "goal_alignment"
	| "safety"
	| "other";

type Severity = "low" | "medium" | "high";

interface Issue {
	type: IssueType;
	severity: Severity;
	description: string;
}

interface ReviewReport {
	score: number;
	skillLevel: SkillLevel;
	summary: string;
	issues: Issue[];
	suggestions: string[];
	improvedPrompt: string;
}

interface UsageMetadata {
	userPromptTokens: number;
	outputTokens: number;
	thoughtTokens: number;
	totalTokens: number;
}

interface ReviewApiResponse {
	success: true;
	data: ReviewReport;
	usage: UsageMetadata;
}

/* ─── App State ───────────────────────────────────────────────────────────── */

type AppState = "idle" | "loading" | "success" | "error";

/* ─── Example Prompts ─────────────────────────────────────────────────────── */

interface ExamplePrompt {
	label: string;
	badge: SkillLevel;
	prompt: string;
}

export type {
	AppState,
	ExamplePrompt,
	Issue,
	IssueType,
	ReviewApiResponse,
	ReviewReport,
	Severity,
	SkillLevel,
	UsageMetadata,
};
