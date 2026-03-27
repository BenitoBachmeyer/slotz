import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "../components/PageHeader/PageHeader.tsx";
import { SettingsActionCard } from "../components/SettingsActionCard/SettingsActionCard.tsx";
import { SettingsConfigCard } from "../components/SettingsConfigCard/SettingsConfigCard.tsx";
import { SettingsOverviewCard } from "../components/SettingsOverviewCard/SettingsOverviewCard.tsx";
import {
    clearHistory,
    fetchSettingsConfiguration,
    fetchSettingsOverview,
    resetStatistics,
    setDemoBalance,
} from "../api/settingsApi.ts";
import type {
    SettingsOverviewResponse,
    SlotConfigurationResponse,
    SpinHistoryEntryDTO,
} from "../../types/settings";
import "./SettingsPage.css";

const overviewItems = [
    {
        eyebrow: "Overview",
        title: "Reset Statistics",
        description: "Set total spins, win rate and payout highlights back to a clean demo baseline.",
    },
    {
        eyebrow: "Overview",
        title: "Clear History",
        description: "Remove recent spin history entries from the current demo profile.",
    },
    {
        eyebrow: "Overview",
        title: "Set Demo Balance",
        description: "Choose how many credits the player should receive before entering the slot screen.",
    },
    {
        eyebrow: "Overview",
        title: "Show Configuration",
        description: "Reveal the game setup, including reel count, paylines, bet range and payout highlight.",
    },
];

export const SettingsPage = () => {
    const [overview, setOverview] = useState<SettingsOverviewResponse | null>(null);
    const [configuration, setConfiguration] = useState<SlotConfigurationResponse | null>(null);
    const [removedEntries, setRemovedEntries] = useState<SpinHistoryEntryDTO[]>([]);
    const [demoBalance, setDemoBalanceInput] = useState("1000");
    const [showConfiguration, setShowConfiguration] = useState(false);

    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([fetchSettingsOverview(), fetchSettingsConfiguration()])
            .then(([overviewData, configurationData]) => {
                setOverview(overviewData);
                setConfiguration(configurationData);
                setDemoBalanceInput(String(overviewData.activeDemoBalance));
            })
            .catch((err) => {
                console.error("Settings fetch failed:", err);
                setError(`Could not load settings: ${String(err)}`);
            })
            .finally(() => setLoading(false));
    }, []);

    const statsStatus = useMemo(() => {
        if (!overview) return "";
        return [
            `Total Spins: ${overview.statistics.totalSpins}`,
            `Win Rate: ${Number(overview.statistics.winRate).toFixed(1)}%`,
            `Best Payout: ${overview.statistics.bestPayout}x`,
        ].join(" · ");
    }, [overview]);

    const historyStatus = overview
        ? `${overview.recentHistoryEntryCount} recent entries available`
        : "";

    const reloadOverview = async () => {
        const freshOverview = await fetchSettingsOverview();
        setOverview(freshOverview);
        setDemoBalanceInput(String(freshOverview.activeDemoBalance));
    };

    const handleResetStatistics = async () => {
        try {
            setActionLoading(true);
            setError(null);

            const response = await resetStatistics(); await reloadOverview();
            setOverview((prev) =>
                prev
                    ? {
                        ...prev,
                        lastAction: response.message,
                        statistics: response.statistics,
                    }
                    : prev,
            );
        } catch (err) {
            console.error(err);
            setError(`Action failed: ${String(err)}`);
        } finally {
            setActionLoading(false);
        }
    };

    const handleClearHistory = async () => {
        try {
            setActionLoading(true);
            setError(null);

            const availableEntries = overview?.recentHistoryEntryCount ?? 0;
            if (availableEntries < 1) {
                setError("There are no history entries to clear.");
                return;
            }
            const response = await clearHistory({ entriesToClear: availableEntries });

            setRemovedEntries(response.removedEntries);
            setOverview((prev) =>
                prev
                    ? {
                        ...prev,
                        lastAction: response.message,
                        recentHistoryEntryCount: response.remainingEntries,
                    }
                    : prev,
            );
        } catch (err) {
            console.error(err);
            setError(`Action failed: ${String(err)}`);
        } finally {
            setActionLoading(false);
        }
    };

    const handleApplyDemoBalance = async () => {
        try {
            setActionLoading(true);
            setError(null);

            const parsed = Number.parseInt(demoBalance, 10);
            const normalized = Number.isNaN(parsed) || parsed < 0 ? 0 : parsed;

            const response = await setDemoBalance({ demoCredits: normalized });

            setOverview((prev) =>
                prev
                    ? {
                        ...prev,
                        lastAction: response.message,
                        activeDemoBalance: response.activeDemoBalance,
                    }
                    : prev,
            );

            setDemoBalanceInput(String(response.activeDemoBalance));
        } catch (err) {
            console.error(err);
            setError(`Action failed: ${String(err)}`);
        } finally {
            setActionLoading(false);
        }
    };

    const configurationItems = configuration
        ? [
            { label: "Reels", value: String(configuration.reelCount) },
            { label: "Rows", value: String(configuration.rowCount) },
            { label: "Active Paylines", value: String(configuration.paylineCount) },
            { label: "Minimum Bet", value: `${configuration.minBet} credits` },
            { label: "Maximum Bet", value: `${configuration.maxBet} credits` },
            {
                label: "Top Symbol Payout",
                value: `${configuration.payoutHighlightLabel} · ${configuration.payoutHighlightMultiplier}x`,
            },
        ]
        : [];

    return (
        <section>
            <PageHeader
                title={"Settings"}
                subtitle={"Manage demo data, clean up your play history and inspect the current slot configuration."}
            />

            <div className="settings-page__overview-grid">
                {overviewItems.map((item) => (
                    <SettingsOverviewCard
                        key={item.title}
                        eyebrow={item.eyebrow}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>

            {loading && <p>Loading settings...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && overview && (
                <>
                    <div className="settings-page__toolbar">
                        <p className="settings-page__last-action">
                            Last action: {overview.lastAction}
                        </p>
                        <div className="settings-page__balance-chip">
                            Active demo balance: {overview.activeDemoBalance} credits
                        </div>
                    </div>

                    <div className="settings-page__grid">
                        <SettingsActionCard
                            title={"Reset Statistics"}
                            description={"Restore your slot metrics to a clean demo baseline before starting a new session."}
                            actionLabel={actionLoading ? "Working..." : "Reset stats"}
                            onAction={handleResetStatistics}
                            status={statsStatus}
                        />

                        <SettingsActionCard
                            title={"Clear History"}
                            description={"Remove recent history entries from the current demo profile."}
                            actionLabel={actionLoading ? "Working..." : "Clear history"}
                            variant={"secondary"}
                            onAction={handleClearHistory}
                            status={historyStatus}
                        >
                            <ul className="settings-page__history-list">
                                {removedEntries.length > 0 ? (
                                    removedEntries.map((entry) => (
                                        <li key={entry.spinId}>
                                            Spin #{entry.spinId} · {entry.resultLabel} · {entry.creditDelta >= 0 ? "+" : ""}
                                            {entry.creditDelta} credits
                                        </li>
                                    ))
                                ) : (
                                    <li>No cleared entries yet.</li>
                                )}
                            </ul>
                        </SettingsActionCard>

                        <SettingsActionCard
                            title={"Set Demo Balance"}
                            description={"Choose the balance that should be loaded for the next demo play session."}
                            actionLabel={actionLoading ? "Working..." : "Apply balance"}
                            onAction={handleApplyDemoBalance}
                            status={`Prepared balance: ${demoBalance || "0"} credits`}
                        >
                            <label className="settings-page__field" htmlFor="demo-balance">
                                <span>Demo credits</span>
                                <input
                                    id="demo-balance"
                                    min="0"
                                    onChange={(event) => setDemoBalanceInput(event.target.value)}
                                    step="10"
                                    type="number"
                                    value={demoBalance}
                                />
                            </label>
                        </SettingsActionCard>

                        <SettingsActionCard
                            title={"Show Game Configuration"}
                            description={"Review the most important gameplay values currently used by the slot demo."}
                            actionLabel={showConfiguration ? "Hide configuration" : "Show configuration"}
                            variant={showConfiguration ? "secondary" : "primary"}
                            onAction={() => setShowConfiguration((prev) => !prev)}
                            status={`${overview.availableConfigurationValueCount} configuration values available`}
                        />
                    </div>

                    {showConfiguration && configuration && (
                        <div className="settings-page__config-panel">
                            <SettingsConfigCard
                                title={"Game Configuration"}
                                description={"These values summarize the current slot setup exposed in the backend."}
                                items={configurationItems}
                            />
                        </div>
                    )}
                </>
            )}
        </section>
    );
};