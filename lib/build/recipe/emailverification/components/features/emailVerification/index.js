"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerification = void 0;
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
var React = tslib_1.__importStar(require("react"));
var react_1 = require("react");
var utils_1 = require("../../../../../utils");
var emailVerification_1 = require("../../themes/emailVerification");
var featureWrapper_1 = tslib_1.__importDefault(require("../../../../../components/featureWrapper"));
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var session_1 = require("../../../../session");
var translations_1 = require("../../themes/translations");
var usercontext_1 = require("../../../../../usercontext");
var EmailVerification = function (props) {
    var _a;
    var sessionContext = (0, react_1.useContext)(session_1.SessionContext);
    var _b = (0, react_1.useState)("LOADING"),
        status = _b[0],
        setStatus = _b[1];
    var userContext = (0, usercontext_1.useUserContext)();
    var modifiedRecipeImplementation = (0, react_1.useMemo)(
        function () {
            return tslib_1.__assign(tslib_1.__assign({}, props.recipe.recipeImpl), {
                sendVerificationEmail: function (input) {
                    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var response;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4 /*yield*/, props.recipe.recipeImpl.sendVerificationEmail(input)];
                                case 1:
                                    response = _a.sent();
                                    (0, utils_1.clearQueryParams)(["token"]);
                                    return [2 /*return*/, response];
                            }
                        });
                    });
                },
            });
        },
        [props.recipe]
    );
    var fetchIsEmailVerified = (0, react_1.useCallback)(
        function () {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var token;
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            token =
                                (_a = (0, utils_1.getQueryParams)("token")) !== null && _a !== void 0 ? _a : undefined;
                            if (!(token === undefined)) return [3 /*break*/, 4];
                            if (!!sessionContext.doesSessionExist) return [3 /*break*/, 2];
                            return [4 /*yield*/, props.recipe.config.redirectToSignIn(props.history)];
                        case 1:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            return [4 /*yield*/, props.recipe.recipeImpl.isEmailVerified({ userContext: userContext })];
                        case 3:
                            // we check if the email is already verified, and if it is, then we redirect the user
                            return [2 /*return*/, _b.sent().isVerified];
                        case 4:
                            return [2 /*return*/, false];
                    }
                });
            });
        },
        [props.recipe]
    );
    var checkIsEmailVerified = (0, react_1.useCallback)(
        function (isVerified) {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    if (isVerified) {
                        return [2 /*return*/, props.recipe.config.postVerificationRedirect(props.history)];
                    }
                    setStatus("READY");
                    return [2 /*return*/];
                });
            });
        },
        [props.recipe, setStatus]
    );
    (0, utils_1.useOnMountAPICall)(fetchIsEmailVerified, checkIsEmailVerified);
    var signOut = (0, react_1.useCallback)(
        function () {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, props.recipe.config.signOut()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, props.recipe.config.redirectToSignIn(props.history)];
                        case 2:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        [props.recipe]
    );
    var onTokenInvalidRedirect = (0, react_1.useCallback)(
        function () {
            return props.recipe.config.redirectToSignIn(props.history);
        },
        [props.recipe, props.history]
    );
    var onEmailAlreadyVerified = (0, react_1.useCallback)(
        function () {
            return props.recipe.config.postVerificationRedirect(props.history);
        },
        [props.recipe, props.history]
    );
    var onContinueClicked = (0, react_1.useCallback)(
        function () {
            return props.recipe.config.postVerificationRedirect(props.history);
        },
        [props.recipe, props.history]
    );
    if (status === "LOADING") {
        return (0, jsx_runtime_1.jsx)(react_1.Fragment, {});
    }
    var componentOverrides = props.recipe.config.override.components;
    var sendVerifyEmailScreenFeature = props.recipe.config.sendVerifyEmailScreen;
    var sendVerifyEmailScreen = {
        styleFromInit: sendVerifyEmailScreenFeature.style,
        recipeImplementation: modifiedRecipeImplementation,
        config: props.recipe.config,
        signOut: signOut,
        onEmailAlreadyVerified: onEmailAlreadyVerified,
    };
    var verifyEmailLinkClickedScreenFeature = props.recipe.config.verifyEmailLinkClickedScreen;
    var token = (_a = (0, utils_1.getQueryParams)("token")) !== null && _a !== void 0 ? _a : undefined;
    var verifyEmailLinkClickedScreen =
        token === undefined
            ? undefined
            : {
                  styleFromInit: verifyEmailLinkClickedScreenFeature.style,
                  onTokenInvalidRedirect: onTokenInvalidRedirect,
                  onContinueClicked: onContinueClicked,
                  recipeImplementation: modifiedRecipeImplementation,
                  config: props.recipe.config,
                  token: token,
              };
    var childProps = {
        config: props.recipe.config,
        sendVerifyEmailScreen: sendVerifyEmailScreen,
        verifyEmailLinkClickedScreen: verifyEmailLinkClickedScreen,
        hasToken: token !== undefined,
    };
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
                            defaultStore: translations_1.defaultTranslationsEmailVerification,
                        },
                        {
                            children: (0, jsx_runtime_1.jsxs)(react_1.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        (0, jsx_runtime_1.jsx)(
                                            emailVerification_1.EmailVerificationTheme,
                                            tslib_1.__assign({}, childProps)
                                        ),
                                    props.children &&
                                        React.Children.map(props.children, function (child) {
                                            if (React.isValidElement(child)) {
                                                return React.cloneElement(child, childProps);
                                            }
                                            return child;
                                        }),
                                ],
                            }),
                        }
                    )
                ),
            }
        )
    );
};
exports.EmailVerification = EmailVerification;
exports.default = exports.EmailVerification;
