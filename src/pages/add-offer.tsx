import React, { useEffect, useState } from "react";
import { GetInventoryByUserId } from "../api/inventory-api";
import type { Inventory } from "../objects/inventory";
import "../css/Inventory.css";
import { Link } from "react-router-dom";
import { createOffer } from "../api/offer-api";

export default function Inventory() {
    const [inventory, setInventory] = useState<Inventory>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadInventory() {
            try {
                const response = await GetInventoryByUserId(1, 1);
                setInventory(response);
            } catch (err) {
                setError("Failed to load inventory.");
            } finally {
                setLoading(false);
            }
        }

        loadInventory();
    }, []);

    async function handleItemClick(itemId: number) {
        try {
            await createOffer(itemId);
            alert("Offer created!");
        } catch (err) {
            console.error(err);
            alert("Failed to create offer");
        }
    }

    if (loading) return <p>Loading inventory</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="items-page">
            <header className="items-header">
                <h1>current items</h1>
                <span className="account-link">account</span>
            </header>

            <div className="items-grid">
                {inventory?.items.map(item => (
                    <div key={item.id} className="item-card" onClick={() => handleItemClick(item.id)}>
                        <div className="item-info">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}