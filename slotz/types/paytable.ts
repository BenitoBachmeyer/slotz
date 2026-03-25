export interface PayoutDTO {
    matchCount: number;
    payout: number;
}

export interface PaytableResponse {
    id: string;
    name: string;
    imageKey: string;
    payouts: PayoutDTO[];
}