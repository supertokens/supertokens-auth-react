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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
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
var react_1 = require("react");
var styleContext_1 = __importStar(require("../../../../../styles/styleContext"));
var themeBase_1 = require("../themeBase");
var header_1 = require("./header");
var providersForm_1 = require("../../../../thirdparty/components/themes/signInAndUp/providersForm");
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../styles");
var SuperTokensBranding_1 = require("../../../../../components/SuperTokensBranding");
var translationContext_1 = require("../../../../../translation/translationContext");
var generalError_1 = __importDefault(require("../../../../emailpassword/components/library/generalError"));
var signUpFooter_1 = require("../../../../emailpassword/components/themes/signInAndUp/signUpFooter");
var signInForm_1 = require("../../../../emailpassword/components/themes/signInAndUp/signInForm");
var signUpForm_1 = require("../../../../emailpassword/components/themes/signInAndUp/signUpForm");
var signInFooter_1 = require("../../../../emailpassword/components/themes/signInAndUp/signInFooter");
var userContextWrapper_1 = __importDefault(require("../../../../../usercontext/userContextWrapper"));
var SignInAndUpTheme = function (props) {
    var t = (0, translationContext_1.useTranslation)();
    var styles = (0, react_1.useContext)(styleContext_1.default);
    return (0, jsx_runtime_1.jsxs)(
        "div",
        __assign(
            { "data-supertokens": "container", css: styles.container },
            {
                children: [
                    (0, jsx_runtime_1.jsxs)(
                        "div",
                        __assign(
                            { "data-supertokens": "row", css: styles.row },
                            {
                                children: [
                                    (0, jsx_runtime_1.jsx)(header_1.Header, {
                                        isSignUp: props.epState.isSignUp,
                                        setIsSignUp: function (isSignUp) {
                                            return props.epDispatch({ type: isSignUp ? "setSignUp" : "setSignIn" });
                                        },
                                    }),
                                    props.commonState.error &&
                                        (0, jsx_runtime_1.jsx)(generalError_1.default, {
                                            error: props.commonState.error,
                                        }),
                                    props.tpChildProps !== undefined &&
                                        (0, jsx_runtime_1.jsx)(
                                            providersForm_1.ProvidersForm,
                                            __assign({}, props.tpChildProps, {
                                                featureState: props.tpState,
                                                dispatch: props.tpDispatch,
                                            })
                                        ),
                                    props.config.disableEmailPassword !== true &&
                                        props.thirdPartyRecipe !== undefined &&
                                        (0, jsx_runtime_1.jsxs)(
                                            "div",
                                            __assign(
                                                {
                                                    "data-supertokens": "thirdPartyEmailPasswordDivider",
                                                    css: styles.thirdPartyEmailPasswordDivider,
                                                },
                                                {
                                                    children: [
                                                        (0, jsx_runtime_1.jsx)("div", {
                                                            "data-supertokens": "divider",
                                                            css: styles.divider,
                                                        }),
                                                        (0, jsx_runtime_1.jsx)(
                                                            "div",
                                                            __assign(
                                                                {
                                                                    "data-supertokens":
                                                                        "thirdPartyEmailPasswordDividerOr",
                                                                    css: styles.thirdPartyEmailPasswordDividerOr,
                                                                },
                                                                {
                                                                    children: t(
                                                                        "THIRD_PARTY_EMAIL_PASSWORD_SIGN_IN_AND_UP_DIVIDER_OR"
                                                                    ),
                                                                }
                                                            )
                                                        ),
                                                        (0, jsx_runtime_1.jsx)("div", {
                                                            "data-supertokens": "divider",
                                                            css: styles.divider,
                                                        }),
                                                    ],
                                                }
                                            )
                                        ),
                                    props.epChildProps !== undefined &&
                                        (props.epState.isSignUp
                                            ? (0, jsx_runtime_1.jsx)(
                                                  signUpForm_1.SignUpForm,
                                                  __assign({}, props.epChildProps.signUpForm, {
                                                      footer: (0, jsx_runtime_1.jsx)(signUpFooter_1.SignUpFooter, {
                                                          privacyPolicyLink:
                                                              props.epChildProps.config.signInAndUpFeature.signUpForm
                                                                  .privacyPolicyLink,
                                                          termsOfServiceLink:
                                                              props.epChildProps.config.signInAndUpFeature.signUpForm
                                                                  .termsOfServiceLink,
                                                      }),
                                                  })
                                              )
                                            : (0, jsx_runtime_1.jsx)(
                                                  signInForm_1.SignInForm,
                                                  __assign({}, props.epChildProps.signInForm, {
                                                      footer: (0, jsx_runtime_1.jsx)(signInFooter_1.SignInFooter, {
                                                          onClick: props.epChildProps.signInForm.forgotPasswordClick,
                                                      }),
                                                  })
                                              )),
                                ],
                            }
                        )
                    ),
                    (0, jsx_runtime_1.jsx)(SuperTokensBranding_1.SuperTokensBranding, {}),
                ],
            }
        )
    );
};
function SignInAndUpThemeWrapper(props) {
    var hasFont = (0, styles_1.hasFontDefined)(props.config.rootStyle);
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
                                        styleFromInit: props.config.signInAndUpFeature.style,
                                        rootStyleFromInit: props.config.rootStyle,
                                        getDefaultStyles: styles_2.getStyles,
                                    },
                                    { children: (0, jsx_runtime_1.jsx)(SignInAndUpTheme, __assign({}, props)) }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
}
exports.default = SignInAndUpThemeWrapper;
