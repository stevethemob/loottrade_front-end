import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOffersByGameIdAndUser } from "../api/offer-api";
import type { Offer } from "../objects/offer";
import OfferCard from "../components/OfferCard";
import "../css/AllOffers.css";

export default function UserOffers() {
    const { gameId } = useParams<{ gameId: string }>();

    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadUserOffers() {
        if (!gameId) return;

        setLoading(true);
        setError(null);

        try {
            const result = await getOffersByGameIdAndUser(Number(gameId));
            setOffers(result);
        } catch {
            setError("Failed to load offers");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUserOffers();
    }, [gameId]);

    if (loading) return <p>Loading user offers…</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="offers-page">
            <header className="offers-header">
                <h1 className="game-title">Your Offers</h1>
                <div className="account">account</div>
            </header>

            {offers.length === 0 ? (
                <p>No offers found.</p>
            ) : (
                <div className="offers-list">
                    {offers.map((offer) => (
                        <Link
                            to={`/offerDetails/${offer.id}`}
                            className="offer-card-link"
                            key={offer.id}
                        >
                            <OfferCard offer={offer} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
