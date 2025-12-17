import type { Offer } from "../objects/offer";

export async function getOffersByGameId(gameId: number): Promise<Offer[]> {
    const response = await fetch(`https://localhost:7215/offer/ByGameId/${gameId}`);

    if (!response.ok) {
        throw new Error("Failed to get Item");
    }

    return await response.json();
}

export async function createOffer(itemId: Number) {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://localhost:7215/offer/ByItemId`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(itemId)
    });

    if (!response.ok) {
        return true;
    }

    return false;
}