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
var linkClickedScreen_1 = require("../../themes/linkClickedScreen");
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var translations_1 = require("../../themes/translations");
var usercontext_1 = require("../../../../../usercontext");
var utils_2 = require("../../../utils");
var error_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/error"));
var LinkClickedScreen = function (props) {
    var userContext = (0, usercontext_1.useUserContext)();
    var _a = (0, react_1.useState)(false),
        requireUserInteraction = _a[0],
        setRequireUserInteraction = _a[1];
    var consumeCodeAtMount = (0, react_1.useCallback)(
        function () {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var preAuthSessionId, linkCode, loginAttemptInfo;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            preAuthSessionId = (0, utils_1.getQueryParams)("preAuthSessionId");
                            linkCode = (0, utils_1.getURLHash)();
                            if (!(preAuthSessionId === null || preAuthSessionId.length === 0 || linkCode.length === 0))
                                return [3 /*break*/, 2];
                            return [
                                4 /*yield*/,
                                props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                                    error: "signin",
                                }),
                            ];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, "REDIRECTING"];
                        case 2:
                            return [
                                4 /*yield*/,
                                props.recipe.recipeImpl.getLoginAttemptInfo({ userContext: userContext }),
                            ];
                        case 3:
                            loginAttemptInfo = _a.sent();
                            if (
                                (loginAttemptInfo === null || loginAttemptInfo === void 0
                                    ? void 0
                                    : loginAttemptInfo.preAuthSessionId) !== preAuthSessionId
                            ) {
                                return [2 /*return*/, "REQUIRES_INTERACTION"];
                            }
                            return [
                                2 /*return*/,
                                props.recipe.recipeImpl.consumeCode({
                                    preAuthSessionId: preAuthSessionId,
                                    linkCode: linkCode,
                                    userContext: userContext,
                                }),
                            ];
                    }
                });
            });
        },
        [props.recipe, props.history]
    );
    var handleConsumeResp = (0, react_1.useCallback)(
        function (response) {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var loginAttemptInfo;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (response === "REQUIRES_INTERACTION") {
                                // We set this here, to make sure it's set after a possible remount
                                setRequireUserInteraction(true);
                            }
                            if (typeof response === "string") {
                                // In this case we are already redirecting or showing the continue button
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
                                (0, utils_2.getLoginAttemptInfo)({
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
    var handleConsumeError = (0, react_1.useCallback)(
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
    (0, utils_1.useOnMountAPICall)(consumeCodeAtMount, handleConsumeResp, handleConsumeError);
    var componentOverrides = props.recipe.config.override.components;
    var linkClickedScreen = props.recipe.config.linkClickedScreenFeature;
    var childProps = {
        recipeImplementation: props.recipe.recipeImpl,
        config: props.recipe.config,
        requireUserInteraction: requireUserInteraction,
        consumeCode: function () {
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var preAuthSessionId, linkCode, consumeResp, err_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            preAuthSessionId = (0, utils_1.getQueryParams)("preAuthSessionId");
                            linkCode = (0, utils_1.getURLHash)();
                            if (preAuthSessionId === null || preAuthSessionId.length === 0 || linkCode.length === 0) {
                                // This should never happen, and even if it does the we should be already redirecting
                                throw new Error("Called consumeCode withouth link info");
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [
                                4 /*yield*/,
                                props.recipe.recipeImpl.consumeCode({
                                    preAuthSessionId: preAuthSessionId,
                                    linkCode: linkCode,
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            consumeResp = _a.sent();
                            return [4 /*yield*/, handleConsumeResp(consumeResp)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            err_1 = _a.sent();
                            void handleConsumeError(err_1);
                            return [3 /*break*/, 5];
                        case 5:
                            return [2 /*return*/];
                    }
                });
            });
        },
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
                            defaultStore: translations_1.defaultTranslationsPasswordless,
                        },
                        {
                            children: (0, jsx_runtime_1.jsx)(
                                styleContext_1.StyleProvider,
                                tslib_1.__assign(
                                    {
                                        rawPalette: props.recipe.config.palette,
                                        defaultPalette: styles_1.defaultPalette,
                                        styleFromInit: linkClickedScreen.style,
                                        rootStyleFromInit: props.recipe.config.rootStyle,
                                        getDefaultStyles: styles_2.getStyles,
                                    },
                                    {
                                        children: (0, jsx_runtime_1.jsxs)(react_1.Fragment, {
                                            children: [
                                                props.children === undefined &&
                                                    (0, jsx_runtime_1.jsx)(
                                                        linkClickedScreen_1.LinkClickedScreen,
                                                        tslib_1.__assign({}, childProps)
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
exports.default = LinkClickedScreen;
