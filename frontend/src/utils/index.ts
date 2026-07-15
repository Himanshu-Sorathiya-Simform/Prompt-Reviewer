import type { AppState, ReviewApiResponse } from "../types/index";

export function deriveAppState(
	loading: boolean,
	error: string | null,
	data: ReviewApiResponse | null,
): AppState {
	if (loading) return "loading";
	if (error) return "error";
	if (data?.success) return "success";
	return "idle";
}

export function formatCountdown(seconds: number): string {
	const m = Math.floor(seconds / 60);
	const s = seconds % 60;
	if (m > 0) return `${m}m ${s}s`;
	return `${s}s`;
}

export function computeRemaining(resetTimestamp: number): number {
	return Math.max(0, Math.ceil(resetTimestamp - Date.now() / 1000));
}
