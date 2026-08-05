import AnalysisPanel from "./components/analysis_panel/AnalysisPanel";
import Header from "./components/Header";
import InputPanel from "./components/input_panel/InputPanel";
import { ReviewProvider } from "./context/ReviewContext";

function App() {
	return (
		<ReviewProvider>
			<div className="flex min-h-dvh flex-col font-sans text-content-primary selection:bg-brand selection:text-white bg-surface">
				<Header />

				<main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-12">
					<div className="flex flex-col">
						<InputPanel />
					</div>

					<div className="flex flex-col">
						<AnalysisPanel />
					</div>
				</main>

				<footer className="py-8 px-6 text-center font-sans text-xs text-content-muted">
					PromptLens
				</footer>
			</div>
		</ReviewProvider>
	);
}

export default App;
