import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllTradesByGameId } from "../api/trade-api";
import type { TradeAdmin } from "../objects/allTradesAdmin";
import "../css/AllTrades.css";

export default function AllTradesAdmin() {
  const { gameId } = useParams<{ gameId: string }>();
  const gameIdNumber = Number(gameId);

  const [trades, setTrades] = useState<TradeAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTrades() {
      if (!gameIdNumber) return;

      try {
        setLoading(true);
        const result = await getAllTradesByGameId(gameIdNumber);
        setTrades(result);
      } catch (err: any) {
        setError(err.message ?? "Failed to load trades");
      } finally {
        setLoading(false);
      }
    }

    loadTrades();
  }, [gameIdNumber]);

  if (loading) return <p>Loading trades…</p>;
  if (error) return <p className="error">{error}</p>;
  if (trades.length === 0) return <p>No trades found.</p>;

  return (
    <div className="trades-page">
      <header className="trades-header">
        <h1>Trades for Game #{gameId}</h1>
      </header>

      <div className="trades-list">
        {trades.map((trade) => (
          <Link
            key={trade.tradeId}
            to={`/tradeDetails/${trade.tradeId}`}
            className="trade-card"
          >
            <div className="trade-id">
              Trade #{trade.tradeId}
            </div>

            <div className="trade-user">
              Offerer: <strong>{trade.offererName}</strong>
            </div>

            <div className="trade-user">
              Trader: <strong>{trade.traderName}</strong>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
