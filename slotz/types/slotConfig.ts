export interface PaylineDefinition {
    id: number;
    name: string;
    rows: number[];
}

export interface SymbolPayout {
    symbol: string;
    payouts: Record<number, number>;
}

export interface SlotConfig {
    reels: number;
    rows: number;
    paylines: number;
    minBet: number;
    maxBet: number;
    defaultBet: number;
    paylineDefinitions: PaylineDefinition[];
    symbols: SymbolPayout[];
}