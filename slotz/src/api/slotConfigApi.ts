import type { SlotConfig } from "../../types/slotConfig.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchSlotConfig(): Promise<SlotConfig> {
    const response = await fetch(`${API_BASE_URL}/slot-config`);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to load slot config");
    }

    return response.json();
}