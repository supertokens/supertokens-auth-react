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
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k];
                      },
                  };
              }
              Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
              o["default"] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
var __rest =
    (this && this.__rest) ||
    function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
            }
        return t;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveScreen = exports.SignInUpScreens = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
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
var react_1 = __importStar(require("react"));
var SuperTokensBranding_1 = require("../../../../../components/SuperTokensBranding");
var styleContext_1 = __importStar(require("../../../../../styles/styleContext"));
var styles_1 = require("../../../../../styles/styles");
var userContextWrapper_1 = __importDefault(require("../../../../../usercontext/userContextWrapper"));
var generalError_1 = __importDefault(require("../../../../emailpassword/components/library/generalError"));
var styles_2 = require("../styles");
var themeBase_1 = require("../themeBase");
var closeTabScreen_1 = require("./closeTabScreen");
var emailForm_1 = require("./emailForm");
var emailOrPhoneForm_1 = require("./emailOrPhoneForm");
var linkSent_1 = require("./linkSent");
var phoneForm_1 = require("./phoneForm");
var signInUpHeader_1 = require("./signInUpHeader");
var userInputCodeForm_1 = require("./userInputCodeForm");
var userInputCodeFormHeader_1 = require("./userInputCodeFormHeader");
var SignInUpScreens;
(function (SignInUpScreens) {
    SignInUpScreens[(SignInUpScreens["CloseTab"] = 0)] = "CloseTab";
    SignInUpScreens[(SignInUpScreens["LinkSent"] = 1)] = "LinkSent";
    SignInUpScreens[(SignInUpScreens["EmailForm"] = 2)] = "EmailForm";
    SignInUpScreens[(SignInUpScreens["PhoneForm"] = 3)] = "PhoneForm";
    SignInUpScreens[(SignInUpScreens["EmailOrPhoneForm"] = 4)] = "EmailOrPhoneForm";
    SignInUpScreens[(SignInUpScreens["UserInputCodeForm"] = 5)] = "UserInputCodeForm";
})((SignInUpScreens = exports.SignInUpScreens || (exports.SignInUpScreens = {})));
/*
 * Component.
 */
var SignInUpTheme = function (_a) {
    var activeScreen = _a.activeScreen,
        featureState = _a.featureState,
        props = __rest(_a, ["activeScreen", "featureState"]);
    var styles = (0, react_1.useContext)(styleContext_1.default);
    var commonProps = {
        recipeImplementation: props.recipeImplementation,
        config: props.config,
        clearError: function () {
            return props.dispatch({ type: "setError", error: undefined });
        },
        onError: function (error) {
            return props.dispatch({ type: "setError", error: error });
        },
        error: featureState.error,
    };
    return activeScreen === SignInUpScreens.CloseTab
        ? (0, jsx_runtime_1.jsx)(closeTabScreen_1.CloseTabScreen, __assign({}, commonProps))
        : activeScreen === SignInUpScreens.LinkSent
        ? (0, jsx_runtime_1.jsx)(
              linkSent_1.LinkSent,
              __assign({}, commonProps, { loginAttemptInfo: featureState.loginAttemptInfo })
          )
        : (0, jsx_runtime_1.jsxs)(
              "div",
              __assign(
                  { "data-supertokens": "container", css: styles.container },
                  {
                      children: [
                          (0, jsx_runtime_1.jsx)(
                              "div",
                              __assign(
                                  { "data-supertokens": "row", css: styles.row },
                                  {
                                      children:
                                          featureState.loaded &&
                                          (0, jsx_runtime_1.jsxs)(react_1.default.Fragment, {
                                              children: [
                                                  activeScreen === SignInUpScreens.UserInputCodeForm
                                                      ? (0, jsx_runtime_1.jsx)(
                                                            userInputCodeFormHeader_1.UserInputCodeFormHeader,
                                                            __assign({}, commonProps, {
                                                                loginAttemptInfo: featureState.loginAttemptInfo,
                                                            })
                                                        )
                                                      : (0, jsx_runtime_1.jsx)(signInUpHeader_1.SignInUpHeader, {}),
                                                  featureState.error !== undefined &&
                                                      (0, jsx_runtime_1.jsx)(generalError_1.default, {
                                                          error: featureState.error,
                                                      }),
                                                  activeScreen === SignInUpScreens.EmailForm
                                                      ? (0, jsx_runtime_1.jsx)(
                                                            emailForm_1.EmailForm,
                                                            __assign({}, commonProps)
                                                        )
                                                      : activeScreen === SignInUpScreens.PhoneForm
                                                      ? (0, jsx_runtime_1.jsx)(
                                                            phoneForm_1.PhoneForm,
                                                            __assign({}, commonProps)
                                                        )
                                                      : activeScreen === SignInUpScreens.EmailOrPhoneForm
                                                      ? (0, jsx_runtime_1.jsx)(
                                                            emailOrPhoneForm_1.EmailOrPhoneForm,
                                                            __assign({}, commonProps)
                                                        )
                                                      : activeScreen === SignInUpScreens.UserInputCodeForm
                                                      ? (0, jsx_runtime_1.jsx)(
                                                            userInputCodeForm_1.UserInputCodeForm,
                                                            __assign({}, commonProps, {
                                                                loginAttemptInfo: featureState.loginAttemptInfo,
                                                                onSuccess: props.onSuccess,
                                                            })
                                                        )
                                                      : null,
                                              ],
                                          }),
                                  }
                              )
                          ),
                          (0, jsx_runtime_1.jsx)(SuperTokensBranding_1.SuperTokensBranding, {}),
                      ],
                  }
              )
          );
};
function SignInUpThemeWrapper(props) {
    var hasFont = (0, styles_1.hasFontDefined)(props.config.rootStyle);
    var activeScreen = getActiveScreen(props);
    var activeStyle;
    if (activeScreen === SignInUpScreens.CloseTab) {
        activeStyle = props.config.signInUpFeature.closeTabScreenStyle;
    } else if (activeScreen === SignInUpScreens.LinkSent) {
        activeStyle = props.config.signInUpFeature.linkSentScreenStyle;
    } else if (activeScreen === SignInUpScreens.UserInputCodeForm) {
        activeStyle = props.config.signInUpFeature.userInputCodeFormStyle;
    } else if (activeScreen === SignInUpScreens.EmailForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (activeScreen === SignInUpScreens.PhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (activeScreen === SignInUpScreens.EmailOrPhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    }
    return (0, jsx_runtime_1.jsx)(
        userContextWrapper_1.default,
        __assign(
            { userContext: props.userContext },
            {
                children: (0, jsx_runtime_1.jsx)(
                    themeBase_1.ThemeBase,
                    __assign(
                        { loadDefaultFont: !hasFont },
                        {
                            children: (0, jsx_runtime_1.jsx)(
                                styleContext_1.StyleProvider,
                                __assign(
                                    {
                                        rawPalette: props.config.palette,
                                        defaultPalette: styles_1.defaultPalette,
                                        styleFromInit: activeStyle,
                                        rootStyleFromInit: props.config.rootStyle,
                                        getDefaultStyles: styles_2.getStyles,
                                    },
                                    {
                                        children: (0, jsx_runtime_1.jsx)(
                                            SignInUpTheme,
                                            __assign({}, props, { activeScreen: activeScreen })
                                        ),
                                    }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
}
exports.default = SignInUpThemeWrapper;
function getActiveScreen(props) {
    if (props.featureState.successInAnotherTab) {
        return SignInUpScreens.CloseTab;
    } else if (props.featureState.loginAttemptInfo && props.featureState.loginAttemptInfo.flowType === "MAGIC_LINK") {
        return SignInUpScreens.LinkSent;
    } else if (props.featureState.loginAttemptInfo) {
        return SignInUpScreens.UserInputCodeForm;
    } else if (props.config.contactMethod === "EMAIL") {
        return SignInUpScreens.EmailForm;
    } else if (props.config.contactMethod === "PHONE") {
        return SignInUpScreens.PhoneForm;
    } else if (props.config.contactMethod === "EMAIL_OR_PHONE") {
        return SignInUpScreens.EmailOrPhoneForm;
    }
    throw new Error("Couldn't choose active screen; Should never happen");
}
exports.getActiveScreen = getActiveScreen;
