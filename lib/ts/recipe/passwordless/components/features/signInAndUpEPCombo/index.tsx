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
import { getRedirectToPathFromURL, useRethrowInRender, validateForm } from "../../../../../utils";
import EmailPassword from "../../../../emailpassword/recipe";
import { getDefaultFormFields } from "../../../../emailpassword/utils";
import { EmailVerificationClaim } from "../../../../emailverification";
import EmailVerification from "../../../../emailverification/recipe";
import { FactorIds } from "../../../../multifactorauth";
import { getInvalidClaimsFromResponse } from "../../../../session";
import SessionRecipe from "../../../../session/recipe";
import Session from "../../../../session/recipe";
import useSessionContext from "../../../../session/useSessionContext";
import { getPhoneNumberUtils } from "../../../phoneNumberUtils";
import { defaultEmailValidator } from "../../../validators";
import SignInUpEPComboThemeWrapper from "../../themes/signInUpEPCombo";

import type { Navigate, UserContext, PartialAuthComponentProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
import type { SignInUpEPComboChildProps, NormalisedConfig } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import type { User } from "supertokens-web-js/types";

export function useChildProps(
    recipe: Recipe,
    factorIds: string[],
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
    const [showPasswordField, setShowPasswordField] = React.useState(false);
    const [showContinueWithPasswordlessLink, setShowContinueWithPasswordlessLink] = React.useState(false);
    const rethrowInRender = useRethrowInRender();

    return useMemo(() => {
        return {
            userContext,
            showPasswordField,
            showContinueWithPasswordlessLink,
            onContactInfoSubmit: async (contactInfo: string, setPhoneNumber: (phoneNumber: string) => void) => {
                const hasPhoneFactor =
                    factorIds.includes(FactorIds.OTP_PHONE) || factorIds.includes(FactorIds.LINK_PHONE);
                let createInfo:
                    | {
                          email: string;
                      }
                    | {
                          phoneNumber: string;
                      };
                if (hasPhoneFactor) {
                    const res = await checkContactInfo(contactInfo, recipe.config);
                    if ("email" in res) {
                        createInfo = {
                            email: contactInfo,
                        };
                    } else if (res.validationRes !== undefined) {
                        setPhoneNumber(res.phoneNumber);
                        throw res.validationRes;
                    } else {
                        createInfo = {
                            phoneNumber: res.phoneNumber,
                        };
                    }
                } else {
                    const validationRes = await recipe.config.validateEmailAddress(contactInfo);
                    if (validationRes !== undefined) {
                        throw new STGeneralError(validationRes);
                    }

                    createInfo = {
                        email: contactInfo,
                    };
                }

                if ("phoneNumber" in createInfo) {
                    const createRes = await recipeImplementation.createCode({ ...createInfo, userContext });
                    if (createRes.status !== "OK") {
                        onError(createRes.reason);
                    }
                    return;
                }

                const [epExists, pwlessExists] = await Promise.all([
                    EmailPassword.getInstanceOrThrow().webJSRecipe.doesEmailExist({ ...createInfo, userContext }),
                    recipeImplementation.doesEmailExist({ ...createInfo, userContext }),
                ]);

                if (epExists.doesExist) {
                    // EP exists
                    setShowPasswordField(true);
                    if (pwlessExists.doesExist) {
                        // Both exist
                        setShowContinueWithPasswordlessLink(true);
                    }
                } else if (pwlessExists.doesExist) {
                    // only pwless exists
                    const createRes = await recipeImplementation.createCode({ ...createInfo, userContext });
                    if (createRes.status !== "OK") {
                        onError(createRes.reason);
                    }
                    return;
                } else {
                    setShowPasswordField(true);
                    setShowContinueWithPasswordlessLink(true);
                }
            },
            onPasswordSubmit: async (formFields) => {
                const validationErrors = await validateForm(
                    formFields,
                    getDefaultFormFields() // TODO
                );

                if (validationErrors.length > 0) {
                    return {
                        status: "FIELD_ERROR",
                        formFields: validationErrors,
                    };
                }

                const response = await EmailPassword.getInstanceOrThrow().webJSRecipe.signIn({
                    formFields,
                    userContext,
                });
                if (response.status === "WRONG_CREDENTIALS_ERROR") {
                    throw new STGeneralError("EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR");
                } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
                    throw new STGeneralError(response.reason);
                } else {
                    return response;
                }
            },
            onContinueWithPasswordlessClick: async (contactInfo) => {
                const hasPhoneFactor =
                    factorIds.includes(FactorIds.OTP_PHONE) || factorIds.includes(FactorIds.LINK_PHONE);
                let createInfo:
                    | {
                          email: string;
                      }
                    | {
                          phoneNumber: string;
                      };
                if (hasPhoneFactor) {
                    const res = await checkContactInfo(contactInfo, recipe.config);
                    if ("email" in res) {
                        createInfo = {
                            email: contactInfo,
                        };
                    } else if (res.validationRes !== undefined) {
                        // TODO: bad UX
                        throw new STGeneralError(res.validationRes);
                    } else {
                        createInfo = {
                            phoneNumber: res.phoneNumber,
                        };
                    }
                } else {
                    const validationRes = await recipe.config.validateEmailAddress(contactInfo);
                    if (validationRes !== undefined) {
                        throw new STGeneralError(validationRes);
                    }

                    createInfo = {
                        email: contactInfo,
                    };
                }

                const createRes = await recipeImplementation.createCode({ ...createInfo, userContext });
                if (createRes.status !== "OK") {
                    onError(createRes.reason);
                }
            },
            onSuccess: async (result: { isEmailPassword: boolean; createdNewRecipeUser: boolean; user: User }) => {
                let payloadAfterCall;
                try {
                    payloadAfterCall = await Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                        userContext,
                    });
                } catch {
                    payloadAfterCall = undefined;
                }
                return SessionRecipe.getInstanceOrThrow()
                    .validateGlobalClaimsAndHandleSuccessRedirection(
                        {
                            action: "SUCCESS",
                            createdNewUser: result.createdNewRecipeUser && result.user.loginMethods.length === 1,
                            isNewRecipeUser: result.createdNewRecipeUser,
                            newSessionCreated:
                                session.loading ||
                                !session.doesSessionExist ||
                                (payloadAfterCall !== undefined &&
                                    session.accessTokenPayload.sessionHandle !== payloadAfterCall.sessionHandle),
                            recipeId: result.isEmailPassword ? EmailPassword.RECIPE_ID : recipe.recipeID,
                        },
                        result.isEmailPassword ? EmailPassword.RECIPE_ID : recipe.recipeID,
                        getRedirectToPathFromURL(),
                        userContext,
                        navigate
                    )
                    .catch(rethrowInRender);
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
        };
    }, [error, factorIds, userContext, recipeImplementation]);
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
        props.error,
        props.onError,
        props.clearError,
        props.rebuildAuthPage,
        userContext,
        props.navigate
    )!;

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
                userContext: { ...input.userContext, additionalAttemptInfo },
            });
            if (res.status === "OK") {
                rebuildAuthPage();
            }
            return res;
        },
    };
}

async function checkContactInfo(
    emailOrPhone: string,
    config: NormalisedConfig
): Promise<{ email: string } | { phoneNumber: string; validationRes?: string }> {
    // We check if it looks like an email by default. Even if this fails (e.g., the user mistyped the @ symbol),
    // the guessInternationPhoneNumberFromInputPhoneNumber can decide to not change to the phone UI.
    // By default it stays on the combined input in 2 cases:
    // - if the input contains the @ symbol
    // - if less than half of the input looks like a phone number
    if ((await defaultEmailValidator(emailOrPhone)) === undefined) {
        const emailValidationRes = await config.validateEmailAddress(emailOrPhone);
        if (emailValidationRes === undefined) {
            return { email: emailOrPhone };
        } else {
            throw new STGeneralError(emailValidationRes);
        }
    } else {
        const phoneValidationRes = await config.validatePhoneNumber(emailOrPhone);
        if (phoneValidationRes === undefined) {
            return { phoneNumber: emailOrPhone };
        }

        const intPhoneNumber = await config.signInUpFeature.guessInternationPhoneNumberFromInputPhoneNumber(
            emailOrPhone,
            config.signInUpFeature.defaultCountry
        );

        if (intPhoneNumber) {
            const phoneValidationResAfterGuess = await config.validatePhoneNumber(intPhoneNumber);
            return { phoneNumber: emailOrPhone, validationRes: phoneValidationResAfterGuess };
        } else {
            throw new STGeneralError(phoneValidationRes);
        }
    }
}
