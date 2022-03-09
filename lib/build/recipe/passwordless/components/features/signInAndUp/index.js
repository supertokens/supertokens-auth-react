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
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
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
var React = __importStar(require("react"));
var react_2 = require("react");
var signInUp_1 = __importDefault(require("../../themes/signInUp"));
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
var utils_1 = require("../../../../../utils");
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var min_1 = require("react-phone-number-input/min");
var session_1 = __importDefault(require("../../../../session"));
var translations_1 = require("../../themes/translations");
var react_3 = require("react");
var react_4 = require("react");
var react_5 = require("react");
exports.useSuccessInAnotherTabChecker = function (state, dispatch) {
    var callingConsumeCodeRef = react_4.useRef(false);
    react_5.useEffect(
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
                                    return [4 /*yield*/, session_1.default.doesSessionExist()];
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
exports.useFeatureReducer = function (recipeImpl) {
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
                var errorQueryParam = utils_1.getQueryParams("error");
                var messageQueryParam = utils_1.getQueryParams("message");
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
    react_5.useEffect(
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
                                errorQueryParam = utils_1.getQueryParams("error");
                                messageQueryParam = utils_1.getQueryParams("message");
                                if (errorQueryParam !== null) {
                                    if (errorQueryParam === "signin") {
                                        error = "SOMETHING_WENT_WRONG_ERROR";
                                    } else if (errorQueryParam === "restart_link") {
                                        error = "ERROR_SIGN_IN_UP_LINK";
                                    } else if (errorQueryParam === "custom" && messageQueryParam !== null) {
                                        error = messageQueryParam;
                                    }
                                }
                                return [4 /*yield*/, recipeImpl.getLoginAttemptInfo()];
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
        [state.loaded, recipeImpl]
    );
    return [state, dispatch];
};
function useChildProps(recipe, dispatch, state, callingConsumeCodeRef, history) {
    var recipeImplementation = React.useMemo(
        function () {
            return recipe && getModifiedRecipeImplementation(recipe.recipeImpl, dispatch, callingConsumeCodeRef);
        },
        [recipe]
    );
    return react_3.useMemo(
        function () {
            if (!recipe || !recipeImplementation) {
                return undefined;
            }
            return {
                onSuccess: function (result) {
                    var _a;
                    var pathFromUrl = utils_1.getRedirectToPathFromURL();
                    return recipe.redirect(
                        {
                            action: "SUCCESS",
                            isNewUser: result.createdUser,
                            redirectToPath:
                                pathFromUrl !== undefined
                                    ? pathFromUrl
                                    : (_a = state.loginAttemptInfo) === null || _a === void 0
                                    ? void 0
                                    : _a.redirectToPath,
                        },
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
exports.SignInUpFeature = function (props) {
    var componentOverrides = props.recipe.config.override.components;
    var _a = exports.useFeatureReducer(props.recipe.recipeImpl),
        state = _a[0],
        dispatch = _a[1];
    var callingConsumeCodeRef = exports.useSuccessInAnotherTabChecker(state, dispatch);
    var childProps = useChildProps(props.recipe, dispatch, state, callingConsumeCodeRef, props.history);
    return react_1.jsx(
        componentOverrideContext_1.ComponentOverrideContext.Provider,
        { value: componentOverrides },
        react_1.jsx(
            featureWrapper_1.default,
            {
                useShadowDom: props.recipe.config.useShadowDom,
                defaultStore: translations_1.defaultTranslationsPasswordless,
                userContext: props.userContext,
            },
            react_1.jsx(
                react_2.Fragment,
                null,
                props.children === undefined &&
                    react_1.jsx(
                        signInUp_1.default,
                        __assign({}, childProps, { featureState: state, dispatch: dispatch })
                    ),
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
                                contactInfo = min_1.formatPhoneNumberIntl(input.phoneNumber);
                            }
                            return [4 /*yield*/, originalImpl.createCode(input)];
                        case 1:
                            res = _a.sent();
                            if (!(res.status === "OK")) return [3 /*break*/, 3];
                            contactMethod = "email" in input ? "EMAIL" : "PHONE";
                            loginAttemptInfo = __assign(__assign({}, res), {
                                lastResend: new Date().getTime(),
                                contactMethod: contactMethod,
                                contactInfo: contactInfo,
                                redirectToPath: utils_1.getRedirectToPathFromURL(),
                            });
                            return [4 /*yield*/, originalImpl.setLoginAttemptInfo(loginAttemptInfo)];
                        case 2:
                            _a.sent();
                            dispatch({ type: "startLogin", loginAttemptInfo: loginAttemptInfo });
                            return [3 /*break*/, 4];
                        case 3:
                            if (res.status === "GENERAL_ERROR") {
                                dispatch({ type: "setError", error: res.message });
                            }
                            _a.label = 4;
                        case 4:
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
                            return [4 /*yield*/, originalImpl.getLoginAttemptInfo()];
                        case 2:
                            loginAttemptInfo = _a.sent();
                            if (!(loginAttemptInfo !== undefined && loginAttemptInfo.deviceId === input.deviceId))
                                return [3 /*break*/, 4];
                            timestamp = new Date().getTime();
                            return [
                                4 /*yield*/,
                                originalImpl.setLoginAttemptInfo(
                                    __assign(__assign({}, loginAttemptInfo), { lastResend: timestamp })
                                ),
                            ];
                        case 3:
                            _a.sent();
                            dispatch({ type: "resendCode", timestamp: timestamp });
                            _a.label = 4;
                        case 4:
                            return [3 /*break*/, 8];
                        case 5:
                            if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 7];
                            return [4 /*yield*/, originalImpl.clearLoginAttemptInfo()];
                        case 6:
                            _a.sent();
                            dispatch({ type: "restartFlow", error: "ERROR_SIGN_IN_UP_RESEND_RESTART_FLOW" });
                            return [3 /*break*/, 8];
                        case 7:
                            if (res.status === "GENERAL_ERROR") {
                                dispatch({ type: "setError", error: res.message });
                            }
                            _a.label = 8;
                        case 8:
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
                            return [4 /*yield*/, originalImpl.clearLoginAttemptInfo()];
                        case 2:
                            _a.sent();
                            dispatch({ type: "restartFlow", error: "ERROR_SIGN_IN_UP_CODE_CONSUME_RESTART_FLOW" });
                            return [3 /*break*/, 5];
                        case 3:
                            if (!(res.status === "OK")) return [3 /*break*/, 5];
                            return [4 /*yield*/, originalImpl.clearLoginAttemptInfo()];
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
        clearLoginAttemptInfo: function () {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.clearLoginAttemptInfo()];
                        case 1:
                            _a.sent();
                            utils_1.clearErrorQueryParam();
                            dispatch({ type: "restartFlow", error: undefined });
                            return [2 /*return*/];
                    }
                });
            });
        },
    });
}
