import axios from "axios";

export function handleApiError(error: unknown): Promise<never> {
	if (axios.isAxiosError(error)) {
		const status = error.response?.status;
		const message = error.response?.data?.message || error.message;

		// Centralized spot for API error handling (logging, toast, auth flow, etc.).
		console.error(`API Error [${status}]: ${message}`);
	}

	return Promise.reject(error);
}
