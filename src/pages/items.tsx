import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllItems } from "../api/item-api";
import type { Item } from "../objects/item";
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

    if (loading) return <p>Loading items</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="item-grid-container">
            <div className="item-grid">
                {items.map((item) => (
                    <div key={item.id} className="item-card">
                        <span className="item-name">{item.name}</span>
                        <button className="item-add">add</button>
                    </div>
                ))}
            </div>
        </div>
    );
}