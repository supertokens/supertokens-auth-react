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
import * as React from "react";
import { Fragment } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { useUserContext } from "../../../../../usercontext";
import { getQueryParams, getRedirectToPathFromURL } from "../../../../../utils";
import Session from "../../../../session/recipe";
import SignInAndUpTheme from "../../themes/signInAndUp";
import { defaultTranslationsEmailPassword } from "../../themes/translations";

import type { FeatureBaseProps, NormalisedFormField } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { SignInAndUpState } from "../../../types";
import type {
    ComponentOverrideMap,
    EmailPasswordSignInAndUpAction,
    EmailPasswordSignInAndUpChildProps,
    FormFieldThemeProps,
} from "../../../types";
import type { Dispatch } from "react";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";

export const useFeatureReducer = (recipe: Recipe | undefined) => {
    return React.useReducer(
        (oldState: SignInAndUpState, action: EmailPasswordSignInAndUpAction) => {
            switch (action.type) {
                case "setSignIn":
                    return {
                        ...oldState,
                        error: undefined,
                        isSignUp: false,
                    };
                case "setSignUp":
                    return {
                        ...oldState,
                        error: undefined,
                        isSignUp: true,
                    };
                case "setError":
                    return {
                        ...oldState,
                        error: action.error,
                    };
                default:
                    return oldState;
            }
        },
        {
            isSignUp: recipe === undefined ? false : recipe.config.signInAndUpFeature.defaultToSignUp,
            user: undefined,
            error: undefined,
        },
        (initArg) => {
            const show = getQueryParams("show");
            let isSignUp = initArg.isSignUp;
            if (show !== null) {
                isSignUp = show === "signup";
            }

            return {
                isSignUp,
                user: undefined,
                error: undefined,
            };
        }
    );
};

// We are overloading to explicitly state that if recipe is defined then the return value is defined as well.
export function useChildProps(
    recipe: Recipe,
    state: SignInAndUpState,
    dispatch: Dispatch<EmailPasswordSignInAndUpAction>,
    history: any
): EmailPasswordSignInAndUpChildProps;
export function useChildProps(
    recipe: Recipe | undefined,
    state: SignInAndUpState,
    dispatch: Dispatch<EmailPasswordSignInAndUpAction>,
    history: any
): EmailPasswordSignInAndUpChildProps | undefined;

export function useChildProps(
    recipe: Recipe | undefined,
    state: SignInAndUpState,
    dispatch: Dispatch<EmailPasswordSignInAndUpAction>,
    history: any
): EmailPasswordSignInAndUpChildProps | undefined {
    const recipeImplementation = useMemo(() => recipe && getModifiedRecipeImplementation(recipe.recipeImpl), [recipe]);
    const userContext = useUserContext();

    const onSignInSuccess = useCallback(async (): Promise<void> => {
        return Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
            {
                rid: recipe!.config.recipeId,
                successRedirectContext: {
                    action: "SUCCESS",
                    isNewUser: false,
                    redirectToPath: getRedirectToPathFromURL(),
                },
            },
            userContext,
            history
        );
    }, [recipe, userContext, history]);

    const onSignUpSuccess = useCallback(async (): Promise<void> => {
        return Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
            {
                rid: recipe!.config.recipeId,
                successRedirectContext: {
                    action: "SUCCESS",
                    isNewUser: true,
                    redirectToPath: getRedirectToPathFromURL(),
                },
            },
            userContext,
            history
        );
    }, [recipe, userContext, history]);

    return useMemo(() => {
        if (recipe === undefined || recipeImplementation === undefined) {
            return;
        }
        const signInAndUpFeature = recipe.config.signInAndUpFeature;
        const signUpFeature = signInAndUpFeature.signUpForm;
        const signInFeature = signInAndUpFeature.signInForm;

        const signInForm = {
            recipeImplementation,
            config: recipe.config,
            styleFromInit: signInFeature.style,
            formFields: signInFeature.formFields,
            error: state.error,
            clearError: () => dispatch({ type: "setError", error: undefined }),
            onError: (error: string) => dispatch({ type: "setError", error }),
            onSuccess: onSignInSuccess,
            forgotPasswordClick: () => recipe.redirect({ action: "RESET_PASSWORD" }, history),
        };

        const signUpForm = {
            recipeImplementation,
            config: recipe.config,
            styleFromInit: signUpFeature.style,
            formFields: getThemeSignUpFeatureFormFields(signUpFeature.formFields, recipe, userContext),
            error: state.error,
            clearError: () => dispatch({ type: "setError", error: undefined }),
            onError: (error: string) => dispatch({ type: "setError", error }),
            onSuccess: onSignUpSuccess,
        };

        return {
            config: recipe.config,
            signInForm: signInForm,
            signUpForm: signUpForm,
        };
    }, [recipe, state, dispatch]);
}

export const SignInAndUpFeature: React.FC<
    FeatureBaseProps & {
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }
> = (props) => {
    const [state, dispatch] = useFeatureReducer(props.recipe);
    const childProps = useChildProps(props.recipe, state, dispatch, props.history);
    const recipeComponentOverrides = props.useComponentOverrides();

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={props.recipe.config.useShadowDom}
                defaultStore={defaultTranslationsEmailPassword}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {props.children === undefined && (
                        <SignInAndUpTheme {...childProps} featureState={state} dispatch={dispatch} />
                    )}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {props.children &&
                        React.Children.map(props.children, (child) => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, {
                                    ...childProps,
                                    featureState: state,
                                    dispatch: dispatch,
                                });
                            }

                            return child;
                        })}
                </Fragment>
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};

export default SignInAndUpFeature;

const getModifiedRecipeImplementation = (origImpl: RecipeInterface): RecipeInterface => {
    return {
        ...origImpl,
    };
};

function getThemeSignUpFeatureFormFields(
    formFields: NormalisedFormField[],
    recipe: Recipe,
    userContext: any
): FormFieldThemeProps[] {
    const emailPasswordOnly = formFields.length === 2;
    return formFields.map((field) => ({
        ...field,
        showIsRequired: (() => {
            // If email and password only, do not show required indicator (*).
            if (emailPasswordOnly) {
                return false;
            }
            // Otherwise, show for all non optional fields (including email and password).
            return field.optional === false;
        })(),
        validate: (() => {
            // If field is not email, return field validate unchanged.
            if (field.id !== "email") {
                return field.validate;
            }

            // Otherwise, if email, use syntax validate method and check if email exists.
            return async (value: any): Promise<string | undefined> => {
                const error = await field.validate(value);
                if (error !== undefined) {
                    return error;
                }

                if (typeof value !== "string") {
                    return "GENERAL_ERROR_EMAIL_NON_STRING";
                }
                try {
                    const emailExists = (
                        await recipe.recipeImpl.doesEmailExist({
                            email: value,
                            userContext,
                        })
                    ).doesExist;

                    if (emailExists) {
                        return "EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS";
                    }
                } catch (err) {
                    if (STGeneralError.isThisError(err)) {
                        return err.message;
                    }
                }
                return undefined;
            };
        })(),
    }));
}
