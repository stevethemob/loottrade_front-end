export async function addOffer(offerId: number, itemIds: number[]): Promise<void> {
    const token = localStorage.getItem("token");

    const response = await fetch("https://localhost:7215/trade", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            offerId: offerId,
            itemIds: itemIds
        })
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to add items to offer");
    }
}
