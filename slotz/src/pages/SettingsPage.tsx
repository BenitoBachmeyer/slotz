import {useMemo, useState} from "react";
import {PageHeader} from "../components/PageHeader/PageHeader.tsx";
import {SettingsActionCard} from "../components/SettingsActionCard/SettingsActionCard.tsx";
import {SettingsConfigCard} from "../components/SettingsConfigCard/SettingsConfigCard.tsx";
import {SettingsOverviewCard} from "../components/SettingsOverviewCard/SettingsOverviewCard.tsx";
import "./SettingsPage.css";

const initialStats = [
    {label: "Total Spins", value: "2,480"},
    {label: "Win Rate", value: "31.8%"},
    {label: "Best Payout", value: "50x"},
];

const initialHistory = [
    "Spin #2480 · Bell x5 · +500 credits",
    "Spin #2479 · Cherries x4 · +160 credits",
    "Spin #2478 · No win · -20 credits",
    "Spin #2477 · Watermelon x3 · +60 credits",
];

const overviewItems = [
    {
        eyebrow: "Overview",
        title: "Reset Statistics",
        description: "Set total spins, win rate and payout highlights back to a clean demo baseline.",
    },
    {
        eyebrow: "Overview",
        title: "Clear History",
        description: "Remove the visible spin history so you can start a fresh demo session without clutter.",
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

const gameConfiguration = [
    {label: "Reels", value: "5"},
    {label: "Rows", value: "4"},
    {label: "Active Paylines", value: "6"},
    {label: "Default Demo Balance", value: "1,000 credits"},
    {label: "Minimum Bet", value: "10 credits"},
    {label: "Maximum Bet", value: "250 credits"},
    {label: "Top Symbol Payout", value: "Bell · 50x on 5 matches"},
];

export const SettingsPage = () => {
    const [stats, setStats] = useState(initialStats);
    const [history, setHistory] = useState(initialHistory);
    const [demoBalance, setDemoBalance] = useState("1000");
    const [appliedBalance, setAppliedBalance] = useState("1000");
    const [showConfiguration, setShowConfiguration] = useState(false);
    const [lastAction, setLastAction] = useState("No changes applied yet.");

    const statsStatus = useMemo(
        () => stats.map((entry) => `${entry.label}: ${entry.value}`).join(" · "),
        [stats],
    );

    const historyStatus = history.length > 0
        ? `${history.length} recent entries available`
        : "History is currently empty";

    const resetStatistics = () => {
        setStats([
            {label: "Total Spins", value: "0"},
            {label: "Win Rate", value: "0.0%"},
            {label: "Best Payout", value: "0x"},
        ]);
        setLastAction("Statistics were reset to demo defaults.");
    };

    const clearHistory = () => {
        setHistory([]);
        setLastAction("History entries were cleared.");
    };

    const applyDemoBalance = () => {
        const normalizedBalance = Number.parseInt(demoBalance, 10);
        const nextBalance = Number.isNaN(normalizedBalance) || normalizedBalance < 0
            ? 0
            : normalizedBalance;

        setAppliedBalance(nextBalance.toString());
        setDemoBalance(nextBalance.toString());
        setLastAction(`Demo balance updated to ${nextBalance} credits.`);
    };

    const toggleConfiguration = () => {
        const nextShowConfiguration = !showConfiguration;
        setShowConfiguration(nextShowConfiguration);
        setLastAction(nextShowConfiguration ? "Game configuration revealed." : "Game configuration hidden.");
    };

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

            <div className="settings-page__toolbar">
                <p className="settings-page__last-action">Last action: {lastAction}</p>
                <div className="settings-page__balance-chip">Active demo balance: {appliedBalance} credits</div>
            </div>

            <div className="settings-page__grid">
                <SettingsActionCard
                    title={"Reset Statistics"}
                    description={"Restore your slot metrics to a clean demo baseline before starting a new session."}
                    actionLabel={"Reset stats"}
                    onAction={resetStatistics}
                    status={statsStatus}
                />

                <SettingsActionCard
                    title={"Clear History"}
                    description={"Remove the latest spin history entries from the current demo profile."}
                    actionLabel={"Clear history"}
                    variant={"secondary"}
                    onAction={clearHistory}
                    status={historyStatus}
                >
                    <ul className="settings-page__history-list">
                        {history.length > 0 ? history.map((entry) => (
                            <li key={entry}>{entry}</li>
                        )) : <li>No recorded spins in history.</li>}
                    </ul>
                </SettingsActionCard>

                <SettingsActionCard
                    title={"Set Demo Balance"}
                    description={"Choose the balance that should be loaded for the next demo play session."}
                    actionLabel={"Apply balance"}
                    onAction={applyDemoBalance}
                    status={`Prepared balance: ${demoBalance || "0"} credits`}
                >
                    <label className="settings-page__field" htmlFor="demo-balance">
                        <span>Demo credits</span>
                        <input
                            id="demo-balance"
                            min="0"
                            onChange={(event) => setDemoBalance(event.target.value)}
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
                    onAction={toggleConfiguration}
                    status={`${gameConfiguration.length} configuration values available`}
                />
            </div>

            {showConfiguration && (
                <div className="settings-page__config-panel">
                    <SettingsConfigCard
                        title={"Game Configuration"}
                        description={"These values summarize the current slot setup exposed in the demo interface."}
                        items={gameConfiguration}
                    />
                </div>
            )}
        </section>
    );
};