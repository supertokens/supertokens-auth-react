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

export default function Checked({ color }: { color: string }): JSX.Element {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <path
                id="checked"
                fill={color}
                d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zM8.166 15.137l-4.4-4.4L5.23 9.266 8.166 12.2l6.6-6.6 1.468 1.468z"
                data-name="checked"
            />
        </svg>
    );
}
