export interface StatsOverviewDTO {
    totalSpins: number;
    winningSpins: number;
    winRate: number; // z. B. 31.8
    bestPayoutMultiplier: number; // z. B. 50
    bestPayoutLabel: string; // z. B. "Bell x5 combo"
    averageReturn: number; // z. B. 92.4
    averageReturnSampleSize: number; // z. B. 500
    weeklySpinDelta: number; // z. B. 184
}

export interface DailyPerformanceDTO {
    label: string; // Monday, Tuesday, ...
    credits: number; // positiv/negativ
}

export interface SymbolFrequencyDTO {
    label: string; // Cherries, Bell, ...
    percentage: number; // z. B. 19.2
}

export interface StatsResponse {
    totalSpins: number;
    differenceInSpins: number;
    winRate: number;
    winningSpins: number;
    highestPayout: number;
    highestPayoutString: string;
    avgReturn: number;
    weeklyTrend: Record<string, number>;
    symbolFrequency: Record<string, number>;
}