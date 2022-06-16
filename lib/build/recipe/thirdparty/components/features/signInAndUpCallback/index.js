"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
var utils_1 = require("../../../../../utils");
var featureWrapper_1 = tslib_1.__importDefault(require("../../../../../components/featureWrapper"));
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../../themes/styles");
var signInAndUpCallback_1 = require("../../themes/signInAndUpCallback");
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var translations_1 = require("../../themes/translations");
var error_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/error"));
var usercontext_1 = require("../../../../../usercontext");
var SignInAndUpCallback = function (props) {
    var userContext = (0, usercontext_1.useUserContext)();
    var verifyCode = (0, react_1.useCallback)(
        function () {
            return props.recipe.recipeImpl.signInAndUp({
                userContext: userContext,
            });
        },
        [props.recipe, props.history]
    );
    var handleVerifyResponse = (0, react_1.useCallback)(
        function (response) {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var stateResponse, redirectToPath, isEmailVerified, ignored_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
                                return [
                                    2 /*return*/,
                                    props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                                        error: "no_email_present",
                                    }),
                                ];
                            }
                            if (!(response.status === "OK")) return [3 /*break*/, 7];
                            stateResponse = props.recipe.recipeImpl.getStateAndOtherInfoFromStorage({
                                userContext: userContext,
                            });
                            redirectToPath = stateResponse === undefined ? undefined : stateResponse.redirectToPath;
                            if (!(props.recipe.emailVerification.config.mode === "REQUIRED")) return [3 /*break*/, 6];
                            isEmailVerified = true;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [
                                4 /*yield*/,
                                props.recipe.emailVerification.isEmailVerified({
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            isEmailVerified = _a.sent().isVerified;
                            return [3 /*break*/, 4];
                        case 3:
                            ignored_1 = _a.sent();
                            return [3 /*break*/, 4];
                        case 4:
                            if (!!isEmailVerified) return [3 /*break*/, 6];
                            return [
                                4 /*yield*/,
                                props.recipe.savePostEmailVerificationSuccessRedirectState({
                                    redirectToPath: redirectToPath,
                                    isNewUser: true,
                                    action: "SUCCESS",
                                }),
                            ];
                        case 5:
                            _a.sent();
                            return [
                                2 /*return*/,
                                props.recipe.emailVerification.redirect(
                                    {
                                        action: "VERIFY_EMAIL",
                                    },
                                    props.history
                                ),
                            ];
                        case 6:
                            return [
                                2 /*return*/,
                                props.recipe.redirect(
                                    {
                                        action: "SUCCESS",
                                        isNewUser: response.createdNewUser,
                                        redirectToPath: redirectToPath,
                                    },
                                    props.history
                                ),
                            ];
                        case 7:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.recipe, props.history]
    );
    var handleError = (0, react_1.useCallback)(
        function (err) {
            if (error_1.default.isThisError(err)) {
                return props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                    error: "custom",
                    message: err.message,
                });
            }
            return props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                error: "signin",
            });
        },
        [props.recipe, props.history]
    );
    (0, utils_1.useOnMountAPICall)(verifyCode, handleVerifyResponse, handleError);
    var componentOverrides = props.recipe.config.override.components;
    var oAuthCallbackScreen = props.recipe.config.oAuthCallbackScreen;
    return (0, jsx_runtime_1.jsx)(
        componentOverrideContext_1.ComponentOverrideContext.Provider,
        tslib_1.__assign(
            { value: componentOverrides },
            {
                children: (0, jsx_runtime_1.jsx)(
                    featureWrapper_1.default,
                    tslib_1.__assign(
                        {
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: translations_1.defaultTranslationsThirdParty,
                        },
                        {
                            children: (0, jsx_runtime_1.jsx)(
                                styleContext_1.StyleProvider,
                                tslib_1.__assign(
                                    {
                                        rawPalette: props.recipe.config.palette,
                                        defaultPalette: styles_1.defaultPalette,
                                        styleFromInit: oAuthCallbackScreen.style,
                                        rootStyleFromInit: props.recipe.config.rootStyle,
                                        getDefaultStyles: styles_2.getStyles,
                                    },
                                    {
                                        children: (0, jsx_runtime_1.jsxs)(react_1.Fragment, {
                                            children: [
                                                props.children === undefined &&
                                                    (0, jsx_runtime_1.jsx)(
                                                        signInAndUpCallback_1.SignInAndUpCallbackTheme,
                                                        {}
                                                    ),
                                                props.children,
                                            ],
                                        }),
                                    }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
};
exports.default = SignInAndUpCallback;
