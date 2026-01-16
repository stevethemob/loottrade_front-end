import type { trade } from "../objects/trade";
import type { TradeAdmin } from "../objects/allTradesAdmin";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function addOffer(offerId: number, itemIds: number[]): Promise<void> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/trade/AddTradeOffer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            'OfferId': offerId,
            'ItemIds': itemIds
        })
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to add items to offer");
    }
}

export async function GetAllOffersByGameId(gameId: Number) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/trade/GetAllTradesByGameId/${gameId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Unauthorized.");
    }

    const allTrades = await response.json();
    return allTrades;
}

export async function GetTradeByTradeId(tradeId: number): Promise<trade> {
    const response = await fetch(`${API_BASE_URL}/trade/ByTradeId/${tradeId}`);

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to fetch trade");
    }

    const data: trade = await response.json();
    return data;
}

export async function AcceptTradeByTradeId(tradeId: number) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/trade/AcceptTradeByTradeId/${tradeId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to accept trade");
    }
}

export async function getAllTradesByGameId(gameId: number): Promise<TradeAdmin[]> {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_BASE_URL}/trade/GetAllTradesByGameIdAdmin/${gameId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to load trades");
    }

    return response.json();
}