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
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var styles_1 = require("../../../../../styles/styles");
var themeBase_1 = require("../themeBase");
var emailForm_1 = require("./emailForm");
var linkEmailSent_1 = require("./linkEmailSent");
var mobileForm_1 = require("./mobileForm");
var signInUpCodeInputFooter_1 = require("./signInUpCodeInputFooter");
var signInUpCodeInputHeader_1 = require("./signInUpCodeInputHeader");
var signInUpFooter_1 = require("./signInUpFooter");
var signInUpHeader_1 = require("./signInUpHeader");
var userInputCodeForm_1 = require("./userInputCodeForm");
/*
 * Component.
 */
function SignInUpTheme(props) {
    var styles = react_2.useContext(styleContext_1.default);
    var hasFont = styles_1.hasFontDefined(props.config.rootStyle);
    var recipeAndConfig = {
        recipeImplementation: props.recipeImplementation,
        config: props.config,
    };
    return react_1.jsx(
        themeBase_1.ThemeBase,
        { loadDefaultFont: !hasFont },
        props.loginAttemptInfo && props.loginAttemptInfo.flowType === "MAGICLINK"
            ? react_1.jsx(
                  linkEmailSent_1.LinkEmailSent,
                  __assign({}, props, { loginAttemptInfo: props.loginAttemptInfo })
              )
            : react_1.jsx(
                  "div",
                  { "data-supertokens": "container", css: styles.container },
                  react_1.jsx(
                      "div",
                      { "data-supertokens": "row", css: styles.row },
                      props.loaded &&
                          (!props.loginAttemptInfo
                              ? props.config.contactInfoType === "EMAIL"
                                  ? react_1.jsx(
                                        emailForm_1.EmailForm,
                                        __assign({}, recipeAndConfig, {
                                            error: props.error,
                                            header: react_1.jsx(signInUpHeader_1.SignInUpHeader, null),
                                            footer: react_1.jsx(signInUpFooter_1.SignInUpFooter, {
                                                privacyPolicyLink: props.config.emailForm.privacyPolicyLink,
                                                termsOfServiceLink: props.config.emailForm.termsOfServiceLink,
                                            }),
                                        })
                                    )
                                  : react_1.jsx(
                                        mobileForm_1.MobileForm,
                                        __assign({}, recipeAndConfig, {
                                            error: props.error,
                                            header: react_1.jsx(signInUpHeader_1.SignInUpHeader, null),
                                            footer: react_1.jsx(signInUpFooter_1.SignInUpFooter, {
                                                privacyPolicyLink: props.config.mobileForm.privacyPolicyLink,
                                                termsOfServiceLink: props.config.mobileForm.termsOfServiceLink,
                                            }),
                                        })
                                    )
                              : react_1.jsx(
                                    userInputCodeForm_1.UserInputCodeForm,
                                    __assign({}, recipeAndConfig, {
                                        loginAttemptInfo: props.loginAttemptInfo,
                                        onSuccess: props.onSuccess,
                                        header: react_1.jsx(
                                            signInUpCodeInputHeader_1.SignInUpCodeInputHeader,
                                            __assign({}, recipeAndConfig, { loginAttemptInfo: props.loginAttemptInfo })
                                        ),
                                        footer: react_1.jsx(
                                            signInUpCodeInputFooter_1.SignInUpCodeInputFooter,
                                            __assign({}, recipeAndConfig, { loginAttemptInfo: props.loginAttemptInfo })
                                        ),
                                    })
                                ))
                  )
              )
    );
}
exports.default = SignInUpTheme;
