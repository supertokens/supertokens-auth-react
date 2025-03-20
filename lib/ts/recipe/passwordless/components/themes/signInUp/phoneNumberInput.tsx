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
import intlTelInput from "intl-tel-input";
import phoneNumberInputLibStyles from "intl-tel-input/build/css/intlTelInput.css";
import { useCallback, useEffect, useRef } from "react";

import ErrorIcon from "../../../../../components/assets/errorIcon";
import { ST_ROOT_ID } from "../../../../../constants";

import type { InputProps } from "../../../../emailpassword/components/library/input";

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
            onInputFocus(value);
        }
    }

    function handleBlur() {
        if (onInputBlur !== undefined) {
            onInputBlur(value);
        }
    }

    const handleChange = useCallback(
        (newValue: string) => {
            onChange(newValue);
        },
        [onChange]
    );

    const handleCountryChange = useCallback(
        (ev: any) => {
            onChange(ev.target.value);
        },
        [onChange]
    );

    const inputRef = useRef<HTMLInputElement | null>(null);
    const itiRef = useRef<intlTelInput.Plugin | null>(null);

    useEffect(() => {
        if (inputRef.current !== null && inputRef.current.value !== value && itiRef.current) {
            itiRef.current.setNumber(value);
        }
    }, [itiRef, value]);

    useEffect(() => {
        if (inputRef.current !== null && itiRef.current === null) {
            itiRef.current = intlTelInput(inputRef.current, {
                initialCountry: defaultCountry,
                nationalMode: false,
                preferredCountries: defaultCountry ? [defaultCountry] : [],
            });

            if (value.length > 0) {
                itiRef.current.setNumber(value);
            } else if (defaultCountry === undefined) {
                // We set the country to an empty string, because this will display the Unknown flag
                // instead of the first one in the list
                itiRef.current.setCountry("");
            } else {
                // if we get here that means that value is empty and defaultCountry is not undefined
                const data = itiRef.current.getSelectedCountryData();
                // In this case we want to also signal to the embedding form that we are prefilling this.
                handleChange("+" + data.dialCode);
            }

            // This is a workaround, since the lib adds the dropdown to the body directly,
            // if it detects a mobile environment, but this doesn't work with our styling if we use shadow dom
            const anyIti = itiRef as any;
            if (anyIti.isMobile) {
                const root = document.getElementById(ST_ROOT_ID);

                // We only have to do this if we are using shadowDom and we need access to the dom element anyway
                // so passing the shadowroot element here would be both impractical and not too useful
                if (root?.shadowRoot) {
                    // We can't set the shadowRoot directly as the dropdownContainer, because we need to add a style to it
                    const container = root.shadowRoot.querySelector("[data-supertokens~=container]");

                    if (!container) {
                        throw new Error("Should never happen: container element not found");
                    }

                    container.classList.add("iti-mobile");
                    anyIti.options.dropdownContainer = container;
                }
            }
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
                    data-supertokens={`input input-${name}`}
                    name={name + "_text"}
                    autoFocus={autofocus}
                    autoComplete={autoComplete}
                    onChange={(ev) => {
                        // We do this to ensure that country detection starts working as soon as the user starts typing.
                        // This also replicates how the old lib worked (automatically formatting to an international number)
                        if (ev.target.value.trim().length > 0 && !ev.target.value.trim().startsWith("+")) {
                            ev.target.value = "+" + ev.target.value.trim();
                        }

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
