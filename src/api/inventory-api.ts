import type { Inventory } from '../objects/inventory'
import type { Item } from '../objects/item';

export async function GetInventoryByUserId(userId: number, gameId: number): Promise<Inventory> {
    const response = await fetch(`https://localhost:7215/inventory/${userId}/${gameId}`);

    if (!response.ok) {
        throw new Error("Failed to get inventory");
    }

    const items: Item[] = await response.json();

    const inventory: Inventory = {
        items: items
    }

    return inventory;
}

export async function AddItemToInventoryByUserIdAndItemId(userId: number, itemId: number): Promise<boolean> {
    const response = await fetch(`https://localhost:7215/inventory/${userId}/${itemId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        throw new Error("Failed to add item");
    }

    return response.json();
}