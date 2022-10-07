export const BASE_URL = 'https://localhost:5000'

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