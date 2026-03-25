import { API_BASE_URL} from "./client.ts";
import type { PaytableResponse } from "../types/paytable";

export async function fetchPaytable(): Promise<PaytableResponse[]> {
    const response = await fetch(`${API_BASE_URL}/paytable`);

    if (!response.ok) {
        throw new Error("Failed to fetch paytable");
    }
    return response.json();
}