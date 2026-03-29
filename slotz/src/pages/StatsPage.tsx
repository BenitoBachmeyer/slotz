import { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader/PageHeader.tsx";
import { StatMetricCard } from "../components/StatMetricCard/StatMetricCard.tsx";
import { fetchStats } from "../api/statsApi.ts";
import type { StatsResponse } from "../../types/stats";
import "./StatsPage.css";

function formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
}

function formatCredits(value: number): string {
    return value.toLocaleString();
}

function formatSignedCredits(value: number): string {
    return `${value >= 0 ? "+" : ""}${value.toLocaleString()} credits`;
}

export const StatsPage = () => {
    const [stats, setStats] = useState<StatsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStats()
            .then((data) => {
                setStats(data);
            })
            .catch((err) => {
                console.error("Stats fetch failed:", err);
                setError(`Could not load stats: ${String(err)}`);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section>
            <PageHeader
                title="Stats"
                subtitle="Track your slot performance, win rate and payouts with live backend data."
            />

            {loading && <p>Loading stats...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && stats && (
                <div className="stats-metric-grid">
                    <StatMetricCard
                        label="Total Spins"
                        value={stats.totalSpins.toLocaleString()}
                        hint={`${stats.winningSpins} winning spins`}
                    />

                    <StatMetricCard
                        label="Win Rate"
                        value={formatPercentage(stats.winRate)}
                        hint={`${stats.winningSpins}/${stats.totalSpins} spins won`}
                    />

                    <StatMetricCard
                        label="Total Bet"
                        value={formatCredits(stats.totalBetAmount)}
                        hint="Total wagered credits"
                    />

                    <StatMetricCard
                        label="Total Payout"
                        value={formatCredits(stats.totalPayout)}
                        hint="Total returned credits"
                    />

                    <StatMetricCard
                        label="Best Payout"
                        value={`${stats.bestPayout}x`}
                        hint="Highest payout achieved"
                    />

                    <StatMetricCard
                        label="Net Result"
                        value={formatSignedCredits(stats.netResult)}
                        hint="Payout minus total bet"
                    />
                </div>
            )}
        </section>
    );
};