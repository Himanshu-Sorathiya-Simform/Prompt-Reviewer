import { useReview } from "../../context/ReviewContext";

function PromptHeader() {
	const { appState } = useReview();

	const stateText: Record<string, string> = {
		idle: "Awaiting input",
		loading: "Analyzing...",
		success: "Analysis complete",
		error: "Analysis failed",
	};

	return (
		<div className="flex items-center justify-between pb-2 mb-2">
			<label
				htmlFor="prompt-input"
				className="text-xl font-bold text-content-primary"
			>
				Prompt
			</label>
			<span className="text-xs text-content-muted">
				{stateText[appState] || stateText["idle"]}
			</span>
		</div>
	);
}

export default PromptHeader;
