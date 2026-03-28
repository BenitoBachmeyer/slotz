import type { CellPosition, SpinResponse } from "../../../types/spin";
import { getSymbolAsset } from "../../constants/symbolAssets";
import "./SlotGrid.css";

interface SlotGridProps {
    matrix: SpinResponse["matrix"];
    winningPositions: CellPosition[];
}

function isWinningCell(
    rowIndex: number,
    reelIndex: number,
    winningPositions: CellPosition[],
): boolean {
    return winningPositions.some(
        (position) => position.row === rowIndex && position.reel === reelIndex,
    );
}

export default function SlotGrid({ matrix, winningPositions }: SlotGridProps) {
    return (
        <div className="slot-grid">
            {matrix.map((row, rowIndex) =>
                row.map((symbol, reelIndex) => {
                    const winning = isWinningCell(rowIndex, reelIndex, winningPositions);
                    const symbolAsset = getSymbolAsset(symbol);

                    return (
                        <div
                            key={`${rowIndex}-${reelIndex}`}
                            className={`slot-cell ${winning ? "slot-cell--winning" : ""}`}
                        >
                            {symbolAsset ? (
                                <img
                                    src={symbolAsset}
                                    alt={symbol}
                                    className="slot-cell__image"
                                />
                            ) : (
                                <span className="slot-cell__fallback">{symbol}</span>
                            )}
                        </div>
                    );
                }),
            )}
        </div>
    );
}