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
export default class Gitlab extends Provider {
    /*
     * Static Attributes.
     */
    private static instance?: Gitlab;

    /*
     * Constructor.
     */
    constructor(config?: BuiltInProviderConfig) {
        super({
            id: "gitlab",
            name: "Gitlab",
            ...config,
        });
    }

    getLogo = (): undefined => {
        return undefined;
    };

    /*
     * Static Methods
     */
    static init(config?: BuiltInProviderConfig): Provider {
        if (Gitlab.instance !== undefined) {
            console.warn("Gitlab Provider was already initialized");
            return Gitlab.instance;
        }
        Gitlab.instance = new Gitlab(config);
        return Gitlab.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }
        Gitlab.instance = undefined;
        return;
    }
}
