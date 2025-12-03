import React, { useEffect, useState } from "react";
import { GetInventoryByUserId } from "../api/inventory-api";
import type { Inventory } from "../objects/inventory";
import "../css/Inventory.css";


export interface Item {
  id: string;
  name: string;
  description: string;
}

export default function Inventory() {
  const [inventory, setInventory] = useState<Inventory>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadInventory() {
      try {
        const response = await GetInventoryByUserId(1, 1);
        setInventory(response);
      } catch (err) {
        setError("Failed to load inventory.");
      } finally {
        setLoading(false);
      }
    }

    loadInventory();
  }, []);

  if (loading) return <p>Loading inventory</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="items-page">
      <header className="items-header">
        <h1>current items</h1>
        <span className="account-link">account</span>
      </header>
      
      <div className="items-grid">
        {inventory?.items.map(item => (
          <div key={item.id} className="item-card">
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="add-items-btn">Add items</button>
    </div>
  );
}