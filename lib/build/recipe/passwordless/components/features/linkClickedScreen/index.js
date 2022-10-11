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
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
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
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var utils_1 = require("../../../../../utils");
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../../themes/styles");
var linkClickedScreen_1 = require("../../themes/linkClickedScreen");
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var translations_1 = require("../../themes/translations");
var usercontext_1 = require("../../../../../usercontext");
var utils_2 = require("../../../utils");
var error_1 = __importDefault(require("supertokens-web-js/utils/error"));
var recipe_1 = __importDefault(require("../../../../session/recipe"));
var superTokens_1 = __importDefault(require("../../../../../superTokens"));
var LinkClickedScreen = function (props) {
    var userContext = (0, usercontext_1.useUserContext)();
    var _a = (0, react_2.useState)(false),
        requireUserInteraction = _a[0],
        setRequireUserInteraction = _a[1];
    var consumeCodeAtMount = (0, react_2.useCallback)(
        function () {
            return __awaiter(void 0, void 0, void 0, function () {
                var preAuthSessionId, linkCode, loginAttemptInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            preAuthSessionId = (0, utils_1.getQueryParams)("preAuthSessionId");
                            linkCode = (0, utils_1.getURLHash)();
                            if (!(preAuthSessionId === null || preAuthSessionId.length === 0 || linkCode.length === 0))
                                return [3 /*break*/, 2];
                            return [
                                4 /*yield*/,
                                superTokens_1.default.getInstanceOrThrow().redirectToAuth({
                                    history: props.history,
                                    queryParams: {
                                        error: "signin",
                                    },
                                    redirectBack: false,
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
    var handleConsumeResp = (0, react_2.useCallback)(
        function (response) {
            return __awaiter(void 0, void 0, void 0, function () {
                var loginAttemptInfo;
                return __generator(this, function (_a) {
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
                                    superTokens_1.default.getInstanceOrThrow().redirectToAuth({
                                        history: props.history,
                                        queryParams: {
                                            error: "restart_link",
                                        },
                                        redirectBack: false,
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
                                recipe_1.default.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                                    {
                                        rid: props.recipe.config.recipeId,
                                        successRedirectContext: {
                                            action: "SUCCESS",
                                            isNewUser: response.createdNewUser,
                                            redirectToPath:
                                                loginAttemptInfo === null || loginAttemptInfo === void 0
                                                    ? void 0
                                                    : loginAttemptInfo.redirectToPath,
                                        },
                                    },
                                    userContext,
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
    var handleConsumeError = (0, react_2.useCallback)(
        function (err) {
            if (error_1.default.isThisError(err)) {
                return superTokens_1.default.getInstanceOrThrow().redirectToAuth({
                    history: props.history,
                    queryParams: {
                        error: "custom",
                        message: err.message,
                    },
                    redirectBack: false,
                });
            } else {
                return superTokens_1.default.getInstanceOrThrow().redirectToAuth({
                    history: props.history,
                    queryParams: {
                        error: "signin",
                    },
                    redirectBack: false,
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
            return __awaiter(void 0, void 0, void 0, function () {
                var preAuthSessionId, linkCode, consumeResp, err_1;
                return __generator(this, function (_a) {
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
        __assign(
            { value: componentOverrides },
            {
                children: (0, jsx_runtime_1.jsx)(
                    featureWrapper_1.default,
                    __assign(
                        {
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: translations_1.defaultTranslationsPasswordless,
                        },
                        {
                            children: (0, jsx_runtime_1.jsx)(
                                styleContext_1.StyleProvider,
                                __assign(
                                    {
                                        rawPalette: props.recipe.config.palette,
                                        defaultPalette: styles_1.defaultPalette,
                                        styleFromInit: linkClickedScreen.style,
                                        rootStyleFromInit: props.recipe.config.rootStyle,
                                        getDefaultStyles: styles_2.getStyles,
                                    },
                                    {
                                        children: (0, jsx_runtime_1.jsxs)(react_2.Fragment, {
                                            children: [
                                                props.children === undefined &&
                                                    (0, jsx_runtime_1.jsx)(
                                                        linkClickedScreen_1.LinkClickedScreen,
                                                        __assign({}, childProps)
                                                    ),
                                                props.children &&
                                                    react_1.default.Children.map(props.children, function (child) {
                                                        if (react_1.default.isValidElement(child)) {
                                                            return react_1.default.cloneElement(child, childProps);
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
                ),
            }
        )
    );
};
exports.default = LinkClickedScreen;
