import React from "react";
import { Link } from "react-router-dom";
import "../css/BackButton.css"

type BackButtonProps = {
    to: string;            // required route to go to
};

const BackButton: React.FC<BackButtonProps> = ({ to }) => {
    return (
        <Link to={to} className={`back-btn`}>
            ← Back
        </Link>
    );
};

export default BackButton;
