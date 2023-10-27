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

import { useState } from "react";

import { useTranslation } from "../../../..";
import CheckedIcon from "../../../../components/assets/checkedIcon";
import ErrorIcon from "../../../../components/assets/errorIcon";
import ShowPasswordIcon from "../../../../components/assets/showPasswordIcon";

import type { APIFormField } from "../../../../types";
import type { ChangeEvent } from "react";

export type InputProps = {
    type: string;
    name: string;
    autofocus?: boolean;
    autoComplete?: string;
    validated: boolean;
    hasError: boolean;
    placeholder: string;
    value: string;
    onInputBlur?: (field: APIFormField) => void;
    onInputFocus?: (field: APIFormField) => void;
    onChange?: (field: APIFormField) => void;
};

const Input: React.FC<InputProps> = ({
    type,
    name,
    hasError,
    autoComplete,
    onInputFocus,
    onInputBlur,
    onChange,
    value,
    placeholder,
    validated,
    autofocus,
}) => {
    const t = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    /*
     * Method.
     */

    function handleFocus() {
        if (onInputFocus !== undefined) {
            onInputFocus({
                id: name,
                value: value,
            });
        }
    }

    function handleBlur() {
        if (onInputBlur !== undefined) {
            onInputBlur({
                id: name,
                value,
            });
        }
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        if (onChange) {
            onChange({
                id: name,
                value: event.target.value,
            });
        }
    }

    if (autoComplete === undefined) {
        autoComplete = "off";
    }

    let inputType = type;
    if (type === "password" && showPassword === true) {
        inputType = "text";
    }

    return (
        <div data-supertokens="inputContainer">
            <div data-supertokens={["inputWrapper", hasError ? "inputError" : ""].join(" ")}>
                <input
                    autoFocus={autofocus}
                    autoComplete={autoComplete}
                    data-supertokens="input"
                    className="supertokens-input"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    type={inputType}
                    name={name}
                    placeholder={t(placeholder)}
                    onChange={handleChange}
                    value={value}
                />
                {hasError === true && (
                    <div data-supertokens="inputAdornment inputAdornmentError">
                        <ErrorIcon />
                    </div>
                )}
                {validated === true && hasError === false && (
                    <div data-supertokens="inputAdornment inputAdornmentSuccess">
                        <CheckedIcon />
                    </div>
                )}
                {type === "password" && value.length > 0 && (
                    <div
                        onClick={() => setShowPassword(showPassword === false)}
                        data-supertokens="inputAdornment showPassword">
                        <ShowPasswordIcon showPassword={showPassword} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;
