import React from "react";

export interface GameCardProps {
    title: string;
}

export default function GameCard({ title }: GameCardProps) {
    return (
        <div className="bg-gray-300 p-5 rounded-xl w-40 flex flex-col items-center shadow-md">
            <p className="mt-3 text-sm text-center">{title}</p>
        </div>
    )
}