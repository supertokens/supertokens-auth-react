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
// import phoneNumberInputLibStyles from "react-phone-number-input/style.css";
import phoneNumberInputLibStyles from "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";

// eslint-disable no-unused-vars
import React, { useCallback, useEffect, useRef } from "react";

import { InputProps } from "../../../../emailpassword/components/library/input";
import ErrorIcon from "../../../../../components/assets/errorIcon";

type PhoneNumberInputProps = {
    defaultCountry?: string;
};

/*
 * Component.
 */
function PhoneNumberInput({
    defaultCountry,
    autoComplete,
    autofocus,
    name,
    onInputBlur,
    onInputFocus,
    onChange,
    hasError,
    value,
}: InputProps & PhoneNumberInputProps): JSX.Element {
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
                value: value,
            });
        }
    }

    const onChangeRef = useRef(onChange);
    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    const handleChange = useCallback(
        (newValue: string) => {
            if (onChangeRef.current !== undefined) {
                onChangeRef.current({
                    id: name,
                    value: newValue,
                });
            }
        },
        [onChangeRef]
    );

    const handleCountryChange = useCallback(
        (ev) => {
            if (onChangeRef.current !== undefined) {
                onChangeRef.current({
                    id: name,
                    value: ev.target.value,
                });
            }
        },
        [onChangeRef]
    );

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current !== null && inputRef.current.dataset["intl-tel-input-id"] === undefined) {
            inputRef.current.value = value;
            intlTelInput(inputRef.current, {
                initialCountry: defaultCountry,
                nationalMode: false,
                preferredCountries: defaultCountry ? [defaultCountry] : [],
            });
            inputRef.current.addEventListener("countrychange", handleCountryChange);
        }
    }, []);

    /* eslint-disable react/jsx-no-literals */
    /*
     * Render.
     */
    return (
        <div data-supertokens="inputContainer">
            <style type="text/css">
                {phoneNumberInputLibStyles}
                {`
                    .iti__flag {background-image: url("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/img/flags.png");}

                    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                        .iti__flag {background-image: url("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/img/flags@2x.png");}
                    }
                `}
            </style>
            <div data-supertokens={`phoneInputWrapper inputWrapper ${hasError ? "inputError" : ""}`}>
                <input
                    type="tel"
                    data-supertokens="input"
                    name={name + "_text"}
                    autoFocus={autofocus}
                    autoComplete={autoComplete}
                    onChange={(ev) => {
                        handleChange(ev.target.value);
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    ref={inputRef}
                />
                {hasError === true && (
                    <div data-supertokens="inputAdornment inputAdornmentError">
                        <ErrorIcon />
                    </div>
                )}
            </div>
        </div>
    );
    /* eslint-enable react/jsx-no-literals */
}

export default PhoneNumberInput;

// TODO: type props
export const phoneNumberInputWithInjectedProps = function (injectedProps: Partial<PhoneNumberInputProps>) {
    return (props: any) => <PhoneNumberInput {...injectedProps} {...props} />;
};
