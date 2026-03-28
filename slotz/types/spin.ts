export interface CellPosition {
    reel: number;
    row: number;
}

export interface WinningLine {
    paylineId: number;
    symbol: string;
    count: number;
    multiplier: number;
    winAmount: number;
    positions: CellPosition[];
}

export interface SpinResponse {
    spinId: string;
    betAmount: number;
    totalWin: number;
    matrix: string[][];
    winningLines: WinningLine[];
    timestamp: string;
    currentBalance: number;
}