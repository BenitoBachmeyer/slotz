// src/api/symbolsApi.ts
import { API_BASE_URL } from "./client";
import type { SymbolResponse } from "../../types/symbols";

export async function fetchSymbols(): Promise<SymbolResponse[]> {
    const response = await fetch(`${API_BASE_URL}/symbols`, {
        headers: {
            Accept: "application/json",
        },
        cache: "no-store",
    });

    if (!response.ok) {
        const text = await response.text();
        console.error("Failed to fetch symbols:", response.status, text);
        throw new Error(`Failed to fetch symbols: ${response.status}`);
    }

    return response.json();
}