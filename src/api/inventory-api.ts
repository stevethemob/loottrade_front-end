import type { Inventory } from '../objects/inventory'
import type { Item } from '../objects/item';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function GetInventoryByUserId(gameId: number): Promise<Inventory> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/inventory/${gameId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to get inventory");
    }

    const items: Item[] = await response.json();

    const inventory: Inventory = {
        items: items
    }

    return inventory;
}

export async function AddItemToInventoryByUserIdAndItemId(itemId: number): Promise<boolean> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/inventory/${itemId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to add item");
    }

    return response.json();
}