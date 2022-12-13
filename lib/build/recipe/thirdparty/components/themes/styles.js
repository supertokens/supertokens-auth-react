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
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStyles = void 0;
var chroma_js_1 = __importDefault(require("chroma-js"));
var styles_1 = require("../../../../styles/styles");
var defaultProviderButtonStyle = (0, styles_1.getButtonStyle)("white", "black");
function getStyles(palette) {
    var baseStyles = (0, styles_1.getDefaultStyles)(palette);
    var recipeStyles = {
        row: {
            paddingBottom: "30px",
        },
        providerContainer: {
            paddingTop: "9px",
            paddingBottom: "9px",
        },
        providerButton: {
            // Default button height in 32
            minHeight: "32px",
            // this will allow the button to scale with different font sizes and text lengths
            height: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // This makes the button look somewhat cleaner if the text wraps
            padding: "2px 8px",
            borderColor: "#dddddd !important",
            "&:hover": {
                filter: "none !important",
                backgroundColor: "#fafafa",
            },
        },
        providerButtonLeft: {
            width: "34px",
            marginLeft: "66px",
        },
        providerButtonLogo: {
            height: "30px",
            display: "flex",
        },
        providerButtonLogoCenter: {
            display: "flex",
            margin: "auto",
        },
        providerButtonText: {
            fontWeight: 400,
            textAlign: "center",
            justifyContent: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            display: "inline-block",
            "&:only-child": {
                margin: "0 auto",
            },
        },
        providerGoogle: defaultProviderButtonStyle,
        providerGitHub: defaultProviderButtonStyle,
        providerTwitter: defaultProviderButtonStyle,
        providerFacebook: defaultProviderButtonStyle,
        providerApple: defaultProviderButtonStyle,
        providerCustom: __assign(__assign({}, defaultProviderButtonStyle), {
            color: "#000",
            border: "1px solid #dddddd",
            "&:active": {
                outline: "none",
                border: "1px solid #dddddd",
                backgroundColor: (0, chroma_js_1.default)("white").darken(0.1).hex(),
                transition: "background 0s",
                backgroundSize: "100%",
            },
            "&:focus": {
                outline: "none",
                border: "1px solid #dddddd",
            },
        }),
    };
    return (0, styles_1.getMergedStyles)(baseStyles, recipeStyles);
}
exports.getStyles = getStyles;
