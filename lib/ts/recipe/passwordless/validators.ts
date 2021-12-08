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

import { isValidPhoneNumber } from "react-phone-number-input/min";

export function defaultEmailValidator(value: any): string | undefined {
    if (typeof value !== "string") {
        return "Email must be of type string";
    }

    const defaultEmailValidatorRegexp =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // We check if the email syntax is correct
    // As per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
    // Regex from https://stackoverflow.com/a/46181/3867175

    if (value.match(defaultEmailValidatorRegexp) === null) {
        return "Email is invalid";
    }

    return undefined;
}

export function defaultPhoneNumberValidator(value: string) {
    if (typeof value !== "string") {
        return "Phone number must be of type string";
    }
    if (!isValidPhoneNumber(value)) {
        return "Phone number is invalid";
    }
    return undefined;
}

export async function userInputCodeValidate(value: any): Promise<string | undefined> {
    if (typeof value !== "string") {
        return "OTP must be of type string";
    }

    if (value.length === 0) {
        return "OTP cannot be empty";
    }

    return undefined;
}
