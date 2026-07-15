import { createContext, useCallback, useState, type ReactNode } from "react";
import { buildReviewRequest } from "../api/reviewApi";
import useFetch from "../hooks/useFetch";
import type {
	AppState,
	ReviewApiResponse,
	ReviewReport,
	UsageMetadata,
} from "../types";
import { deriveAppState } from "../utils";

/* ─── Context Shape ───────────────────────────────────────────────────────── */

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

export const ReviewContext = createContext<ReviewContextValue | null>(null);

/* ─── Provider ────────────────────────────────────────────────────────────── */

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
