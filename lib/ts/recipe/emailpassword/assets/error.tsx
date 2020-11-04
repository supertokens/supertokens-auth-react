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
import { jsx } from "@emotion/core";

import * as React from "react";

/*
 * Component.
 */

export default function Error({ color }: { color: string }): JSX.Element {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18">
            <g>
                <g fill={color}>
                    <path
                        d="M15.683 17.75H3.317c-.619 0-1.18-.316-1.499-.846-.32-.53-.338-1.174-.049-1.72L7.952 3.467c.309-.584.887-.933 1.548-.933.66 0 1.24.349 1.548.933l6.183 11.715c.289.547.27 1.19-.05 1.72-.319.53-.88.847-1.498.847z"
                        transform="translate(-789 -316) translate(789 316)"
                    />
                    <path
                        fill="#fff"
                        d="M9.5 2.785c-.566 0-1.062.299-1.327.8L1.99 15.3c-.247.469-.231 1.02.042 1.475.274.454.755.725 1.285.725h12.366c.53 0 1.01-.271 1.285-.725.273-.455.29-1.006.042-1.475L10.827 3.585c-.265-.501-.76-.8-1.327-.8m0-.5c.697 0 1.394.355 1.769 1.066l6.183 11.715c.703 1.332-.263 2.934-1.769 2.934H3.317c-1.506 0-2.472-1.602-1.769-2.934L7.731 3.351c.375-.71 1.072-1.066 1.769-1.066z"
                        transform="translate(-789 -316) translate(789 316)"
                    />
                </g>
                <text
                    fill="#fff"
                    fontFamily="Rubik-Bold, Rubik"
                    fontSize="12px"
                    fontWeight="700"
                    transform="translate(-789 -316) translate(796.696 330.715)">
                    <tspan x="0" y="0">
                        !
                    </tspan>
                </text>
            </g>
        </svg>
    );
}
