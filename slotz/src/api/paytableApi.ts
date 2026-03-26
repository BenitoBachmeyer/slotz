import { API_BASE_URL } from "./client";
import type { PaytableResponse } from "../../types/paytable";

export async function fetchPaytable(): Promise<PaytableResponse[]> {
    console.log("API_BASE_URL:", API_BASE_URL);

    const response = await fetch(`${API_BASE_URL}/paytable`, {
        headers: {
            Accept: "application/json",
        },
        cache: "no-store",
    });

    console.log("status:", response.status, "ok:", response.ok);

    if (!response.ok) {
        const text = await response.text();
        console.error("response body:", text);
        throw new Error(`Failed to fetch paytable: ${response.status}`);
    }

    const data = await response.json();
    console.log("parsed paytable:", data);

    return data;
}