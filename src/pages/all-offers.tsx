import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOffersByGameId } from "../api/offer-api";
import type { Offer } from "../objects/offer";
import OfferCard from "../components/OfferCard";
import "../css/AllOffers.css";
import { Link } from "react-router-dom";

export default function AllOffers() {
    const { gameId } = useParams<{ gameId: string }>();

    const [offers, setOffers] = useState<Offer[]>([]);
    const [gameTitle] = useState<string>("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function showOffers(search: string) {
        if (!gameId) return;

        setLoading(true);
        setError(null);

        try {
            const result = await getOffersByGameId(Number(gameId), search);
            setOffers(result);
        } catch {
            setError("Failed to load offers");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        showOffers("");
    }, [gameId]);

    if (loading) return <p>Loading offers…</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="offers-page">
            <header className="offers-header">
                <h1 className="game-title">{gameTitle}</h1>
                <div className="account">account</div>
            </header>

            <div className="search-wrapper">
                <input className="search" placeholder="search for an item" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { showOffers(search) } }} />
            </div>
            <Link
                key={gameId}
                to={`/addOffer/${gameId}`}
                className="add-offer-btn"
            >
                Add Offer
            </Link>


            {offers.length === 0 ? (
                <p>No offers found.</p>
            ) : (
                <div className="offers-list">
                    {offers.map((offer) => (
                        <Link to={`/tradeitems/${gameId}/${offer.id}`} className="offer-card-link">
                            <OfferCard key={offer.id} offer={offer} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
