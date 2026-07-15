import { skillConfig } from "../../constants/config";
import type { SkillLevel } from "../../types";
import Badge from "../ui/Badge";
import ScoreRing from "./ScoreRing";

interface ScoreboardProps {
	score: number;
	skillLevel: SkillLevel;
	summary: string;
}

export default function Scoreboard({ score, skillLevel, summary }: ScoreboardProps) {
	const skill = skillConfig[skillLevel];

	return (
		<div className="flex items-center gap-6">
			<ScoreRing score={score} />

			<div className="flex-1 min-w-0">
				<Badge
					textClass={skill.textClass}
					bgClass={skill.bgClass}
				>
					{skillLevel}
				</Badge>
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
