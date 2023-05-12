const frontendCookiesKey = "frontendCookies";

let inMemoryStorage = {};

function setKeyValue(key, value) {
    try {
        window.localStorage.setItem(key, value);
    } catch (err) {
        inMemoryStorage[key] = value;
    }
}

function getKeyValue(key) {
    try {
        return window.localStorage.getItem(key);
    } catch (err) {
        if (inMemoryStorage[key] === undefined) {
            return null;
        } else {
            return inMemoryStorage[key];
        }
    }
}

function getCookiesFromStorage() {
    const cookiesFromStorage = getKeyValue(frontendCookiesKey);

    if (cookiesFromStorage === null) {
        setKeyValue(frontendCookiesKey, "[]");
        return "";
    }

    /**
     * Because we store cookies in local storage, we need to manually check
     * for expiry before returning all cookies
     */
    const cookieArrayInStorage = JSON.parse(cookiesFromStorage);
    let cookieArrayToReturn = [];

    for (let cookieIndex = 0; cookieIndex < cookieArrayInStorage.length; cookieIndex++) {
        const currentCookieString = cookieArrayInStorage[cookieIndex];
        const parts = currentCookieString.split(";");
        let expirationString = "";

        for (let partIndex = 0; partIndex < parts.length; partIndex++) {
            const currentPart = parts[partIndex];

            if (currentPart.toLocaleLowerCase().includes("expires=")) {
                expirationString = currentPart;
                break;
            }
        }

        if (expirationString !== "") {
            const expirationValueString = expirationString.split("=")[1];
            const expirationDate = new Date(expirationValueString);
            const currentTimeInMillis = Date.now();

            // if the cookie has expired, we skip it
            if (expirationDate.getTime() < currentTimeInMillis) {
                continue;
            }
        }

        cookieArrayToReturn.push(currentCookieString);
    }

    /**
     * After processing and removing expired cookies we need to update the cookies
     * in storage so we dont have to process the expired ones again
     */
    setKeyValue(frontendCookiesKey, JSON.stringify(cookieArrayToReturn));

    return cookieArrayToReturn.join("; ");
}

function setCookieToStorage(cookieString) {
    const cookieName = cookieString.split(";")[0].split("=")[0];
    const cookiesFromStorage = getKeyValue(frontendCookiesKey);
    let cookiesArray = [];

    if (cookiesFromStorage !== null) {
        const cookiesArrayFromStorage = JSON.parse(cookiesFromStorage);
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

    /**
     * If a cookie with the same name already exists (index != -1) then we
     * need to remove the old value and replace it with the new one.
     *
     * If it does not exist then simply add the new cookie
     */
    if (cookieIndex !== -1) {
        cookiesArray[cookieIndex] = cookieString;
    } else {
        cookiesArray.push(cookieString);
    }

    setKeyValue(frontendCookiesKey, JSON.stringify(cookiesArray));
}

export default function getCookieHandler(original) {
    return {
        ...original,
        getCookie: async function () {
            const cookies = getCookiesFromStorage();
            return cookies;
        },
        setCookie: async function (cookieString) {
            setCookieToStorage(cookieString);
        },
    };
}
