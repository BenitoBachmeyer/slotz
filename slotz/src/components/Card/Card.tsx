import * as React from "react";
import "./Card.css";

type CardProps = {
    children: React.ReactNode;
    className?: string;
    title?: string;
};

export const Card = ({ children, className, title = ""}: CardProps) => {
    return (
        <div className={`card ${className}`}>
            {title && <h2 className="card-title">{title}</h2>}
            {children}
        </div>
    );
};

