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
            clientId: config?.clientId,
            getRedirectURL: config?.getRedirectURL,
        });

        if (config === undefined) {
            return;
        }

        this.buttonComponent = config.buttonComponent;
    }

    getLogo = (): JSX.Element => {
        return (
            <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0.59534 0.0522702C0.229457 0.0522702 -0.0841565 0.365883 0.0203815 0.73174L2.58156 16.2556C2.63383 16.6738 2.99971 16.9351 3.3656 16.9351H15.6488C15.9624 16.9351 16.1715 16.726 16.2238 16.4124L18.7849 0.679471C18.8372 0.313614 18.5759 0 18.21 0L0.59534 0.0522702ZM11.3628 11.2901H7.44258L6.3972 5.74956H12.3036L11.3628 11.2901Z"
                    fill="#2684FF"
                />
                <path
                    d="M17.9502 5.76172H12.3052L11.3643 11.3022H7.44415L2.84448 16.7905C2.84448 16.7905 3.05356 16.9996 3.36717 16.9996H15.6504C15.964 16.9996 16.1731 16.7905 16.2253 16.4769L17.9502 5.76172Z"
                    fill="url(#paint0_linear_4108_67124)"
                />
                <defs>
                    <linearGradient
                        id="paint0_linear_4108_67124"
                        x1="19.2748"
                        y1="7.29202"
                        x2="9.92001"
                        y2="14.5943"
                        gradientUnits="userSpaceOnUse">
                        <stop offset="0.176" stopColor="#0052CC" />
                        <stop offset="1" stopColor="#2684FF" />
                    </linearGradient>
                </defs>
            </svg>
        );
    };

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
