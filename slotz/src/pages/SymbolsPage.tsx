// src/pages/SymbolsPage.tsx
import { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader/PageHeader.tsx";
import { Card } from "../components/Card/Card.tsx";
import { fetchSymbols } from "../api/symbolsApi.ts";
import { getSymbolAsset } from "../constants/symbolAssets.ts";
import type { SymbolResponse } from "../../types/symbols.ts";
import "./SymbolsPage.css";

function formatRarity(rarity: SymbolResponse["rarity"]): string {
    switch (rarity) {
        case "COMMON":
            return "Common";
        case "UNCOMMON":
            return "Uncommon";
        case "RARE":
            return "Rare";
        case "VERY_RARE":
            return "Very Rare";
        default:
            return rarity;
    }
}

export const SymbolsPage = () => {
    const [symbols, setSymbols] = useState<SymbolResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSymbols()
            .then((data) => {
                setSymbols(data);
            })
            .catch((err) => {
                console.error("Symbols fetch failed:", err);
                setError(`Could not load symbols: ${String(err)}`);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="symbols-page">
            <PageHeader
                title="Symbols"
                subtitle="Explore the slot symbols, their rarity and payout potential."
            />

            {loading && <p>Loading symbols...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && (
                <div className="symbols-grid">
                    {symbols.map((symbol) => {
                        const imageSrc = getSymbolAsset(symbol.imageKey);

                        return (
                            <Card className="symbol-card" key={symbol.id}>
                                <div className="symbol-card__top">
                                    <div className="symbol-card__image-wrap">
                                        {imageSrc ? (
                                            <img
                                                src={imageSrc}
                                                alt={`${symbol.name} icon`}
                                                className="symbol-card__image"
                                            />
                                        ) : (
                                            <div className="symbol-card__fallback">
                                                {symbol.name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="symbol-card__meta">
                                        <h2 className="symbol-card__title">{symbol.name}</h2>
                                        <span className="symbol-card__rarity">
                                            {formatRarity(symbol.rarity)}
                                        </span>
                                    </div>
                                </div>

                                <p className="symbol-card__description">{symbol.description}</p>

                                <div className="symbol-card__stats">
                                    <div className="symbol-card__stat">
                                        <span>Reel Count</span>
                                        <strong>{symbol.reelCount}</strong>
                                    </div>
                                    <div className="symbol-card__stat">
                                        <span>Best Payout</span>
                                        <strong>
                                            {symbol.payouts.length > 0
                                                ? `${symbol.payouts[symbol.payouts.length - 1].payout}x`
                                                : "—"}
                                        </strong>
                                    </div>
                                </div>

                                <div className="symbol-card__payouts">
                                    <h3 className="symbol-card__payouts-title">Payouts</h3>
                                    <ul className="symbol-card__payout-list">
                                        {symbol.payouts.map((payout) => (
                                            <li
                                                className="symbol-card__payout-item"
                                                key={`${symbol.id}-${payout.matchCount}`}
                                            >
                                                <span>{payout.matchCount} in a row</span>
                                                <strong>{payout.payout}x</strong>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </section>
    );
};