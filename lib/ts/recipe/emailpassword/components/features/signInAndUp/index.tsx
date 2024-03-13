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
import { getQueryParams, getRedirectToPathFromURL, useRethrowInRender } from "../../../../../utils";
import { EmailVerificationClaim } from "../../../../emailverification";
import EmailVerification from "../../../../emailverification/recipe";
import { getInvalidClaimsFromResponse } from "../../../../session";
import Session from "../../../../session/recipe";
import useSessionContext from "../../../../session/useSessionContext";
import SignInAndUpTheme from "../../themes/signInAndUp";
import { defaultTranslationsEmailPassword } from "../../themes/translations";

import type { Navigate, FeatureBaseProps, NormalisedFormField, UserContext } from "../../../../../types";
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
import type { User } from "supertokens-web-js/types";

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
    userContext: UserContext,
    navigate?: Navigate
): EmailPasswordSignInAndUpChildProps;
export function useChildProps(
    recipe: Recipe | undefined,
    state: SignInAndUpState,
    dispatch: Dispatch<EmailPasswordSignInAndUpAction>,
    userContext: UserContext,
    navigate?: Navigate
): EmailPasswordSignInAndUpChildProps | undefined;

export function useChildProps(
    recipe: Recipe | undefined,
    state: SignInAndUpState,
    dispatch: Dispatch<EmailPasswordSignInAndUpAction>,
    userContext: UserContext,
    navigate?: Navigate
): EmailPasswordSignInAndUpChildProps | undefined {
    const session = useSessionContext();
    const recipeImplementation = useMemo(() => recipe && getModifiedRecipeImplementation(recipe.webJSRecipe), [recipe]);
    const rethrowInRender = useRethrowInRender();

    const onSignInSuccess = useCallback(async (): Promise<void> => {
        let payloadAfterCall;
        try {
            payloadAfterCall = await Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                userContext,
            });
        } catch {
            payloadAfterCall = undefined;
        }

        return Session.getInstanceOrThrow()
            .validateGlobalClaimsAndHandleSuccessRedirection(
                {
                    action: "SUCCESS",
                    createdNewUser: false,
                    isNewRecipeUser: false,
                    newSessionCreated:
                        session.loading ||
                        !session.doesSessionExist ||
                        (payloadAfterCall !== undefined &&
                            session.accessTokenPayload.sessionHandle !== payloadAfterCall.sessionHandle),
                    recipeId: recipe!.recipeID,
                },
                recipe!.recipeID,
                getRedirectToPathFromURL(),
                userContext,
                navigate
            )
            .catch(rethrowInRender);
    }, [recipe, userContext, navigate]);

    const onSignUpSuccess = useCallback(
        async (result: { user: User }): Promise<void> => {
            let payloadAfterCall;
            try {
                payloadAfterCall = await Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                    userContext,
                });
            } catch {
                payloadAfterCall = undefined;
            }
            return Session.getInstanceOrThrow()
                .validateGlobalClaimsAndHandleSuccessRedirection(
                    {
                        action: "SUCCESS",
                        createdNewUser: result.user.loginMethods.length === 1,
                        isNewRecipeUser: true,
                        newSessionCreated:
                            session.loading ||
                            !session.doesSessionExist ||
                            (payloadAfterCall !== undefined &&
                                session.accessTokenPayload.sessionHandle !== payloadAfterCall.sessionHandle),
                        recipeId: recipe!.recipeID,
                    },
                    recipe!.recipeID,
                    getRedirectToPathFromURL(),
                    userContext,
                    navigate
                )
                .catch(rethrowInRender);
        },
        [recipe, userContext, navigate]
    );

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
            onFetchError: async (err: Response) => {
                if (err.status === Session.getInstanceOrThrow().config.invalidClaimStatusCode) {
                    const invalidClaims = await getInvalidClaimsFromResponse({ response: err, userContext });
                    if (invalidClaims.some((i) => i.id === EmailVerificationClaim.id)) {
                        try {
                            // it's OK if this throws,
                            const evInstance = EmailVerification.getInstanceOrThrow();
                            await evInstance.redirect(
                                {
                                    action: "VERIFY_EMAIL",
                                },
                                navigate,
                                undefined,
                                userContext
                            );
                            return;
                        } catch {
                            // If we couldn't redirect to EV we fall back to showing the something went wrong error
                        }
                    }
                }
                dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
            },
            onSuccess: onSignInSuccess,
            forgotPasswordClick: () => recipe.redirect({ action: "RESET_PASSWORD" }, navigate, undefined, userContext),
        };

        const signUpForm = {
            recipeImplementation,
            config: recipe.config,
            styleFromInit: signUpFeature.style,
            formFields: getThemeSignUpFeatureFormFields(signUpFeature.formFields, recipe, userContext),
            error: state.error,
            clearError: () => dispatch({ type: "setError", error: undefined }),
            onError: (error: string) => dispatch({ type: "setError", error }),
            onFetchError: async (err: Response) => {
                if (err.status === Session.getInstanceOrThrow().config.invalidClaimStatusCode) {
                    const invalidClaims = await getInvalidClaimsFromResponse({ response: err, userContext });
                    if (invalidClaims.some((i) => i.id === EmailVerificationClaim.id)) {
                        try {
                            // it's OK if this throws,
                            const evInstance = EmailVerification.getInstanceOrThrow();
                            await evInstance.redirect(
                                {
                                    action: "VERIFY_EMAIL",
                                },
                                navigate,
                                undefined,
                                userContext
                            );
                            return;
                        } catch {
                            // If we couldn't redirect to EV we fall back to showing the something went wrong error
                        }
                    }
                }
                dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
            },
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
    FeatureBaseProps<{
        recipe: Recipe;
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }>
> = (props) => {
    let userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    const [state, dispatch] = useFeatureReducer(props.recipe);
    const childProps = useChildProps(props.recipe, state, dispatch, userContext, props.navigate);
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
    userContext: UserContext
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
                        await recipe.webJSRecipe.doesEmailExist({
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
