import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllItems } from "../api/item-api";
import type { Item } from "../objects/item";
import { AddItemToInventoryByUserIdAndItemId } from "../api/inventory-api";
import "../css/AllItems.css";


export default function items() {
    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function showItems() {
            try {
                const result = await getAllItems(1);
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

    async function AddItem(userId: number, itemId: number) {
        try {
            await AddItemToInventoryByUserIdAndItemId(userId, itemId);
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
                            <button className="item-add" onClick={() => AddItem(1, item.id)}>add</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}