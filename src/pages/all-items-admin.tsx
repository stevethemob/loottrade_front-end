import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllItems } from "../api/item-api";
import type { Item } from "../objects/item";
import "../css/AllItems.css";

export default function AllItemsAdmin() {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const gameIdNumber = Number(gameId);

    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function showItems() {
            try {
                const result = await getAllItems(gameIdNumber);
                setItems(result);
            } catch {
                setError("Failed to show items");
            } finally {
                setLoading(false);
            }
        }

        showItems();
    }, [gameIdNumber]);

    if (loading) return <p>Loading items</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>All items</h1>
            <div className="item-grid-container">
                <div className="item-grid">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="item-card clickable"
                            onClick={() => navigate(`/item/${gameId}/${item.id}`)}
                        >
                            <span className="item-name">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
