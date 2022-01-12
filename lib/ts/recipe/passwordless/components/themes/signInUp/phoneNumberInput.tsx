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
import { CSSObject, jsx } from "@emotion/react";
import Select, { components } from "react-select";

import React, { forwardRef, ForwardRefRenderFunction, RefObject, useContext, useState } from "react";

import PhoneInputWithCountrySelect, { getCountryCallingCode } from "react-phone-number-input/min";

import StyleContext from "../../../../../styles/styleContext";
import { InputRef } from "../../../../emailpassword/types";
import { InputProps } from "../../../../emailpassword/components/library/input";
import ErrorIcon from "../../../../../components/assets/errorIcon";
import { CountryCode } from "libphonenumber-js";

type PhoneNumberInputProps = {
    defaultCountry?: CountryCode;
    initialValue?: string;
};

/*
 * Component.
 */
function PhoneNumberInput(
    {
        defaultCountry,
        autoComplete,
        autofocus,
        name,
        initialValue,
        onInputBlur,
        onInputFocus,
        hasError,
        placeholder,
    }: InputProps & PhoneNumberInputProps,
    ref: RefObject<InputRef>
): JSX.Element {
    const [phoneNumber, setPhoneNumber] = useState<string>(initialValue || "");

    const styles = useContext(StyleContext);

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

    const errorStyle: CSSObject | undefined = hasError === true ? styles.inputError : undefined;
    /*
     * Render.
     */
    return (
        <div data-supertokens="inputContainer" css={styles.inputContainer}>
            <div data-supertokens="inputWrapper inputError" css={[styles.inputWrapper, errorStyle]}>
                <input type="hidden" ref={ref} value={phoneNumber} name={name} />
                <PhoneInputWithCountrySelect
                    data-supertokens="input phoneInputLibRoot"
                    countrySelectComponent={CountrySelectWithIcon}
                    css={[styles.input, styles.phoneInputLibRoot]}
                    name={name + "_text"}
                    autoFocus={autofocus}
                    autoComplete={autoComplete}
                    value={phoneNumber}
                    onChange={(newValue: string) => setPhoneNumber(newValue === undefined ? "" : newValue)}
                    countryCallingCodeEditable={true}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    international={true}
                    placeholder={placeholder}
                    defaultCountry={defaultCountry}
                />
                {hasError === true && (
                    <div
                        data-supertokens="inputAdornment inputAdornmentError"
                        css={[styles.inputAdornment, styles.inputAdornmentError]}>
                        <ErrorIcon color={styles.palette.colors.error} />
                    </div>
                )}
            </div>
        </div>
    );
}

function CountrySelectWithIcon({
    value,
    options,
    iconComponent: Icon,
    onChange,
}: {
    value: string;
    options: { value: string; label: string; divider: boolean }[];
    iconComponent: React.ComponentClass<any>;
    onChange: (newValue: string | undefined) => void;
}) {
    const style = useContext(StyleContext);

    const selectedOption = options.find((o) => o.value === value);

    const CustomOption = ({ innerProps, data, isSelected, isDisabled }: any) => {
        return !isDisabled ? (
            <div
                {...innerProps}
                data-supertokens="phoneInputCountryOption"
                css={style.phoneInputCountryOption}
                aria-selected={isSelected}>
                <Icon country={data.value} label={data.label} />
                <span data-supertokens="phoneInputCountryOptionLabel" css={style.phoneInputCountryOptionLabel}>
                    {data.label}
                </span>
                {data.value && (
                    <span
                        data-supertokens="phoneInputCountryOptionCallingCode"
                        css={style.phoneInputCountryOptionCallingCode}>
                        +{getCountryCallingCode(data.value)}
                    </span>
                )}
            </div>
        ) : null;
    };
    const Control = ({ children, ...rest }: any) => {
        return (
            <components.SingleValue
                data-supertokens="phoneInputCountrySelect"
                css={style.phoneInputCountrySelect}
                {...rest}>
                <Icon country={selectedOption?.value} label={children} />
            </components.SingleValue>
        );
    };

    return (
        <Select
            options={options}
            styles={{
                menu: (provided) => ({
                    ...provided,
                    ...style.phoneInputCountryDropdown,
                }),
                control: (provided) => ({
                    ...provided,
                    ...style.phoneInputCountryControl,
                }),
                valueContainer: (provided) => ({
                    ...provided,
                    ...style.phoneInputCountryValueContainer,
                }),
                dropdownIndicator: (provided) => ({
                    ...provided,
                    ...style.phoneInputCountryDropdownIndicator,
                }),
            }}
            value={selectedOption}
            onChange={(selected) => onChange(selected === null ? undefined : selected.value)}
            components={{ Option: CustomOption, SingleValue: Control, IndicatorSeparator: undefined }}
        />
    );
}

const PhoneNumberInputWithForwardRef = forwardRef(PhoneNumberInput as ForwardRefRenderFunction<InputRef, InputProps>);
export default PhoneNumberInputWithForwardRef;

// TODO: ForwardRefExoticComponent<P & T>
function forwardRefWithInjectedProps<P, T>(Component: any, injectedProps: P) {
    return forwardRef<InputRef, T>(((props: T, ref) => {
        return <Component {...injectedProps} {...props} ref={ref} />;
    }) as ForwardRefRenderFunction<InputRef, T>);
}

export const phoneNumberInputWithInjectedProps = function (props: PhoneNumberInputProps) {
    return forwardRefWithInjectedProps<PhoneNumberInputProps, InputProps>(PhoneNumberInputWithForwardRef, props);
};
