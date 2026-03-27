export interface StatisticsSummaryDTO {
    totalSpins: number;
    winRate: number;
    bestPayout: number;
}

export interface SettingsOverviewResponse {
    lastAction: string;
    activeDemoBalance: number;
    statistics?: StatisticsSummaryDTO;
    recentHistoryEntryCount: number;
    availableConfigurationValueCount: number;
}

export interface DemoBalanceRequest {
    demoCredits: number;
}

export interface DemoBalanceResponse {
    message: string;
    activeDemoBalance: number;
}

export interface SlotConfigurationResponse {
    reelCount: number;
    rowCount: number;
    paylineCount: number;
    minBet: number;
    maxBet: number;
    payoutHighlightMultiplier: number;
    payoutHighlightLabel: string;
}