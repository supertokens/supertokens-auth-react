"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
/*
 * getUrlFromDomain
 * Input: string Domain.
 * Output: A url with appropriate protocol.
 */
function getUrlFromDomain(domain) {
    // If protocol already present, return unchanged.
    if (domain.startsWith("https://") || domain.startsWith("http://")) return domain;
    // If development environment, return http protocol.
    if (domain.startsWith("localhost:")) return `http://${domain}`;
    // Otherwise, enforce https.
    return `https://${domain}`;
}
exports.getUrlFromDomain = getUrlFromDomain;
/*
 * getRecipeIdFromPath
 * Input: string url.
 * Output The "rId" query param if present, null otherwise.
 */
function getRecipeIdFromUrl(urlString) {
    const url = new URL(urlString);
    const urlParams = new URLSearchParams(url.search);
    return urlParams.get(constants_1.recipeIdGetParam);
}
exports.getRecipeIdFromUrl = getRecipeIdFromUrl;
function cleanPath(path) {
    // Remove pending `/` at the end of URL.
    if (path.endsWith("/")) path = path.slice(0, -1);
    return path;
}
exports.cleanPath = cleanPath;
/*
 * isTest
 */
function isTest() {
    return process.env.TEST_MODE === "testing";
}
exports.isTest = isTest;
