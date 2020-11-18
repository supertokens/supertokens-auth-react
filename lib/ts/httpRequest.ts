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
import { SOMETHING_WENT_WRONG_ERROR } from "./constants";
import NormalisedURLPath from "./normalisedURLPath";
import { NormalisedAppInfo } from "./types";
import { supported_fdi } from "./version";

export default class HttpRequest {
    /*
     * Instance Attributes.
     */
    private appInfo: NormalisedAppInfo;

    /*
     * Constructor.
     */
    constructor(appInfo: NormalisedAppInfo) {
        this.appInfo = appInfo;
    }

    /*
     * Instance Methods.
     */
    get = async <T>(path: string, config: RequestInit): Promise<T> => {
        return await this.fetchAndThrowAbove300(this.getFullUrl(path), {
            method: "GET",
            ...config
        });
    };

    post = async <T>(path: string, config: RequestInit): Promise<T> => {
        return await this.fetchAndThrowAbove300(this.getFullUrl(path), {
            method: "POST",
            ...config
        });
    };

    delete = async <T>(path: string, config: RequestInit): Promise<T> => {
        return await this.fetchAndThrowAbove300(this.getFullUrl(path), {
            method: "DELETE",
            ...config
        });
    };

    put = async <T>(path: string, config: RequestInit): Promise<T> => {
        return await this.fetchAndThrowAbove300(this.getFullUrl(path), {
            method: "PUT",
            ...config
        });
    };

    fetch = async (url: RequestInfo, config: RequestInit): Promise<Response> => {
        let headers;
        if (config === undefined) {
            headers = {};
        } else {
            headers = config.headers;
        }

        return await fetch(url, {
            ...config,
            headers: {
                ...headers,
                "fdi-version": supported_fdi.join(","),
                "Content-Type": "application/json"
            }
        });
    };

    fetchAndThrowAbove300 = async <T>(url: RequestInfo, config: RequestInit): Promise<T> => {
        const result = await this.fetch(url, config);
        if (result.status >= 300) {
            throw Error(SOMETHING_WENT_WRONG_ERROR);
        }

        return await result.json();
    };

    getFullUrl = (pathStr: string): string => {
        const path = new NormalisedURLPath(pathStr);
        return `${this.appInfo.apiDomain.getAsStringDangerous()}${this.appInfo.apiBasePath.getAsStringDangerous()}${path.getAsStringDangerous()}`;
    };
}
