"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var NormalisedURLPath = /** @class */ (function () {
    function NormalisedURLPath(url) {
        var _this = this;
        this.startsWith = function (other) {
            return _this.value.startsWith(other.value);
        };
        this.appendPath = function (other) {
            return new NormalisedURLPath(_this.value + other.value);
        };
        this.getAsStringDangerous = function () {
            // In case path is empty, add slash.
            if (_this.value.length === 0) {
                return "/";
            }
            // Otherwise, return value.
            return _this.value;
        };
        this.value = normaliseURLPathOrThrowError(url);
    }
    return NormalisedURLPath;
})();
exports.default = NormalisedURLPath;
function normaliseURLPathOrThrowError(input) {
    input = input.trim().toLowerCase();
    try {
        if (!input.startsWith("http://") && !input.startsWith("https://")) {
            throw new Error("converting to proper URL");
        }
        var urlObj = new URL(input);
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
exports.normaliseURLPathOrThrowError = normaliseURLPathOrThrowError;
function domainGiven(input) {
    // If no dot, return false.
    if (input.indexOf(".") === -1 || input.startsWith("/")) {
        return false;
    }
    try {
        var url = new URL(input);
        return url.hostname.indexOf(".") !== -1;
    } catch (e) {}
    try {
        var url = new URL("http://" + input);
        return url.hostname.indexOf(".") !== -1;
    } catch (e) {}
    return false;
}
//# sourceMappingURL=normalisedURLPath.js.map
