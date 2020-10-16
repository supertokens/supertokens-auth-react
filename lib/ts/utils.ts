import { recipeIdGetParam } from "./constants";

/*
 * getUrlFromDomain
 * Input: string Domain.
 * Output: A url with appropriate protocol.
 */
export function getUrlFromDomain(domain: string): string {
    // If protocol already present, return unchanged.
    if (domain.startsWith("https://") || domain.startsWith("http://")) return domain;

    // If development environment, return http protocol.
    if (domain.startsWith("localhost:")) return `http://${domain}`;

    // Otherwise, enforce https.
    return `https://${domain}`;
}

/*
 * getRecipeIdFromPath
 * Input: string url.
 * Output The "rId" query param if present, null otherwise.
 */
export function getRecipeIdFromUrl(urlString: string): string | null {
    const url = new URL(urlString);
    const urlParams = new URLSearchParams(url.search);
    return urlParams.get(recipeIdGetParam);
}

export function cleanPath(path: string): string {
    // Remove pending `/` at the end of URL.
    if (path.endsWith("/")) path = path.slice(0, -1);

    return path;
}

/*
 * isTest
 */
export function isTest(): boolean {
    return process.env.TEST_MODE === "testing";
}
