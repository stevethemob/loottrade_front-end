import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
};

export function isAdmin(): boolean {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const decoded = jwtDecode<JwtPayload>(token);

        const role =
            decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        return role === "Admin";
    } catch {
        return false;
    }
}
