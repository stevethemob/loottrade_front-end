import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetTradeByTradeId, AcceptTradeByTradeId } from "../api/trade-api";
import type { trade } from "../objects/trade";
import "../css/AllTrades.css";
import { isAdmin } from "../logic/auth";
import BackButton from "../components/BackButton";

export default function TradeDetail() {
    const { gameId } = useParams<{ gameId: string }>();
    const { tradeId } = useParams<{ tradeId: string }>();

    const [tradeData, setTradeData] = useState<trade | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [accepting, setAccepting] = useState<boolean>(false);
    const [acceptError, setAcceptError] = useState<string | null>(null);
    const [accepted, setAccepted] = useState<boolean>(false);

    const admin = isAdmin();

    useEffect(() => {
        async function loadTrade() {
            if (!tradeId) return;

            setLoading(true);
            setError(null);

            try {
                const result = await GetTradeByTradeId(Number(tradeId));
                setTradeData(result);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Failed to load trade");
                }
            } finally {
                setLoading(false);
            }
        }

        loadTrade();
    }, [tradeId]);

    async function handleAcceptTrade(): Promise<void> {
        if (!tradeData) return;

        setAccepting(true);
        setAcceptError(null);

        try {
            await AcceptTradeByTradeId(tradeData.id);
            setAccepted(true);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setAcceptError(err.message);
            } else {
                setAcceptError("Failed to accept trade");
            }
        } finally {
            setAccepting(false);
        }
    }

    if (loading) return <p>Loading trade…</p>;
    if (error) return <p className="error">{error}</p>;
    if (!tradeData) return <p>Trade not found.</p>;

    return (
        <div className="trades-page">
            {admin &&
                <BackButton to={`/allTradesAdmin/${gameId}`} />
            }

            {!admin &&
                <BackButton to={`/allTrades/${gameId}`} />
            }
            <header className="trades-header">
                <h1>Trade #{tradeData.id}</h1>
                <div className="account">{tradeData.traderUser}</div>
            </header>

            {acceptError && <p className="error">{acceptError}</p>}

            {!admin &&
                <button
                    className="accept-trade-btn"
                    onClick={handleAcceptTrade}
                    disabled={accepting || accepted}
                >
                    {accepted
                        ? "Trade Accepted"
                        : accepting
                            ? "Accepting..."
                            : "Accept Trade"}
                </button>
            }

            <div className="trade-card offered-item">
                <h2>Item Offered</h2>
                <p>
                    <strong>{tradeData.itemOffer.name}</strong>
                </p>
                <p>{tradeData.itemOffer.description}</p>
            </div>

            <div className="trade-card requested-items">
                <h2>Trade Offers</h2>
                {tradeData.tradeOffers.length > 0 ? (
                    tradeData.tradeOffers.map((item) => (
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

    );
}
