import { CookieHandler } from "supertokens-auth-react/utils/cookieHandling";

const frontendCookiesKey = "frontendCookies";

function getCookiesFromStorage(): string {
    const cookiesFromStorage = window.localStorage.getItem(frontendCookiesKey);

    if (cookiesFromStorage === null) {
        window.localStorage.setItem(frontendCookiesKey, "[]");
        return "";
    }

    // Check for expiry

    const cookieArray: string[] = JSON.parse(cookiesFromStorage);

    return cookieArray.join("; ");
}

function setCookieToStorage(cookieString: string) {
    const cookieName = cookieString.split(";")[0].split("=")[0];
    const cookiesFromStorage = window.localStorage.getItem(frontendCookiesKey);
    let cookiesArray: string[] = [];

    if (cookiesFromStorage !== null) {
        const cookiesArrayFromStorage: string[] = JSON.parse(cookiesFromStorage);
        cookiesArray = cookiesArrayFromStorage;
    }

    let cookieIndex = -1;

    for (let i = 0; i < cookiesArray.length; i++) {
        const currentCookie = cookiesArray[i];

        if (currentCookie.indexOf(`${cookieName}=`) !== -1) {
            cookieIndex = i;
            break;
        }
    }

    if (cookieIndex !== -1) {
        cookiesArray[cookieIndex] = cookieString;
    } else {
        cookiesArray.push(cookieString);
    }

    // Check for expiry

    window.localStorage.setItem(frontendCookiesKey, JSON.stringify(cookiesArray));
}

export default function getCookieHandler(original: CookieHandler): CookieHandler {
    return {
        ...original,
        getCookie: async function () {
            const cookies = getCookiesFromStorage();
            return cookies;
        },
        getCookieSync: function () {
            const cookies = getCookiesFromStorage();
            return cookies;
        },
        setCookie: async function (cookieString: string) {
            setCookieToStorage(cookieString);
        },
        setCookieSync: function (cookieString: string) {
            setCookieToStorage(cookieString);
        },
    };
}
