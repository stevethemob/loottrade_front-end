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

export async function getOffersByGameIdAndUser(gameId: number) {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://localhost:7215/offer/GetAllOffersByFromSpecificUserByGameId/${gameId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    return await response.json();
}

export async function getOfferDetailsByOfferId(offerId: number) {
    const response = await fetch(`https://localhost:7215/offer/GetOfferDetailsByOfferId/${offerId}`, {
        method: "GET"
    })

    return await response.json();
}

export async function DeleteOfferById(offerId: number) {
    const token = localStorage.getItem("token");
            const response = await fetch(
                `https://localhost:7215/offer/DeleteByOfferId/${offerId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete offer");
            }

}