export interface StatisticsSummaryDTO {
    totalSpins: number;
    winRate: number;
    bestPayout: number;
}

export interface SettingsOverviewResponse {
    lastAction: string;
    activeDemoBalance: number;
    statistics: StatisticsSummaryDTO;
    recentHistoryEntryCount: number;
    availableConfigurationValueCount: number;
}

export interface StatisticsResetResponse {
    message: string;
    statistics: StatisticsSummaryDTO;
}

export interface ClearHistoryRequest {
    entriesToClear: number;
}

export interface SpinHistoryEntryDTO {
    spinId: number;
    resultLabel: string;
    creditDelta: number;
}

export interface ClearHistoryResponse {
    message: string;
    clearedEntries: number;
    remainingEntries: number;
    removedEntries: SpinHistoryEntryDTO[];
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