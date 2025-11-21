import React, { useEffect, useState } from "react";
import { getItem } from "../api/item-api";
import { type Item } from "../objects/item";

const Home: React.FC = () => {
    const [item, setItem] = useState<Item>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getItem(1)
            .then((res) => {
                setItem(res);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <main style={{ padding: "1rem" }}>
            <h1>Items</h1>
            <div style={{ display: "grid", gap: "1rem" }}>
                {/* {items.map((item) => (
            <>
            <h3>{item.name}</h3>
            <p>{item.rarity}</p>
            </>
        ))} */
                    <h3>{item?.name}</h3>}
                <p>{item?.description}</p>
            </div>
        </main>
    );
};

export default Home;