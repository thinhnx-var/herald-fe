export { API_BASE_URL, API_TIMEOUT_MS } from "@/services/api/config";
export { httpClient } from "@/services/api/core/http-client";
// Backward-friendly aliases on the new single entrypoint.
export {
	del,
	del as apiDelete,
	get,
	get as apiGet,
	post,
	post as apiPost,
	put,
	put as apiPut,
} from "@/services/api/core/request";
export * from "@/services/api/endpoints";
