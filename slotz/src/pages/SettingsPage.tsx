import { useEffect, useState } from "react";
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
} from "../../types/settings";
import "./SettingsPage.css";

const overviewItems = [
    {
        eyebrow: "Overview",
        title: "Reset Statistics",
        description: "Set total spins back to a clean demo baseline.",
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
        description: "Reveal the game setup, including reel count, paylines and bet range.",
    },
];

export const SettingsPage = () => {
    const [overview, setOverview] = useState<SettingsOverviewResponse | null>(null);
    const [configuration, setConfiguration] = useState<SlotConfigurationResponse | null>(null);
    const [demoBalance, setDemoBalanceInput] = useState("1000");
    const [showConfiguration, setShowConfiguration] = useState(false);

    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const loadData = async () => {
        const [overviewData, configurationData] = await Promise.all([
            fetchSettingsOverview(),
            fetchSettingsConfiguration(),
        ]);

        setOverview(overviewData);
        setConfiguration(configurationData);
        setDemoBalanceInput(String(overviewData.currentDemoBalance));
    };

    useEffect(() => {
        loadData()
            .catch((err) => {
                console.error("Settings fetch failed:", err);
                setError(`Could not load settings: ${String(err)}`);
            })
            .finally(() => setLoading(false));
    }, []);

    const statsStatus = overview
        ? `Tracked spins: ${overview.totalSpins}`
        : "";

    const historyStatus = overview
        ? `${overview.historySize} recent entries available`
        : "";

    const balanceStatus = `Prepared balance: ${demoBalance || "0"} credits`;

    const configurationStatus = overview
        ? `Bet range: ${overview.minBet} - ${overview.maxBet} credits`
        : "";

    const handleResetStatistics = async () => {
        try {
            setActionLoading(true);
            setError(null);
            setSuccessMessage(null);

            await resetStatistics();
            await loadData();
            setSuccessMessage("Statistics were reset successfully.");
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
            setSuccessMessage(null);

            const availableEntries = overview?.historySize ?? 0;
            if (availableEntries < 1) {
                setError("There are no history entries to clear.");
                return;
            }

            await clearHistory();
            await loadData();
            setSuccessMessage("History was cleared successfully.");
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
            setSuccessMessage(null);

            const parsed = Number.parseInt(demoBalance, 10);
            const normalized = Number.isNaN(parsed) || parsed < 0 ? 0 : parsed;

            const response = await setDemoBalance({ balance: normalized });

            setDemoBalanceInput(String(response.balance));
            await loadData();
            setSuccessMessage(response.message);
        } catch (err) {
            console.error(err);
            setError(`Action failed: ${String(err)}`);
        } finally {
            setActionLoading(false);
        }
    };

    const configurationItems = configuration
        ? [
            { label: "Reels", value: String(configuration.reels) },
            { label: "Rows", value: String(configuration.rows) },
            { label: "Active Paylines", value: String(configuration.paylines) },
            { label: "Minimum Bet", value: `${configuration.minBet} credits` },
            { label: "Maximum Bet", value: `${configuration.maxBet} credits` },
            { label: "Default Bet", value: `${configuration.defaultBet} credits` },
        ]
        : [];

    return (
        <section className="settings-page">
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

            {error && (
                <div className="settings-page__message settings-page__message--error">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="settings-page__message settings-page__message--success">
                    {successMessage}
                </div>
            )}

            {!loading && !error && overview && (
                <>
                    <div className="settings-page__toolbar">
                        <div className="settings-page__balance-chip">
                            Current demo balance: {overview.currentDemoBalance} credits
                        </div>

                        <div className="settings-page__summary">
                            <div className="settings-page__summary-item">
                                <span>Spins</span>
                                <strong>{overview.totalSpins}</strong>
                            </div>
                            <div className="settings-page__summary-item">
                                <span>History</span>
                                <strong>{overview.historySize}</strong>
                            </div>
                            <div className="settings-page__summary-item">
                                <span>Default Bet</span>
                                <strong>{overview.defaultBet}</strong>
                            </div>
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
                        />

                        <SettingsActionCard
                            title={"Set Demo Balance"}
                            description={"Choose the balance that should be loaded for the next demo play session."}
                            actionLabel={actionLoading ? "Working..." : "Apply balance"}
                            onAction={handleApplyDemoBalance}
                            status={balanceStatus}
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
                            status={configurationStatus}
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