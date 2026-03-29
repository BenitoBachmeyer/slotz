import "./BetControl.css";

interface BetControlProps {
    value: number;
    min: number;
    max: number;
    disabled?: boolean;
    onChange: (value: number) => void;
}

export default function BetControl({
                                       value,
                                       min,
                                       max,
                                       disabled = false,
                                       onChange,
                                   }: BetControlProps) {
    const decrease = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    const increase = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = Number(event.target.value);

        if (Number.isNaN(nextValue)) {
            return;
        }

        if (nextValue < min) {
            onChange(min);
            return;
        }

        if (nextValue > max) {
            onChange(max);
            return;
        }

        onChange(nextValue);
    };

    return (
        <div className="bet-control">
            <button type="button" onClick={decrease} disabled={disabled || value <= min}>
                -
            </button>

            <input
                type="number"
                value={value}
                min={min}
                max={max}
                disabled={disabled}
                onChange={handleInputChange}
            />

            <button type="button" onClick={increase} disabled={disabled || value >= max}>
                +
            </button>
        </div>
    );
}