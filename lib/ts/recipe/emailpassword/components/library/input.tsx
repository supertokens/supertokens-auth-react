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

/** @jsx jsx */
import { jsx, CSSObject } from "@emotion/react";

import { ForwardRefRenderFunction, useContext } from "react";

import { forwardRef, RefObject } from "react";
import { APIFormField } from "../../../../types";
import { InputRef } from "../../types";
import { useState } from "react";
import StyleContext from "../../../../styles/styleContext";
import ShowPasswordIcon from "../../../../components/assets/showPasswordIcon";
import CheckedIcon from "../../../../components/assets/checkedIcon";
import ErrorIcon from "../../../../components/assets/errorIcon";

/*
 * Props.
 */

type InputProps = {
    errorStyle?: CSSObject;
    type: string;
    name: string;
    autoComplete?: string;
    validated: boolean;
    hasError: boolean;
    placeholder: string;
    onInputBlur?: (field: APIFormField) => void;
    onInputFocus?: (field: APIFormField) => void;
};

/*
 * Component.
 */

function Input(
    { type, name, hasError, autoComplete, onInputFocus, onInputBlur, placeholder, validated }: InputProps,
    ref: RefObject<InputRef>
): JSX.Element {
    /*
     * State.
     */
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState("");

    /*
     * Method.
     */

    function handleFocus() {
        if (ref.current === null) {
            return;
        }

        ref.current.isFocused = true;
        if (onInputFocus !== undefined) {
            onInputFocus({
                id: ref.current.name,
                value: ref.current.value,
            });
        }
    }

    function handleBlur() {
        if (onInputBlur === undefined || ref.current === null) {
            return;
        }

        ref.current.isFocused = false;
        onInputBlur({
            id: ref.current.name,
            value: ref.current.value,
        });
    }

    function handleChange() {
        if (ref.current !== null && ref.current.value !== null) {
            setValue(ref.current.value);
        }
    }

    /*
     * Render.
     */
    const styles = useContext(StyleContext);
    const errorStyle: CSSObject | undefined = hasError === true ? styles.inputError : undefined;
    if (autoComplete === undefined) {
        autoComplete = "off";
    }

    let inputType = type;
    if (type === "password" && showPassword === true) {
        inputType = "text";
    }

    return (
        <div data-supertokens="inputContainer" css={styles.inputContainer}>
            <div data-supertokens="inputWrapper inputError" css={[styles.inputWrapper, errorStyle]}>
                <input
                    autoComplete={autoComplete}
                    data-supertokens="input"
                    css={styles.input}
                    className="supertokens-input"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    type={inputType}
                    name={name}
                    placeholder={placeholder}
                    ref={ref}
                    onChange={handleChange}
                />
                {hasError === true && (
                    <div
                        data-supertokens="inputAdornment inputAdornmentError"
                        css={[styles.inputAdornment, styles.inputAdornmentError]}>
                        <ErrorIcon color={styles.palette.colors.error} />
                    </div>
                )}
                {validated === true && hasError === false && (
                    <div
                        data-supertokens="inputAdornment inputAdornmentSuccess"
                        css={[styles.inputAdornment, styles.inputAdornmentSuccess]}>
                        <CheckedIcon color={styles.palette.colors.primary} />
                    </div>
                )}
                {type === "password" && value.length > 0 && (
                    <div
                        onClick={() => setShowPassword(showPassword === false)}
                        data-supertokens="inputAdornment showPassword"
                        css={[styles.showPassword, styles.inputAdornment]}>
                        <ShowPasswordIcon
                            primaryColor={styles.palette.colors.textPrimary}
                            secondaryColor={styles.palette.colors.inputBackground}
                            showPassword={showPassword}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default forwardRef(Input as ForwardRefRenderFunction<InputRef, InputProps>);
