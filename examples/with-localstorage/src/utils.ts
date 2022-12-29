import { splitCookiesString, parse as parseSetCookieString } from "set-cookie-parser";
import { getApiDomain } from "./App";

// helper function to store cookie string correctly in localstorage
export function setCookiesInLocalstorage(respCookies: any) {
    if (respCookies) {
        // Split and parse cookies received
        const respCookieMap = parseSetCookieString(splitCookiesString(respCookies), { decodeValues: false, map: true });

        // Check if we have anything stored already
        const localstorageCookies = localStorage.getItem("st-cookie");
        if (localstorageCookies !== null) {
            // Split and parse cookies we have in stored previously
            const splitStoredCookies = localstorageCookies.split("; ").map((cookie) => cookie.split("="));

            for (const [name, value] of splitStoredCookies) {
                // Keep old cookies if they weren't overwritten
                if (respCookieMap[name] === undefined) {
                    respCookieMap[name] = { name, value };
                }
            }
        }

        // Save the combined cookies in a the format of a Cookie header
        // Please keep in mind that these have no expiration and lack many of the things done automatically for cookies
        // Many of these features can be implemented, but they are out of scope for this example
        localStorage.setItem(
            "st-cookie",
            Object.values(respCookieMap)
                .filter((v) => v.expires === undefined || v.expires.getTime() > Date.now())
                .map((cookie) => `${cookie.name}=${encodeURIComponent(decodeURIComponent(cookie.value))}`)
                .join("; ")
        );
    }
}
