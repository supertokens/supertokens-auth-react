"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
/*
 * normaliseUrl
 * Input: string url (or domain).
 * Output: A url with appropriate protocol.
 */
function normaliseUrl(url) {
    var newUrl;
    // If development environment or IP address, return http protocol.
    if (url.startsWith("localhost:") || isIpV4Address(url)) {
        newUrl = "http://" + url;
        // If no protocol, add https.
    } else if (url.startsWith("https://") === false && url.startsWith("http://") === false) {
        newUrl = "https://" + url;
        // If protocol already present, return unchanged.
    } else {
        newUrl = url;
    }
    return new URL(newUrl).origin;
}
exports.normaliseUrl = normaliseUrl;
/*
 * getRecipeIdFromPath
 * Input: string url.
 * Output The "rid" query param if present, null otherwise.
 */
function getRecipeIdFromUrl(urlString) {
    var url = new URL(urlString);
    var urlParams = new URLSearchParams(url.search);
    return urlParams.get(constants_1.RECIPE_ID_GET_PARAM);
}
exports.getRecipeIdFromUrl = getRecipeIdFromUrl;
/*
 * normalisePath
 * Input: string path (compatible with url).
 * Output normalised path.
 */
function normalisePath(path) {
    try {
        // If URL, extract pathname, remove URL and query params.
        path = new URL(path).pathname;
    } catch (e) {
        // Otherwise if path, remove query params.
        // Prepend "/" at the begining if not present.
        if (path.startsWith("/") === false) {
            path = "/" + path;
        }
        var ANY_DOMAIN_TO_CONSTRUCT_URL = "https://a.b";
        path = new URL("" + ANY_DOMAIN_TO_CONSTRUCT_URL + path).pathname;
    }
    // Remove pending "/""
    if (path.endsWith("/")) {
        path = path.slice(0, -1);
    }
    return path;
}
exports.normalisePath = normalisePath;
/*
 * isIpV4Address
 */
function isIpV4Address(ip) {
    var ipArray = ip.split(".");
    // Return false if IP does not contain 4 blocks exactly.
    if (ipArray.length !== 4) {
        return false;
    }
    // Otehrwise, make sure all blocks are integers and between IP ranges.
    return ipArray.every(function(b) {
        var block = Number(b);
        return Number.isInteger(block) === true && block >= 0 && block <= 255;
    });
}
/*
 * isTest
 */
function isTest() {
    return process.env.TEST_MODE === "testing";
}
exports.isTest = isTest;
