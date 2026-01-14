import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllGames } from "../api/game-api";
import { type Game } from "../objects/game";
import GameCard from "../components/GameCard"
import "../css/GamesPage.css"
import { isAdmin } from "../logic/auth";

export function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const admin = isAdmin();

  useEffect(() => {
    async function showGames() {
      try {
        const result = await getAllGames();
        setGames(result);
      } catch (error) {
        setError("Failed to show games");
      } finally {
        setLoading(false);
      }
    }

    showGames();
  },
    []);

  if (loading) return <p>Loading games…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="games-page">
      <h1 className="page-title">Games</h1>
      {games.length === 0 ? (
        <p>No games found.</p>
      ) : (
        <div className="games-grid">
          {games.map((game) => (
            <Link
              key={game.id}
              to={`/gameOptions/${game.id}`}>

              <GameCard key={game.id} title={game.title} />
            </Link>
          ))}
        </div>
      )
      }
      {admin && (
        <Link to="/AddGame" className="add-game-button">
          + Add Game
        </Link>
      )}
    </div>
  )
}
