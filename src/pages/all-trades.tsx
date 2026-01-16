import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GetAllOffersByGameId } from "../api/trade-api";
import type { allTrades } from "../objects/allTrades";
import "../css/AllTrades.css";
import BackButton from "../components/BackButton";

export default function AllTrades() {
    const { gameId } = useParams<{ gameId: string }>();

    const [trades, setTrades] = useState<allTrades | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadTrades() {
            if (!gameId) return;

            setLoading(true);
            setError(null);

            try {
                const result = await GetAllOffersByGameId(Number(gameId));
                setTrades(result);
            } catch {
                setError("Failed to load trades");
            } finally {
                setLoading(false);
            }
        }

        loadTrades();
    }, [gameId]);

    if (loading) return <p>Loading trades…</p>;
    if (error) return <p className="error">{error}</p>;
    if (!trades || trades.tradeIds.length === 0)
        return <p>No trades found.</p>;

    return (
        <div className="trades-page">
            <BackButton to={`/gameOptions/${gameId}`} />
            <header className="trades-header">
                <h1>Trades</h1>
                <div className="account">account</div>
            </header>

            <div className="trades-list">
                {trades.tradeIds.map((tradeId, index) => (
                    <Link
                        key={tradeId}
                        to={`/tradeDetails/${gameId}/${tradeId}`}
                        className="trade-card"
                    >
                        <div className="trade-id">
                            Trade #{tradeId}
                        </div>
                        <div className="trade-user">
                            Offered by: <strong>{trades.traderUsernames[index]}</strong>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
