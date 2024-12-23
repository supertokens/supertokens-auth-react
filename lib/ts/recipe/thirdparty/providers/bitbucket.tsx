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
import { isTest } from "../../../utils";

import type { BuiltInProviderConfig } from "./types";

import Provider from ".";

/*
 * Class.
 */
export default class Bitbucket extends Provider {
    /*
     * Static Attributes.
     */
    private static instance?: Bitbucket;

    /*
     * Constructor.
     */
    constructor(config?: BuiltInProviderConfig) {
        super({
            id: "bitbucket",
            name: "Bitbucket",
            ...config,
        });
    }

    getLogo(): undefined {
        return undefined;
    }

    /*
     * Static Methods
     */
    static init(config?: BuiltInProviderConfig): Provider {
        if (Bitbucket.instance !== undefined) {
            console.warn("Bitbucket Provider was already initialized");
            return Bitbucket.instance;
        }
        Bitbucket.instance = new Bitbucket(config);
        return Bitbucket.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }
        Bitbucket.instance = undefined;
        return;
    }
}
