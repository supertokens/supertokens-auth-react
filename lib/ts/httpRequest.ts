/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
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
import { SOMETHING_WENT_WRONG_ERROR } from "./constants";
import NormalisedURLPath from "./normalisedURLPath";
import RecipeModule from "./recipe/recipeModule";
import { isRequestInit } from "./utils";
import { supported_fdi } from "./version";

export default class HttpRequest {
    /*
     * Instance Attributes.
     */
    private recipe: RecipeModule<any, any, any, any>;

    /*
     * Constructor.
     */
    constructor(recipe: RecipeModule<any, any, any, any>) {
        this.recipe = recipe;
    }

    /*
     * Instance Methods.
     */
    get = async <T>(
        path: string,
        config: RequestInit,
        action: string,
        queryParams?: Record<string, string>
    ): Promise<T> => {
        return await this.fetchResponseJsonOrThrowAbove300(
            this.getFullUrl(path, queryParams),
            {
                method: "GET",
                ...config,
            },
            action
        );
    };

    post = async <T>(path: string, config: RequestInit, action: string): Promise<T> => {
        return await this.fetchResponseJsonOrThrowAbove300(
            this.getFullUrl(path),
            {
                method: "POST",
                ...config,
            },
            action
        );
    };

    delete = async <T>(path: string, action: string, config: RequestInit): Promise<T> => {
        return await this.fetchResponseJsonOrThrowAbove300(
            this.getFullUrl(path),
            {
                method: "DELETE",
                ...config,
            },
            action
        );
    };

    put = async <T>(path: string, action: string, config: RequestInit): Promise<T> => {
        return await this.fetchResponseJsonOrThrowAbove300(
            this.getFullUrl(path),
            {
                method: "PUT",
                ...config,
            },
            action
        );
    };

    fetch = async (baseUrl: string, config: RequestInit, action: string): Promise<Response> => {
        let headers;
        if (config === undefined) {
            headers = {};
        } else {
            headers = config.headers;
        }

        const { requestInit, url } = await this.preAPIHook({
            action,
            requestInit: {
                ...config,
                headers: {
                    ...headers,
                    "fdi-version": supported_fdi.join(","),
                    "Content-Type": "application/json",
                    rid: this.recipe.config.recipeId,
                },
            },
            url: baseUrl,
        });

        return await fetch(url, requestInit);
    };

    /*
     * For backward compatibility
     */
    preAPIHook = async ({
        action,
        url,
        requestInit,
    }: {
        action: string;
        url: string;
        requestInit: RequestInit;
    }): Promise<{ url: string; requestInit: RequestInit }> => {
        const result = await this.recipe.config.preAPIHook({ action, url, requestInit });
        if (isRequestInit(result)) {
            return {
                url,
                requestInit: result as RequestInit,
            };
        } else {
            return {
                url,
                ...result,
            };
        }
    };

    fetchResponseJsonOrThrowAbove300 = async <T>(url: string, config: RequestInit, action: string): Promise<T> => {
        const result = await this.fetch(url, config, action);
        if (result.status >= 300) {
            throw Error(SOMETHING_WENT_WRONG_ERROR);
        }

        return await result.json();
    };

    getFullUrl = (pathStr: string, queryParams?: Record<string, string>): string => {
        const path = new NormalisedURLPath(pathStr);
        const fullUrl = `${this.recipe.config.appInfo.apiDomain.getAsStringDangerous()}${this.recipe.config.appInfo.apiBasePath.getAsStringDangerous()}${path.getAsStringDangerous()}`;

        if (queryParams === undefined) {
            return fullUrl;
        }

        // If query params, add.
        return fullUrl + "?" + new URLSearchParams(queryParams);
    };
}
