import { PageHeader } from "../components/PageHeader/PageHeader.tsx";
import { Card } from "../components/Card/Card.tsx";
import "./PaytablePage.css";
import { PaytableItem } from "../components/PaytableItem/PaytableItem.tsx";
import { WinningLinesInfo } from "../components/WinningLinesInfo/WinningLinesInfo.tsx";
import { WinningRulesInfo } from "../components/WinningRulesInfo/WinningRulesInfo.tsx";
import { useEffect, useState } from "react";
import type { PaytableResponse } from "../../types/paytable.ts";
import { fetchPaytable } from "../api/paytableApi.ts";
import { getSymbolAsset } from "../constants/symbolAssets.ts";

export default function PaytablePage() {
    const [paytable, setPaytable] = useState<PaytableResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPaytable()
            .then((data) => {
                setPaytable(data);
            })
            .catch((err) => {
                setError(`Could not load Paytable: ${String(err)}`);
            })
            .finally(() => setLoading(false));
    }, []);

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
                                imageSrc={getSymbolAsset(symbol.imageKey.toUpperCase()) ?? ""}
                                payouts={symbol.payouts}
                            />
                        </Card>
                    ))}
                </div>
            )}

            <WinningRulesInfo />
            <WinningLinesInfo />
        </>
    );
}