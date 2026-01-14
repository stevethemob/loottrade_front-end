import type { Game } from '../objects/game'

export async function getAllGames(): Promise<Game[]> {
    const response = await fetch(`https://localhost:7215/game/`);

    if (!response.ok) {
        throw new Error("Failed to get games");
    }

    const games = await response.json();
    return games as Game[];
}

export async function addGame(gameTitle: string) {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://localhost:7215/game/${gameTitle}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Failed to add game");
    }
}