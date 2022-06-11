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
var React = tslib_1.__importStar(require("react"));
var react_2 = require("react");
var featureWrapper_1 = tslib_1.__importDefault(require("../../../../../components/featureWrapper"));
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var signInUp_1 = tslib_1.__importDefault(require("../../themes/signInUp"));
var translations_1 = require("../../themes/translations");
var signInAndUp_1 = require("../../../../thirdparty/components/features/signInAndUp");
var signInAndUp_2 = require("../../../../passwordless/components/features/signInAndUp");
var usercontext_1 = require("../../../../../usercontext");
var SignInAndUp = function (props) {
    var _a;
    var _b = signInAndUp_1.useFeatureReducer(),
        tpState = _b[0],
        tpDispatch = _b[1];
    var userContext = usercontext_1.useUserContext();
    var _c = signInAndUp_2.useFeatureReducer(
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
                        return tslib_1.__assign(tslib_1.__assign({}, state), { error: undefined });
                    case "load":
                        if (action.loginAttemptInfo !== undefined) {
                            return tslib_1.__assign(tslib_1.__assign({}, state), { error: action.error });
                        }
                        return tslib_1.__assign(tslib_1.__assign({}, state), {
                            error: state.error !== undefined ? state.error : action.error,
                        });
                    // Intentionally fall through, both of these should set the error
                    case "restartFlow":
                    case "setError":
                        return tslib_1.__assign(tslib_1.__assign({}, state), { error: action.error });
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
    var tpChildProps = signInAndUp_1.useChildProps(props.recipe.thirdPartyRecipe);
    var combinedPwlessDispatch = React.useCallback(
        function (action) {
            dispatch(action);
            pwlessDispatch(action);
        },
        [pwlessDispatch, dispatch]
    );
    var callingConsumeCodeRef = signInAndUp_2.useSuccessInAnotherTabChecker(pwlessState, combinedPwlessDispatch);
    var pwlessChildProps = signInAndUp_2.useChildProps(
        props.recipe.passwordlessRecipe,
        combinedPwlessDispatch,
        pwlessState,
        callingConsumeCodeRef,
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
    return react_1.jsx(
        componentOverrideContext_1.ComponentOverrideContext.Provider,
        { value: componentOverrides },
        react_1.jsx(
            featureWrapper_1.default,
            {
                useShadowDom: props.recipe.config.useShadowDom,
                defaultStore: translations_1.defaultTranslationsThirdPartyPasswordless,
            },
            react_1.jsx(
                react_2.Fragment,
                null,
                props.children === undefined && react_1.jsx(signInUp_1.default, tslib_1.__assign({}, childProps)),
                props.children &&
                    React.Children.map(props.children, function (child) {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, props);
                        }
                        return child;
                    })
            )
        )
    );
};
exports.default = SignInAndUp;
