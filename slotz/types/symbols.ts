// types/symbols.ts
export type SymbolRarity = "COMMON" | "UNCOMMON" | "RARE" | "VERY_RARE";

export interface SymbolPayout {
    matchCount: number;
    payout: number;
}

export interface SymbolResponse {
    id: string;
    name: string;
    imageKey: string;
    description: string;
    rarity: SymbolRarity;
    reelCount: number;
    payouts: SymbolPayout[];
}