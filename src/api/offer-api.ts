import type { Offer } from "../objects/offer";

export async function getOffersByGameId(gameId: number): Promise<Offer[]> {
    const response = await fetch(`https://localhost:7215/offer/ByGameId/${gameId}`);

    if (!response.ok) {
        throw new Error("Failed to get Item");
    }

    return await response.json();
}