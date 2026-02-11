import type { AxiosInstance } from "axios";
import axios from "axios";
import { API_BASE_URL, API_TIMEOUT_MS } from "@/services/api/config";
import { handleApiError } from "@/services/api/core/error-handler";

export const httpClient: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: API_TIMEOUT_MS,
	headers: {
		"Content-Type": "application/json",
	},
});

httpClient.interceptors.request.use(
	(config) => {
		// TODO: Add auth token if needed.
		return config;
	},
	(error) => Promise.reject(error),
);

httpClient.interceptors.response.use((response) => response, handleApiError);
