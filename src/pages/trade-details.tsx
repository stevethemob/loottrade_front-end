import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GetTradeByTradeId } from "../api/trade-api";
import type { trade } from "../objects/trade";
import "../css/AllTrades.css";

export default function TradeDetail() {
    const { tradeId } = useParams<{ tradeId: string }>();
    const [tradeData, setTradeData] = useState<trade | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadTrade() {
            if (!tradeId) return;

            setLoading(true);
            setError(null);

            try {
                const result = await GetTradeByTradeId(Number(tradeId));
                setTradeData(result);
            } catch (err: any) {
                setError(err.message || "Failed to load trade");
            } finally {
                setLoading(false);
            }
        }

        loadTrade();
    }, [tradeId]);

    if (loading) return <p>Loading trade…</p>;
    if (error) return <p className="error">{error}</p>;
    if (!tradeData) return <p>Trade not found.</p>;

    return (
        <div className="trades-page">
            <header className="trades-header">
                <h1>Trade #{tradeData.id}</h1>
                <div className="account">{tradeData.traderUser}</div>
            </header>

            <div className="trades-list">
                <div className="trade-card">
                    <h2>Item Offered</h2>
                    <p><strong>{tradeData.itemOffer.name}</strong></p>
                    <p>{tradeData.itemOffer.description}</p>
                </div>

                <div className="trade-card">
                    <h2>Trade Offers</h2>
                    {tradeData.tradeOffers.length > 0 ? (
                        tradeData.tradeOffers.map(item => (
                            <div key={item.id} className="trade-item">
                                <strong>{item.name}</strong>
                                <p>{item.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No items offered in return.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
