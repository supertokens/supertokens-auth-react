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

import { CountryData } from "intl-tel-input";
import { WindowHandlerReference } from "supertokens-website/lib/build/utils/windowHandler";
const phoneNumberUtilsImport = import("intl-tel-input/build/js/utils");

export function defaultEmailValidator(value: any): string | undefined {
    if (typeof value !== "string") {
        return "GENERAL_ERROR_EMAIL_NON_STRING";
    }

    value = value.trim();

    const defaultEmailValidatorRegexp =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // We check if the email syntax is correct
    // As per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
    // Regex from https://stackoverflow.com/a/46181/3867175

    if (value.match(defaultEmailValidatorRegexp) === null) {
        return "GENERAL_ERROR_EMAIL_INVALID";
    }

    return undefined;
}

export async function defaultPhoneNumberValidator(value: string) {
    if (typeof value !== "string") {
        return "GENERAL_ERROR_PHONE_NON_STRING";
    }

    value = value.trim();

    await phoneNumberUtilsImport;

    if (!intlTelInputUtils.isValidNumber(value, undefined as any)) {
        return "GENERAL_ERROR_PHONE_INVALID";
    }
    return undefined;
}

export function defaultEmailValidatorForCombinedInput(value: any): string | undefined {
    if (typeof value !== "string") {
        return "GENERAL_ERROR_EMAIL_OR_PHONE_NON_STRING";
    }
    value = value.trim();

    const defaultEmailValidatorRegexp =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // We check if the email syntax is correct
    // As per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
    // Regex from https://stackoverflow.com/a/46181/3867175

    if (value.match(defaultEmailValidatorRegexp) === null) {
        return "GENERAL_ERROR_EMAIL_OR_PHONE_INVALID";
    }

    return undefined;
}

export async function defaultPhoneNumberValidatorForCombinedInput(value: string) {
    if (typeof value !== "string") {
        return "GENERAL_ERROR_EMAIL_OR_PHONE_NON_STRING";
    }

    value = value.trim();

    await phoneNumberUtilsImport;
    if (!intlTelInputUtils.isValidNumber(value, undefined as any)) {
        return "GENERAL_ERROR_EMAIL_OR_PHONE_INVALID";
    }
    return undefined;
}

export async function userInputCodeValidate(value: any): Promise<string | undefined> {
    if (typeof value !== "string") {
        return "GENERAL_ERROR_OTP_NON_STRING";
    }

    if (value.length === 0) {
        return "GENERAL_ERROR_OTP_EMPTY";
    }

    return undefined;
}

/*
 * defaultValidate
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function defaultValidate(_: any): Promise<string | undefined> {
    return undefined;
}

export async function defaultGuessInternationPhoneNumberFromInputPhoneNumber(
    value: string,
    defaultCountryFromConfig?: string
) {
    if (value === undefined || value.length === 0) {
        return value;
    }
    await phoneNumberUtilsImport;
    const libGuess = intlTelInputUtils.formatNumber(
        value,
        defaultCountryFromConfig!,
        intlTelInputUtils.numberFormat.E164
    );

    if (intlTelInputUtils.isValidNumber(libGuess, defaultCountryFromConfig!)) {
        return libGuess;
    }

    // TODO: review this list (numbers in other charsets)
    const phoneNumberCharCount = (value.match(/(\d|[+\-().])/g) || []).length;

    // If the number of valid characters for a phonenumber is less than half the input we assume it's not a phone number.
    // I.e.: if less than half of the input is numbers or in: "+-()."
    if (value.includes("@") || phoneNumberCharCount < value.length / 2) {
        return undefined;
    }
    // We try to make sense of it again by filtering for just numbers
    const onlyNumbers = value.replace(/\D/g, "");

    if (intlTelInputUtils.isValidNumber(onlyNumbers, defaultCountryFromConfig!)) {
        return intlTelInputUtils.formatNumber(
            onlyNumbers,
            defaultCountryFromConfig!,
            intlTelInputUtils.numberFormat.E164
        );
    }

    const countryData = window.intlTelInputGlobals.getCountryData();
    const matchingCountryCodes = countryData
        .filter((c: CountryData) => onlyNumbers.startsWith(c.dialCode))
        .map((c) => c.iso2);

    for (const code of matchingCountryCodes) {
        if (intlTelInputUtils.isValidNumber(onlyNumbers, code)) {
            return intlTelInputUtils.formatNumber(onlyNumbers, code, intlTelInputUtils.numberFormat.E164);
        }
    }
    if (defaultCountryFromConfig) {
        const defaultCountry = countryData.find((c) => c.iso2 === defaultCountryFromConfig.toLowerCase());

        if (defaultCountry) {
            return "+" + defaultCountry.dialCode + onlyNumbers;
        }
    }
    // We want to return the value as an international number because the phone number input lib expects it this way
    return "+" + onlyNumbers;
}
