import { WindowHandlerInterface } from "supertokens-website/utils/windowHandler/types";

/**
 * This example app uses HashRouter from react-router-dom. The SuperTokens SDK relies on
 * some window properties like location hash, query params etc. Because HashRouter places
 * everything other than the website base in the location hash, we need to add custom
 * handling for some of the properties of the Window API
 */
export default function getWindowHandler(original: WindowHandlerInterface): WindowHandlerInterface {
    return {
        ...original,
        location: {
            ...original.location,
            getSearch: function () {
                const currentURL = window.location.href;
                const firstQuestionMarkIndex = currentURL.indexOf("?");

                if (firstQuestionMarkIndex !== -1) {
                    // Return the query string from the url
                    let queryString = currentURL.substring(firstQuestionMarkIndex);

                    // Remove any hash
                    if (queryString.includes("#")) {
                        queryString = queryString.split("#")[0];
                    }

                    return queryString;
                }

                return "";
            },
            getHash: function () {
                // Location hash always starts with a #, when returning we prepend it
                let locationHash = window.location.hash;

                if (locationHash === "") {
                    return "#";
                }

                if (locationHash.startsWith("#")) {
                    // Remove the starting pound symbol
                    locationHash = locationHash.substring(1);
                }

                if (!locationHash.includes("#")) {
                    // The remaining string did not have any "#" character
                    return "#";
                }

                const locationSplit = locationHash.split("#");

                if (locationSplit.length < 2) {
                    // The string contains a "#" but is followed by nothing
                    return "#";
                }

                return "#" + locationSplit[1];
            },
            getPathName: function () {
                let locationHash = window.location.hash;

                if (locationHash === "") {
                    return "";
                }

                if (locationHash.startsWith("#")) {
                    // Remove the starting pound symbol
                    locationHash = locationHash.substring(1);
                }

                if (locationHash.includes("?")) {
                    // Remove query
                    locationHash = locationHash.split("?")[0];
                }

                if (locationHash.includes("#")) {
                    // Remove location hash
                    locationHash = locationHash.split("#")[0];
                }

                return locationHash;
            },
            getOrigin: function () {
                return "http://localhost:3000";
            },
            getHostName: function () {
                return "localhost";
            },
        },
    };
}
