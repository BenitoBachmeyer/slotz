import {Card} from "../Card/Card.tsx";
import {Button} from "../Button/Button.tsx";
import * as React from "react";
import "./SettingsActionCard.css";

type SettingsActionCardProps = {
    title: string;
    description: string;
    actionLabel: string;
    onAction?: () => void;
    variant?: "primary" | "secondary";
    status?: string;
    children?: React.ReactNode;
};

export const SettingsActionCard = ({
                                       title,
                                       description,
                                       actionLabel,
                                       onAction,
                                       variant = "primary",
                                       status,
                                       children,
                                   }: SettingsActionCardProps) => {
    return (
        <Card className="settings-action-card">
            <div className="settings-action-card__content">
                <div>
                    <h2 className="settings-action-card__title">{title}</h2>
                    <p className="settings-action-card__description">{description}</p>
                </div>

                {children && <div className="settings-action-card__body">{children}</div>}

                <div className="settings-action-card__footer">
                    <Button onClick={onAction} variant={variant}>{actionLabel}</Button>
                    {status && <p className="settings-action-card__status">{status}</p>}
                </div>
            </div>
        </Card>
    );
};