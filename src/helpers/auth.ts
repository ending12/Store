import { Jwt } from "../store/models/auth";

export const isAuth = ():boolean | Jwt => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
        return JSON.parse(jwt);
    }
    return false;
}