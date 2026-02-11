import type { TradePair } from "@/types";
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
	timeout: 15000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor - add auth token, logging, etc.
apiClient.interceptors.request.use(
	(config) => {
		// TODO: Add auth token if needed
		// const token = getToken();
		// if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => Promise.reject(error),
);

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (axios.isAxiosError(error)) {
			const status = error.response?.status;
			const message = error.response?.data?.message || error.message;

			// TODO: Handle specific status codes (401 -> redirect to login, etc.)
			console.error(`API Error [${status}]: ${message}`);
		}
		return Promise.reject(error);
	},
);

export async function apiGet<T>(
	path: string,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response: AxiosResponse<T> = await apiClient.get(path, config);
	return response.data;
}

export async function apiPost<T>(
	path: string,
	body?: unknown,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response: AxiosResponse<T> = await apiClient.post(
		path,
		body,
		config,
	);
	return response.data;
}

export async function apiPut<T>(
	path: string,
	body?: unknown,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response: AxiosResponse<T> = await apiClient.put(
		path,
		body,
		config,
	);
	return response.data;
}

export async function apiDelete<T>(
	path: string,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response: AxiosResponse<T> = await apiClient.delete(path, config);
	return response.data;
}

// --- Example API call ---
// This demonstrates the pattern for all future API integrations.
// Usage in a hook:
//   const { data } = useQuery({
//     queryKey: ["pairs"],
//     queryFn: getPairs,
//   });

export async function getPairs(): Promise<TradePair[]> {
	return apiGet<TradePair[]>("/pairs");
}

export default apiClient;
