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
import React from "react";
import Provider from ".";
import { isTest } from "../../../utils";
import { BuiltInProviderConfig } from "./types";

/*
 * Class.
 */
export default class Twitter extends Provider {
    /*
     * Static Attributes.
     */
    private static instance?: Twitter;

    buttonComponent?: JSX.Element;

    /*
     * Constructor.
     */
    constructor(config?: BuiltInProviderConfig) {
        super({
            id: "twitter",
            name: "Twitter",
        });

        if (config === undefined) {
            return;
        }

        this.buttonComponent = config.buttonComponent;
    }

    getButton = (): JSX.Element => {
        if (this.buttonComponent !== undefined) {
            return this.buttonComponent;
        }

        return this.getDefaultButton();
    };

    getLogo = (): JSX.Element => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20.129" height="16.356" viewBox="0 0 20.129 16.356">
                <g>
                    <g>
                        <path
                            fill="#fff"
                            d="M45.232 35.964a8.242 8.242 0 0 1-2.372.649 4.141 4.141 0 0 0 1.816-2.284 8.268 8.268 0 0 1-2.623 1 4.133 4.133 0 0 0-7.037 3.771 11.724 11.724 0 0 1-8.516-4.317 4.133 4.133 0 0 0 1.282 5.517 4.1 4.1 0 0 1-1.87-.517v.052a4.132 4.132 0 0 0 3.313 4.049 4.147 4.147 0 0 1-1.865.071 4.134 4.134 0 0 0 3.858 2.868 8.338 8.338 0 0 1-6.114 1.71 11.745 11.745 0 0 0 18.08-9.894q0-.268-.012-.534a8.374 8.374 0 0 0 2.061-2.137z"
                            transform="translate(34.799 -7.41) translate(2.201 4.266) translate(-62.103 -30.883)"
                        />
                    </g>
                </g>
            </svg>
        );
    };

    /*
     * Static Methods
     */
    static init(config?: BuiltInProviderConfig): Provider {
        if (Twitter.instance !== undefined) {
            console.warn("Twitter Provider was already initialized");
            return Twitter.instance;
        }
        Twitter.instance = new Twitter(config);
        return Twitter.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }
        Twitter.instance = undefined;
        return;
    }
}
