import type { Offer } from "../objects/offer";

export async function getOffersByGameId(gameId: number, search: string): Promise<Offer[]> {
    let url = `https://localhost:7215/offer/`;

    if (search && search.trim() !== "") {
        url += `Search/${gameId}/${search}`
    }
    else {
        url += `ByGameId/${gameId}`
    }

    const response = await fetch(url);

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