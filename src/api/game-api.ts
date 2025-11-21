import type { Game } from '../objects/game'

export async function getAllGames(): Promise<Game[]> {
    const response = await fetch(`https://localhost:7215/game/`);

    if (!response.ok){
        throw new Error("Failed to get games");
    }

    const games = await response.json();
    return games as Game[];
}