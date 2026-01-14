import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addGame } from "../api/game-api";
import "../css/AddGame.css";

export default function AddGame() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Game title is required");
      return;
    }

    try {
      setLoading(true);
      await addGame(title.trim());
      navigate("/games");
    } catch {
      setError("Failed to add game");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="add-game-page">
      <h1 className="page-title">Add Game</h1>

      <form className="add-game-box" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Game title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Game"}
        </button>

        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
}
