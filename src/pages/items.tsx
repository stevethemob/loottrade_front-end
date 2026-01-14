import { useEffect, useState } from "react";
import { getAllItems } from "../api/item-api";
import type { Item } from "../objects/item";
import { AddItemToInventoryByUserIdAndItemId } from "../api/inventory-api";
import { useParams } from "react-router-dom";
import "../css/AllItems.css";


export default function items() {
    const { gameId } = useParams();
    const gameIdNumber = Number(gameId);

    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function showItems() {
            try {
                const result = await getAllItems(gameIdNumber);
                setItems(result);
            } catch (error) {
                setError("Failed to show games");
            } finally {
                setLoading(false);
            }
        }

        showItems();
    },
        []);

    async function AddItem(itemId: number) {
        try {
            await AddItemToInventoryByUserIdAndItemId(itemId);
            console.log(`Added item ${itemId}`);
        } catch (err) {
            console.error("Failed to add item", err);
        }
    }

    if (loading) return <p>Loading items</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>All items</h1>
            <div className="item-grid-container">
                <div className="item-grid">
                    {items.map((item) => (
                        <div key={item.id} className="item-card">
                            <span className="item-name">{item.name}</span>
                            <button className="item-add" onClick={() => AddItem(item.id)}>add</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}