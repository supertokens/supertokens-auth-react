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

import { RECIPE_ID_QUERY_PARAM } from "../constants";
import SuperTokens from "../superTokens";
import { isIpV4Address, isLocalhost } from "./utils";

/*
 * Class.
 */

export default class SuperTokensUrl {
    recipeId: string | null;
    normalisedPathname: string;
    matchesBasePath: boolean;
    normalisedPathnameWithoutWebsiteBasePath: string;

    constructor() {
        this.recipeId = SuperTokensUrl.getRecipeIdFromSearch(window.location.search);
        this.normalisedPathname = SuperTokensUrl.removePendingSlashFromPath(window.location.pathname);
        this.matchesBasePath = this.normalisedPathname.startsWith(SuperTokens.getAppInfo().websiteBasePath);
        this.normalisedPathnameWithoutWebsiteBasePath = SuperTokensUrl.getNormalisedRouteWithoutWebsiteBasePath(
            this.normalisedPathname
        );
    }

    /*
     * getRecipeIdFromPath
     * Input:
     * Output: The "rid" query param if present, null otherwise.
     */
    static getRecipeIdFromSearch(search: string): string | null {
        const urlParams = new URLSearchParams(search);
        return urlParams.get(RECIPE_ID_QUERY_PARAM);
    }

    /*
     * normalisePath
     * Input: string path (compatible with url).
     * Output normalised path.
     */
    static normalisePath(path: string): string {
        try {
            // If URL, extract pathname, remove URL and query params.
            path = new URL(path).pathname;
        } catch (e) {
            // Otherwise if path, remove query params.
            // Prepend "/" at the begining if not present.
            if (path.startsWith("/") === false) {
                path = `/${path}`;
            }

            const ANY_DOMAIN_TO_CONSTRUCT_URL = "https://a.b";
            path = new URL(`${ANY_DOMAIN_TO_CONSTRUCT_URL}${path}`).pathname;
        }

        return SuperTokensUrl.removePendingSlashFromPath(path);
    }

    /*
     * removePendingSlashFromPath
     * Input: string path (compatible with url).
     * Output path without pending "/" at the end.
     */
    static removePendingSlashFromPath(path: string): string {
        // Remove pending "/""
        if (path.endsWith("/")) {
            path = path.slice(0, -1);
        }

        return path;
    }

    /*
     * getNormalisedRouteWithoutWebsiteBasePath
     * Input: string path
     * Output path without the website base path.
     */
    static getNormalisedRouteWithoutWebsiteBasePath(path: string): string {
        // If base path is present, remove it.
        if (path.startsWith(SuperTokens.getAppInfo().websiteBasePath)) {
            let newPath = path.slice(SuperTokens.getAppInfo().websiteBasePath.length);
            if (newPath.length === 0) {
                newPath = "/";
            }
            return newPath;
        }

        // Otherwise, return url unchanged.
        return path;
    }

    /*
     * normaliseUrlOrThrowError
     * Input: string url (or domain).
     * Output: A url with appropriate protocol.
     */
    static normaliseUrlOrThrowError(url: string): string {
        let newUrl: string;

        // If development environment or IP address, return http protocol.
        if (isLocalhost(url) || isIpV4Address(url)) {
            newUrl = `http://${url}`;

            // If no protocol, add https.
        } else if (url.startsWith("https://") === false && url.startsWith("http://") === false) {
            newUrl = `https://${url}`;

            // If protocol already present, return unchanged.
        } else {
            newUrl = url;
        }
        try {
            return new URL(newUrl).origin;
        } catch (e) {
            throw Error(`There was an error parsing the url you provided: (${url}). Please make sure it is correct.`);
        }
    }
}
