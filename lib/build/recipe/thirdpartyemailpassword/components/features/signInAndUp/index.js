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
var React = tslib_1.__importStar(require("react"));
var react_1 = require("react");
var featureWrapper_1 = tslib_1.__importDefault(require("../../../../../components/featureWrapper"));
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var signInAndUp_1 = tslib_1.__importDefault(require("../../themes/signInAndUp"));
var translations_1 = require("../../themes/translations");
var signInAndUp_2 = require("../../../../thirdparty/components/features/signInAndUp");
var signInAndUp_3 = require("../../../../emailpassword/components/features/signInAndUp");
var SignInAndUp = function (props) {
    var _a = (0, signInAndUp_2.useFeatureReducer)(),
        tpState = _a[0],
        tpDispatch = _a[1];
    var _b = (0, signInAndUp_3.useFeatureReducer)(props.recipe.emailPasswordRecipe),
        epState = _b[0],
        epDispatch = _b[1];
    var _c = React.useReducer(
            function (state, action) {
                switch (action.type) {
                    case "setError":
                        return tslib_1.__assign(tslib_1.__assign({}, state), { error: action.error });
                    default:
                        return state;
                }
            },
            { error: tpState.error || epState.error }
        ),
        combinedState = _c[0],
        dispatch = _c[1];
    var combinedTPDispatch = React.useCallback(
        function (action) {
            dispatch(action);
            tpDispatch(action);
        },
        [tpDispatch, dispatch]
    );
    var tpChildProps = (0, signInAndUp_2.useChildProps)(props.recipe.thirdPartyRecipe);
    var combinedEPDispatch = React.useCallback(
        function (action) {
            dispatch(action);
            epDispatch(action);
        },
        [epDispatch, dispatch]
    );
    var epChildProps = (0, signInAndUp_3.useChildProps)(
        props.recipe.emailPasswordRecipe,
        epState,
        combinedEPDispatch,
        props.history
    );
    var componentOverrides = props.recipe.config.override.components;
    var childProps = {
        emailPasswordRecipe: props.recipe.emailPasswordRecipe,
        thirdPartyRecipe: props.recipe.thirdPartyRecipe,
        config: props.recipe.config,
        history: props.history,
        commonState: combinedState,
        tpState: tpState,
        tpDispatch: combinedTPDispatch,
        tpChildProps: tpChildProps,
        epState: epState,
        epDispatch: combinedEPDispatch,
        epChildProps: epChildProps,
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
                            defaultStore: translations_1.defaultTranslationsThirdPartyEmailPassword,
                        },
                        {
                            children: (0, jsx_runtime_1.jsxs)(react_1.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        (0, jsx_runtime_1.jsx)(signInAndUp_1.default, tslib_1.__assign({}, childProps)),
                                    props.children &&
                                        React.Children.map(props.children, function (child) {
                                            if (React.isValidElement(child)) {
                                                return React.cloneElement(child, props);
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
