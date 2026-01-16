import "../css/GameOptions.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function GameOptions() {
  const { gameId } = useParams();
  const gameIdNumber = Number(gameId);

  return (
    <div>
      <BackButton to={`/games`} />
      <div className="account">account</div>
      <div className="buttons">
        <button className="btn">
          <Link key={gameIdNumber} to={`/ownOffers/${gameIdNumber}`}>
            My offers
          </Link>
        </button>
        <button className="btn">
          <Link key={gameIdNumber} to={`/allTrades/${gameIdNumber}`}>
            trade offers
          </Link>
        </button>
        <button className="btn">
          <Link key={gameIdNumber} to={`/offers/${gameIdNumber}`}>
            offer
          </Link>
        </button>
        <button className="btn">
          <Link key={gameIdNumber} to={`/inventory/${gameId}`}>
            your inventory
          </Link>
        </button>
      </div>
    </div>
  );
}
