import React from "react";
import "../css/GameOptions.css";
import { useParams } from "react-router-dom";

export default function GameOptions() {
  const { gameId } = useParams();
  return (
    <div>
      <div className="account">account</div>
      <div className="buttons">
        <button className="btn">trade offers</button>
        <button className="btn">offer</button>
        <button className="btn">your inventory</button>
      </div>
    </div>
  );
}
