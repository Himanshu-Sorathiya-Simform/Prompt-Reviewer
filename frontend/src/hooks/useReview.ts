import { useContext } from "react";
import { ReviewContext, type ReviewContextValue } from "../context/ReviewContext";

function useReview(): ReviewContextValue {
	const context = useContext(ReviewContext);
	if (!context) {
		throw new Error("useReview must be used within a ReviewProvider");
	}
	return context;
}

export default useReview;
