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
import STGeneralError from "supertokens-web-js/lib/build/error";

import AuthComponentWrapper from "../../../../../components/authCompWrapper";
import { useUserContext } from "../../../../../usercontext";
import {
    getRedirectToPathFromURL,
    getTenantIdFromQueryParams,
    useRethrowInRender,
    validateForm,
} from "../../../../../utils";
import EmailPassword from "../../../../emailpassword/recipe";
import { EmailVerificationClaim } from "../../../../emailverification";
import EmailVerification from "../../../../emailverification/recipe";
import { FactorIds } from "../../../../multifactorauth";
import { getInvalidClaimsFromResponse } from "../../../../session";
import Session from "../../../../session/recipe";
import useSessionContext from "../../../../session/useSessionContext";
import { defaultPhoneNumberValidator } from "../../../defaultPhoneNumberValidator";
import { getPhoneNumberUtils } from "../../../phoneNumberUtils";
import SignInUpEPComboThemeWrapper from "../../themes/signInUpEPCombo";

import type { Navigate, UserContext, PartialAuthComponentProps } from "../../../../../types";
import type { AuthSuccessContext } from "../../../../authRecipe/types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
import type { SignInUpEPComboChildProps, NormalisedConfig } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/passwordless";

export function useChildProps(
    recipe: Recipe,
    factorIds: string[],
    onAuthSuccess: (successContext: AuthSuccessContext) => Promise<void>,
    error: string | undefined,
    onError: (err: string) => void,
    clearError: () => void,
    rebuildAuthPage: () => void,
    userContext: UserContext,
    navigate?: Navigate
): SignInUpEPComboChildProps {
    const session = useSessionContext();
    const recipeImplementation = React.useMemo(
        () => recipe && getModifiedRecipeImplementation(recipe.webJSRecipe, recipe.config, rebuildAuthPage),
        [recipe]
    );
    const [isPhoneNumber, setIsPhoneNumber] = React.useState<boolean>(!recipe.config.signInUpFeature.defaultToEmail);
    const [showPasswordField, setShowPasswordField] = React.useState(false);
    const [showContinueWithPasswordlessLink, setShowContinueWithPasswordlessLink] = React.useState(false);
    const rethrowInRender = useRethrowInRender();

    return useMemo(() => {
        const isPasswordlessEmailEnabled = [FactorIds.LINK_EMAIL, FactorIds.OTP_EMAIL].some((id) =>
            factorIds.includes(id)
        );

        return {
            isPhoneNumber,
            setIsPhoneNumber: (isPhone) => {
                if (isPhone && showPasswordField) {
                    setShowPasswordField(false);
                    setShowContinueWithPasswordlessLink(false);
                }
                setIsPhoneNumber(isPhone);
            },
            userContext,
            showPasswordField,
            showContinueWithPasswordlessLink,
            onContactInfoSubmit: async (contactInfo: string) => {
                if (isPhoneNumber) {
                    const createRes = await recipeImplementation.createCode({
                        phoneNumber: contactInfo,
                        shouldTryLinkingWithSessionUser: false,
                        userContext,
                    });

                    if (createRes.status === "SIGN_IN_UP_NOT_ALLOWED") {
                        throw new STGeneralError(createRes.reason);
                    } else {
                        clearError();
                        return createRes;
                    }
                }
                const email = contactInfo;
                if (recipe.config.contactMethod === "PHONE" || !isPasswordlessEmailEnabled) {
                    setShowPasswordField(true);
                    return { status: "OK" };
                }
                const [epExists, pwlessExists] = await Promise.all([
                    EmailPassword.getInstanceOrThrow().webJSRecipe.doesEmailExist({ email, userContext }),
                    recipeImplementation.doesEmailExist({ email, userContext }),
                ]);

                if (epExists.doesExist) {
                    // EP exists
                    setShowPasswordField(true);
                    if (pwlessExists.doesExist) {
                        // Both exist
                        setShowContinueWithPasswordlessLink(true);
                    }
                    return { status: "OK" };
                } else if (pwlessExists.doesExist) {
                    // only pwless exists
                    const createRes = await recipeImplementation.createCode({
                        email,
                        shouldTryLinkingWithSessionUser: false,
                        userContext,
                    });

                    if (createRes.status === "SIGN_IN_UP_NOT_ALLOWED") {
                        throw new STGeneralError(createRes.reason);
                    } else {
                        clearError();
                        return createRes;
                    }
                } else {
                    setShowPasswordField(true);
                    if (isPasswordlessEmailEnabled) {
                        setShowContinueWithPasswordlessLink(true);
                    }
                    return { status: "OK" };
                }
            },
            onPasswordSubmit: async (formFields) => {
                const validationErrors = await validateForm(
                    formFields,
                    EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signInForm.formFields
                );

                if (validationErrors.length > 0) {
                    return {
                        status: "FIELD_ERROR",
                        formFields: validationErrors,
                    };
                }

                const response = await EmailPassword.getInstanceOrThrow().webJSRecipe.signIn({
                    formFields,
                    shouldTryLinkingWithSessionUser: false,
                    userContext,
                });
                if (response.status === "WRONG_CREDENTIALS_ERROR") {
                    throw new STGeneralError("EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR");
                } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
                    throw new STGeneralError(response.reason);
                } else {
                    return { ...response, isEmailPassword: true };
                }
            },
            onContinueWithPasswordlessClick: async (contactInfo) => {
                // When this function is called, the contactInfo has already been validated
                const createInfo = isPhoneNumber ? { phoneNumber: contactInfo } : { email: contactInfo };
                const createRes = await recipeImplementation.createCode({
                    ...createInfo,
                    shouldTryLinkingWithSessionUser: false,
                    userContext,
                });
                if (createRes.status !== "OK") {
                    onError(createRes.reason);
                } else {
                    clearError();
                }
            },
            onSuccess: async (result) => {
                if (!result.isEmailPassword) {
                    return;
                }
                let payloadAfterCall;
                try {
                    payloadAfterCall = await Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                        userContext,
                    });
                } catch {
                    payloadAfterCall = undefined;
                }
                return onAuthSuccess({
                    createdNewUser: result.createdNewRecipeUser && result.user.loginMethods.length === 1,
                    isNewRecipeUser: result.createdNewRecipeUser,
                    newSessionCreated:
                        session.loading ||
                        !session.doesSessionExist ||
                        (payloadAfterCall !== undefined &&
                            session.accessTokenPayload.sessionHandle !== payloadAfterCall.sessionHandle),
                    recipeId: result.isEmailPassword ? EmailPassword.RECIPE_ID : recipe.recipeID,
                }).catch(rethrowInRender);
            },
            error,
            onError,
            clearError,
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
            factorIds,
            recipeImplementation: recipeImplementation,
            config: recipe.config,
            validatePhoneNumber: recipe.config.validatePhoneNumber ?? defaultPhoneNumberValidator,
        };
    }, [
        error,
        factorIds,
        userContext,
        recipeImplementation,
        isPhoneNumber,
        showPasswordField,
        showContinueWithPasswordlessLink,
    ]);
}

const SignInUpEPComboFeatureInner: React.FC<
    PartialAuthComponentProps & {
        recipe: Recipe;
        factorIds: string[];
        useComponentOverrides: () => ComponentOverrideMap;
        userContext?: UserContext;
    }
> = (props) => {
    let userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    const childProps = useChildProps(
        props.recipe,
        props.factorIds,
        props.onAuthSuccess,
        props.error,
        props.onError,
        props.clearError,
        props.rebuildAuthPage,
        userContext,
        props.navigate
    );

    return (
        <Fragment>
            {/* No custom theme, use default. */}
            {props.children === undefined && <SignInUpEPComboThemeWrapper {...childProps} />}

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
    );
};

export const SignInUpEPComboFeature: React.FC<
    PartialAuthComponentProps & {
        recipe: Recipe;
        factorIds: string[];
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }
> = (props) => {
    const recipeComponentOverrides = props.useComponentOverrides();

    return (
        <AuthComponentWrapper recipeComponentOverrides={recipeComponentOverrides}>
            <SignInUpEPComboFeatureInner {...props} />
        </AuthComponentWrapper>
    );
};

export default SignInUpEPComboFeature;

function getModifiedRecipeImplementation(
    originalImpl: RecipeInterface,
    config: NormalisedConfig,
    rebuildAuthPage: () => void
): RecipeInterface {
    return {
        ...originalImpl,
        createCode: async (input) => {
            let contactInfo;
            const phoneNumberUtils = await getPhoneNumberUtils();
            if ("email" in input) {
                contactInfo = input.email;
            } else {
                contactInfo = phoneNumberUtils.formatNumber(
                    input.phoneNumber,
                    config.signInUpFeature.defaultCountry || "",
                    phoneNumberUtils.numberFormat.E164
                );
            }

            // This contactMethod refers to the one that was used to deliver the login info
            // This can be an important distinction in case both email and phone are allowed
            const contactMethod: "EMAIL" | "PHONE" = "email" in input ? "EMAIL" : "PHONE";
            const additionalAttemptInfo = {
                lastResend: Date.now(),
                contactMethod,
                contactInfo,
                redirectToPath: getRedirectToPathFromURL(),
            };

            const res = await originalImpl.createCode({
                ...input,
                shouldTryLinkingWithSessionUser: false,
                userContext: { ...input.userContext, additionalAttemptInfo },
            });
            if (res.status === "OK") {
                rebuildAuthPage();
            }
            return res;
        },
    };
}
