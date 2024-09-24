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

import AuthComponentWrapper from "../../../../../components/authCompWrapper";
import { useTranslation } from "../../../../../translation/translationContext";
import { getTenantIdFromQueryParams, useRethrowInRender } from "../../../../../utils";
import { EmailVerificationClaim } from "../../../../emailverification";
import EmailVerification from "../../../../emailverification/recipe";
import { getInvalidClaimsFromResponse } from "../../../../session";
import Session from "../../../../session/recipe";
import useSessionContext from "../../../../session/useSessionContext";
import EmailPassword from "../../../recipe";
import { Label } from "../../library";
import SignInTheme from "../../themes/signIn";

import type { Navigate, UserContext, PartialAuthComponentProps } from "../../../../../types";
import type { AuthSuccessContext } from "../../../../authRecipe/types";
import type Recipe from "../../../recipe";
import type { SignInThemeProps } from "../../../types";
import type { ComponentOverrideMap } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";

export function useChildProps(
    recipe: Recipe,
    onAuthSuccess: (successContext: AuthSuccessContext) => Promise<void>,
    error: string | undefined,
    onError: (err: string) => void,
    clearError: () => void,
    userContext: UserContext,
    navigate?: Navigate
): SignInThemeProps {
    const session = useSessionContext();
    const recipeImplementation = useMemo(() => getModifiedRecipeImplementation(recipe.webJSRecipe), [recipe]);
    const rethrowInRender = useRethrowInRender();
    const t = useTranslation();

    const onSignInSuccess = useCallback(async (): Promise<void> => {
        let payloadAfterCall;
        try {
            payloadAfterCall = await Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                userContext,
            });
        } catch {
            payloadAfterCall = undefined;
        }

        return onAuthSuccess({
            createdNewUser: false,
            isNewRecipeUser: false,
            newSessionCreated:
                session.loading ||
                !session.doesSessionExist ||
                (payloadAfterCall !== undefined &&
                    session.accessTokenPayload.sessionHandle !== payloadAfterCall.sessionHandle),
            recipeId: EmailPassword.RECIPE_ID,
        }).catch(rethrowInRender);
    }, [recipe, userContext, navigate]);

    return useMemo(() => {
        const onForgotPasswordClick = () =>
            recipe.redirect(
                { action: "RESET_PASSWORD", tenantIdFromQueryParams: getTenantIdFromQueryParams() },
                navigate,
                undefined,
                userContext
            );

        const signInAndUpFeature = recipe.config.signInAndUpFeature;
        const signInFeature = signInAndUpFeature.signInForm;

        const formFields = signInFeature.formFields.map((f) =>
            f.id !== "password"
                ? f
                : {
                      ...f,
                      labelComponent: (
                          <div data-supertokens="formLabelWithLinkWrapper">
                              <Label value={f.label} data-supertokens="passwordInputLabel" />
                              <a
                                  onClick={onForgotPasswordClick}
                                  data-supertokens="link linkButton formLabelLinkBtn forgotPasswordLink">
                                  {t("EMAIL_PASSWORD_SIGN_IN_FORGOT_PW_LINK")}
                              </a>
                          </div>
                      ),
                  }
        );
        return {
            recipeImplementation,
            config: recipe.config,
            styleFromInit: signInFeature.style,
            formFields: formFields,
            error: error,
            clearError,
            onError,
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
                                    tenantIdFromQueryParams: getTenantIdFromQueryParams(),
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
            onSuccess: onSignInSuccess,
            onForgotPasswordClick: onForgotPasswordClick,
            userContext,
        };
    }, [recipe]);
}

export const SignInFeature: React.FC<
    PartialAuthComponentProps & {
        recipe: Recipe;
        userContext: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }
> = (props) => {
    const childProps = useChildProps(
        props.recipe,
        props.onAuthSuccess,
        props.error,
        props.onError,
        props.clearError,
        props.userContext,
        props.navigate
    );
    const recipeComponentOverrides = props.useComponentOverrides();

    return (
        <AuthComponentWrapper recipeComponentOverrides={recipeComponentOverrides}>
            <Fragment>
                {/* No custom theme, use default. */}
                {props.children === undefined && <SignInTheme {...childProps} />}
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

export default SignInFeature;

const getModifiedRecipeImplementation = (origImpl: RecipeInterface): RecipeInterface => {
    return {
        ...origImpl,
        signIn: async function (input) {
            const response = await origImpl.signIn({ ...input, tryLinkingWithSessionUser: false });
            return response;
        },
        signUp: async function (input) {
            const response = await origImpl.signUp({ ...input, tryLinkingWithSessionUser: false });
            return response;
        },
    };
};
