"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
var React = tslib_1.__importStar(require("react"));
var react_2 = require("react");
var signInAndUp_1 = tslib_1.__importDefault(require("../../themes/signInAndUp"));
var utils_1 = require("../../../../../utils");
var featureWrapper_1 = tslib_1.__importDefault(require("../../../../../components/featureWrapper"));
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var translations_1 = require("../../themes/translations");
var react_3 = require("react");
var react_4 = require("react");
var error_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/error"));
var usercontext_1 = require("../../../../../usercontext");
exports.useFeatureReducer = function (recipe) {
    return React.useReducer(
        function (oldState, action) {
            switch (action.type) {
                case "setSignIn":
                    return tslib_1.__assign(tslib_1.__assign({}, oldState), { isSignUp: false });
                case "setSignUp":
                    return tslib_1.__assign(tslib_1.__assign({}, oldState), { isSignUp: true });
                case "setError":
                    return tslib_1.__assign(tslib_1.__assign({}, oldState), { error: action.error });
                default:
                    return oldState;
            }
        },
        {
            isSignUp: recipe === undefined ? false : recipe.config.signInAndUpFeature.defaultToSignUp,
            user: undefined,
            error: undefined,
        },
        function (initArg) {
            var show = utils_1.getQueryParams("show");
            var isSignUp = initArg.isSignUp;
            if (show !== null) {
                isSignUp = show === "signup";
            }
            return {
                isSignUp: isSignUp,
                user: undefined,
                error: undefined,
            };
        }
    );
};
function useChildProps(recipe, state, dispatch, history) {
    var _this = this;
    var recipeImplementation = react_3.useMemo(
        function () {
            return recipe && getModifiedRecipeImplementation(recipe.recipeImpl);
        },
        [recipe]
    );
    var userContext = usercontext_1.useUserContext();
    var onSignInSuccess = react_4.useCallback(
        function () {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var isEmailVerified, ignored_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!recipe) {
                                return [2 /*return*/];
                            }
                            if (!(recipe.emailVerification.config.mode === "REQUIRED")) return [3 /*break*/, 6];
                            isEmailVerified = true;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, recipe.emailVerification.isEmailVerified(userContext)];
                        case 2:
                            isEmailVerified = _a.sent().isVerified;
                            return [3 /*break*/, 4];
                        case 3:
                            ignored_1 = _a.sent();
                            return [3 /*break*/, 4];
                        case 4:
                            if (!!isEmailVerified) return [3 /*break*/, 6];
                            return [
                                4 /*yield*/,
                                recipe.savePostEmailVerificationSuccessRedirectState({
                                    redirectToPath: utils_1.getRedirectToPathFromURL(),
                                    isNewUser: false,
                                    action: "SUCCESS",
                                }),
                            ];
                        case 5:
                            _a.sent();
                            return [
                                2 /*return*/,
                                recipe.emailVerification.redirect(
                                    {
                                        action: "VERIFY_EMAIL",
                                    },
                                    history
                                ),
                            ];
                        case 6:
                            return [
                                4 /*yield*/,
                                recipe.redirect(
                                    {
                                        action: "SUCCESS",
                                        isNewUser: false,
                                        redirectToPath: utils_1.getRedirectToPathFromURL(),
                                    },
                                    history
                                ),
                            ];
                        case 7:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        [recipe]
    );
    var onSignUpSuccess = react_4.useCallback(
        function () {
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!recipe) {
                                return [2 /*return*/];
                            }
                            if (!(recipe.emailVerification.config.mode === "REQUIRED")) return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                recipe.savePostEmailVerificationSuccessRedirectState({
                                    redirectToPath: utils_1.getRedirectToPathFromURL(),
                                    isNewUser: true,
                                    action: "SUCCESS",
                                }),
                            ];
                        case 1:
                            _a.sent();
                            return [
                                4 /*yield*/,
                                recipe.emailVerification.redirect(
                                    {
                                        action: "VERIFY_EMAIL",
                                    },
                                    history
                                ),
                            ];
                        case 2:
                            return [2 /*return*/, _a.sent()];
                        case 3:
                            return [
                                4 /*yield*/,
                                recipe.redirect(
                                    {
                                        redirectToPath: utils_1.getRedirectToPathFromURL(),
                                        isNewUser: true,
                                        action: "SUCCESS",
                                    },
                                    history
                                ),
                            ];
                        case 4:
                            return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        [recipe]
    );
    return react_3.useMemo(
        function () {
            if (recipe === undefined || recipeImplementation === undefined) {
                return;
            }
            var signInAndUpFeature = recipe.config.signInAndUpFeature;
            var signUpFeature = signInAndUpFeature.signUpForm;
            var signInFeature = signInAndUpFeature.signInForm;
            var signInForm = {
                recipeImplementation: recipeImplementation,
                config: recipe.config,
                styleFromInit: signInFeature.style,
                formFields: signInFeature.formFields,
                error: state.error,
                clearError: function () {
                    return dispatch({ type: "setError", error: undefined });
                },
                onError: function (error) {
                    return dispatch({ type: "setError", error: error });
                },
                onSuccess: onSignInSuccess,
                forgotPasswordClick: function () {
                    return recipe.redirect({ action: "RESET_PASSWORD" }, history);
                },
            };
            var signUpForm = {
                recipeImplementation: recipeImplementation,
                config: recipe.config,
                styleFromInit: signUpFeature.style,
                formFields: getThemeSignUpFeatureFormFields(signUpFeature.formFields, recipe, userContext),
                error: state.error,
                clearError: function () {
                    return dispatch({ type: "setError", error: undefined });
                },
                onError: function (error) {
                    return dispatch({ type: "setError", error: error });
                },
                onSuccess: onSignUpSuccess,
            };
            return {
                config: recipe.config,
                signInForm: signInForm,
                signUpForm: signUpForm,
            };
        },
        [recipe, state, dispatch]
    );
}
exports.useChildProps = useChildProps;
exports.SignInAndUpFeature = function (props) {
    var _a = exports.useFeatureReducer(props.recipe),
        state = _a[0],
        dispatch = _a[1];
    var childProps = useChildProps(props.recipe, state, dispatch, props.history);
    return react_1.jsx(
        componentOverrideContext_1.ComponentOverrideContext.Provider,
        { value: props.recipe.config.override.components },
        react_1.jsx(
            featureWrapper_1.default,
            {
                useShadowDom: props.recipe.config.useShadowDom,
                defaultStore: translations_1.defaultTranslationsEmailPassword,
            },
            react_1.jsx(
                react_2.Fragment,
                null,
                props.children === undefined &&
                    react_1.jsx(
                        signInAndUp_1.default,
                        tslib_1.__assign({}, childProps, { featureState: state, dispatch: dispatch })
                    ),
                props.children &&
                    React.Children.map(props.children, function (child) {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(
                                child,
                                tslib_1.__assign(tslib_1.__assign({}, childProps), {
                                    featureState: state,
                                    dispatch: dispatch,
                                })
                            );
                        }
                        return child;
                    })
            )
        )
    );
};
exports.default = exports.SignInAndUpFeature;
var getModifiedRecipeImplementation = function (origImpl) {
    return tslib_1.__assign({}, origImpl);
};
function getThemeSignUpFeatureFormFields(formFields, recipe, userContext) {
    var _this = this;
    var emailPasswordOnly = formFields.length === 2;
    return formFields.map(function (field) {
        return tslib_1.__assign(tslib_1.__assign({}, field), {
            showIsRequired: (function () {
                // If email and password only, do not show required indicator (*).
                if (emailPasswordOnly) {
                    return false;
                }
                // Otherwise, show for all non optional fields (including email and password).
                return field.optional === false;
            })(),
            validate: (function () {
                // If field is not email, return field validate unchanged.
                if (field.id !== "email") {
                    return field.validate;
                }
                // Otherwise, if email, use syntax validate method and check if email exists.
                return function (value) {
                    return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var error, emailExists, err_1;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4 /*yield*/, field.validate(value)];
                                case 1:
                                    error = _a.sent();
                                    if (error !== undefined) {
                                        return [2 /*return*/, error];
                                    }
                                    if (typeof value !== "string") {
                                        return [2 /*return*/, "GENERAL_ERROR_EMAIL_NON_STRING"];
                                    }
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    return [
                                        4 /*yield*/,
                                        recipe.recipeImpl.doesEmailExist({
                                            email: value,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 3:
                                    emailExists = _a.sent().doesExist;
                                    if (emailExists) {
                                        return [2 /*return*/, "EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS"];
                                    }
                                    return [3 /*break*/, 5];
                                case 4:
                                    err_1 = _a.sent();
                                    if (error_1.default.isThisError(err_1)) {
                                        return [2 /*return*/, err_1.message];
                                    }
                                    return [3 /*break*/, 5];
                                case 5:
                                    return [2 /*return*/, undefined];
                            }
                        });
                    });
                };
            })(),
        });
    });
}
