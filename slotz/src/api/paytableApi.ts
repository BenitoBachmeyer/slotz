import {API_BASE_URL} from "./client";
import type {PaytableResponse} from "../../types/paytable";

export async function fetchPaytable(): Promise<PaytableResponse[]> {
    const response = await fetch(`${API_BASE_URL}/paytable`, {
        headers: {
            Accept: "application/json",
        },
        cache: "no-store",
    });


    if (!response.ok) {
        const text = await response.text();
        console.error("response body:", text);
        throw new Error(`Failed to fetch paytable: ${response.status}`);
    }

    return await response.json();
}