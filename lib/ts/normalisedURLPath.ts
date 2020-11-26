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

export default class NormalisedURLPath {
    private value: string;

    constructor(url: string) {
        this.value = normaliseURLPathOrThrowError(url);
    }

    startsWith = (other: NormalisedURLPath): boolean => {
        return this.value.startsWith(other.value);
    };

    appendPath = (other: NormalisedURLPath): NormalisedURLPath => {
        return new NormalisedURLPath(this.value + other.value);
    };

    getAsStringDangerous = (): string => {
        return this.value;
    };
}

export function normaliseURLPathOrThrowError(input: string): string {
    input = input.trim().toLowerCase();

    try {
        if (!input.startsWith("http://") && !input.startsWith("https://")) {
            throw new Error("converting to proper URL");
        }
        const urlObj: URL = new URL(input);
        input = urlObj.pathname;

        if (input.charAt(input.length - 1) === "/") {
            return input.substr(0, input.length - 1);
        }

        return input;
        // eslint-disable-next-line no-empty
    } catch (err) {}
    // not a valid URL
    // If the input contains a . it means they have given a domain name.
    // So we try assuming that they have given a domain name + path
    if (
        (domainGiven(input) || input.startsWith("localhost")) &&
        !input.startsWith("http://") &&
        !input.startsWith("https://")
    ) {
        input = "http://" + input;
        return normaliseURLPathOrThrowError(input);
    }

    if (input.charAt(0) !== "/") {
        input = "/" + input;
    }

    // at this point, we should be able to convert it into a fake URL and recursively call this function.
    try {
        // test that we can convert this to prevent an infinite loop
        new URL("http://example.com" + input);
        return normaliseURLPathOrThrowError("http://example.com" + input);
    } catch (err) {
        throw new Error("Please provide a valid URL path");
    }
}

function domainGiven(input: string): boolean {
    const indexOfDot = input.indexOf(".");

    // If no dot, return false.
    if (indexOfDot === -1) {
        return false;
    }

    const indexOfSlash = input.indexOf("/");
    // If no slash and a dot, return true.
    if (indexOfSlash === -1) {
        return true;
    }

    // Otherwise, return true only if index of dot is before index of slash.
    return indexOfDot < indexOfSlash;
}
