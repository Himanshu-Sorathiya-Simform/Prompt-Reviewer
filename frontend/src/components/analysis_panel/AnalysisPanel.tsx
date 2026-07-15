import useReview from "../../hooks/useReview";
import ErrorBanner from "../ui/ErrorBanner";
import SectionDivider from "../ui/SectionDivider";
import SkeletonLoader from "../ui/SkeletonLoader";
import AiDisclaimer from "./AiDisclaimer";
import ImprovedPrompt from "./ImprovedPrompt";
import IssuesList from "./IssuesList";
import Scoreboard from "./Scoreboard";
import SuggestionsList from "./SuggestionsList";

export default function AnalysisPanel() {
	const {
		appState,
		report,
		errorMessage,
		isRateLimited,
		rateLimitReset,
		handleReplaceOriginal,
	} = useReview();

	if (appState === "idle") return null;

	return (
		<div className="animate-fade-slide-in mt-10 space-y-8">
			<SectionDivider label="Analysis" />

			{appState === "loading" && <SkeletonLoader />}

			{appState === "error" && (
				<ErrorBanner
					message={errorMessage ?? "An unexpected error occurred."}
					isRateLimited={isRateLimited}
					rateLimitReset={rateLimitReset}
				/>
			)}

			{appState === "success" && report && (
				<>
					<Scoreboard
						score={report.score}
						skillLevel={report.skillLevel}
						summary={report.summary}
					/>

					<SectionDivider label={`Issues · ${report.issues.length}`} />
					<IssuesList issues={report.issues} />

					<SectionDivider label="Suggestions" />
					<SuggestionsList suggestions={report.suggestions} />

					<SectionDivider label="Improved Prompt" />
					<ImprovedPrompt
						improvedPrompt={report.improvedPrompt}
						onReplaceOriginal={handleReplaceOriginal}
					/>

					<AiDisclaimer />
				</>
			)}
		</div>
	);
}
