import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { buildReviewRequest } from "../api/reviewApi";
import useFetch from "../hooks/useFetch";
import type {
	AppState,
	ReviewApiResponse,
	ReviewReport,
	UsageMetadata,
} from "../types";
import { deriveAppState } from "../utils";

export interface ReviewContextValue {
	promptText: string;
	setPromptText: (text: string) => void;
	appState: AppState;
	report: ReviewReport | null;
	usage: UsageMetadata | null;
	errorMessage: string | null;
	isRateLimited: boolean;
	rateLimitReset: number | null;
	isLoading: boolean;
	handleSubmit: () => void;
	handleReset: () => void;
	handleReplaceOriginal: (text: string) => void;
}

const ReviewContext = createContext<ReviewContextValue | null>(null);

interface ReviewProviderProps {
	children: ReactNode;
}

export function ReviewProvider({ children }: ReviewProviderProps) {
	const [promptText, setPromptTextRaw] = useState("");

	const { data, loading, error, statusCode, responseHeaders, execute, reset } =
		useFetch<ReviewApiResponse>();

	const appState = deriveAppState(loading, error, data);

	const isRateLimited = statusCode === 429;
	const rateLimitReset =
		isRateLimited ?
			Number(responseHeaders?.get("RateLimit-Reset") ?? null)
		:	null;

	const handleSubmit = useCallback(() => {
		reset();
		const { url, options } = buildReviewRequest(promptText);
		void execute(url, options);
	}, [promptText, execute, reset]);

	const handleReset = useCallback(() => {
		setPromptTextRaw("");
		reset();
	}, [reset]);

	const handleReplaceOriginal = useCallback(
		(text: string) => {
			setPromptTextRaw(text);
			reset();
		},
		[reset],
	);

	const setPromptText = useCallback((text: string) => {
		setPromptTextRaw(text);
	}, []);

	// Clear the analysis data if the prompt is manually emptied
	useEffect(() => {
		if (promptText.trim() === "" && data !== null) {
			reset();
		}
	}, [promptText, data, reset]);

	const value: ReviewContextValue = {
		promptText,
		setPromptText,
		appState,
		report: data?.data ?? null,
		usage: data?.usage ?? null,
		errorMessage: error,
		isRateLimited,
		rateLimitReset,
		isLoading: loading,
		handleSubmit,
		handleReset,
		handleReplaceOriginal,
	};

	return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useReview(): ReviewContextValue {
	const context = useContext(ReviewContext);
	if (!context) {
		throw new Error("useReview must be used within a ReviewProvider");
	}
	return context;
}
