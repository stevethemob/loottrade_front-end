import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetInventoryByUserId } from "../api/inventory-api";
import { addOffer } from "../api/trade-api";
import type { Inventory } from "../objects/inventory";
import "../css/TradeInventory.css";
import BackButton from "../components/BackButton";

export default function TradeInventory() {
    const { gameId } = useParams<{ gameId: string }>();
    const { offerId } = useParams<{ offerId: string }>();

    const [inventory, setInventory] = useState<Inventory>();
    const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadInventory() {
            try {
                const response = await GetInventoryByUserId(1);
                setInventory(response);
            } catch {
                setError("Failed to load inventory.");
            } finally {
                setLoading(false);
            }
        }

        loadInventory();
    }, []);

    function toggleItem(itemId: number) {
        setSelectedItemIds(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    }

    async function submitTradeItems() {
        if (!offerId) return;

        try {
            await addOffer(Number(offerId), selectedItemIds);
            alert("Items added to trade!");
            setSelectedItemIds([]); // optional: clear selection after success
        } catch (err: any) {
            alert("Failed to add items: " + err.message);
        }
    }

    if (loading) return <p>Loading inventory...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="items-page">
            <BackButton to={`/offers/${gameId}`} />
            <header className="items-header">
                <h1>Select items for trade</h1>
                <span className="account-link">account</span>
            </header>

            <div className="items-grid">
                {inventory?.items.map(item => {
                    const selected = selectedItemIds.includes(item.id);

                    return (
                        <div
                            key={item.id}
                            className={`item-card ${selected ? "selected" : ""}`}
                        >
                            <div className="item-info">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                            </div>

                            <button
                                className="select-btn"
                                onClick={() => toggleItem(item.id)}
                            >
                                {selected ? "Remove" : "Add"}
                            </button>
                        </div>
                    );
                })}
            </div>

            <button
                className="submit-btn"
                disabled={selectedItemIds.length === 0}
                onClick={submitTradeItems}
            >
                Add {selectedItemIds.length} items to trade
            </button>
        </div>
    );
}
