import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import type { Theme } from "../types/index";

interface UseThemeReturn {
	theme: Theme;
	toggleTheme: () => void;
}

function useTheme(): UseThemeReturn {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}

export default useTheme;
