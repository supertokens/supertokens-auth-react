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
import { forwardRef, RefObject } from "react";
import { defaultStyles } from "../../styles/styles";
import { APIFormField } from "../../../../types";
import { InputAdornment } from ".";
import { AdornmentType } from "./inputAdornment";

/*
 * Props.
 */

type InputProps = {
    style?: CSSInterpolation;
    errorStyle?: CSSInterpolation;
    validated: boolean;
    type: string;
    name: string;
    hasError: boolean;
    placeholder: string;
    ref: RefObject<any>;
    onChange?: (field: APIFormField) => void;
};

/*
 * Component.
 */

function Input(props: InputProps, ref: RefObject<any>): JSX.Element {
    /*
     * Props.
     */
    let { style, type, name, hasError, errorStyle, onChange, placeholder, validated } = props;

    if (hasError !== true) {
        errorStyle = undefined;
    } else {
        errorStyle = Object.assign(defaultStyles.inputError, errorStyle);
    }

    let adornmentType: AdornmentType = undefined;

    if (validated) {
        adornmentType = hasError ? "error" : "success";
    }

    /*
     * Method.
     */
    function handleChange() {
        if (onChange) {
            onChange({
                id: ref.current.name,
                value: ref.current.value
            });
        }
    }

    /*
     * Render.
     */
    return (
        <div css={[defaultStyles.inputWrapper, style, errorStyle]}>
            <input
                css={defaultStyles.input}
                onFocus={handleChange}
                type={type}
                name={name}
                placeholder={placeholder}
                ref={ref}
            />
            <InputAdornment type={adornmentType} />
        </div>
    );
}

export default forwardRef(Input);
