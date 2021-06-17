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
 * defaultEmailValidator.
 */

export async function defaultEmailValidator(value: any): Promise<string | undefined> {
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

/*
 * defaultPasswordValidator.
 * min 8 characters.
 * Contains lowercase, uppercase, and numbers.
 */

export async function defaultPasswordValidator(value: any): Promise<string | undefined> {
    if (typeof value !== "string") {
        return "Password must be of type string";
    }

    // length >= 8 && < 100
    // must have a number and a character
    // as per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438

    if (value.length < 8) {
        return "Password must contain at least 8 characters, including a number";
    }

    if (value.length >= 100) {
        return "Password's length must be lesser than 100 characters";
    }

    if (value.match(/^.*[A-Za-z]+.*$/) === null) {
        return "Password must contain at least one alphabet";
    }

    if (value.match(/^.*[0-9]+.*$/) === null) {
        return "Password must contain at least one number";
    }

    return undefined;
}

/*
 * defaultLoginPasswordValidator.
 * type string
 */

export async function defaultLoginPasswordValidator(value: any): Promise<string | undefined> {
    if (typeof value !== "string") {
        return "Password must be of type string";
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
