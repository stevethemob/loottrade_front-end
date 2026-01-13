import "../css/GameOptions.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function GameOptions() {
  const { gameId } = useParams();
  const gameIdNumber = Number(gameId);

  return (
    <div>
      <div className="account">account</div>
      <div className="buttons">
        <button className="btn">trade offers</button>
        <button className="btn">
          <Link key={gameIdNumber} to={`/offers/${gameIdNumber}`}>
            offer
          </Link>
        </button>
        <button className="btn">
          <Link key={gameIdNumber} to={`/inventory/1/${gameId}`}>
            your inventory
          </Link>
        </button>
      </div>
    </div>
  );
}
