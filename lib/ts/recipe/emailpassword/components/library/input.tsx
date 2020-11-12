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
import { jsx, CSSObject } from "@emotion/core";

import * as React from "react";
import { forwardRef, RefObject } from "react";
import { APIFormField } from "../../../../types";
import { InputAdornment } from ".";
import { AdornmentType } from "./inputAdornment";
import { StyleConsumer } from "../../styles/styleContext";

/*
 * Props.
 */

type InputProps = {
    style?: CSSObject;
    errorStyle?: CSSObject;
    adornmentStyle?: CSSObject;
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

function Input(
    { style, type, name, hasError, adornmentStyle, onChange, placeholder, validated, errorStyle }: InputProps,
    ref: RefObject<any>
): JSX.Element {
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
        <StyleConsumer>
            {({ defaultStyles }) => {
                if (hasError !== true) {
                    errorStyle = undefined;
                } else {
                    errorStyle = {
                        ...defaultStyles.inputError,
                        ...errorStyle
                    };
                }

                let adornmentType: AdornmentType = undefined;

                if (validated) {
                    adornmentType = hasError ? "error" : "success";
                }

                return (
                    <div className="inputWrapper" css={[defaultStyles.inputWrapper]}>
                        <input
                            className="input inputError"
                            css={[defaultStyles.input, style, errorStyle]}
                            onFocus={handleChange}
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            ref={ref}
                        />
                        <InputAdornment style={adornmentStyle} type={adornmentType} />
                    </div>
                );
            }}
        </StyleConsumer>
    );
}

export default forwardRef(Input);
