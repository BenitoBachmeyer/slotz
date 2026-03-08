import * as React from "react";
import "./Button.css";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
}

export const Button = ({
    children,
    onClick,
    variant = "primary",
    disabled = false,
}: ButtonProps) => {
    return (
        <button
            className={`btn btn-${variant}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};