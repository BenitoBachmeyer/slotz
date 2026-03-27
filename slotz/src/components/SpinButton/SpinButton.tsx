import "./SpinButton.css";

interface SpinButtonProps {
    disabled?: boolean;
    loading?: boolean;
    onClick: () => void;
}

export default function SpinButton({
                                       disabled = false,
                                       loading = false,
                                       onClick,
                                   }: SpinButtonProps) {
    return (
        <button
            type="button"
            className="spin-button"
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? "Spinning..." : "Spin"}
        </button>
    );
}