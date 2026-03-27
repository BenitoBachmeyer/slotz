import "./PaytableItem.css"

type PaytableItemProps = {
    imageAlt: string,
    imageSrc: string,
    payouts: {
        matchCount: number,
        payout: number,
    }[];
};

export const PaytableItem = ({imageAlt, imageSrc, payouts}: PaytableItemProps) => {
    return (
        <div className={"paytable-item"}>
            <div className={"paytable-image-box"}>
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className={"icon-paytable"}
                />
            </div>

            <div className={"paytable-values"}>
                {payouts.map((payout) => (
                    <div className={"paytable-row"} key={payout.matchCount}>
                        <span>{payout.matchCount} similar</span>
                        <span>{payout.payout}x</span>
                    </div>
                ))}
            </div>
        </div>
    );
};