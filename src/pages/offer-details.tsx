import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOfferDetailsByOfferId } from "../api/offer-api";
import { DeleteOfferById } from "../api/offer-api";
import type { Offer } from "../objects/offer";
import BackButton from "../components/BackButton";

export default function OfferDetails() {
    const { gameId } = useParams();
    const { offerId } = useParams<{ offerId: string }>();
    const offerIdNumber = Number(offerId);
    const navigate = useNavigate();

    const [offer, setOffer] = useState<Offer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [removing, setRemoving] = useState(false);

    useEffect(() => {
        async function loadOffer() {
            if (!offerId) return;
            setLoading(true);
            setError(null);

            try {
                const data = await getOfferDetailsByOfferId(Number(offerId));
                setOffer(data);
            } catch {
                setError("Failed to load offer details");
            } finally {
                setLoading(false);
            }
        }

        loadOffer();
    }, [offerId]);

    async function handleRemoveOffer() {
        if (!offerId) return;

        const confirmDelete = window.confirm(
            "Are you sure you want to remove this offer?"
        );
        if (!confirmDelete) return;

        setRemoving(true);

        try {
            DeleteOfferById(offerIdNumber);

            alert("Offer deleted successfully!");
            navigate(-1);
        } catch (err) {
            alert("Failed to remove offer");
        } finally {
            setRemoving(false);
        }
    }

    if (loading) return <p>Loading offer details…</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!offer) return <p>No offer found.</p>;

    return (
        <div className="offer-details-page" style={{ padding: "24px" }}>
            <BackButton to={`/ownOffers/${gameId}`} />
            <h1>{offer.itemName}</h1>
            <p><strong>Description:</strong> {offer.itemDescription}</p>
            <button
                onClick={handleRemoveOffer}
                disabled={removing}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                }}
            >
                {removing ? "Removing…" : "Remove Offer"}
            </button>
        </div>
    );
}
