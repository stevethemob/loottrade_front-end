import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/user-api";
import "../css/Login.css";


export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await registerUser(username, password, repeatPassword, email);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <h1 className="title">LootTrade</h1>
            <h2 className="subtitle">Sign-up</h2>


            {loading && <p>Signing up...</p>}
            {error && <pre style={{ color: "red" }}>{error}</pre>}


            <form className="login-form" onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Repeat password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="input-field"
                />


                <button type="submit" className="login-button" disabled={loading}>Sign-up</button>
            </form>


            <Link to="/login" className="signup-link">Log-in instead?</Link>
        </div>
    );
}