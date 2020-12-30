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
exports["default"] = FormRow;

var _react = require("@emotion/react");

var _react2 = _interopRequireWildcard(require("react"));

var _styleContext = _interopRequireDefault(require("../styles/styleContext"));

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

/*
 * Component.
 */
function FormRow(_ref) {
    var children = _ref.children,
        hasError = _ref.hasError;

    /*
     * Render.
     */
    var styles = (0, _react2.useContext)(_styleContext["default"]);
    var errorStyle =
        hasError === true
            ? {
                  paddingBottom: "0px"
              }
            : {};
    return (0, _react.jsx)(
        "div",
        {
            className: "formRow",
            css: [
                styles.formRow,
                errorStyle,
                process.env.NODE_ENV === "production" ? "" : ";label:FormRow;",
                process.env.NODE_ENV === "production"
                    ? ""
                    : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvbGlicmFyeS9mb3JtUm93LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpRGlDIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3RzL3JlY2lwZS9lbWFpbHBhc3N3b3JkL2NvbXBvbmVudHMvbGlicmFyeS9mb3JtUm93LnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAoYykgMjAyMCwgVlJBSSBMYWJzIGFuZC9vciBpdHMgYWZmaWxpYXRlcy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuICogXCJMaWNlbnNlXCIpIGFzIHB1Ymxpc2hlZCBieSB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24uXG4gKlxuICogWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5XG4gKiBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuICogdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLypcbiAqIEltcG9ydHMuXG4gKi9cblxuLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU3R5bGVDb250ZXh0IGZyb20gXCIuLi9zdHlsZXMvc3R5bGVDb250ZXh0XCI7XG5cbi8qXG4gKiBQcm9wcy5cbiAqL1xuXG50eXBlIEZvcm1Sb3dQcm9wcyA9IHtcbiAgICBjaGlsZHJlbjogSlNYLkVsZW1lbnQ7XG4gICAgaGFzRXJyb3I/OiBib29sZWFuO1xufTtcblxuLypcbiAqIENvbXBvbmVudC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGb3JtUm93KHsgY2hpbGRyZW4sIGhhc0Vycm9yIH06IEZvcm1Sb3dQcm9wcyk6IEpTWC5FbGVtZW50IHtcbiAgICAvKlxuICAgICAqIFJlbmRlci5cbiAgICAgKi9cbiAgICBjb25zdCBzdHlsZXMgPSB1c2VDb250ZXh0KFN0eWxlQ29udGV4dCk7XG4gICAgY29uc3QgZXJyb3JTdHlsZSA9XG4gICAgICAgIGhhc0Vycm9yID09PSB0cnVlXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmdCb3R0b206IFwiMHB4XCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB7fTtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1Sb3dcIiBjc3M9e1tzdHlsZXMuZm9ybVJvdywgZXJyb3JTdHlsZV19PlxuICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIl19 */"
            ]
        },
        children
    );
}
