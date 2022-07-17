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
exports.SignInAndUpFeature = exports.useChildProps = exports.useFeatureReducer = void 0;
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
var signInAndUp_1 = __importDefault(require("../../themes/signInAndUp"));
var utils_1 = require("../../../../../utils");
var featureWrapper_1 = __importDefault(require("../../../../../components/featureWrapper"));
var componentOverrideContext_1 = require("../../../../../components/componentOverride/componentOverrideContext");
var translations_1 = require("../../themes/translations");
var react_2 = require("react");
var react_3 = require("react");
var error_1 = __importDefault(require("supertokens-web-js/utils/error"));
var usercontext_1 = require("../../../../../usercontext");
var recipe_1 = __importDefault(require("../../../../session/recipe"));
var useFeatureReducer = function (recipe) {
    return React.useReducer(
        function (oldState, action) {
            switch (action.type) {
                case "setSignIn":
                    return __assign(__assign({}, oldState), { error: undefined, isSignUp: false });
                case "setSignUp":
                    return __assign(__assign({}, oldState), { error: undefined, isSignUp: true });
                case "setError":
                    return __assign(__assign({}, oldState), { error: action.error });
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
            var show = (0, utils_1.getQueryParams)("show");
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
exports.useFeatureReducer = useFeatureReducer;
function useChildProps(recipe, state, dispatch, history) {
    var _this = this;
    var recipeImplementation = (0, react_2.useMemo)(
        function () {
            return recipe && getModifiedRecipeImplementation(recipe.recipeImpl);
        },
        [recipe]
    );
    var userContext = (0, usercontext_1.useUserContext)();
    var onSignInSuccess = (0, react_3.useCallback)(
        function () {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        recipe_1.default.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                            {
                                rid: recipe.config.recipeId,
                                successRedirectContext: {
                                    action: "SUCCESS",
                                    isNewUser: false,
                                    redirectToPath: (0, utils_1.getRedirectToPathFromURL)(),
                                },
                            },
                            userContext,
                            history
                        ),
                    ];
                });
            });
        },
        [recipe, userContext, history]
    );
    var onSignUpSuccess = (0, react_3.useCallback)(
        function () {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        recipe_1.default.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                            {
                                rid: recipe.config.recipeId,
                                successRedirectContext: {
                                    action: "SUCCESS",
                                    isNewUser: true,
                                    redirectToPath: (0, utils_1.getRedirectToPathFromURL)(),
                                },
                            },
                            userContext,
                            history
                        ),
                    ];
                });
            });
        },
        [recipe, userContext, history]
    );
    return (0, react_2.useMemo)(
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
var SignInAndUpFeature = function (props) {
    var _a = (0, exports.useFeatureReducer)(props.recipe),
        state = _a[0],
        dispatch = _a[1];
    var childProps = useChildProps(props.recipe, state, dispatch, props.history);
    return (0, jsx_runtime_1.jsx)(
        componentOverrideContext_1.ComponentOverrideContext.Provider,
        __assign(
            { value: props.recipe.config.override.components },
            {
                children: (0, jsx_runtime_1.jsx)(
                    featureWrapper_1.default,
                    __assign(
                        {
                            useShadowDom: props.recipe.config.useShadowDom,
                            defaultStore: translations_1.defaultTranslationsEmailPassword,
                        },
                        {
                            children: (0, jsx_runtime_1.jsxs)(react_1.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        (0, jsx_runtime_1.jsx)(
                                            signInAndUp_1.default,
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
exports.SignInAndUpFeature = SignInAndUpFeature;
exports.default = exports.SignInAndUpFeature;
var getModifiedRecipeImplementation = function (origImpl) {
    return __assign({}, origImpl);
};
function getThemeSignUpFeatureFormFields(formFields, recipe, userContext) {
    var _this = this;
    var emailPasswordOnly = formFields.length === 2;
    return formFields.map(function (field) {
        return __assign(__assign({}, field), {
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
                    return __awaiter(_this, void 0, void 0, function () {
                        var error, emailExists, err_1;
                        return __generator(this, function (_a) {
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
