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
import { jsx } from "@emotion/react";
import * as React from "react";
import { Fragment } from "react";

import {
    EmailPasswordSignInAndUpAction,
    EmailPasswordSignInAndUpChildProps,
    FormFieldThemeProps,
} from "../../../types";
import SignInAndUpTheme from "../../themes/signInAndUp";
import { FeatureBaseProps, NormalisedFormField } from "../../../../../types";
import { getQueryParams, getRedirectToPathFromURL } from "../../../../../utils";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { SignInAndUpState } from "../../../types";
import Recipe from "../../../recipe";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import { defaultTranslationsEmailPassword } from "../../themes/translations";
import { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";
import { useMemo } from "react";
import { useCallback } from "react";
import { Dispatch } from "react";

export const useFeatureReducer = (recipe: Recipe | undefined) => {
    return React.useReducer(
        (oldState: SignInAndUpState, action: EmailPasswordSignInAndUpAction) => {
            switch (action.type) {
                case "setSignIn":
                    return {
                        ...oldState,
                        isSignUp: false,
                    };
                case "setSignUp":
                    return {
                        ...oldState,
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

    const onSignInSuccess = useCallback(async (): Promise<void> => {
        if (!recipe) {
            return;
        }
        if (recipe.emailVerification.config.mode === "REQUIRED") {
            let isEmailVerified = true;
            try {
                // TODO NEMI: handle user context for pre built UI
                isEmailVerified = (await recipe.emailVerification.isEmailVerified({})).isVerified;
            } catch (ignored) {}
            if (!isEmailVerified) {
                await recipe.savePostEmailVerificationSuccessRedirectState({
                    redirectToPath: getRedirectToPathFromURL(),
                    isNewUser: false,
                    action: "SUCCESS",
                });
                return recipe.emailVerification.redirect(
                    {
                        action: "VERIFY_EMAIL",
                    },
                    history
                );
            }
        }

        return await recipe.redirect(
            {
                action: "SUCCESS",
                isNewUser: false,
                redirectToPath: getRedirectToPathFromURL(),
            },
            history
        );
    }, [recipe]);

    const onSignUpSuccess = useCallback(async (): Promise<void> => {
        if (!recipe) {
            return;
        }
        if (recipe.emailVerification.config.mode === "REQUIRED") {
            await recipe.savePostEmailVerificationSuccessRedirectState({
                redirectToPath: getRedirectToPathFromURL(),
                isNewUser: true,
                action: "SUCCESS",
            });
            return await recipe.emailVerification.redirect(
                {
                    action: "VERIFY_EMAIL",
                },
                history
            );
        } else {
            return await recipe.redirect(
                {
                    redirectToPath: getRedirectToPathFromURL(),
                    isNewUser: true,
                    action: "SUCCESS",
                },
                history
            );
        }
    }, [recipe]);

    return useMemo(() => {
        if (recipe === undefined || recipeImplementation === undefined) {
            return;
        }
        const signInAndUpFeature = recipe.config.signInAndUpFeature;
        const signUpFeature = signInAndUpFeature.signUpForm;
        const signInFeature = signInAndUpFeature.signInForm;

        const signInForm = {
            recipe,
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
            recipe,
            recipeImplementation,
            config: recipe.config,
            styleFromInit: signUpFeature.style,
            formFields: getThemeSignUpFeatureFormFields(signUpFeature.formFields, recipe),
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
    }
> = (props) => {
    const [state, dispatch] = useFeatureReducer(props.recipe);
    const childProps = useChildProps(props.recipe, state, dispatch, props.history);

    return (
        <ComponentOverrideContext.Provider value={props.recipe.config.override.components}>
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

function getThemeSignUpFeatureFormFields(formFields: NormalisedFormField[], recipe: Recipe): FormFieldThemeProps[] {
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
                    // TODO NEMI: handle user context for pre built UI
                    const emailExists = (
                        await recipe.recipeImpl.doesEmailExist({
                            email: value,
                            config: recipe.webJsRecipe.config,
                            userContext: {},
                        })
                    ).doesExist;

                    if (emailExists) {
                        return "EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS";
                    }
                } catch {}
                return undefined;
            };
        })(),
    }));
}
