import type { FormEvent } from "react";
import useReview from "../../hooks/useReview";
import PromptHeader from "./PromptHeader";
import PromptTextarea from "./PromptTextarea";
import PromptToolbar from "./PromptToolbar";

export default function InputPanel() {
	const {
		promptText,
		setPromptText,
		appState,
		usage,
		isLoading,
		handleSubmit,
		handleReset,
	} = useReview();

	const charCount = promptText.length;
	const isEmpty = promptText.trim().length === 0;
	const promptTokens = usage?.userPromptTokens ?? null;

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isEmpty && !isLoading) handleSubmit();
	};

	return (
		<form
			onSubmit={handleFormSubmit}
			noValidate
			aria-label="Prompt input"
		>
			<PromptHeader />
			<PromptTextarea
				value={promptText}
				onChange={setPromptText}
				isLoading={isLoading}
			/>
			<PromptToolbar
				charCount={charCount}
				promptTokens={promptTokens}
				isEmpty={isEmpty}
				isLoading={isLoading}
				appState={appState}
				onReset={handleReset}
				onSelectExample={setPromptText}
			/>
		</form>
	);
}
