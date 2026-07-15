interface ScoreRingProps {
	score: number;
}

const RADIUS = 52;
const STROKE_WIDTH = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = 68;

function getScoreColor(score: number): string {
	if (score <= 3) return "text-score-low";
	if (score <= 5) return "text-score-mid-low";
	if (score <= 7) return "text-score-mid";
	if (score <= 9) return "text-score-high";
	return "text-score-peak";
}

function getTrackOffset(score: number): number {
	const progress = Math.min(Math.max(score, 0), 10) / 10;
	return CIRCUMFERENCE * (1 - progress);
}

export default function ScoreRing({ score }: ScoreRingProps) {
	const colorClass = getScoreColor(score);
	const offset = getTrackOffset(score);
	const size = CENTER * 2;

	return (
		<div className="relative inline-flex items-center justify-center">
			<svg
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
				className="-rotate-90"
				aria-hidden="true"
			>
				{/* Background track */}
				<circle
					cx={CENTER}
					cy={CENTER}
					r={RADIUS}
					fill="none"
					strokeWidth={STROKE_WIDTH}
					className="stroke-border"
				/>
				{/* Colored progress arc */}
				<circle
					cx={CENTER}
					cy={CENTER}
					r={RADIUS}
					fill="none"
					strokeWidth={STROKE_WIDTH}
					strokeDasharray={CIRCUMFERENCE}
					strokeDashoffset={offset}
					strokeLinecap="round"
					className={`${colorClass} ring-transition`}
					style={{ stroke: "currentColor" }}
				/>
			</svg>
			{/* Score number centered inside ring */}
			<span
				className={`absolute text-3xl font-bold tabular-nums ${colorClass}`}
				aria-label={`Score: ${score} out of 10`}
			>
				{score}
			</span>
		</div>
	);
}
