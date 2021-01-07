"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = SignUpFooter;

var _react = _interopRequireWildcard(require("react"));

var _styleContext = _interopRequireDefault(require("../../../styles/styleContext"));

var _react2 = require("@emotion/react");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function _getRequireWildcardCache() {
        return cache;
    };
    return cache;
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || (_typeof(obj) !== "object" && typeof obj !== "function")) {
        return { default: obj };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj["default"] = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}

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

/*
 * Imports.
 */

/** @jsx jsx */
function SignUpFooter(_ref) {
    var termsOfServiceLink = _ref.termsOfServiceLink,
        privacyPolicyLink = _ref.privacyPolicyLink;
    var styles = (0, _react.useContext)(_styleContext["default"]);

    if (termsOfServiceLink === undefined && privacyPolicyLink === undefined) {
        return null;
    }

    return (0, _react2.jsx)(
        "div",
        {
            "data-supertokens": "secondaryText privacyPolicyAndTermsAndConditions",
            css: [
                styles.secondaryText,
                styles.privacyPolicyAndTermsAndConditions,
                process.env.NODE_ENV === "production" ? "" : ";label:SignUpFooter;",
                process.env.NODE_ENV === "production"
                    ? ""
                    : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvdGhlbWVzL2RlZmF1bHQvc2lnbkluQW5kVXAvU2lnblVwRm9vdGVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF5Q1kiLCJmaWxlIjoiLi4vLi4vLi4vLi4vLi4vLi4vLi4vdHMvcmVjaXBlL2VtYWlscGFzc3dvcmQvY29tcG9uZW50cy90aGVtZXMvZGVmYXVsdC9zaWduSW5BbmRVcC9TaWduVXBGb290ZXIudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IChjKSAyMDIwLCBWUkFJIExhYnMgYW5kL29yIGl0cyBhZmZpbGlhdGVzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4gKiBcIkxpY2Vuc2VcIikgYXMgcHVibGlzaGVkIGJ5IHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbi5cbiAqXG4gKiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXlcbiAqIG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKlxuICogSW1wb3J0cy5cbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHsgdXNlQ29udGV4dCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFN0eWxlQ29udGV4dCBmcm9tIFwiLi4vLi4vLi4vc3R5bGVzL3N0eWxlQ29udGV4dFwiO1xuXG4vKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaWduVXBGb290ZXIoe1xuICAgIHRlcm1zT2ZTZXJ2aWNlTGluayxcbiAgICBwcml2YWN5UG9saWN5TGlua1xufToge1xuICAgIHByaXZhY3lQb2xpY3lMaW5rPzogc3RyaW5nO1xuICAgIHRlcm1zT2ZTZXJ2aWNlTGluaz86IHN0cmluZztcbn0pOiBKU1guRWxlbWVudCB8IG51bGwge1xuICAgIGNvbnN0IHN0eWxlcyA9IHVzZUNvbnRleHQoU3R5bGVDb250ZXh0KTtcblxuICAgIGlmICh0ZXJtc09mU2VydmljZUxpbmsgPT09IHVuZGVmaW5lZCAmJiBwcml2YWN5UG9saWN5TGluayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIGRhdGEtc3VwZXJ0b2tlbnM9XCJzZWNvbmRhcnlUZXh0IHByaXZhY3lQb2xpY3lBbmRUZXJtc0FuZENvbmRpdGlvbnNcIlxuICAgICAgICAgICAgY3NzPXtbc3R5bGVzLnNlY29uZGFyeVRleHQsIHN0eWxlcy5wcml2YWN5UG9saWN5QW5kVGVybXNBbmRDb25kaXRpb25zXX0+XG4gICAgICAgICAgICBCeSBzaWduaW5nIHVwLCB5b3UgYWdyZWUgdG8gb3VyXG4gICAgICAgICAgICB7dGVybXNPZlNlcnZpY2VMaW5rICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgICAgICAgICAgIDxhIGRhdGEtc3VwZXJ0b2tlbnM9XCJsaW5rXCIgY3NzPXtzdHlsZXMubGlua30gdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj17dGVybXNPZlNlcnZpY2VMaW5rfT5cbiAgICAgICAgICAgICAgICAgICAgVGVybXMgb2YgU2VydmljZVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7dGVybXNPZlNlcnZpY2VMaW5rICE9PSB1bmRlZmluZWQgJiYgcHJpdmFjeVBvbGljeUxpbmsgIT09IHVuZGVmaW5lZCAmJiBcImFuZFwifVxuICAgICAgICAgICAge3ByaXZhY3lQb2xpY3lMaW5rICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgICAgICAgICAgIDxhIGRhdGEtc3VwZXJ0b2tlbnM9XCJsaW5rXCIgY3NzPXtzdHlsZXMubGlua30gaHJlZj17cHJpdmFjeVBvbGljeUxpbmt9IHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICAgICAgICAgICAgICBQcml2YWN5IFBvbGljeVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG4iXX0= */"
            ]
        },
        "By signing up, you agree to our",
        termsOfServiceLink !== undefined &&
            (0, _react2.jsx)(
                "a",
                {
                    "data-supertokens": "link",
                    css: styles.link,
                    target: "_blank",
                    href: termsOfServiceLink
                },
                "Terms of Service"
            ),
        termsOfServiceLink !== undefined && privacyPolicyLink !== undefined && "and",
        privacyPolicyLink !== undefined &&
            (0, _react2.jsx)(
                "a",
                {
                    "data-supertokens": "link",
                    css: styles.link,
                    href: privacyPolicyLink,
                    target: "_blank"
                },
                "Privacy Policy"
            )
    );
}
