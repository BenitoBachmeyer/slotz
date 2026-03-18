import {Card} from "../Card/Card.tsx";
import "./StatMetricCard.css";

type StatMetricCardProps = {
    label: string;
    value: string;
    hint?: string;
};

export const StatMetricCard = ({label, value, hint}: StatMetricCardProps) => {
    return (
        <Card className="stats-metric-card">
            <p className="stats-metric-label">{label}</p>
            <p className="stats-metric-value">{value}</p>
            {hint && <p className="stats-metric-hint">{hint}</p>}
        </Card>
    );
};