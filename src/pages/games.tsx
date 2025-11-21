import React, { useEffect, useState } from "react";
import { getAllGames } from "../api/game-api";
import { type Game } from "../objects/game";

export function GamesPage() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function showGames() {
            try {
                const result = await getAllGames();
                setGames(result);
            } catch (error) {
                setError("Failed to show games");
            } finally{
                setLoading(false);
            }
        }
        
        showGames();
    }, 
    []);

  if (loading) return <p>Loading games…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Games</h1>

      {games.length === 0 ? (
        <p>No games found.</p>
      ) : (
        <ul>
          {games.map((g) => (
            <li key={g.id}>
              <strong>{g.title}</strong> (ID: {g.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
