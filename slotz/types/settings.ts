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
    reels: number;
    rows: number;
    paylines: number;
    minBet: number;
    maxBet: number;
    defaultBet: number;
}