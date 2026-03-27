import type { SpinResponse } from "../../types/spin";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createSpin(betAmount: number): Promise<SpinResponse> {
    const response = await fetch(`${API_BASE_URL}/spins`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ betAmount }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Spin request failed");
    }

    return response.json();
}