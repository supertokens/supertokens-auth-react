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
var React = __importStar(require("react"));
var header_1 = require("./header");
var styleContext_1 = __importStar(require("../../../../../styles/styleContext"));
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../styles");
var signInUp_1 = require("../../../../passwordless/components/themes/signInUp");
var themeBase_1 = require("../themeBase");
var __1 = require("../../../../..");
var generalError_1 = __importDefault(require("../../../../emailpassword/components/library/generalError"));
var providersForm_1 = require("../../../../thirdparty/components/themes/signInAndUp/providersForm");
var closeTabScreen_1 = require("../../../../passwordless/components/themes/signInUp/closeTabScreen");
var linkSent_1 = require("../../../../passwordless/components/themes/signInUp/linkSent");
var userInputCodeFormHeader_1 = require("../../../../passwordless/components/themes/signInUp/userInputCodeFormHeader");
var SuperTokensBranding_1 = require("../../../../../components/SuperTokensBranding");
var userInputCodeForm_1 = require("../../../../passwordless/components/themes/signInUp/userInputCodeForm");
var emailOrPhoneForm_1 = require("../../../../passwordless/components/themes/signInUp/emailOrPhoneForm");
var phoneForm_1 = require("../../../../passwordless/components/themes/signInUp/phoneForm");
var emailForm_1 = require("../../../../passwordless/components/themes/signInUp/emailForm");
var SignInUpTheme = function (props) {
    var t = __1.useTranslation();
    var styles = React.useContext(styleContext_1.default);
    if (props.activeScreen === signInUp_1.SignInUpScreens.CloseTab) {
        return react_1.jsx(closeTabScreen_1.CloseTabScreen, __assign({}, props.pwlessChildProps));
    } else if (props.activeScreen === signInUp_1.SignInUpScreens.LinkSent) {
        return react_1.jsx(
            linkSent_1.LinkSent,
            __assign({}, getCommonPwlessProps(props.pwlessChildProps, props), {
                loginAttemptInfo: props.pwlessState.loginAttemptInfo,
            })
        );
    }
    return react_1.jsx(
        "div",
        { "data-supertokens": "container", css: styles.container },
        react_1.jsx(
            "div",
            { "data-supertokens": "row", css: styles.row },
            (props.pwlessChildProps === undefined || props.pwlessState.loaded === true) &&
                react_1.jsx(
                    React.Fragment,
                    null,
                    props.activeScreen === signInUp_1.SignInUpScreens.UserInputCodeForm
                        ? react_1.jsx(
                              userInputCodeFormHeader_1.UserInputCodeFormHeader,
                              __assign({}, getCommonPwlessProps(props.pwlessChildProps, props), {
                                  loginAttemptInfo: props.pwlessState.loginAttemptInfo,
                              })
                          )
                        : react_1.jsx(header_1.Header, null),
                    props.commonState.error && react_1.jsx(generalError_1.default, { error: props.commonState.error }),
                    props.tpChildProps !== undefined &&
                        props.activeScreen !== signInUp_1.SignInUpScreens.UserInputCodeForm &&
                        react_1.jsx(
                            providersForm_1.ProvidersForm,
                            __assign({}, props.tpChildProps, {
                                featureState: props.tpState,
                                dispatch: props.tpDispatch,
                            })
                        ),
                    props.config.disablePasswordless !== true &&
                        props.thirdPartyRecipe !== undefined &&
                        props.activeScreen !== signInUp_1.SignInUpScreens.UserInputCodeForm &&
                        react_1.jsx(
                            "div",
                            {
                                "data-supertokens": "thirdPartyPasswordlessDivider",
                                css: styles.thirdPartyPasswordlessDivider,
                            },
                            react_1.jsx("div", { "data-supertokens": "divider", css: styles.divider }),
                            react_1.jsx(
                                "div",
                                {
                                    "data-supertokens": "thirdPartyPasswordlessDividerOr",
                                    css: styles.thirdPartyPasswordlessDividerOr,
                                },
                                t("THIRD_PARTY_PASSWORDLESS_SIGN_IN_AND_UP_DIVIDER_OR")
                            ),
                            react_1.jsx("div", { "data-supertokens": "divider", css: styles.divider })
                        ),
                    props.activeScreen === signInUp_1.SignInUpScreens.EmailForm
                        ? react_1.jsx(
                              emailForm_1.EmailForm,
                              __assign({}, getCommonPwlessProps(props.pwlessChildProps, props))
                          )
                        : props.activeScreen === signInUp_1.SignInUpScreens.PhoneForm
                        ? react_1.jsx(
                              phoneForm_1.PhoneForm,
                              __assign({}, getCommonPwlessProps(props.pwlessChildProps, props))
                          )
                        : props.activeScreen === signInUp_1.SignInUpScreens.EmailOrPhoneForm
                        ? react_1.jsx(
                              emailOrPhoneForm_1.EmailOrPhoneForm,
                              __assign({}, getCommonPwlessProps(props.pwlessChildProps, props))
                          )
                        : props.activeScreen === signInUp_1.SignInUpScreens.UserInputCodeForm
                        ? react_1.jsx(
                              userInputCodeForm_1.UserInputCodeForm,
                              __assign({}, getCommonPwlessProps(props.pwlessChildProps, props), {
                                  loginAttemptInfo: props.pwlessState.loginAttemptInfo,
                                  onSuccess: props.pwlessChildProps.onSuccess,
                              })
                          )
                        : null
                )
        ),
        react_1.jsx(SuperTokensBranding_1.SuperTokensBranding, null)
    );
};
function SignInUpThemeWrapper(props) {
    var hasFont = styles_1.hasFontDefined(props.config.rootStyle);
    var activeScreen =
        props.pwlessChildProps !== undefined
            ? signInUp_1.getActiveScreen({
                  config: props.pwlessChildProps.config,
                  featureState: props.pwlessState,
              })
            : undefined;
    var activeStyle;
    if (activeScreen === signInUp_1.SignInUpScreens.CloseTab) {
        activeStyle = props.config.signInUpFeature.closeTabScreenStyle;
    } else if (activeScreen === signInUp_1.SignInUpScreens.LinkSent) {
        activeStyle = props.config.signInUpFeature.linkSentScreenStyle;
    } else if (activeScreen === signInUp_1.SignInUpScreens.UserInputCodeForm) {
        activeStyle = props.config.signInUpFeature.userInputCodeFormStyle;
    } else if (activeScreen === signInUp_1.SignInUpScreens.EmailForm) {
        activeStyle = props.config.signInUpFeature.providerAndEmailOrPhoneFormStyle;
    } else if (activeScreen === signInUp_1.SignInUpScreens.PhoneForm) {
        activeStyle = props.config.signInUpFeature.providerAndEmailOrPhoneFormStyle;
    } else if (activeScreen === signInUp_1.SignInUpScreens.EmailOrPhoneForm) {
        activeStyle = props.config.signInUpFeature.providerAndEmailOrPhoneFormStyle;
    }
    // This style provider will override the parent with the screen specific user config
    return react_1.jsx(
        themeBase_1.ThemeBase,
        { loadDefaultFont: !hasFont },
        react_1.jsx(
            styleContext_1.StyleProvider,
            {
                rawPalette: props.config.palette,
                defaultPalette: styles_1.defaultPalette,
                styleFromInit: activeStyle,
                rootStyleFromInit: props.config.rootStyle,
                getDefaultStyles: styles_2.getStyles,
            },
            react_1.jsx(SignInUpTheme, __assign({}, props, { activeScreen: activeScreen }))
        )
    );
}
exports.default = SignInUpThemeWrapper;
// Simple convenience function
function getCommonPwlessProps(childProps, props) {
    return {
        recipeImplementation: childProps.recipeImplementation,
        config: childProps.config,
        clearError: function () {
            return props.pwlessDispatch({ type: "setError", error: undefined });
        },
        onError: function (error) {
            return props.pwlessDispatch({ type: "setError", error: error });
        },
        error: props.pwlessState.error,
    };
}
