import type { Inventory } from '../objects/inventory'
import type { Item } from '../objects/item';

export async function GetInventoryByUserId(userId : number, gameId: number): Promise<Inventory> {
    const response = await fetch(`https://localhost:7215/inventory/${userId}/${gameId}`);
    console.log(response);
    if (!response.ok){
        throw new Error("Failed to get inventory");
    }

    const items: Item[] = await response.json();

    const inventory: Inventory = {
        items: items
    }

    return inventory;
}