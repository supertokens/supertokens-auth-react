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
import { CSSInterpolation } from "@emotion/serialize/types/index";
import { defaultStyles } from "../../styles/styles";

/*
 * Props.
 */

type ButtonProps = {
    style: CSSInterpolation;
    label: string;
    isLoading: boolean;
    disabled?: boolean;
    type: "submit" | "button" | "reset" | undefined;
};

/*
 * Component.
 */

export default function Button(props: ButtonProps): JSX.Element {
    let { style, type, label, disabled, isLoading } = props;
    if (disabled === undefined) {
        disabled = false;
    }
    return (
        <button type={type} disabled={disabled} css={[defaultStyles.button, style]} className="button">
            {label}
            {isLoading && "..."}
        </button>
    );
}
