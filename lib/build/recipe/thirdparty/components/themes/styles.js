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
/** @jsx jsx */
var chroma_js_1 = __importDefault(require("chroma-js"));
var styles_1 = require("../../../../styles/styles");
var providerColors = {
    google: "#ea3721",
    github: "#000",
    facebook: "#274483",
    twitter: "#008dd1",
    apple: "#07093c",
    custom: "#FFF",
};
function getStyles(palette) {
    var baseStyles = styles_1.getDefaultStyles(palette);
    var recipeStyles = {
        row: {
            paddingBottom: "30px",
        },
        providerContainer: {
            paddingTop: "9px",
            paddingBottom: "9px",
        },
        providerButton: {
            display: "flex",
            flexDirection: "row",
        },
        providerButtonLeft: {
            width: "34px",
        },
        providerButtonLogo: {
            height: "30px",
            display: "flex",
            borderRight: "1px solid rgba(255, 255, 255, 0.6)",
        },
        providerButtonLogoCenter: {
            margin: "auto",
        },
        providerButtonText: {
            marginTop: "auto",
            marginBottom: "auto",
            textAlign: "center",
            marginLeft: "20%",
            justifyContent: "center",
            "@media (max-width: 380px)": {
                marginLeft: "10%",
            },
        },
        providerGoogle: styles_1.getButtonStyle(providerColors.google),
        providerGithub: styles_1.getButtonStyle(providerColors.github, true),
        providerTwitter: styles_1.getButtonStyle(providerColors.twitter),
        providerFacebook: styles_1.getButtonStyle(providerColors.facebook),
        providerApple: styles_1.getButtonStyle(providerColors.apple, true),
        providerCustom: __assign({}, styles_1.getButtonStyle(providerColors.custom), {
            color: "#000",
            border: "1px solid #000",
            "&:active": {
                outline: "none",
                border: "1px solid #000",
                backgroundColor: chroma_js_1.default(providerColors.custom).darken(0.1).hex(),
                transition: "background 0s",
                backgroundSize: "100%",
            },
            "&:focus": {
                outline: "none",
                border: "1px solid #000",
            },
        }),
    };
    return styles_1.getMergedStyles(baseStyles, recipeStyles);
}
exports.getStyles = getStyles;
//# sourceMappingURL=styles.js.map
