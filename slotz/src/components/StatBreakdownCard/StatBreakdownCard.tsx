import {Card} from "../Card/Card.tsx";
import "./StatBreakdownCard.css";

type StatBreakdownItem = {
    label: string;
    value: string;
};

type StatBreakdownCardProps = {
    title: string;
    description: string;
    items: StatBreakdownItem[];
};

export const StatBreakdownCard = ({title, description, items}: StatBreakdownCardProps) => {
    return (
        <Card className="stats-breakdown-card" title={title}>
            <p className="stats-breakdown-description">{description}</p>
            <ul className="stats-breakdown-list">
                {items.map((item) => (
                    <li className="stats-breakdown-item" key={item.label}>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                    </li>
                ))}
            </ul>
        </Card>
    );
};