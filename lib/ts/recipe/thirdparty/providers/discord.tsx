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
export default class Discord extends Provider {
    /*
     * Static Attributes.
     */
    private static instance?: Discord;

    /*
     * Constructor.
     */
    constructor(config?: BuiltInProviderConfig) {
        super({
            id: "discord",
            name: "Discord",
            ...config,
        });
    }

    getLogo = (): JSX.Element => {
        return (
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_4108_67056)">
                    <path
                        d="M15.2477 1.17248C14.0651 0.616848 12.8166 0.222666 11.5342 0C11.3587 0.321942 11.1999 0.653178 11.0585 0.99232C9.69245 0.781074 8.30327 0.781074 6.93722 0.99232C6.79573 0.653213 6.63694 0.321981 6.46152 0C5.17826 0.224546 3.92896 0.619664 2.74515 1.17538C0.394984 4.74367 -0.242109 8.22333 0.0764376 11.6536C1.45275 12.6971 2.99324 13.4908 4.63094 14C4.99971 13.491 5.32601 12.9511 5.6064 12.3858C5.07384 12.1817 4.55982 11.9299 4.0703 11.6332C4.19914 11.5374 4.32514 11.4386 4.4469 11.3427C5.87129 12.0301 7.42594 12.3865 8.99999 12.3865C10.574 12.3865 12.1287 12.0301 13.5531 11.3427C13.6762 11.4458 13.8023 11.5446 13.9297 11.6332C13.4392 11.9304 12.9242 12.1827 12.3907 12.3873C12.6708 12.9523 12.9971 13.4918 13.3662 14C15.0053 13.4928 16.547 12.6996 17.9235 11.655C18.2973 7.67704 17.285 4.22935 15.2477 1.17248ZM6.0099 9.544C5.12221 9.544 4.38885 8.71731 4.38885 7.70029C4.38885 6.68327 5.09673 5.84931 6.00707 5.84931C6.9174 5.84931 7.6451 6.68327 7.62953 7.70029C7.61396 8.71731 6.91457 9.544 6.0099 9.544ZM11.9901 9.544C11.101 9.544 10.3704 8.71731 10.3704 7.70029C10.3704 6.68327 11.0783 5.84931 11.9901 5.84931C12.9018 5.84931 13.6239 6.68327 13.6083 7.70029C13.5927 8.71731 12.8947 9.544 11.9901 9.544Z"
                        fill="#5865F2"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_4108_67056">
                        <rect width="18" height="14" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        );
    };

    /*
     * Static Methods
     */
    static init(config?: BuiltInProviderConfig): Provider {
        if (Discord.instance !== undefined) {
            console.warn("Discord Provider was already initialized");
            return Discord.instance;
        }
        Discord.instance = new Discord(config);
        return Discord.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }
        Discord.instance = undefined;
        return;
    }
}
