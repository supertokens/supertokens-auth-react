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
/*
 * Imports.
 */
import NormalisedURLPath from "supertokens-web-js/lib/build/normalisedURLPath";

import SuperTokens from "../../../superTokens";
import { isTest } from "../../../utils";

import type { BuiltInProviderConfig } from "./types";

import Provider from ".";

/*
 * Class.
 */
export default class Apple extends Provider {
    /*
     * Static Attributes.
     */
    private static instance?: Apple;

    /*
     * Constructor.
     */
    constructor(config?: BuiltInProviderConfig) {
        super({
            id: "apple",
            name: "Apple",
            ...config,
        });
    }

    getLogo(): undefined {
        return undefined;
    }

    getRedirectURIOnProviderDashboard(): string | undefined {
        const domain = SuperTokens.getInstanceOrThrow().appInfo.apiDomain.getAsStringDangerous();
        const callbackPath = new NormalisedURLPath(`/callback/${this.id}`);
        const path = SuperTokens.getInstanceOrThrow()
            .appInfo.apiBasePath.appendPath(callbackPath)
            .getAsStringDangerous();
        return `${domain}${path}`;
    }

    /*
     * Static Methods
     */
    static init(config?: BuiltInProviderConfig): Provider {
        if (Apple.instance !== undefined) {
            console.warn("Apple Provider was already initialized");
            return Apple.instance;
        }
        Apple.instance = new Apple(config);
        return Apple.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }
        Apple.instance = undefined;
        return;
    }
}
