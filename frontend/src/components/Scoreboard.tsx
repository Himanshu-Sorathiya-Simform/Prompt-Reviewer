import type { SkillLevel } from "../types/index";
import ScoreRing from "./ScoreRing";

interface ScoreboardProps {
	score: number;
	skillLevel: SkillLevel;
	summary: string;
}

const skillConfig: Record<SkillLevel, { textClass: string; bgClass: string }> = {
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

export default function Scoreboard({ score, skillLevel, summary }: ScoreboardProps) {
	const skill = skillConfig[skillLevel];

	return (
		<div className="flex items-center gap-6">
			<ScoreRing score={score} />

			<div className="flex-1 min-w-0">
				<span
					className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${skill.textClass} ${skill.bgClass}`}
				>
					{skillLevel}
				</span>
				<p className="mt-1 text-xs font-medium uppercase tracking-wider text-content-muted">
					Score {score} / 10
				</p>
				<p className="mt-2 text-sm leading-relaxed text-content-secondary italic">
					&ldquo;{summary}&rdquo;
				</p>
			</div>
		</div>
	);
}
