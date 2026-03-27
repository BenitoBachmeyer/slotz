import { API_BASE_URL } from "./client";
import type { StatsResponse } from "../../types/stats";

export async function fetchStats(): Promise<StatsResponse> {
    const response = await fetch(`${API_BASE_URL}/stats`, {
        headers: {
            Accept: "application/json",
        },
        cache: "no-store",
    });

    if (!response.ok) {
        const text = await response.text();
        console.error("Failed to fetch stats:", response.status, text);
        throw new Error(`Failed to fetch stats: ${response.status}`);
    }

    const data: StatsResponse = await response.json();
    console.log("fetchStats response:", data);
    return data;
}