import { splitCookiesString, parse as parseSetCookieString } from "set-cookie-parser";
import { getApiDomain } from "./App";

export function addCustomInterceptorsToGlobalFetch() {
    const origFetch = window.fetch;
    window.fetch = async (input: any, init) => {
        // Check if the we need to add the cookies
        if (isApiDomain(input.url || input)) {
            // Simply add the stored string into a header, it's already in the correct format.
            const stCookies = localStorage.getItem("st-cookie");
            if (stCookies) {
                init = {
                    ...init,
                    headers: {
                        ...init?.headers,
                        "st-cookie": stCookies,
                    },
                };
            }
        }

        const res = await origFetch(input, init);

        // Check if the we need to process the cookies in the response
        if (isApiDomain(input.url || input)) {
            const respCookies = res.headers.get("st-cookie");
            setCookiesInLocalstorage(respCookies);
        }
        return res;
    };
}

export function addCustomInterceptosToAxios(input: { axiosInstance: any; userContext: any }) {
    input.axiosInstance.interceptors.request.use(
        function (config: any) {
            // Check if the we need to add the cookies
            if (isApiDomain(config.url)) {
                const stCookies = localStorage.getItem("st-cookie");
                if (stCookies) {
                    // Simply add the stored string into a header, it's already in the correct format.
                    config.headers["st-cookie"] = stCookies;
                }
            }
            return config;
        },
        function (error: any) {
            return Promise.reject(error);
        }
    );

    input.axiosInstance.interceptors.response.use(
        function (res: any) {
            // Check if the we need to process the cookies in the response
            if (isApiDomain(res.config.url)) {
                const respCookies = res.headers["st-cookie"];

                setCookiesInLocalstorage(respCookies);
            }
            return res;
        },
        // We need to process error responses as well
        function (error: any) {
            // Check if the we need to process the cookies in the response
            if (isApiDomain(error.config.url)) {
                const res = error.response;
                const respCookies = res.headers["st-cookie"];

                setCookiesInLocalstorage(respCookies);
            }
            return Promise.reject(error);
        }
    );
}

// helper function to store cookie string correctly in localstorage
function setCookiesInLocalstorage(respCookies: any) {
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
                .map((cookie) => `${cookie.name}=${cookie.value}`)
                .join("; ")
        );
    }
}

function isApiDomain(str: string) {
    return str.startsWith(getApiDomain());
}
