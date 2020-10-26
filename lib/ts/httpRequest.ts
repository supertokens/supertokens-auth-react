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
import NormalisedURLPath from "./normalisedURLPath";
import { AppInfo } from "./types";
import { package_version } from "./version";

export default class HttpRequest {
    /*
     * Instance Attributes.
     */
    private appInfo: AppInfo;

    /*
     * Constructor.
     */
    constructor(appInfo: AppInfo) {
        this.appInfo = appInfo;
    }

    /*
     * Instance Methods.
     */
    get = async (path: string, config?: RequestInit) => {
        return await this.fetch(this.getFullUrl(path), {
            method: "GET",
            ...config
        });
    };

    post = async (path: string, config?: RequestInit) => {
        return await this.fetch(this.getFullUrl(path), {
            method: "POST",
            ...config
        });
    };

    delete = async (path: string, config?: RequestInit) => {
        return await this.fetch(this.getFullUrl(path), {
            method: "DELETE",
            ...config
        });
    };

    put = async (path: string, config?: RequestInit) => {
        return await this.fetch(this.getFullUrl(path), {
            method: "PUT",
            ...config
        });
    };

    fetch = async (url: RequestInfo, config?: RequestInit) => {
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
                "Content-Type": "application/json",
                "supertokens-auth-react-version": package_version
            }
        });
    };

    getFullUrl = (pathStr: string) => {
        const path = new NormalisedURLPath(pathStr);
        return `${this.appInfo.apiDomain.getAsStringDangerous()}${this.appInfo.apiBasePath.getAsStringDangerous()}${path.getAsStringDangerous()}`;
    };
}
