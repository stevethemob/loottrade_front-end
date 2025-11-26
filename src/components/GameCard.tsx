import React from "react";
import "../css/GameCard.css";

export interface GameCardProps {
    title: string;
}

export default function GameCard({ title }: GameCardProps) {
    return (
        <div className="game-card">
            <div className="image-placeholder">
                <div className="circle"></div>
                <div className="triangle"></div>
            </div>
            <p className="game-title">{title}</p>
        </div>
    )
}