import AnalysisPanel from "./components/analysis_panel/AnalysisPanel";
import Header from "./components/Header";
import InputPanel from "./components/input_panel/InputPanel";
import { ReviewProvider } from "./context/ReviewContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
	return (
		<ThemeProvider>
			<ReviewProvider>
				<div className="flex min-h-dvh flex-col bg-surface font-sans">
					<Header />
					<main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
						<InputPanel />
						<AnalysisPanel />
					</main>
				</div>
			</ReviewProvider>
		</ThemeProvider>
	);
}

export default App;
