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
