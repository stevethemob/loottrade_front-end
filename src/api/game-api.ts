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

export async function editGame(gameId: number, gameTitle: string){
    const token = localStorage.getItem("token");
    const response = await fetch(`https://localhost:7215/game/${gameId}/${gameTitle}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok){
        throw new Error("Failed to edit game");
    }
}

export async function getGameById(gameId: number){
    const token = localStorage.getItem("token");
    const response = await fetch(`https://localhost:7215/game/${gameId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    const game = await response.json();
    return game as Game;
}