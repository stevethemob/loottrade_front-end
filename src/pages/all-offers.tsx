import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOffersByGameId } from "../api/offer-api";
import type { Offer } from "../objects/offer";
import OfferCard from "../components/OfferCard";
import "../css/AllOffers.css";
import { Link } from "react-router-dom";

export default function AllOffers() {
    const { gameId } = useParams<{ gameId: string }>();

    const [offers, setOffers] = useState<Offer[]>([]);
    const [gameTitle, setGameTitle] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function showOffers() {
            if (!gameId) return;

            try {
                const result = await getOffersByGameId(Number(gameId));
                setOffers(result);
            } catch {
                setError("Failed to load offers");
            } finally {
                setLoading(false);
            }
        }

        showOffers();
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
                <input className="search" placeholder="search for an item" />
            </div>
            <div className="btn">
                <Link className="btn-link" key={gameId} to={`/addOffer/${gameId}`}>
                    add Offer
                </Link>
            </div>


            {offers.length === 0 ? (
                <p>No offers found.</p>
            ) : (
                <div className="offers-list">
                    {offers.map((offer) => (
                        <OfferCard key={offer.id} offer={offer} />
                    ))}
                </div>
            )}
        </div>
    );
}
