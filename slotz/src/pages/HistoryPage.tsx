import { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader/PageHeader.tsx";
import { Card } from "../components/Card/Card.tsx";
import { fetchHistory } from "../api/historyApi.ts";
import { getSymbolAsset } from "../constants/symbolAssets";
import type { SpinResponse } from "../../types/spin.ts";
import "./HistoryPage.css";

function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
        return timestamp;
    }

    return new Intl.DateTimeFormat("de-DE", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
}

function isWinningCell(spin: SpinResponse, rowIndex: number, reelIndex: number): boolean {
    return spin.winningLines.some((line) =>
        line.positions.some(
            (position) => position.row === rowIndex && position.reel === reelIndex,
        ),
    );
}

export const HistoryPage = () => {
    const [history, setHistory] = useState<SpinResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchHistory()
            .then((data) => {
                setHistory(data);
            })
            .catch((err) => {
                console.error("History fetch failed:", err);
                setError(err instanceof Error ? err.message : "Could not load history.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <section className="history-page">
            <PageHeader
                title="History"
                subtitle="Review your recent spins, payouts and winning lines."
            />

            {loading && <p>Loading history...</p>}
            {error && <div className="history-page__error">{error}</div>}

            {!loading && !error && history.length === 0 && (
                <Card className="history-page__empty-card">
                    <p className="history-page__empty-title">No spins yet</p>
                    <p className="history-page__empty-text">
                        Start playing on the slot page to generate spin history.
                    </p>
                </Card>
            )}

            {!loading && !error && history.length > 0 && (
                <div className="history-page__list">
                    {history.map((spin) => (
                        <Card className="history-entry" key={spin.spinId}>
                            <div className="history-entry__header">
                                <div>
                                    <h2 className="history-entry__title">
                                        Spin #{spin.spinId}
                                    </h2>
                                    <p className="history-entry__timestamp">
                                        {formatTimestamp(spin.timestamp)}
                                    </p>
                                </div>

                                <div
                                    className={[
                                        "history-entry__win-badge",
                                        spin.totalWin > 0
                                            ? "history-entry__win-badge--positive"
                                            : "history-entry__win-badge--neutral",
                                    ].join(" ")}
                                >
                                    {spin.totalWin > 0 ? `+${spin.totalWin}` : spin.totalWin} credits
                                </div>
                            </div>

                            <div className="history-entry__stats">
                                <div className="history-entry__stat">
                                    <span>Bet</span>
                                    <strong>{spin.betAmount}</strong>
                                </div>

                                <div className="history-entry__stat">
                                    <span>Total Win</span>
                                    <strong>{spin.totalWin}</strong>
                                </div>

                                <div className="history-entry__stat">
                                    <span>Balance After Spin</span>
                                    <strong>{spin.currentBalance}</strong>
                                </div>

                                <div className="history-entry__stat">
                                    <span>Winning Lines</span>
                                    <strong>{spin.winningLines.length}</strong>
                                </div>
                            </div>

                            <div className="history-entry__content">
                                <div className="history-entry__matrix-block">
                                    <p className="history-entry__section-title">Result Matrix</p>

                                    <div className="history-matrix">
                                        {spin.matrix.map((row, rowIndex) => (
                                            <div className="history-matrix__row" key={`${spin.spinId}-row-${rowIndex}`}>
                                                {row.map((symbol, reelIndex) => {
                                                    const winning = isWinningCell(spin, rowIndex, reelIndex);
                                                    const symbolAsset = getSymbolAsset(symbol);

                                                    return (
                                                        <div
                                                            className={[
                                                                "history-matrix__cell",
                                                                winning ? "history-matrix__cell--winning" : "",
                                                            ].join(" ")}
                                                            key={`${spin.spinId}-cell-${rowIndex}-${reelIndex}`}
                                                        >
                                                            {symbolAsset ? (
                                                                <img
                                                                    src={symbolAsset}
                                                                    alt={symbol}
                                                                    className="history-matrix__image"
                                                                />
                                                            ) : (
                                                                <span className="history-matrix__fallback">
                                                                    {symbol}
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="history-entry__wins-block">
                                    <p className="history-entry__section-title">Winning Lines</p>

                                    {spin.winningLines.length > 0 ? (
                                        <ul className="history-entry__winning-lines">
                                            {spin.winningLines.map((line) => (
                                                <li key={`${spin.spinId}-${line.paylineId}`}>
                                                    <strong>Line {line.paylineId}</strong> · {line.symbol} ·{" "}
                                                    {line.count}x · Multiplier {line.multiplier} · Win {line.winAmount}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="history-entry__no-win">
                                            No winning lines on this spin.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
};