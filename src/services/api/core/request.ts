import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { httpClient } from "@/services/api/core/http-client";

export async function get<T>(
	path: string,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response: AxiosResponse<T> = await httpClient.get(path, config);
	return response.data;
}

export async function post<T>(
	path: string,
	body?: unknown,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response: AxiosResponse<T> = await httpClient.post(path, body, config);
	return response.data;
}

export async function put<T>(
	path: string,
	body?: unknown,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response: AxiosResponse<T> = await httpClient.put(path, body, config);
	return response.data;
}

export async function del<T>(
	path: string,
	config?: AxiosRequestConfig,
): Promise<T> {
	const response: AxiosResponse<T> = await httpClient.delete(path, config);
	return response.data;
}
