import { useEffect, useState } from "react";
import { GetInventoryByUserId } from "../api/inventory-api";
import type { Inventory } from "../objects/inventory";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/Inventory.css";
import BackButton from "../components/BackButton";

export default function Inventory() {
  const { gameId } = useParams();
  const gameIdNumber = Number(gameId);

  const [inventory, setInventory] = useState<Inventory>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadInventory() {
      try {
        const response = await GetInventoryByUserId(gameIdNumber);
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
      <BackButton to={`/gameOptions/${gameId}`} />
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

      <button className="add-items-btn">
        <Link key={gameIdNumber} to={`/items/${gameIdNumber}`}>
          Add items
        </Link>
      </button>
    </div>
  );
}