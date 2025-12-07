import React, { useState } from "react";
import { login } from "../api/user-api";
import { useNavigate, Link } from "react-router-dom";
import "../css/login.css";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);


        try {
            await login(username, password);
            navigate("/games");
        } catch (err) {
            setError("Failed to log in");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="login-container">
            <h1 className="title">LootTrade</h1>
            <h2 className="subtitle">log in</h2>


            {loading && <p>Logging in...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}


            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field"
                />


                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />

                <button type="submit" className="login-button" disabled={loading}>Log in</button>
            </form>


            <Link to="/register" className="signup-link">Sign-up instead?</Link>
        </div>
    );
}