import type { User } from "../objects/user";

export async function registerUser(username: string, password: string, repeatedPassword: string, email: string) {
    const response = await fetch(`https://localhost:7215/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password,
            repeatedPassword,
            email
        })
    })

    if (!response.ok) {
        const errorData = await response.json();
        const messages: string[] = [];

        if (errorData.errors) {
            for (const key in errorData.errors) {
                const error = errorData.errors[key];

                if (Array.isArray(error)) {
                    messages.push(...error);
                }
                else if (typeof error === "string") {
                    messages.push(error);
                }
            }
        }

        throw new Error(messages.join("\n\n"));
    }

    const succes = await response.json();
    return succes;
}

export async function login(username: string, password: string) {
    const response = await fetch(`https://localhost:7215/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Username: username,
            Password: password
        })
    })

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token)
    return data.token;
}

