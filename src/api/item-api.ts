import type { Item } from '../objects/item';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getItem(itemId: number): Promise<Item> {
    const response = await fetch(`${API_BASE_URL}/item/ByItemId/${itemId}`);

    if (!response.ok) {
        throw new Error("Failed to get Item");
    }

    const item = await response.json();
    console.log(item);
    return item;
}

export async function getAllItems(gameId: number): Promise<Item[]> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/item/ByGame/${gameId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Unauthorized.");
    }

    const items = await response.json()
    return items;
}

export async function editItem(item: Item): Promise<void> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/item/editItem`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(item)
    });

    if (!response.ok) {
        throw new Error("Failed to update item");
    }
}

export async function createItem(item: Item): Promise<void> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/item/CreateItem`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(item)
    });

    if (!response.ok) {
        throw new Error("Failed to create item");
    }
}