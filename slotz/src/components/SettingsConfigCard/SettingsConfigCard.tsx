import {Card} from "../Card/Card.tsx";
import "./SettingsConfigCard.css";

type ConfigItem = {
    label: string;
    value: string;
};

type SettingsConfigCardProps = {
    title: string;
    description: string;
    items: ConfigItem[];
};

export const SettingsConfigCard = ({title, description, items}: SettingsConfigCardProps) => {
    return (
        <Card className="settings-config-card" title={title}>
            <p className="settings-config-card__description">{description}</p>
            <ul className="settings-config-card__list">
                {items.map((item) => (
                    <li className="settings-config-card__item" key={item.label}>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                    </li>
                ))}
            </ul>
        </Card>
    );
};