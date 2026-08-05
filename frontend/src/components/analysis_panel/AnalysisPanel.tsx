import { useReview } from "../../context/ReviewContext";
import ErrorBanner from "../ui/ErrorBanner";
import SectionDivider from "../ui/SectionDivider";
import SkeletonLoader from "../ui/SkeletonLoader";
import AiDisclaimer from "./AiDisclaimer";
import ImprovedPrompt from "./ImprovedPrompt";
import IssueCard from "./IssueCard";
import Scoreboard from "./Scoreboard";
import SuggestionsList from "./SuggestionsList";

function AnalysisPanel() {
	const {
		appState,
		report,
		errorMessage,
		statusCode,
		rateLimitReset,
		handleReplaceOriginal,
	} = useReview();

	if (appState === "idle") {
		return null;
	}

	return (
		<div className="animate-fade-slide-in flex flex-col pt-12 border-t border-border mt-8">
			{appState === "loading" && (
				<div className="py-8">
					<SkeletonLoader />
				</div>
			)}

			{appState === "error" && (
				<div className="py-8">
					<ErrorBanner
						message={errorMessage ?? "An unexpected error occurred."}
						statusCode={statusCode}
						rateLimitReset={rateLimitReset}
					/>
				</div>
			)}

			{appState === "success" && report && (
				<div className="flex flex-col space-y-12">
					<Scoreboard
						score={report.score}
						skillLevel={report.skillLevel}
					/>

					<div className="border-l-2 border-border pl-4 py-1">
						<h4 className="text-xs font-semibold uppercase tracking-wider text-content-muted mb-2">
							Executive Summary
						</h4>
						<p className="text-sm leading-relaxed text-content-primary">
							{report.summary}
						</p>
					</div>

					<div>
						<SectionDivider label="Diagnostics" />
						{report.issues.length > 0 ?
							<div className="mt-6 flex flex-col gap-6">
								{report.issues.map((issue, i) => (
									<IssueCard
										key={i}
										issue={issue}
									/>
								))}
							</div>
						:	<div className="mt-6">
								<p className="text-sm text-content-muted">
									No issues detected. Your prompt is clean.
								</p>
							</div>
						}
					</div>

					<div>
						<SectionDivider label="Recommendations" />
						<div className="mt-6">
							<SuggestionsList suggestions={report.suggestions} />
						</div>
					</div>

					{report.improvedPrompt && (
						<div>
							<SectionDivider label="Revised Prompt" />
							<div className="mt-6">
								<ImprovedPrompt
									improvedPrompt={report.improvedPrompt}
									onReplaceOriginal={handleReplaceOriginal}
								/>
							</div>
						</div>
					)}
					<AiDisclaimer />
				</div>
			)}
		</div>
	);
}

export default AnalysisPanel;
