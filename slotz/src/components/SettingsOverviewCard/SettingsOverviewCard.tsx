import {Card} from "../Card/Card.tsx";
import "./SettingsOverviewCard.css";

type SettingsOverviewCardProps = {
    eyebrow: string;
    title: string;
    description: string;
};

export const SettingsOverviewCard = ({eyebrow, title, description}: SettingsOverviewCardProps) => {
    return (
        <Card className="settings-overview-card">
            <p className="settings-overview-card__eyebrow">{eyebrow}</p>
            <h2 className="settings-overview-card__title">{title}</h2>
            <p className="settings-overview-card__description">{description}</p>
        </Card>
    );
};