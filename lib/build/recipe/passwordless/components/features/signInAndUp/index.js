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
exports.SignInUpFeature =
    exports.useChildProps =
    exports.useFeatureReducer =
    exports.useSuccessInAnotherTabChecker =
        void 0;
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
var signInUp_1 = __importDefault(require("../../themes/signInUp"));
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
var utils_1 = require("../../../../../utils");
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var min_1 = require("react-phone-number-input/min");
var session_1 = __importDefault(require("../../../../session"));
var recipe_1 = __importDefault(require("../../../../session/recipe"));
var translations_1 = require("../../themes/translations");
var react_2 = require("react");
var react_3 = require("react");
var react_4 = require("react");
var usercontext_1 = require("../../../../../usercontext");
var utils_2 = require("../../../utils");
var useSuccessInAnotherTabChecker = function (state, dispatch, userContext) {
    var callingConsumeCodeRef = (0, react_3.useRef)(false);
    (0, react_4.useEffect)(
        function () {
            // We only need to start checking this if we have an active login attempt
            if (state.loginAttemptInfo && !state.successInAnotherTab) {
                var checkSessionIntervalHandle_1 = setInterval(function () {
                    return __awaiter(void 0, void 0, void 0, function () {
                        var hasSession;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(callingConsumeCodeRef.current === false)) return [3 /*break*/, 2];
                                    return [
                                        4 /*yield*/,
                                        session_1.default.doesSessionExist({
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    hasSession = _a.sent();
                                    if (hasSession) {
                                        dispatch({ type: "successInAnotherTab" });
                                    }
                                    _a.label = 2;
                                case 2:
                                    return [2 /*return*/];
                            }
                        });
                    });
                }, 2000);
                return function () {
                    clearInterval(checkSessionIntervalHandle_1);
                };
            }
            // Nothing to clean up
            return;
        },
        [state.loginAttemptInfo, state.successInAnotherTab]
    );
    return callingConsumeCodeRef;
};
exports.useSuccessInAnotherTabChecker = useSuccessInAnotherTabChecker;
var useFeatureReducer = function (recipeImpl, userContext) {
    var _a = React.useReducer(
            function (oldState, action) {
                switch (action.type) {
                    case "load":
                        return {
                            loaded: true,
                            error: action.error,
                            loginAttemptInfo: action.loginAttemptInfo,
                            successInAnotherTab: false,
                        };
                    case "resendCode":
                        if (!oldState.loginAttemptInfo) {
                            return oldState;
                        }
                        return __assign(__assign({}, oldState), {
                            error: undefined,
                            loginAttemptInfo: __assign(__assign({}, oldState.loginAttemptInfo), {
                                lastResend: action.timestamp,
                            }),
                        });
                    case "restartFlow":
                        return __assign(__assign({}, oldState), { error: action.error, loginAttemptInfo: undefined });
                    case "setError":
                        return __assign(__assign({}, oldState), { error: action.error });
                    case "startLogin":
                        return __assign(__assign({}, oldState), {
                            loginAttemptInfo: action.loginAttemptInfo,
                            error: undefined,
                        });
                    case "successInAnotherTab":
                        return __assign(__assign({}, oldState), { successInAnotherTab: true });
                    default:
                        return oldState;
                }
            },
            {
                error: undefined,
                loaded: false,
                loginAttemptInfo: undefined,
                successInAnotherTab: false,
            },
            function (initArg) {
                var error = undefined;
                var errorQueryParam = (0, utils_1.getQueryParams)("error");
                var messageQueryParam = (0, utils_1.getQueryParams)("message");
                if (errorQueryParam !== null) {
                    if (errorQueryParam === "signin") {
                        error = "SOMETHING_WENT_WRONG_ERROR";
                    } else if (errorQueryParam === "restart_link") {
                        error = "ERROR_SIGN_IN_UP_LINK";
                    } else if (errorQueryParam === "custom" && messageQueryParam !== null) {
                        error = messageQueryParam;
                    }
                }
                return __assign(__assign({}, initArg), { error: error });
            }
        ),
        state = _a[0],
        dispatch = _a[1];
    (0, react_4.useEffect)(
        function () {
            if (recipeImpl === undefined) {
                return;
            }
            function load() {
                return __awaiter(this, void 0, void 0, function () {
                    var error, errorQueryParam, messageQueryParam, loginAttemptInfo;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                error = undefined;
                                errorQueryParam = (0, utils_1.getQueryParams)("error");
                                messageQueryParam = (0, utils_1.getQueryParams)("message");
                                if (errorQueryParam !== null) {
                                    if (errorQueryParam === "signin") {
                                        error = "SOMETHING_WENT_WRONG_ERROR";
                                    } else if (errorQueryParam === "restart_link") {
                                        error = "ERROR_SIGN_IN_UP_LINK";
                                    } else if (errorQueryParam === "custom" && messageQueryParam !== null) {
                                        error = messageQueryParam;
                                    }
                                }
                                return [
                                    4 /*yield*/,
                                    (0, utils_2.getLoginAttemptInfo)({
                                        recipeImplementation: recipeImpl,
                                        userContext: userContext,
                                    }),
                                ];
                            case 1:
                                loginAttemptInfo = _a.sent();
                                // No need to check if the component is unmounting, since this has no effect then.
                                dispatch({ type: "load", loginAttemptInfo: loginAttemptInfo, error: error });
                                return [2 /*return*/];
                        }
                    });
                });
            }
            if (state.loaded === false) {
                void load();
            }
        },
        [state.loaded, recipeImpl, userContext]
    );
    return [state, dispatch];
};
exports.useFeatureReducer = useFeatureReducer;
function useChildProps(recipe, dispatch, state, callingConsumeCodeRef, userContext, history) {
    var recipeImplementation = React.useMemo(
        function () {
            return recipe && getModifiedRecipeImplementation(recipe.recipeImpl, dispatch, callingConsumeCodeRef);
        },
        [recipe]
    );
    return (0, react_2.useMemo)(
        function () {
            if (!recipe || !recipeImplementation) {
                return undefined;
            }
            return {
                onSuccess: function (result) {
                    return recipe_1.default.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                        {
                            rid: recipe.config.recipeId,
                            successRedirectContext: {
                                action: "SUCCESS",
                                isNewUser: result.createdNewUser,
                                redirectToPath: (0, utils_1.getRedirectToPathFromURL)(),
                            },
                        },
                        userContext,
                        history
                    );
                },
                recipeImplementation: recipeImplementation,
                config: recipe.config,
            };
        },
        [state, recipeImplementation]
    );
}
exports.useChildProps = useChildProps;
var SignInUpFeature = function (props) {
    var componentOverrides = props.recipe.config.override.components;
    var userContext = (0, usercontext_1.useUserContext)();
    var _a = (0, exports.useFeatureReducer)(props.recipe.recipeImpl, userContext),
        state = _a[0],
        dispatch = _a[1];
    var callingConsumeCodeRef = (0, exports.useSuccessInAnotherTabChecker)(state, dispatch, userContext);
    var childProps = useChildProps(props.recipe, dispatch, state, callingConsumeCodeRef, userContext, props.history);
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
                            children: (0, jsx_runtime_1.jsxs)(react_1.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        (0, jsx_runtime_1.jsx)(
                                            signInUp_1.default,
                                            __assign({}, childProps, { featureState: state, dispatch: dispatch })
                                        ),
                                    props.children &&
                                        React.Children.map(props.children, function (child) {
                                            if (React.isValidElement(child)) {
                                                return React.cloneElement(
                                                    child,
                                                    __assign(__assign({}, childProps), {
                                                        featureState: state,
                                                        dispatch: dispatch,
                                                    })
                                                );
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
exports.SignInUpFeature = SignInUpFeature;
exports.default = exports.SignInUpFeature;
function getModifiedRecipeImplementation(originalImpl, dispatch, callingConsumeCodeRef) {
    var _this = this;
    return __assign(__assign({}, originalImpl), {
        createCode: function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                var contactInfo, res, contactMethod, loginAttemptInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if ("email" in input) {
                                contactInfo = input.email;
                            } else {
                                contactInfo = (0, min_1.formatPhoneNumberIntl)(input.phoneNumber);
                            }
                            return [4 /*yield*/, originalImpl.createCode(input)];
                        case 1:
                            res = _a.sent();
                            if (!(res.status === "OK")) return [3 /*break*/, 3];
                            contactMethod = "email" in input ? "EMAIL" : "PHONE";
                            loginAttemptInfo = {
                                deviceId: res.deviceId,
                                preAuthSessionId: res.preAuthSessionId,
                                flowType: res.flowType,
                                lastResend: Date.now(),
                                contactMethod: contactMethod,
                                contactInfo: contactInfo,
                                redirectToPath: (0, utils_1.getRedirectToPathFromURL)(),
                            };
                            return [
                                4 /*yield*/,
                                (0, utils_2.setLoginAttemptInfo)({
                                    recipeImplementation: originalImpl,
                                    userContext: input.userContext,
                                    attemptInfo: loginAttemptInfo,
                                }),
                            ];
                        case 2:
                            _a.sent();
                            dispatch({ type: "startLogin", loginAttemptInfo: loginAttemptInfo });
                            _a.label = 3;
                        case 3:
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        resendCode: function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                var res, loginAttemptInfo, timestamp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.resendCode(input)];
                        case 1:
                            res = _a.sent();
                            if (!(res.status === "OK")) return [3 /*break*/, 5];
                            return [
                                4 /*yield*/,
                                (0, utils_2.getLoginAttemptInfo)({
                                    recipeImplementation: originalImpl,
                                    userContext: input.userContext,
                                }),
                            ];
                        case 2:
                            loginAttemptInfo = _a.sent();
                            if (!(loginAttemptInfo !== undefined && loginAttemptInfo.deviceId === input.deviceId))
                                return [3 /*break*/, 4];
                            timestamp = Date.now();
                            return [
                                4 /*yield*/,
                                (0, utils_2.setLoginAttemptInfo)({
                                    recipeImplementation: originalImpl,
                                    userContext: input.userContext,
                                    attemptInfo: __assign(__assign({}, loginAttemptInfo), { lastResend: timestamp }),
                                }),
                            ];
                        case 3:
                            _a.sent();
                            dispatch({ type: "resendCode", timestamp: timestamp });
                            _a.label = 4;
                        case 4:
                            return [3 /*break*/, 7];
                        case 5:
                            if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 7];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 6:
                            _a.sent();
                            dispatch({ type: "restartFlow", error: "ERROR_SIGN_IN_UP_RESEND_RESTART_FLOW" });
                            _a.label = 7;
                        case 7:
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        consumeCode: function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // We need to call consume code while callingConsume, so we don't detect
                            // the session creation too early and go to successInAnotherTab too early
                            callingConsumeCodeRef.current = true;
                            return [4 /*yield*/, originalImpl.consumeCode(input)];
                        case 1:
                            res = _a.sent();
                            if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 2:
                            _a.sent();
                            dispatch({ type: "restartFlow", error: "ERROR_SIGN_IN_UP_CODE_CONSUME_RESTART_FLOW" });
                            return [3 /*break*/, 5];
                        case 3:
                            if (!(res.status === "OK")) return [3 /*break*/, 5];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            callingConsumeCodeRef.current = false;
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        clearLoginAttemptInfo: function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            _a.sent();
                            (0, utils_1.clearErrorQueryParam)();
                            dispatch({ type: "restartFlow", error: undefined });
                            return [2 /*return*/];
                    }
                });
            });
        },
    });
}
