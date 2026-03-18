import "./PageHeader.css"

type PageHeaderProps = {
    title: string
    subtitle?: string
};

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
    return (
        <div className="page-header">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
        </div>
    );
};