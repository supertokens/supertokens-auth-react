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
export default class Facebook extends Provider {
    /*
     * Static Attributes.
     */
    private static instance?: Facebook;

    buttonComponent?: JSX.Element;

    /*
     * Constructor.
     */
    constructor(config?: BuiltInProviderConfig) {
        super({
            id: "facebook",
            name: "Facebook",
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
            <svg xmlns="http://www.w3.org/2000/svg" width="7.956" height="17.259" viewBox="0 0 7.956 17.259">
                <g>
                    <g>
                        <path
                            fill="#fff"
                            d="M45.448 30.376h-2.36v8.646h-3.575v-8.646h-1.7v-3.039h1.7v-1.966a3.353 3.353 0 0 1 3.607-3.608l2.649.011v2.949h-1.922a.728.728 0 0 0-.758.828v1.789h2.671z"
                            transform="translate(-6.349 -3.492) translate(6.349 3.492) translate(-37.812 -21.763)"
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
        if (Facebook.instance !== undefined) {
            console.warn("Facebook Provider was already initialized");
            return Facebook.instance;
        }
        Facebook.instance = new Facebook(config);
        return Facebook.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }
        Facebook.instance = undefined;
        return;
    }
}
