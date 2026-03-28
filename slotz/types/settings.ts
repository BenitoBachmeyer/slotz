export interface SettingsOverviewResponse {
    currentDemoBalance: number;
    totalSpins: number;
    historySize: number;
    minBet: number;
    maxBet: number;
    defaultBet: number;
}

export interface DemoBalanceRequest {
    balance: number;
}

export interface DemoBalanceResponse {
    balance: number;
    message: string;
}

export interface SlotConfigurationResponse {
    reelCount: number;
    rowCount: number;
    paylineCount: number;
    minBet: number;
    maxBet: number;
    defaultBet: number;
}