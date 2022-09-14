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
var React = __importStar(require("react"));
var react_1 = require("react");
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var signInUp_1 = __importDefault(require("../../themes/signInUp"));
var translations_1 = require("../../themes/translations");
var signInAndUp_1 = require("../../../../thirdparty/components/features/signInAndUp");
var signInAndUp_2 = require("../../../../passwordless/components/features/signInAndUp");
var usercontext_1 = require("../../../../../usercontext");
var SignInAndUp = function (props) {
    var _a;
    var _b = (0, signInAndUp_1.useFeatureReducer)(),
        tpState = _b[0],
        tpDispatch = _b[1];
    var userContext = (0, usercontext_1.useUserContext)();
    var _c = (0, signInAndUp_2.useFeatureReducer)(
            (_a = props.recipe.passwordlessRecipe) === null || _a === void 0 ? void 0 : _a.recipeImpl,
            userContext
        ),
        pwlessState = _c[0],
        pwlessDispatch = _c[1];
    var _d = React.useReducer(
            function (state, action) {
                switch (action.type) {
                    // Intentionally fall through, both of these should clear the error
                    case "startLogin":
                    case "resendCode":
                        return __assign(__assign({}, state), { error: undefined });
                    case "load":
                        if (action.loginAttemptInfo !== undefined) {
                            return __assign(__assign({}, state), { error: action.error });
                        }
                        return __assign(__assign({}, state), {
                            error: state.error !== undefined ? state.error : action.error,
                        });
                    // Intentionally fall through, both of these should set the error
                    case "restartFlow":
                    case "setError":
                        return __assign(__assign({}, state), { error: action.error });
                    default:
                        return state;
                }
            },
            { error: undefined },
            function () {
                // Here we want to select the more specific error message
                var error = tpState.error;
                if (
                    // If we have an error in pwless and
                    pwlessState.error !== undefined &&
                    // either we didn't have one in thirdparty or it was the default one
                    (error === undefined || error === "SOMETHING_WENT_WRONG_ERROR")
                ) {
                    error = pwlessState.error;
                }
                return {
                    error: error,
                };
            }
        ),
        combinedState = _d[0],
        dispatch = _d[1];
    var combinedTPDispatch = React.useCallback(
        function (action) {
            dispatch(action);
            tpDispatch(action);
        },
        [tpDispatch, dispatch]
    );
    var tpChildProps = (0, signInAndUp_1.useChildProps)(props.recipe.thirdPartyRecipe);
    var combinedPwlessDispatch = React.useCallback(
        function (action) {
            dispatch(action);
            pwlessDispatch(action);
        },
        [pwlessDispatch, dispatch]
    );
    var callingConsumeCodeRef = (0, signInAndUp_2.useSuccessInAnotherTabChecker)(
        pwlessState,
        combinedPwlessDispatch,
        userContext
    );
    var pwlessChildProps = (0, signInAndUp_2.useChildProps)(
        props.recipe.passwordlessRecipe,
        combinedPwlessDispatch,
        pwlessState,
        callingConsumeCodeRef,
        userContext,
        props.history
    );
    var componentOverrides = props.recipe.config.override.components;
    var childProps = {
        passwordlessRecipe: props.recipe.passwordlessRecipe,
        thirdPartyRecipe: props.recipe.thirdPartyRecipe,
        config: props.recipe.config,
        history: props.history,
        commonState: combinedState,
        tpState: tpState,
        tpDispatch: combinedTPDispatch,
        tpChildProps: tpChildProps,
        pwlessState: pwlessState,
        pwlessDispatch: combinedPwlessDispatch,
        pwlessChildProps: pwlessChildProps,
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
                            defaultStore: translations_1.defaultTranslationsThirdPartyPasswordless,
                        },
                        {
                            children: (0, jsx_runtime_1.jsxs)(react_1.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        (0, jsx_runtime_1.jsx)(signInUp_1.default, __assign({}, childProps)),
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
exports.default = SignInAndUp;
