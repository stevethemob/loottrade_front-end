import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Item } from "../objects/item";
import { getItem, editItem } from "../api/item-api";
import "../css/ItemDetails.css";
import BackButton from "../components/BackButton";

export default function EditItem() {
    const { gameId } = useParams();
    const { itemId } = useParams();
    const navigate = useNavigate();
    const itemIdNumber = Number(itemId);

    const [item, setItem] = useState<Item | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadItem() {
            try {
                const result = await getItem(itemIdNumber);
                setItem(result);
                setName(result.name);
                setDescription(result.description);
            } catch {
                setError("Failed to load item");
            } finally {
                setLoading(false);
            }
        }

        loadItem();
    }, [itemIdNumber]);

    async function handleSave() {
        if (!item) return;

        try {
            await editItem({ ...item, name, description });
            navigate(`/item/${item.id}`);
        } catch {
            alert("Failed to update item");
        }
    }

    if (loading) return <p>Loading item...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!item) return <p>Item not found</p>;

    return (
        <div className="item-details-container">
            <BackButton to={`/item/${gameId}/${itemId}`} />
            <div className="item-details-card">
                <h1>Edit Item</h1>
                <div className="item-form">
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>

                    <div className="item-actions">
                        <button className="save-btn" onClick={handleSave}>
                            Save
                        </button>
                        <button className="cancel-btn" onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
