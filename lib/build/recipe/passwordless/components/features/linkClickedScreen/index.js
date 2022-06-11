"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
var utils_1 = require("../../../../../utils");
var featureWrapper_1 = tslib_1.__importDefault(require("../../../../../components/featureWrapper"));
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../../themes/styles");
var linkClickedScreen_1 = require("../../themes/linkClickedScreen");
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var translations_1 = require("../../themes/translations");
var usercontext_1 = require("../../../../../usercontext");
var utils_2 = require("../../../utils");
var error_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/error"));
var LinkClickedScreen = function (props) {
    var userContext = usercontext_1.useUserContext();
    var consumeCode = react_2.useCallback(
        function () {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var preAuthSessionId, linkCode;
                return tslib_1.__generator(this, function (_a) {
                    preAuthSessionId = utils_1.getQueryParams("preAuthSessionId");
                    linkCode = utils_1.getURLHash();
                    if (preAuthSessionId === null || preAuthSessionId.length === 0 || linkCode.length === 0) {
                        return [
                            2 /*return*/,
                            props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                                error: "signin",
                            }),
                        ];
                    }
                    return [
                        2 /*return*/,
                        props.recipe.recipeImpl.consumeCode({
                            preAuthSessionId: preAuthSessionId,
                            linkCode: linkCode,
                            userContext: userContext,
                        }),
                    ];
                });
            });
        },
        [props.recipe, props.history]
    );
    var handleConsumeResp = react_2.useCallback(
        function (response) {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var loginAttemptInfo;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!response) {
                                // In this case we are already redirecting
                                return [2 /*return*/];
                            }
                            if (response.status === "RESTART_FLOW_ERROR") {
                                return [
                                    2 /*return*/,
                                    props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                                        error: "restart_link",
                                    }),
                                ];
                            }
                            if (!(response.status === "OK")) return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                utils_2.getLoginAttemptInfo({
                                    recipeImplementation: props.recipe.recipeImpl,
                                    userContext: userContext,
                                }),
                            ];
                        case 1:
                            loginAttemptInfo = _a.sent();
                            return [
                                4 /*yield*/,
                                props.recipe.recipeImpl.clearLoginAttemptInfo({
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            _a.sent();
                            return [
                                2 /*return*/,
                                props.recipe.redirect(
                                    {
                                        action: "SUCCESS",
                                        isNewUser: response.createdUser,
                                        redirectToPath:
                                            loginAttemptInfo === null || loginAttemptInfo === void 0
                                                ? void 0
                                                : loginAttemptInfo.redirectToPath,
                                    },
                                    props.history
                                ),
                            ];
                        case 3:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.history, props.recipe]
    );
    var handleConsumeError = react_2.useCallback(
        function (err) {
            if (error_1.default.isThisError(err)) {
                return props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                    error: "custom",
                    message: err.message,
                });
            } else {
                return props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                    error: "restart_link",
                });
            }
        },
        [props.recipe, props.history]
    );
    utils_1.useOnMountAPICall(consumeCode, handleConsumeResp, handleConsumeError);
    var componentOverrides = props.recipe.config.override.components;
    var linkClickedScreen = props.recipe.config.linkClickedScreenFeature;
    var childProps = {
        recipeImplementation: props.recipe.recipeImpl,
        config: props.recipe.config,
    };
    return react_1.jsx(
        componentOverrideContext_1.ComponentOverrideContext.Provider,
        { value: componentOverrides },
        react_1.jsx(
            featureWrapper_1.default,
            {
                useShadowDom: props.recipe.config.useShadowDom,
                defaultStore: translations_1.defaultTranslationsPasswordless,
            },
            react_1.jsx(
                styleContext_1.StyleProvider,
                {
                    rawPalette: props.recipe.config.palette,
                    defaultPalette: styles_1.defaultPalette,
                    styleFromInit: linkClickedScreen.style,
                    rootStyleFromInit: props.recipe.config.rootStyle,
                    getDefaultStyles: styles_2.getStyles,
                },
                react_1.jsx(
                    react_2.Fragment,
                    null,
                    props.children === undefined &&
                        react_1.jsx(linkClickedScreen_1.LinkClickedScreen, tslib_1.__assign({}, childProps)),
                    props.children
                )
            )
        )
    );
};
exports.default = LinkClickedScreen;
