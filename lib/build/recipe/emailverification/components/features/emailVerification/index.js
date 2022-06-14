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
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
var React = tslib_1.__importStar(require("react"));
var react_2 = require("react");
var utils_1 = require("../../../../../utils");
var emailVerification_1 = require("../../themes/emailVerification");
var featureWrapper_1 = tslib_1.__importDefault(require("../../../../../components/featureWrapper"));
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var session_1 = require("../../../../session");
var translations_1 = require("../../themes/translations");
var usercontext_1 = require("../../../../../usercontext");
exports.EmailVerification = function (props) {
    var _a;
    var sessionContext = react_2.useContext(session_1.SessionContext);
    var _b = react_2.useState("LOADING"),
        status = _b[0],
        setStatus = _b[1];
    var userContext = usercontext_1.useUserContext();
    var modifiedRecipeImplementation = react_2.useMemo(
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
                                    utils_1.clearQueryParams(["token"]);
                                    return [2 /*return*/, response];
                            }
                        });
                    });
                },
            });
        },
        [props.recipe]
    );
    var fetchIsEmailVerified = react_2.useCallback(
        function () {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var token;
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            token = (_a = utils_1.getQueryParams("token")) !== null && _a !== void 0 ? _a : undefined;
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
    var checkIsEmailVerified = react_2.useCallback(
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
    utils_1.useOnMountAPICall(fetchIsEmailVerified, checkIsEmailVerified);
    var signOut = react_2.useCallback(
        function () {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var e_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, props.recipe.config.signOut()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, props.recipe.config.redirectToSignIn(props.history)];
                        case 2:
                            return [2 /*return*/, _a.sent()];
                        case 3:
                            e_1 = _a.sent();
                            return [3 /*break*/, 4];
                        case 4:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.recipe]
    );
    var onTokenInvalidRedirect = react_2.useCallback(
        function () {
            return props.recipe.config.redirectToSignIn(props.history);
        },
        [props.recipe, props.history]
    );
    var onSuccess = react_2.useCallback(
        function () {
            return props.recipe.config.postVerificationRedirect(props.history);
        },
        [props.recipe, props.history]
    );
    if (status === "LOADING") {
        return react_1.jsx(react_2.Fragment, null);
    }
    var componentOverrides = props.recipe.config.override.components;
    var sendVerifyEmailScreenFeature = props.recipe.config.sendVerifyEmailScreen;
    var sendVerifyEmailScreen = {
        styleFromInit: sendVerifyEmailScreenFeature.style,
        recipeImplementation: modifiedRecipeImplementation,
        config: props.recipe.config,
        signOut: signOut,
        onEmailAlreadyVerified: onSuccess,
    };
    var verifyEmailLinkClickedScreenFeature = props.recipe.config.verifyEmailLinkClickedScreen;
    var token = (_a = utils_1.getQueryParams("token")) !== null && _a !== void 0 ? _a : undefined;
    var verifyEmailLinkClickedScreen =
        token === undefined
            ? undefined
            : {
                  styleFromInit: verifyEmailLinkClickedScreenFeature.style,
                  onTokenInvalidRedirect: onTokenInvalidRedirect,
                  onSuccess: onSuccess,
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
    return react_1.jsx(
        componentOverrideContext_1.ComponentOverrideContext.Provider,
        { value: componentOverrides },
        react_1.jsx(
            featureWrapper_1.default,
            {
                useShadowDom: props.recipe.config.useShadowDom,
                defaultStore: translations_1.defaultTranslationsEmailVerification,
            },
            react_1.jsx(
                react_2.Fragment,
                null,
                props.children === undefined &&
                    react_1.jsx(emailVerification_1.EmailVerificationTheme, tslib_1.__assign({}, childProps)),
                props.children &&
                    React.Children.map(props.children, function (child) {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, childProps);
                        }
                        return child;
                    })
            )
        )
    );
};
exports.default = exports.EmailVerification;
