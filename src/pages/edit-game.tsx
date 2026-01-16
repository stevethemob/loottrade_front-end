import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGameById, editGame } from "../api/game-api";
import "../css/AddGame.css";
import BackButton from "../components/BackButton";

export default function EditGame() {
    const { gameId } = useParams();
    const gameIdNumber = Number(gameId);

    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchGame() {
            try {
                setLoading(true);
                const game = await getGameById(gameIdNumber);
                setTitle(game.title);
            } catch {
                setError("Failed to load game");
            } finally {
                setLoading(false);
            }
        }

        fetchGame();
    }, [gameIdNumber]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!title.trim()) {
            setError("Game title is required");
            return;
        }

        try {
            setSaving(true);
            await editGame(gameIdNumber, title.trim());
            navigate("/games");
        } catch {
            setError("Failed to save game");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <p>Loading game…</p>;

    return (
        <div className="add-game-page">
            <BackButton to={`/gameOptionsAdmin/${gameId}`} />
            <h1 className="page-title">Edit Game</h1>

            <form className="add-game-box" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Game title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={saving}
                />

                <button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                </button>

                {error && <p className="error-text">{error}</p>}
            </form>
        </div>
    );
}
