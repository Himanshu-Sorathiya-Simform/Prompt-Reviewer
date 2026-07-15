import { useCallback, useState } from "react";

interface FetchState<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
	statusCode: number | null;
	responseHeaders: Headers | null;
}

interface UseFetchReturn<T> extends FetchState<T> {
	execute: (url: string, options: RequestInit) => Promise<void>;
	reset: () => void;
}

const initialState = <T>(): FetchState<T> => ({
	data: null,
	loading: false,
	error: null,
	statusCode: null,
	responseHeaders: null,
});

function useFetch<T>(): UseFetchReturn<T> {
	const [state, setState] = useState<FetchState<T>>(initialState<T>);

	const execute = useCallback(async (url: string, options: RequestInit) => {
		setState({
			data: null,
			loading: true,
			error: null,
			statusCode: null,
			responseHeaders: null,
		});

		try {
			const response = await fetch(url, options);
			const responseHeaders = response.headers;
			const statusCode = response.status;
			const json = (await response.json()) as
				T | { success: false; message: string };

			if (!response.ok) {
				const errorBody = json as { success: false; message: string };
				setState({
					data: null,
					loading: false,
					error: errorBody.message ?? "An unexpected error occurred.",
					statusCode,
					responseHeaders,
				});
				return;
			}

			setState({
				data: json as T,
				loading: false,
				error: null,
				statusCode,
				responseHeaders,
			});
		} catch {
			setState({
				data: null,
				loading: false,
				error: "Network error. Please check your connection and try again.",
				statusCode: null,
				responseHeaders: null,
			});
		}
	}, []);

	const reset = useCallback(() => {
		setState(initialState<T>());
	}, []);

	return { ...state, execute, reset };
}

export default useFetch;
