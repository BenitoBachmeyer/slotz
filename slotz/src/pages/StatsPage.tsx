import {PageHeader} from "../components/PageHeader/PageHeader.tsx";
import {StatMetricCard} from "../components/StatMetricCard/StatMetricCard.tsx";
import {StatBreakdownCard} from "../components/StatBreakdownCard/StatBreakdownCard.tsx";
import "./StatsPage.css";

const overviewMetrics = [
    {
        label: "Total Spins",
        value: "2,480",
        hint: "+184 this week",
    },
    {
        label: "Win Rate",
        value: "31.8%",
        hint: "788 winning spins",
    },
    {
        label: "Best Payout",
        value: "50x",
        hint: "Bell x5 combo",
    },
    {
        label: "Average Return",
        value: "92.4%",
        hint: "Across last 500 spins",
    },
];

const performanceByDay = [
    {label: "Monday", value: "+240 credits"},
    {label: "Tuesday", value: "-120 credits"},
    {label: "Wednesday", value: "+380 credits"},
    {label: "Thursday", value: "+95 credits"},
    {label: "Friday", value: "+510 credits"},
];

const symbolFrequency = [
    {label: "Cherries", value: "19.2%"},
    {label: "Watermelon", value: "17.5%"},
    {label: "Strawberry", value: "16.0%"},
    {label: "Grapes", value: "14.6%"},
    {label: "Banana", value: "12.8%"},
    {label: "Lemon", value: "11.1%"},
    {label: "Bell", value: "8.8%"},
];

export const StatsPage = () => {
    return (
        <section>
            <h2>Stats</h2>
            <p>This site is still under construction.</p>
            <PageHeader
                title={"Stats"}
                subtitle={"Track your slot performance, streaks and payout trends with mock sample data."}
            />

            <div className="stats-metric-grid">
                {overviewMetrics.map((metric) => (
                    <StatMetricCard
                        key={metric.label}
                        label={metric.label}
                        value={metric.value}
                        hint={metric.hint}
                    />
                ))}
            </div>

            <div className="stats-breakdown-grid">
                <StatBreakdownCard
                    title={"Weekly Profit Trend"}
                    description={"A snapshot of your latest five sessions. Helpful for spotting your hottest days."}
                    items={performanceByDay}
                />
                <StatBreakdownCard
                    title={"Symbol Frequency"}
                    description={"How often each symbol appeared in your recent spin history."}
                    items={symbolFrequency}
                />
            </div>
        </section>
    );
};