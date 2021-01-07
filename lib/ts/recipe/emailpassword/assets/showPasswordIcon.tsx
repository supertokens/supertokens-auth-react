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

/*
 * Imports.
 */

/** @jsx jsx */
import { jsx } from "@emotion/react";

import * as React from "react";

/*
 * Component.
 */

export default function ShowPasswordIcon({
    color,
    showPassword
}: {
    color: string;
    showPassword: boolean;
}): JSX.Element {
    if (showPassword === true) {
        return (
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20.869" height="18.159" viewBox="0 0 20.869 18.159">
                    <g>
                        <g>
                            <g>
                                <g>
                                    <path
                                        fill={color}
                                        d="M31.75 101.089C29.028 96.97 25.374 94.7 21.459 94.7s-7.569 2.27-10.291 6.389a.871.871 0 0 0 0 .958c2.722 4.119 6.376 6.389 10.291 6.389s7.569-2.27 10.291-6.389a.87.87 0 0 0 0-.958zM21.459 106.7c-3.16 0-6.168-1.814-8.514-5.128 2.343-3.314 5.35-5.128 8.514-5.128s6.168 1.814 8.514 5.128c-2.346 3.312-5.349 5.128-8.514 5.128z"
                                        transform="translate(-822 -420.048) translate(-54 149.088) translate(876 273) translate(-11.025 -94.7)"
                                    />
                                </g>
                            </g>
                        </g>
                        <g fill={color} stroke="#fff" transform="translate(-822 -420.048) translate(827.859 424.38)">
                            <circle cx="4.58" cy="4.58" r="4.58" stroke="none" />
                            <circle cx="4.58" cy="4.58" r="4.08" fill="none" />
                        </g>
                        <path
                            fill="none"
                            stroke="#707070"
                            strokeLinecap="round"
                            strokeWidth="2.25px"
                            d="M13.595 0L0 13.595"
                            transform="translate(-822 -420.048) translate(825.5 421.639)"
                        />
                        <path
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            d="M15.861 0L0 15.861"
                            transform="translate(-822 -420.048) translate(825.5 421.639)"
                        />
                    </g>
                </svg>
            </div>
        );
    }

    return (
        <div style={{ position: "relative", top: "2px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20.869" height="13.736" viewBox="0 0 20.869 13.736">
                <g>
                    <g>
                        <g>
                            <g>
                                <path
                                    fill={color}
                                    d="M31.75 101.089C29.028 96.97 25.374 94.7 21.459 94.7s-7.569 2.27-10.291 6.389a.871.871 0 0 0 0 .958c2.722 4.119 6.376 6.389 10.291 6.389s7.569-2.27 10.291-6.389a.87.87 0 0 0 0-.958zM21.459 106.7c-3.16 0-6.168-1.814-8.514-5.128 2.343-3.314 5.35-5.128 8.514-5.128s6.168 1.814 8.514 5.128c-2.346 3.312-5.349 5.128-8.514 5.128z"
                                    transform="translate(-822 -422.088) translate(-54 149.088) translate(876 273) translate(-11.025 -94.7)"
                                />
                            </g>
                        </g>
                    </g>
                    <g fill={color} stroke="#fff" transform="translate(-822 -422.088) translate(827.859 424.38)">
                        <circle cx="4.58" cy="4.58" r="4.58" stroke="none" />
                        <circle cx="4.58" cy="4.58" r="4.08" fill="none" />
                    </g>
                </g>
            </svg>
        </div>
    );
}
