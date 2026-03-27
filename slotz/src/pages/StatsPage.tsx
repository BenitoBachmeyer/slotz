import { useEffect, useState } from "react";
import { PageHeader } from "../components/PageHeader/PageHeader.tsx";
import { StatMetricCard } from "../components/StatMetricCard/StatMetricCard.tsx";
import { StatBreakdownCard } from "../components/StatBreakdownCard/StatBreakdownCard.tsx";
import { fetchStats } from "../api/statsApi.ts";
import type { StatsResponse } from "../../types/stats";
import "./StatsPage.css";

function formatSignedCredits(value: number): string {
    return `${value >= 0 ? "+" : ""}${value} credits`;
}

function formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
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

    const weeklyTrendItems = stats
        ? Object.entries(stats.weeklyTrend).map(([label, value]) => ({
            label,
            value: formatSignedCredits(value),
        }))
        : [];

    const symbolFrequencyItems = stats
        ? Object.entries(stats.symbolFrequency).map(([label, value]) => ({
            label,
            value: formatPercentage(value),
        }))
        : [];

    return (
        <section>
            <PageHeader
                title={"Stats"}
                subtitle={"Track your slot performance, streaks and payout trends with live backend data."}
            />

            {loading && <p>Loading stats...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && stats && (
                <>
                    <div className="stats-metric-grid">
                        <StatMetricCard
                            label="Total Spins"
                            value={stats.totalSpins.toLocaleString()}
                            hint={`+${stats.differenceInSpins} this week`}
                        />
                        <StatMetricCard
                            label="Win Rate"
                            value={formatPercentage(stats.winRate)}
                            hint={`${stats.winningSpins} winning spins`}
                        />
                        <StatMetricCard
                            label="Best Payout"
                            value={`${stats.highestPayout}x`}
                            hint={stats.highestPayoutString}
                        />
                        <StatMetricCard
                            label="Average Return"
                            value={formatPercentage(stats.avgReturn)}
                        />
                    </div>

                    <div className="stats-breakdown-grid">
                        <StatBreakdownCard
                            title={"Weekly Profit Trend"}
                            description={"A snapshot of your latest five sessions. Helpful for spotting your hottest days."}
                            items={weeklyTrendItems}
                        />
                        <StatBreakdownCard
                            title={"Symbol Frequency"}
                            description={"How often each symbol appeared in your recent spin history."}
                            items={symbolFrequencyItems}
                        />
                    </div>
                </>
            )}
        </section>
    );
};