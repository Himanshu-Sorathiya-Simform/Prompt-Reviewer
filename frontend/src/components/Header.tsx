import { Moon, Sun, Wand2 } from "lucide-react";
import useTheme from "../hooks/useTheme";

export default function Header() {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === "dark";

	return (
		<header className="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur-sm">
			<div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
				{/* Brand */}
				<div className="flex items-center gap-3">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
						<Wand2
							className="h-4 w-4 text-content-inverted"
							aria-hidden="true"
						/>
					</div>
					<div>
						<span className="text-sm font-bold tracking-tight text-content-primary">
							PromptLens
						</span>
						<span className="ml-2 hidden text-xs text-content-muted sm:inline">
							AI Prompt Reviewer
						</span>
					</div>
				</div>

				{/* Right side */}
				<div className="flex items-center gap-3">
					<span className="hidden items-center gap-1.5 rounded-full bg-brand-subtle px-3 py-1 text-xs font-medium text-brand sm:flex">
						<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
						Gemini
					</span>

					{/* Theme toggle */}
					<button
						type="button"
						onClick={toggleTheme}
						aria-label={
							isDark ? "Switch to light mode" : "Switch to dark mode"
						}
						className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-content-secondary transition-colors hover:bg-surface-raised hover:text-content-primary"
					>
						{isDark ?
							<Sun className="h-4 w-4" aria-hidden="true" />
						:	<Moon className="h-4 w-4" aria-hidden="true" />
						}
					</button>
				</div>
			</div>
		</header>
	);
}
