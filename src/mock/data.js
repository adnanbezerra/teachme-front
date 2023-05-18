import { toast } from "react-toastify";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export function config(token) {
    return {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
}

export function getCookieByName(cookieName) {
    const name = cookieName + "=";
    const cookieDecoded = decodeURIComponent(document.cookie); //to be careful
    const cookieArr = cookieDecoded.split('; ');

    let res;

    cookieArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })

    return res
}

export function notifySuccess(message) {
    toast.success(message);
}

export function notifyFailure(message) {
    toast.error(message);
}