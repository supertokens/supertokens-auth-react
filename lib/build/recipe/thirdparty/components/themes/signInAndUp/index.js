"use strict";
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
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
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
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var styleContext_1 = __importStar(require("../../../../../styles/styleContext"));
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../../../components/themes/styles");
var styles_3 = require("../../../../../styles/styles");
var signUpFooter_1 = require("./signUpFooter");
var themeBase_1 = require("../themeBase");
var providersForm_1 = require("./providersForm");
var SuperTokensBranding_1 = require("../../../../../components/SuperTokensBranding");
var __1 = require("../../../../..");
var generalError_1 = __importDefault(require("../../../../emailpassword/components/library/generalError"));
var SignInAndUpTheme = function (props) {
    var t = __1.useTranslation();
    var styles = react_2.useContext(styleContext_1.default);
    return react_1.jsx(
        "div",
        { "data-supertokens": "container", css: styles.container },
        react_1.jsx(
            "div",
            { "data-supertokens": "row", css: styles.row },
            react_1.jsx(
                "div",
                { "data-supertokens": "headerTitle", css: styles.headerTitle },
                t("THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE")
            ),
            react_1.jsx("div", { "data-supertokens": "divider", css: styles.divider }),
            props.featureState.error && react_1.jsx(generalError_1.default, { error: props.featureState.error }),
            react_1.jsx(providersForm_1.ProvidersForm, __assign({}, props)),
            react_1.jsx(signUpFooter_1.SignUpFooter, {
                privacyPolicyLink: props.config.signInAndUpFeature.privacyPolicyLink,
                termsOfServiceLink: props.config.signInAndUpFeature.termsOfServiceLink,
            })
        ),
        react_1.jsx(SuperTokensBranding_1.SuperTokensBranding, null)
    );
};
var SignInAndUpThemeWrapper = function (props) {
    var hasFont = styles_3.hasFontDefined(props.config.rootStyle);
    return react_1.jsx(
        themeBase_1.ThemeBase,
        { loadDefaultFont: !hasFont },
        react_1.jsx(
            styleContext_1.StyleProvider,
            {
                rawPalette: props.config.palette,
                defaultPalette: styles_1.defaultPalette,
                styleFromInit: props.config.signInAndUpFeature.style,
                rootStyleFromInit: props.config.rootStyle,
                getDefaultStyles: styles_2.getStyles,
            },
            react_1.jsx(SignInAndUpTheme, __assign({}, props))
        )
    );
};
exports.default = SignInAndUpThemeWrapper;
