import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Item } from "../objects/item";
import { createItem } from "../api/item-api";
import "../css/AddItem.css";

export default function AddItem() {
    const { gameId } = useParams();
    const gameIdNumber = Number(gameId);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!name.trim()) {
            setError("Item name is required");
            return;
        }

        try {
            setLoading(true);
            const item: Item = {
                id: 0,
                gameId: gameIdNumber,
                name: name.trim(),
                description: description.trim(),
            };
            await createItem(item);
            navigate(`/AllItemsAdmin/${gameIdNumber}`);
        } catch {
            setError("Failed to add item");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="add-item-page">
            <h1 className="page-title">Add Item</h1>

            <form className="add-item-box" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                />

                <textarea
                    placeholder="Item Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Item"}
                </button>

                {error && <p className="error-text">{error}</p>}
            </form>
        </div>
    );
}
