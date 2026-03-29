import type { WinningLine } from "../../../types/spin";
import "./WinningLinesPanel.css";

interface WinningLinesPanelProps {
    winningLines: WinningLine[];
}

export default function WinningLinesPanel({
                                              winningLines,
                                          }: WinningLinesPanelProps) {
    return (
        <div className="winning-lines-panel">
            <h3>Winning Lines</h3>

            {winningLines.length === 0 ? (
                <p className="winning-lines-panel__empty">No winning lines in this spin.</p>
            ) : (
                <ul className="winning-lines-panel__list">
                    {winningLines.map((line) => (
                        <li key={`${line.paylineId}-${line.symbol}-${line.count}`}>
                            Line {line.paylineId}: {line.count}x {line.symbol} · Multiplier {line.multiplier} · Win {line.winAmount}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}