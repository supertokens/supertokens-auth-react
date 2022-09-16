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
exports.EmailVerification = void 0;
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
var React = __importStar(require("react"));
var react_1 = require("react");
var utils_1 = require("../../../../../utils");
var emailVerification_1 = require("../../themes/emailVerification");
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var session_1 = require("../../../../session");
var translations_1 = require("../../themes/translations");
var usercontext_1 = require("../../../../../usercontext");
var recipe_1 = __importDefault(require("../../../../session/recipe"));
var __1 = require("../../../../..");
var EmailVerification = function (props) {
    var _a;
    var sessionContext = (0, react_1.useContext)(session_1.SessionContext);
    var _b = (0, react_1.useState)("LOADING"),
        status = _b[0],
        setStatus = _b[1];
    var userContext = (0, usercontext_1.useUserContext)();
    var redirectToAuthWithHistory = (0, react_1.useCallback)(
        function () {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                (0, __1.redirectToAuth)({ redirectBack: false, history: props.history }),
                            ];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.history]
    );
    var modifiedRecipeImplementation = (0, react_1.useMemo)(
        function () {
            return __assign(__assign({}, props.recipe.recipeImpl), {
                sendVerificationEmail: function (input) {
                    return __awaiter(void 0, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
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
    var onSuccess = (0, react_1.useCallback)(
        function () {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        recipe_1.default
                            .getInstanceOrThrow()
                            .validateGlobalClaimsAndHandleSuccessRedirection(undefined, userContext, props.history),
                    ];
                });
            });
        },
        [props.recipe, props.history, userContext]
    );
    var fetchIsEmailVerified = (0, react_1.useCallback)(
        function () {
            return __awaiter(void 0, void 0, void 0, function () {
                var token;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (sessionContext.loading === true) {
                                // This callback should only be called if the session is already loaded
                                throw new Error("Should never come here");
                            }
                            token =
                                (_a = (0, utils_1.getQueryParams)("token")) !== null && _a !== void 0 ? _a : undefined;
                            if (!(token === undefined)) return [3 /*break*/, 4];
                            if (!!sessionContext.doesSessionExist) return [3 /*break*/, 2];
                            return [4 /*yield*/, redirectToAuthWithHistory()];
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
        [props.recipe, sessionContext, redirectToAuthWithHistory]
    );
    var checkIsEmailVerified = (0, react_1.useCallback)(
        function (isVerified) {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (isVerified) {
                        return [2 /*return*/, onSuccess()];
                    }
                    setStatus("READY");
                    return [2 /*return*/];
                });
            });
        },
        [props.recipe, setStatus, onSuccess]
    );
    var handleError = (0, react_1.useCallback)(
        function (err) {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                recipe_1.default.getInstanceOrThrow().doesSessionExist({ userContext: userContext }),
                            ];
                        case 1:
                            if (!_a.sent()) return [3 /*break*/, 2];
                            throw err;
                        case 2:
                            return [4 /*yield*/, redirectToAuthWithHistory()];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [redirectToAuthWithHistory]
    );
    (0, utils_1.useOnMountAPICall)(
        fetchIsEmailVerified,
        checkIsEmailVerified,
        handleError,
        sessionContext.loading === false
    );
    var signOut = (0, react_1.useCallback)(
        function () {
            return __awaiter(void 0, void 0, void 0, function () {
                var session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = recipe_1.default.getInstanceOrThrow();
                            return [4 /*yield*/, session.signOut(props.userContext)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, redirectToAuthWithHistory()];
                    }
                });
            });
        },
        [props.recipe, redirectToAuthWithHistory]
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
        onEmailAlreadyVerified: onSuccess,
        redirectToAuth: redirectToAuthWithHistory,
    };
    var verifyEmailLinkClickedScreenFeature = props.recipe.config.verifyEmailLinkClickedScreen;
    var token = (_a = (0, utils_1.getQueryParams)("token")) !== null && _a !== void 0 ? _a : undefined;
    var verifyEmailLinkClickedScreen =
        token === undefined
            ? undefined
            : {
                  styleFromInit: verifyEmailLinkClickedScreenFeature.style,
                  onTokenInvalidRedirect: redirectToAuthWithHistory,
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
                            defaultStore: translations_1.defaultTranslationsEmailVerification,
                        },
                        {
                            children: (0, jsx_runtime_1.jsxs)(react_1.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        (0, jsx_runtime_1.jsx)(
                                            emailVerification_1.EmailVerificationTheme,
                                            __assign({}, childProps)
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
