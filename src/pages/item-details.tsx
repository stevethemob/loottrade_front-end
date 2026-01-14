import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Item } from "../objects/item";
import { getItem } from "../api/item-api";
import "../css/ItemDetails.css";

export default function ItemDetails() {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const itemIdNumber = Number(itemId);

    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadItem() {
            try {
                const result = await getItem(itemIdNumber);
                setItem(result);
            } catch {
                setError("Failed to load item");
            } finally {
                setLoading(false);
            }
        }

        loadItem();
    }, [itemIdNumber]);

    if (loading) return <p>Loading item...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!item) return <p>Item not found</p>;

    return (
        <div className="item-details-container">
            <div className="item-details-card">
                <h1>{item.name}</h1>
                <p className="item-description">{item.description}</p>

                <div className="item-actions">
                    <button
                        className="edit-btn"
                        onClick={() => navigate(`/editItem/${item.id}`)}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}
