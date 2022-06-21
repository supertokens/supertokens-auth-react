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

import { CSSObject } from "@emotion/react";
import Select, { components as ReactSelectComps } from "react-select";

import React, { useCallback, useContext, useEffect, useMemo } from "react";

import PhoneInputWithCountrySelect, { getCountryCallingCode, getCountries } from "react-phone-number-input/min";

import StyleContext from "../../../../../styles/styleContext";
import { InputProps } from "../../../../emailpassword/components/library/input";
import ErrorIcon from "../../../../../components/assets/errorIcon";
import { CountryCode } from "libphonenumber-js";

type PhoneNumberInputProps = {
    defaultCountry?: CountryCode;
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
    placeholder,
    value,
}: InputProps & PhoneNumberInputProps): JSX.Element {
    const styles = useContext(StyleContext);

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

    function handleChange(newValue: string) {
        if (onChange !== undefined) {
            onChange({
                id: name,
                value: newValue,
            });
        }
    }

    useEffect(() => {
        const countries = getCountries();
        for (const code of countries) {
            new Image().src = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`;
        }
    }, []);

    const errorStyle: CSSObject | undefined = hasError === true ? styles.inputError : undefined;
    /*
     * Render.
     */
    return (
        <div data-supertokens="inputContainer" css={styles.inputContainer}>
            <div data-supertokens="inputWrapper inputError" css={[styles.inputWrapper, errorStyle]}>
                <PhoneInputWithCountrySelect
                    data-supertokens="input phoneInputLibRoot"
                    countrySelectComponent={CountrySelectWithIcon}
                    css={[styles.input, styles.phoneInputLibRoot]}
                    name={name + "_text"}
                    autoFocus={autofocus}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={handleChange}
                    countryCallingCodeEditable={true}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    international={true}
                    placeholder={placeholder}
                    defaultCountry={defaultCountry}
                    smartCaret={
                        false
                        /*
                            This is set to false to avoid this bug: https://gitlab.com/catamphetamine/react-phone-number-input/-/issues/128
                            We should monitor this and update it to true whenever it's fixed
                        */
                    }
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

    const selectStyles = useMemo(
        () => ({
            menu: (provided: CSSObject) => ({
                ...provided,
                ...style.phoneInputCountryDropdown,
                // These elements are added inside CustomOption below
                // We are styling them here, to avoid emotion processing on each element (200+ countries)
                "& [data-supertokens=phoneInputCountryOptionLabel]": {
                    ...style.phoneInputCountryOptionLabel,
                },
                "& [data-supertokens=phoneInputCountryOption]": {
                    ...style.phoneInputCountryOption,
                },
                "& [data-supertokens=phoneInputCountryOptionCallingCode]": {
                    ...style.phoneInputCountryOptionCallingCode,
                },
            }),
            control: (provided: CSSObject) => ({
                ...provided,
                ...style.phoneInputCountryControl,
            }),
            valueContainer: (provided: CSSObject) => ({
                ...provided,
                ...style.phoneInputCountryValueContainer,
            }),
            dropdownIndicator: (provided: CSSObject) => ({
                ...provided,
                ...style.phoneInputCountryDropdownIndicator,
            }),
        }),
        [style]
    );
    const selectOnChange = useCallback(
        (selected) => {
            onChange(selected === null ? undefined : selected.value);
        },
        [onChange]
    );
    const components = useMemo(() => {
        const CustomOption = ({ innerProps, data, isSelected, isDisabled }: any) => {
            return !isDisabled ? (
                <div
                    {...innerProps}
                    data-supertokens="phoneInputCountryOption"
                    onTouchEnd={(ev) => {
                        // We need to stop propagation here, to prevent the menu closing before the click is fired
                        ev.stopPropagation();
                    }}
                    aria-selected={isSelected}>
                    <Icon country={data.value} label={data.label} />
                    <span data-supertokens="phoneInputCountryOptionLabel">{data.label}</span>
                    {data.value && (
                        <span data-supertokens="phoneInputCountryOptionCallingCode">
                            +{getCountryCallingCode(data.value)}
                        </span>
                    )}
                </div>
            ) : null;
        };
        const Control = ({ children, ...rest }: any) => {
            return (
                <ReactSelectComps.SingleValue
                    data-supertokens="phoneInputCountrySelect"
                    css={style.phoneInputCountrySelect}
                    {...rest}>
                    <Icon country={rest.getValue()[0]?.value} label={children} />
                </ReactSelectComps.SingleValue>
            );
        };
        return { Option: CustomOption, SingleValue: Control, IndicatorSeparator: undefined };
    }, []);

    return (
        <Select
            options={options}
            styles={selectStyles}
            value={selectedOption}
            onChange={selectOnChange}
            components={components}
        />
    );
}

export default PhoneNumberInput;

// TODO: type props
export const phoneNumberInputWithInjectedProps = function (injectedProps: Partial<PhoneNumberInputProps>) {
    return (props: any) => <PhoneNumberInput {...injectedProps} {...props} />;
};
