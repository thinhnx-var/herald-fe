import { get } from "@/services/api/core/request";
import type { TradePair } from "@/types";

export async function getPairs(): Promise<TradePair[]> {
	return get<TradePair[]>("/pairs");
}
