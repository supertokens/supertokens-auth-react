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
export default class ActiveDirectory extends Provider {
    /*
     * Static Attributes.
     */
    private static instance?: ActiveDirectory;

    /*
     * Constructor.
     */
    constructor(config?: BuiltInProviderConfig) {
        super({
            id: "active-directory",
            name: "Active Directory",
            ...config,
        });
    }

    getLogo = (): JSX.Element => {
        return (
            <svg width="18" height="16" viewBox="0 0 416 415" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_402_84)">
                    <path
                        d="M415.575 316.343V403.598C415.575 413.817 412.431 415.914 402.736 414.341C337.753 404.646 271.984 395.737 206.477 386.566C194.686 384.994 190.494 380.802 190.494 367.963C191.542 321.584 191.018 274.943 190.494 228.04C190.494 217.821 193.638 214.677 203.857 214.677C270.936 215.201 336.967 215.201 402.736 215.201C413.479 215.201 416.099 219.393 416.099 229.088C415.051 258.435 415.575 287.258 415.575 316.343Z"
                        fill="#00AAF2"
                    />
                    <path
                        d="M304.214 198.431C271.198 198.431 238.183 197.907 205.167 198.431C194.948 198.431 190.756 196.335 190.756 184.544C191.28 137.117 191.28 90.4763 190.756 43.5734C190.756 34.4025 193.9 31.2582 202.547 29.686C270.15 19.991 337.753 10.558 405.356 0.338969C417.147 -1.23319 415.051 6.62762 415.051 13.1783C415.051 55.1026 415.575 97.813 415.051 139.737C415.051 155.197 414.527 170.657 415.051 186.116C415.575 195.811 411.907 198.431 402.736 198.431C370.244 197.907 337.229 198.431 304.214 198.431Z"
                        fill="#00AAF2"
                    />
                    <path
                        d="M85.6828 215.987H159.574C167.435 215.987 170.842 218.608 170.842 226.73V372.417C170.842 380.802 167.173 381.588 159.574 380.802C110.575 373.466 61.5764 366.391 12.8393 359.578C3.14432 358.006 0 354.862 0 344.643C0.524054 305.863 0.524054 267.083 0 227.516C0 217.821 2.62027 215.201 12.3153 215.201C37.2078 215.987 61.0523 215.987 85.6828 215.987Z"
                        fill="#00AAF2"
                    />
                    <path
                        d="M85.6827 198.431H12.8392C3.66825 198.431 0.523926 195.287 0.523926 185.592C1.04798 147.336 1.04798 109.08 0.523926 70.5621C0.523926 61.3912 3.1442 58.2469 12.8392 56.6747C61.8383 50.3861 110.837 43.3113 159.574 35.4505C170.842 33.8784 171.89 37.5467 171.89 46.7177V186.116C171.89 196.335 167.697 197.907 158.526 197.907C134.158 197.907 109.527 198.431 85.6827 198.431Z"
                        fill="#00AAF2"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_402_84">
                        <rect width="416" height="415" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        );
    };

    /*
     * Static Methods
     */
    static init(config?: BuiltInProviderConfig): Provider {
        if (ActiveDirectory.instance !== undefined) {
            console.warn("ActiveDirectory Provider was already initialized");
            return ActiveDirectory.instance;
        }
        ActiveDirectory.instance = new ActiveDirectory(config);
        return ActiveDirectory.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }
        ActiveDirectory.instance = undefined;
        return;
    }
}
