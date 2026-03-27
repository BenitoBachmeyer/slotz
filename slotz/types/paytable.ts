export interface PayoutDTO {
    matchCount: number;
    payout: number;
}

export interface PaytableResponse {
    id: string;
    name: string;
    imageKey: SymbolKey;
    payouts: PayoutDTO[];
}

export type SymbolKey =
    | "lemon"
    | "banana"
    | "grape"
    | "strawberry"
    | "watermelon"
    | "cherry"
    | "bell";