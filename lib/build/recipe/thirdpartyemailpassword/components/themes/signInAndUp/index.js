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
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var react_3 = require("react");
var styleContext_1 = __importStar(require("../../../../../styles/styleContext"));
var themeBase_1 = require("../themeBase");
var header_1 = require("./header");
var signInAndUp_1 = __importDefault(require("../../../../thirdparty/components/features/signInAndUp"));
var signInAndUp_2 = __importDefault(require("../../../../emailpassword/components/features/signInAndUp"));
var signInAndUpForm_1 = require("../../themes/signInAndUp/signInAndUpForm");
var providersForm_1 = require("../../../../thirdparty/components/themes/signInAndUp/providersForm");
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../styles");
var utils_1 = require("../../../../../utils");
var SuperTokensBranding_1 = require("../../../../../components/SuperTokensBranding");
var translationContext_1 = require("../../../../../components/translationContext");
var SignInAndUpTheme = function (props) {
    var show = utils_1.getQueryParams("show");
    var isSignUpConf = props.config.signInAndUpFeature.defaultToSignUp;
    if (show !== null) {
        isSignUpConf = show === "signup";
    }
    var _a = react_2.useState(isSignUpConf),
        isSignUp = _a[0],
        setIsSignUp = _a[1];
    var t = translationContext_1.useTranslation();
    var styles = react_2.useContext(styleContext_1.default);
    return react_1.jsx(
        "div",
        { "data-supertokens": "container", css: styles.container },
        react_1.jsx(
            "div",
            { "data-supertokens": "row", css: styles.row },
            react_1.jsx(header_1.Header, { isSignUp: isSignUp, setIsSignUp: setIsSignUp }),
            props.thirdPartyRecipe !== undefined &&
                react_1.jsx(
                    react_3.Fragment,
                    null,
                    react_1.jsx(
                        signInAndUp_1.default,
                        { recipe: props.thirdPartyRecipe, history: props.history, isEmbedded: true },
                        react_1.jsx(
                            providersForm_1.ProvidersForm,
                            // Seed props. Real props will be given by parent feature.
                            __assign({}, {})
                        )
                    )
                ),
            props.config.disableEmailPassword !== true &&
                props.thirdPartyRecipe !== undefined &&
                react_1.jsx(
                    "div",
                    {
                        "data-supertokens": "thirdPartyEmailPasswordDivider",
                        css: styles.thirdPartyEmailPasswordDivider,
                    },
                    react_1.jsx("div", { "data-supertokens": "divider", css: styles.divider }),
                    react_1.jsx(
                        "div",
                        {
                            "data-supertokens": "thirdPartyEmailPasswordDividerOr",
                            css: styles.thirdPartyEmailPasswordDividerOr,
                        },
                        t("THIRD_PARTY_EMAIL_PASSWORD_SIGN_IN_AND_UP_DIVIDER_OR")
                    ),
                    react_1.jsx("div", { "data-supertokens": "divider", css: styles.divider })
                ),
            props.emailPasswordRecipe !== undefined &&
                react_1.jsx(
                    signInAndUp_2.default,
                    { recipe: props.emailPasswordRecipe, history: props.history, isEmbedded: true },
                    react_1.jsx(
                        signInAndUpForm_1.SignInAndUpForm,
                        // Seed props. Real props will be given by parent feature.
                        __assign({}, {}, { isSignUp: isSignUp })
                    )
                )
        ),
        react_1.jsx(SuperTokensBranding_1.SuperTokensBranding, null)
    );
};
function SignInAndUpThemeWrapper(props) {
    var hasFont = styles_1.hasFontDefined(props.config.rootStyle);
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
}
exports.default = SignInAndUpThemeWrapper;
