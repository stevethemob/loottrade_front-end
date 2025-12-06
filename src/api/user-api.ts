import type { User } from "../objects/user";

export async function registerUser(username: string, password: string, repeatedPassword: string, email: string){
    const response = await fetch(`https://localhost:7215/user/${username}/${password}/${repeatedPassword}/${email}`)

    if (!response.ok){
        throw new Error("Failed to add user");
    }

    const succes = await response.json();
    return succes;
}

export async function login(username: string, password: string){
    const response = await fetch(`https://localhost:7215/user/${username}/${password}`)

    if (!response.ok){
        throw new Error("login failed");
    }

    const id: Number = await response.json(); 
    return id;
}

