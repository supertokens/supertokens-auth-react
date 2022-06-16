"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInUpFeature =
    exports.useChildProps =
    exports.useFeatureReducer =
    exports.useSuccessInAnotherTabChecker =
        void 0;
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
var signInUp_1 = tslib_1.__importDefault(require("../../themes/signInUp"));
var featureWrapper_1 = tslib_1.__importDefault(require("../../../../../components/featureWrapper"));
var utils_1 = require("../../../../../utils");
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var min_1 = require("react-phone-number-input/min");
var session_1 = tslib_1.__importDefault(require("../../../../session"));
var translations_1 = require("../../themes/translations");
var react_2 = require("react");
var react_3 = require("react");
var react_4 = require("react");
var usercontext_1 = require("../../../../../usercontext");
var utils_2 = require("../../../utils");
var useSuccessInAnotherTabChecker = function (state, dispatch) {
    var callingConsumeCodeRef = (0, react_3.useRef)(false);
    (0, react_4.useEffect)(
        function () {
            // We only need to start checking this if we have an active login attempt
            if (state.loginAttemptInfo && !state.successInAnotherTab) {
                var checkSessionIntervalHandle_1 = setInterval(function () {
                    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                        var hasSession;
                        return tslib_1.__generator(this, function (_a) {
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
                        return tslib_1.__assign(tslib_1.__assign({}, oldState), {
                            error: undefined,
                            loginAttemptInfo: tslib_1.__assign(tslib_1.__assign({}, oldState.loginAttemptInfo), {
                                lastResend: action.timestamp,
                            }),
                        });
                    case "restartFlow":
                        return tslib_1.__assign(tslib_1.__assign({}, oldState), {
                            error: action.error,
                            loginAttemptInfo: undefined,
                        });
                    case "setError":
                        return tslib_1.__assign(tslib_1.__assign({}, oldState), { error: action.error });
                    case "startLogin":
                        return tslib_1.__assign(tslib_1.__assign({}, oldState), {
                            loginAttemptInfo: action.loginAttemptInfo,
                            error: undefined,
                        });
                    case "successInAnotherTab":
                        return tslib_1.__assign(tslib_1.__assign({}, oldState), { successInAnotherTab: true });
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
                return tslib_1.__assign(tslib_1.__assign({}, initArg), { error: error });
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
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var error, errorQueryParam, messageQueryParam, loginAttemptInfo;
                    return tslib_1.__generator(this, function (_a) {
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
function useChildProps(recipe, dispatch, state, callingConsumeCodeRef, history) {
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
                    var _a;
                    var pathFromUrl = (0, utils_1.getRedirectToPathFromURL)();
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
var SignInUpFeature = function (props) {
    var componentOverrides = props.recipe.config.override.components;
    var userContext = (0, usercontext_1.useUserContext)();
    var _a = (0, exports.useFeatureReducer)(props.recipe.recipeImpl, userContext),
        state = _a[0],
        dispatch = _a[1];
    var callingConsumeCodeRef = (0, exports.useSuccessInAnotherTabChecker)(state, dispatch);
    var childProps = useChildProps(props.recipe, dispatch, state, callingConsumeCodeRef, props.history);
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
                            children: (0, jsx_runtime_1.jsxs)(react_1.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        (0, jsx_runtime_1.jsx)(
                                            signInUp_1.default,
                                            tslib_1.__assign({}, childProps, {
                                                featureState: state,
                                                dispatch: dispatch,
                                            })
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
exports.SignInUpFeature = SignInUpFeature;
exports.default = exports.SignInUpFeature;
function getModifiedRecipeImplementation(originalImpl, dispatch, callingConsumeCodeRef) {
    var _this = this;
    return tslib_1.__assign(tslib_1.__assign({}, originalImpl), {
        createCode: function (input) {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var contactInfo, res, contactMethod, loginAttemptInfo;
                return tslib_1.__generator(this, function (_a) {
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
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var res, loginAttemptInfo, timestamp;
                return tslib_1.__generator(this, function (_a) {
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
                                    attemptInfo: tslib_1.__assign(tslib_1.__assign({}, loginAttemptInfo), {
                                        lastResend: timestamp,
                                    }),
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
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var res;
                return tslib_1.__generator(this, function (_a) {
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
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
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
