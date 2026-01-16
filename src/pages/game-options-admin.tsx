import "../css/GameOptions.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function GameOptionsAdmin() {
    const { gameId } = useParams();
    const gameIdNumber = Number(gameId);

    return (
        <div>
            <BackButton to={`/games`} />
            <div className="account">account</div>
            <div className="buttons">
                <button className="btn">
                    <Link key={gameIdNumber} to={`/editGame/${gameIdNumber}`}>
                        edit Game
                    </Link>
                </button>
                <button className="btn">
                    <Link key={gameIdNumber} to={`/allTradesAdmin/${gameIdNumber}`}>
                        view trades
                    </Link>
                </button>
                <button className="btn">
                    <Link key={gameIdNumber} to={`/AllItemsAdmin/${gameIdNumber}`}>
                        view items
                    </Link>
                </button>
                <button className="btn">
                    <Link key={gameIdNumber} to={`/addItem/${gameId}`}>
                        add item
                    </Link>
                </button>
            </div>
        </div>
    );
}
