import type { SkillLevel } from "../../types/appTypes";

interface ScoreboardProps {
	score: number;
	skillLevel: SkillLevel;
}

function Scoreboard({ score, skillLevel }: ScoreboardProps) {
	const scaledScore = Math.min(Math.max(Math.round(score * 10), 0), 100);

	return (
		<div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-6">
			<div className="flex items-baseline gap-2">
				<span className="text-6xl font-bold tracking-tight text-content-primary">
					{scaledScore}
				</span>
				<span className="text-xl font-medium text-content-muted">/ 100</span>
			</div>

			<div className="flex items-center">
				<span className="text-lg font-medium text-content-secondary capitalize">
					{skillLevel.toLowerCase()} Level
				</span>
			</div>
		</div>
	);
}

export default Scoreboard;
