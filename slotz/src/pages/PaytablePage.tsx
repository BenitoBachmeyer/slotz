import {PageHeader} from "../components/PageHeader/PageHeader.tsx";
import {Card} from "../components/Card/Card.tsx";
import grapesIcon from "../assets/grapes.svg"
import bananaIcon from "../assets/banana.svg"
import lemonIcon from "../assets/lemon.svg"
import strawberryIcon from "../assets/strawberry.svg"
import watermelonIcon from "../assets/watermelon.svg"
import cherriesIcon from "../assets/cherries.svg"
import bellIcon from "../assets/bell.svg"
import "./PaytablePage.css"
import {PaytableItem} from "../components/PaytableItem/PaytableItem.tsx";

export const PaytablePage = () => {
    return (
        <section>
            <PageHeader
                title={"Pay Table"}
                subtitle={"See what Icon generates which prices,"}
            />

            <div className={"paytable-card-grid"}>
                <Card className={"paytable-card"}>
                    <PaytableItem
                        imageAlt={"lemon icon"}
                        imageSrc={lemonIcon}
                        payouts={[
                            {matchCount: 3, multiplier: 3},
                            {matchCount: 4, multiplier: 6},
                            {matchCount: 5, multiplier: 12},
                        ]}
                    />
                </Card>
                <Card className={"paytable-card"}>
                    <PaytableItem
                        imageAlt={"banana icon"}
                        imageSrc={bananaIcon}
                        payouts={[
                            {matchCount: 3, multiplier: 3},
                            {matchCount: 4, multiplier: 6},
                            {matchCount: 5, multiplier: 12},
                        ]}
                    />
                </Card>
                <Card className={"paytable-card"}>
                    <PaytableItem
                        imageAlt={"grape icon"}
                        imageSrc={grapesIcon}
                        payouts={[
                            {matchCount: 3, multiplier: 4},
                            {matchCount: 4, multiplier: 8},
                            {matchCount: 5, multiplier: 16},
                        ]}
                    />
                </Card>
                <Card className={"paytable-card"}>
                    <PaytableItem
                        imageAlt={"strawberry icon"}
                        imageSrc={strawberryIcon}
                        payouts={[
                            {matchCount: 3, multiplier: 5},
                            {matchCount: 4, multiplier: 10},
                            {matchCount: 5, multiplier: 20},
                        ]}
                    />
                </Card>
                <Card className={"paytable-card"}>
                    <PaytableItem
                        imageAlt={"watermelon icon"}
                        imageSrc={watermelonIcon}
                        payouts={[
                            {matchCount: 3, multiplier: 6},
                            {matchCount: 4, multiplier: 12},
                            {matchCount: 5, multiplier: 24},
                        ]}
                    />
                </Card>
                <Card className={"paytable-card"}>
                    <PaytableItem
                        imageAlt={"Cherries icon"}
                        imageSrc={cherriesIcon}
                        payouts={[
                            {matchCount: 3, multiplier: 8},
                            {matchCount: 4, multiplier: 16},
                            {matchCount: 5, multiplier: 32},
                        ]}
                    />
                </Card>
                <Card className={"paytable-card"}>
                    <PaytableItem
                        imageAlt={"bell icon"}
                        imageSrc={bellIcon}
                        payouts={[
                            {matchCount: 3, multiplier: 12},
                            {matchCount: 4, multiplier: 25},
                            {matchCount: 5, multiplier: 50},
                        ]}
                    />
                </Card>
            </div>
        </section>
    )
}