import AnalysisSection from "./components/AnalysisPanel";
import Header from "./components/Header";
import InputSection from "./components/InputPanel";
import { ReviewProvider } from "./context/ReviewContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
	return (
		<ThemeProvider>
			<ReviewProvider>
				<div className="flex min-h-dvh flex-col bg-surface font-sans">
					<Header />
					<main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
						<InputSection />
						<AnalysisSection />
					</main>
				</div>
			</ReviewProvider>
		</ThemeProvider>
	);
}

export default App;
