import React, { useEffect, useState } from "react";
import { getAllGames } from "../api/game-api";
import { type Game } from "../objects/game";
import GameCard from "../components/GameCard"

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
    <div className="w-full flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-10">Games</h1>
      {games.length === 0 ? (
        <p>No games found.</p>
      ) : (
        <div className="grid grid-cols-3 gap-16">
          {games.map((game) => (
            <GameCard key={game.id} title={game.title} />
          ))}
        </div>
      )
      }
    </div>
  )
}
