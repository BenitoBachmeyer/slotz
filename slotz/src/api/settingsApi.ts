import { API_BASE_URL } from "./client";
import type {
    ClearHistoryRequest,
    ClearHistoryResponse,
    DemoBalanceRequest,
    DemoBalanceResponse,
    SettingsOverviewResponse,
    SlotConfigurationResponse,
    StatisticsResetResponse,
} from "../../types/settings";

async function handleResponse<T>(response: Response, errorPrefix: string): Promise<T> {
    if (!response.ok) {
        const text = await response.text();
        console.error(errorPrefix, response.status, text);
        throw new Error(`${errorPrefix}: ${response.status}`);
    }

    return response.json();
}

export async function fetchSettingsOverview(): Promise<SettingsOverviewResponse> {
    const response = await fetch(`${API_BASE_URL}/settings/overview`, {
        headers: {
            Accept: "application/json",
        },
        cache: "no-store",
    });

    return handleResponse<SettingsOverviewResponse>(response, "Failed to fetch settings overview");
}

export async function fetchSettingsConfiguration(): Promise<SlotConfigurationResponse> {
    const response = await fetch(`${API_BASE_URL}/settings/configuration`, {
        headers: {
            Accept: "application/json",
        },
        cache: "no-store",
    });

    return handleResponse<SlotConfigurationResponse>(response, "Failed to fetch settings configuration");
}

export async function resetStatistics(): Promise<StatisticsResetResponse> {
    const response = await fetch(`${API_BASE_URL}/settings/statistics/reset`, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    });

    return handleResponse<StatisticsResetResponse>(response, "Failed to reset statistics");
}

export async function clearHistory(body: ClearHistoryRequest): Promise<ClearHistoryResponse> {
    const response = await fetch(`${API_BASE_URL}/settings/history/clear`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return handleResponse<ClearHistoryResponse>(response, "Failed to clear history");
}

export async function setDemoBalance(body: DemoBalanceRequest): Promise<DemoBalanceResponse> {
    const response = await fetch(`${API_BASE_URL}/settings/demo-balance`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return handleResponse<DemoBalanceResponse>(response, "Failed to set demo balance");
}