"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRecipeIdFromSearch = getRecipeIdFromSearch;
exports.getNormalisedRouteWithoutWebsiteBasePath = getNormalisedRouteWithoutWebsiteBasePath;
exports.normaliseURLDomainOrThrowError = normaliseURLDomainOrThrowError;
exports.normaliseURLPathOrThrowError = normaliseURLPathOrThrowError;
exports.isTest = isTest;

var _constants = require("./constants");

/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

/*
 * getRecipeIdFromPath
 * Input:
 * Output: The "rid" query param if present, null otherwise.
 */
function getRecipeIdFromSearch(search) {
    var urlParams = new URLSearchParams(search);
    return urlParams.get(_constants.RECIPE_ID_QUERY_PARAM);
}
/*
 * getNormalisedRouteWithoutWebsiteBasePath
 * Input: string path
 * Output path without the website base path.
 */

function getNormalisedRouteWithoutWebsiteBasePath(path, basePath) {
    // If base path is present, remove it.
    if (path.startsWith(basePath)) {
        var newPath = path.slice(basePath.length);

        if (newPath.length === 0) {
            newPath = "/";
        }

        return newPath;
    } // Otherwise, return url unchanged.

    return path;
}
/*
 * normaliseUrlOrThrowError
 * Input: string url (or domain).
 * Output: A url with appropriate protocol.
 */

function normaliseURLDomainOrThrowError(input) {
    function isAnIpAddress(ipaddress) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
            ipaddress
        );
    }

    input = input.trim().toLowerCase();

    try {
        if (!input.startsWith("http://") && !input.startsWith("https://") && !input.startsWith("supertokens://")) {
            throw new Error("converting to proper URL");
        }

        var urlObj = new URL(input);

        if (urlObj.protocol === "supertokens:") {
            if (urlObj.hostname.startsWith("localhost") || isAnIpAddress(urlObj.hostname)) {
                input = "http://" + urlObj.host;
            } else {
                input = "https://" + urlObj.host;
            }
        } else {
            input = urlObj.protocol + "//" + urlObj.host;
        }

        return input;
    } catch (err) {} // not a valid URL

    if (input.indexOf(".") === 0) {
        input = input.substr(1);
    } // If the input contains a . it means they have given a domain name.
    // So we try assuming that they have given a domain name

    if (
        (input.indexOf(".") !== -1 || input.startsWith("localhost")) &&
        !input.startsWith("http://") &&
        !input.startsWith("https://")
    ) {
        // The supertokens:// signifies to the recursive call that the call was made by us.
        input = "supertokens://" + input; // at this point, it should be a valid URL. So we test that before doing a recursive call

        try {
            new URL(input);
            return normaliseURLDomainOrThrowError(input);
        } catch (err) {}
    }

    throw new Error("Please provide a valid domain name");
}

function normaliseURLPathOrThrowError(input) {
    input = input.trim().toLowerCase();

    try {
        if (!input.startsWith("http://") && !input.startsWith("https://")) {
            throw new Error("converting to proper URL");
        }

        var urlObj = new URL(input);
        input = urlObj.pathname;

        if (input.charAt(input.length - 1) === "/") {
            return input.substr(0, input.length - 1);
        }

        return input;
    } catch (err) {} // not a valid URL
    // If the input contains a . it means they have given a domain name.
    // So we try assuming that they have given a domain name + path

    if (
        (input.indexOf(".") !== -1 || input.startsWith("localhost")) &&
        !input.startsWith("http://") &&
        !input.startsWith("https://")
    ) {
        input = "http://" + input;
        return normaliseURLPathOrThrowError(input);
    }

    if (input.charAt(0) !== "/") {
        input = "/" + input;
    } // at this point, we should be able to convert it into a fake URL and recursively call this function.

    try {
        // test that we can convert this to prevent an infinite loop
        new URL("http://example.com" + input);
        return normaliseURLPathOrThrowError("http://example.com" + input);
    } catch (err) {
        throw new Error("Please provide a valid URL path");
    }
}
/*
 * isTest
 */

function isTest() {
    return process.env.TEST_MODE === "testing";
}
