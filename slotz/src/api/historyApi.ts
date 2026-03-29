import type {SpinResponse} from "../../types/spin.ts";
import {API_BASE_URL} from "./client.ts";

export async function fetchHistory(): Promise<SpinResponse[]> {
    const response = await fetch(`${API_BASE_URL}/spins/history`, {
        method: "GET",
        cache: "no-cache"
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Could not load history data.");
    }

    return await response.json();
}