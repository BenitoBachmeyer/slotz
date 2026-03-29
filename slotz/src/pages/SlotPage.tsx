import { useEffect, useMemo, useState } from "react";
import { createSpin, fetchCurrentBalance } from "../api/spinApi";
import { fetchSlotConfig } from "../api/slotConfigApi";
import BetControl from "../components/BetControl/BetControl";
import SlotGrid from "../components/SlotGrid/SlotGrid";
import SpinButton from "../components/SpinButton/SpinButton";
import WinningLinesPanel from "../components/WinningLinesPanel/WinningLinesPanel";
import type { SlotConfig } from "../../types/slotConfig";
import type { CellPosition, SpinResponse } from "../../types/spin";
import "./SlotPage.css";

function collectWinningPositions(spinResult: SpinResponse | null): CellPosition[] {
    if (!spinResult) return [];
    return spinResult.winningLines.flatMap((line) => line.positions);
}

function createInitialMatrix(rows: number, reels: number): string[][] {
    return Array.from({ length: rows }, () =>
        Array.from({ length: reels }, () => "—"),
    );
}

export default function SlotPage() {
    const [config, setConfig] = useState<SlotConfig | null>(null);

    const [spinResult, setSpinResult] = useState<SpinResponse | null>(() => {
        const saved = sessionStorage.getItem("slot.spinResult");
        return saved ? JSON.parse(saved) : null;
    });

    const [betAmount, setBetAmount] = useState<number>(() => {
        const saved = sessionStorage.getItem("slot.betAmount");
        return saved ? JSON.parse(saved) : 1;
    });

    const [currentBalance, setCurrentBalance] = useState<number>(() => {
        const saved = sessionStorage.getItem("slot.currentBalance");
        return saved ? JSON.parse(saved) : 1000;
    });

    const [loadingConfig, setLoadingConfig] = useState(true);
    const [spinning, setSpinning] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadSlotPageData() {
            try {
                setLoadingConfig(true);
                setError(null);

                const [slotConfig, backendBalance] = await Promise.all([
                    fetchSlotConfig(),
                    fetchCurrentBalance(),
                ]);

                setConfig(slotConfig);
                setCurrentBalance(backendBalance);

                const savedBet = sessionStorage.getItem("slot.betAmount");
                if (!savedBet) {
                    setBetAmount(slotConfig.defaultBet);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load slot page data");
            } finally {
                setLoadingConfig(false);
            }
        }

        void loadSlotPageData();
    }, []);

    useEffect(() => {
        sessionStorage.setItem("slot.betAmount", JSON.stringify(betAmount));
    }, [betAmount]);

    useEffect(() => {
        if (spinResult) {
            sessionStorage.setItem("slot.spinResult", JSON.stringify(spinResult));
        } else {
            sessionStorage.removeItem("slot.spinResult");
        }
    }, [spinResult]);

    useEffect(() => {
        sessionStorage.setItem("slot.currentBalance", JSON.stringify(currentBalance));
    }, [currentBalance]);

    const winningPositions = useMemo(
        () => collectWinningPositions(spinResult),
        [spinResult],
    );

    const displayedMatrix =
        spinResult?.matrix ??
        createInitialMatrix(config?.rows ?? 4, config?.reels ?? 5);

    const hasInsufficientCredits = currentBalance < betAmount;

    const handleSpin = async () => {
        try {
            setSpinning(true);
            setError(null);

            const result = await createSpin(betAmount);
            setSpinResult(result);
            setCurrentBalance(result.currentBalance);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Spin failed");
        } finally {
            setSpinning(false);
        }
    };

    if (loadingConfig) {
        return <div className="slot-page">Loading slot configuration...</div>;
    }

    if (!config) {
        return <div className="slot-page">No slot configuration available.</div>;
    }

    return (
        <div className="slot-page">
            <div className="slot-page__header">
                <div>
                    <h1>Slot Machine</h1>
                    <p>
                        {config.reels} reels · {config.rows} rows · {config.paylines} paylines
                    </p>
                </div>

                <div className="slot-page__controls">
                    <div className="slot-page__credits-card">
                        <span className="slot-page__credits-label">Current Credits</span>
                        <strong className="slot-page__credits-value">{currentBalance}</strong>
                    </div>

                    <BetControl
                        value={betAmount}
                        min={config.minBet}
                        max={config.maxBet}
                        disabled={spinning}
                        onChange={setBetAmount}
                    />

                    <SpinButton
                        loading={spinning}
                        disabled={spinning || hasInsufficientCredits}
                        onClick={handleSpin}
                    />
                </div>
            </div>

            {hasInsufficientCredits && !error && (
                <div className="slot-page__warning">
                    Not enough credits for this bet. Reduce the bet amount or set a new demo balance.
                </div>
            )}

            {error && <div className="slot-page__error">{error}</div>}

            <div className="slot-page__main">
                <section className="slot-page__board">
                    <SlotGrid
                        matrix={displayedMatrix}
                        winningPositions={winningPositions}
                    />

                    <div className="slot-page__result">
                        <div>
                            <strong>Current Credits:</strong> {currentBalance}
                        </div>
                        <div>
                            <strong>Bet:</strong> {spinResult?.betAmount ?? betAmount}
                        </div>
                        <div>
                            <strong>Total Win:</strong> {spinResult?.totalWin ?? 0}
                        </div>
                        <div>
                            <strong>Spin ID:</strong> {spinResult?.spinId ?? "—"}
                        </div>
                    </div>
                </section>

                <aside className="slot-page__sidebar">
                    <WinningLinesPanel winningLines={spinResult?.winningLines ?? []} />
                </aside>
            </div>
        </div>
    );
}