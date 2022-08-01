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
var react_1 = require("react");
var utils_1 = require("../../../../../utils");
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
var styleContext_1 = require("../../../../../styles/styleContext");
var styles_1 = require("../../../../../styles/styles");
var styles_2 = require("../../themes/styles");
var signInAndUpCallback_1 = require("../../themes/signInAndUpCallback");
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var translations_1 = require("../../themes/translations");
var error_1 = __importDefault(require("supertokens-web-js/utils/error"));
var usercontext_1 = require("../../../../../usercontext");
var recipe_1 = __importDefault(require("../../../../session/recipe"));
var superTokens_1 = __importDefault(require("../../../../../superTokens"));
var SignInAndUpCallback = function (props) {
    var userContext = (0, usercontext_1.useUserContext)();
    var verifyCode = (0, react_1.useCallback)(
        function () {
            return props.recipe.recipeImpl.signInAndUp({
                userContext: userContext,
            });
        },
        [props.recipe, props.history, userContext]
    );
    var handleVerifyResponse = (0, react_1.useCallback)(
        function (response) {
            return __awaiter(void 0, void 0, void 0, function () {
                var stateResponse, redirectToPath;
                return __generator(this, function (_a) {
                    if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
                        return [
                            2 /*return*/,
                            superTokens_1.default.getInstanceOrThrow().redirectToAuth({
                                history: props.history,
                                queryParams: {
                                    error: "no_email_present",
                                },
                                redirectBack: false,
                            }),
                        ];
                    }
                    if (response.status === "OK") {
                        stateResponse = props.recipe.recipeImpl.getStateAndOtherInfoFromStorage({
                            userContext: userContext,
                        });
                        redirectToPath = stateResponse === undefined ? undefined : stateResponse.redirectToPath;
                        return [
                            2 /*return*/,
                            recipe_1.default.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                                {
                                    rid: props.recipe.config.recipeId,
                                    successRedirectContext: {
                                        action: "SUCCESS",
                                        isNewUser: response.createdNewUser,
                                        redirectToPath: redirectToPath,
                                    },
                                },
                                userContext,
                                props.history
                            ),
                        ];
                    }
                    return [2 /*return*/];
                });
            });
        },
        [props.recipe, props.history, userContext]
    );
    var handleError = (0, react_1.useCallback)(
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
            }
            return superTokens_1.default.getInstanceOrThrow().redirectToAuth({
                history: props.history,
                queryParams: {
                    error: "signin",
                },
                redirectBack: false,
            });
        },
        [props.recipe, props.history]
    );
    (0, utils_1.useOnMountAPICall)(verifyCode, handleVerifyResponse, handleError);
    var componentOverrides = props.recipe.config.override.components;
    var oAuthCallbackScreen = props.recipe.config.oAuthCallbackScreen;
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
                            defaultStore: translations_1.defaultTranslationsThirdParty,
                        },
                        {
                            children: (0, jsx_runtime_1.jsx)(
                                styleContext_1.StyleProvider,
                                __assign(
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
