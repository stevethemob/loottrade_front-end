import type { Item } from '../objects/item';

export async function getItem(itemId: number): Promise<Item> {
    const response = await fetch(`https://localhost:7215/item/ByItemId/${itemId}`);

    if (!response.ok) {
        throw new Error("Failed to get Item");
    }

    const item = await response.json();
    console.log(item);
    return item;
}

export async function getAllItems(gameId: number): Promise<Item[]> {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://localhost:7215/item/ByGame/${gameId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok){
        throw new Error("Unauthorized.");
    }

    const items = await response.json()
    return items;
}
