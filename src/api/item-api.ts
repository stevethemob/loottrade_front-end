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
