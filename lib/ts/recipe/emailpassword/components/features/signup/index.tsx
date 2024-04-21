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

import AuthComponentWrapper from "../../../../../components/authCompWrapper";
import { useUserContext } from "../../../../../usercontext";
import { getRedirectToPathFromURL, useRethrowInRender } from "../../../../../utils";
import { EmailVerificationClaim } from "../../../../emailverification";
import EmailVerification from "../../../../emailverification/recipe";
import { getInvalidClaimsFromResponse } from "../../../../session";
import Session from "../../../../session/recipe";
import useSessionContext from "../../../../session/useSessionContext";
import SignUpTheme from "../../themes/signUp";

import type { Navigate, NormalisedFormField, UserContext, PartialAuthComponentProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { SignUpThemeProps } from "../../../types";
import type { ComponentOverrideMap, FormFieldThemeProps } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";
import type { User } from "supertokens-web-js/types";

export function useChildProps(
    recipe: Recipe,
    error: string | undefined,
    onError: (err: string) => void,
    clearError: () => void,
    userContext: UserContext,
    navigate?: Navigate
): SignUpThemeProps {
    const session = useSessionContext();
    const recipeImplementation = useMemo(() => recipe && getModifiedRecipeImplementation(recipe.webJSRecipe), [recipe]);
    const rethrowInRender = useRethrowInRender();

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
        const signInAndUpFeature = recipe.config.signInAndUpFeature;
        const signUpFeature = signInAndUpFeature.signUpForm;

        return {
            recipeImplementation,
            config: recipe.config,
            styleFromInit: signUpFeature.style,
            formFields: getThemeSignUpFeatureFormFields(signUpFeature.formFields, recipe, userContext),
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
                onError("SOMETHING_WENT_WRONG_ERROR");
            },
            onSuccess: onSignUpSuccess,
            userContext,
            error,
            onError,
            clearError,
        };
    }, [recipe]);
}

export const SignUpFeature: React.FC<
    PartialAuthComponentProps & {
        recipe: Recipe;
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }
> = (props) => {
    let userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    const childProps = useChildProps(
        props.recipe,
        props.error,
        props.onError,
        props.clearError,
        userContext,
        props.navigate
    );
    const recipeComponentOverrides = props.useComponentOverrides();

    return (
        <AuthComponentWrapper recipeComponentOverrides={recipeComponentOverrides}>
            <Fragment>
                {/* No custom theme, use default. */}
                {props.children === undefined && <SignUpTheme {...childProps} />}
                {/* Otherwise, custom theme is provided, propagate props. */}
                {props.children &&
                    React.Children.map(props.children, (child) => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, {
                                ...childProps,
                            });
                        }

                        return child;
                    })}
            </Fragment>
        </AuthComponentWrapper>
    );
};

export default SignUpFeature;

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
