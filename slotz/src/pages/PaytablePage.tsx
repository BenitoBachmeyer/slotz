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
import {WinningLinesInfo} from "../components/WinningLinesInfo/WinningLinesInfo.tsx";
import {WinningRulesInfo} from "../components/WinningRulesInfo/WinningRulesInfo.tsx";
import {useEffect, useState} from "react";
import type {PaytableResponse, SymbolKey} from "../../types/paytable.ts";
import {fetchPaytable} from "../api/paytableApi.ts";

export default function PaytablePage() {
    const [paytable, setPaytable] = useState<PaytableResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPaytable()
            .then((data) => {
                console.log("Paytable data: ", data);
                setPaytable(data);
            })
            .catch((err) => {
                console.error("Paytable fetch failed: ", err);
                setError(`Could not load Paytable: ${String(err)}`);
            })
            .finally(() => setLoading(false))
    }, []);

    const symbolImages: Record<SymbolKey, string> = {
        lemon: lemonIcon,
        banana: bananaIcon,
        grape: grapesIcon,
        strawberry: strawberryIcon,
        watermelon: watermelonIcon,
        cherry: cherriesIcon,
        bell: bellIcon,
    };

    return (
        <>
            <PageHeader
                title={"Pay Table"}
                subtitle={"See what Icon generates which prices,"}
            />

            <h2 id={"symbol-payout-header"}>Symbol Payouts</h2>

            {loading && <p>Loading paytable...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && (
                <div className={"paytable-card-grid"}>
                    {paytable.map((symbol) => (
                        <Card className={"paytable-card"} key={symbol.id}>
                            <PaytableItem
                                imageAlt={`${symbol.name} icon`}
                                imageSrc={symbolImages[symbol.imageKey]}
                                payouts={symbol.payouts}
                            />
                        </Card>
                    ))}
                </div>
            )}

            <WinningRulesInfo/>
            <WinningLinesInfo/>
        </>
    )
}