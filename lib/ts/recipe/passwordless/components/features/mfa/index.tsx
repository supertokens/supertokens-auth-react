/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

import { redirectToAuth } from "../../../../..";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import { useUserContext } from "../../../../../usercontext";
import {
    clearErrorQueryParam,
    getQueryParams,
    getRedirectToPathFromURL,
    useOnMountAPICall,
    useRethrowInRender,
} from "../../../../../utils";
import { EmailVerificationClaim } from "../../../../emailverification";
import EmailVerificationRecipe from "../../../../emailverification/recipe";
import EmailVerification from "../../../../emailverification/recipe";
import MultiFactorAuth from "../../../../multifactorauth/recipe";
import { FactorIds } from "../../../../multifactorauth/types";
import { getAvailableFactors } from "../../../../multifactorauth/utils";
import { getInvalidClaimsFromResponse } from "../../../../session";
import SessionRecipe from "../../../../session/recipe";
import Session from "../../../../session/recipe";
import { defaultPhoneNumberValidator } from "../../../defaultPhoneNumberValidator";
import { getPhoneNumberUtils } from "../../../phoneNumberUtils";
import MFAThemeWrapper from "../../themes/mfa";
import { defaultTranslationsPasswordless } from "../../themes/translations";

import type { FeatureBaseProps, Navigate, UserContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { AdditionalLoginAttemptInfoProperties, ComponentOverrideMap, MFAChildProps } from "../../../types";
import type { MFAAction, MFAState, NormalisedConfig } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import type { PasswordlessFlowType } from "supertokens-web-js/recipe/passwordless/types";

export const useFeatureReducer = (): [MFAState, React.Dispatch<MFAAction>] => {
    return React.useReducer(
        (oldState: MFAState, action: MFAAction): MFAState => {
            switch (action.type) {
                case "load":
                    return {
                        // We want to wait for createCode to finish before marking the page fully loaded
                        loaded: !action.callingCreateCode,
                        error: action.error,
                        loginAttemptInfo: action.loginAttemptInfo,
                        canChangeEmail: action.canChangeEmail,
                        showAccessDenied: action.showAccessDenied,
                        showBackButton: action.showBackButton,
                    };
                case "resendCode":
                    if (!oldState.loginAttemptInfo) {
                        return oldState;
                    }
                    return {
                        ...oldState,
                        error: undefined,
                        loginAttemptInfo: {
                            ...oldState.loginAttemptInfo,
                            lastResend: action.timestamp,
                        },
                    };
                case "restartFlow":
                    return {
                        ...oldState,
                        error: action.error,
                        loginAttemptInfo: undefined,
                        showAccessDenied: !oldState.canChangeEmail,
                    };
                case "setError":
                    return {
                        ...oldState,
                        loaded: true,
                        error: action.error,
                        showAccessDenied: action.showAccessDenied,
                    };
                case "startVerify":
                    return {
                        ...oldState,
                        loaded: true,
                        loginAttemptInfo: action.loginAttemptInfo,
                        error: undefined,
                    };
                default:
                    return oldState;
            }
        },
        {
            showAccessDenied: false,
            error: undefined,
            loaded: false,
            loginAttemptInfo: undefined,
            canChangeEmail: false,
            showBackButton: false,
        },
        (initArg) => {
            let error: string | undefined = undefined;
            const errorQueryParam = getQueryParams("error");
            if (errorQueryParam !== null) {
                error = "SOMETHING_WENT_WRONG_ERROR";
            }
            return {
                ...initArg,
                error,
            };
        }
    );
};

export function useChildProps(
    recipe: Recipe,
    recipeImplementation: RecipeInterface,
    state: MFAState,
    contactMethod: "PHONE" | "EMAIL",
    dispatch: React.Dispatch<MFAAction>,
    userContext: UserContext,
    navigate?: Navigate
): MFAChildProps {
    const rethrowInRender = useRethrowInRender();
    return useMemo(() => {
        return {
            onSuccess: () => {
                const redirectToPath = getRedirectToPathFromURL();

                return SessionRecipe.getInstanceOrThrow()
                    .validateGlobalClaimsAndHandleSuccessRedirection(
                        undefined,
                        recipe.recipeID,
                        redirectToPath,
                        userContext,
                        navigate
                    )
                    .catch(rethrowInRender);
            },
            onSignOutClicked: async () => {
                await SessionRecipe.getInstanceOrThrow().signOut({ userContext });
                await recipeImplementation.clearLoginAttemptInfo({ userContext });
                await redirectToAuth({ redirectBack: false, navigate: navigate });
            },
            onBackButtonClicked: async () => {
                if (state.loginAttemptInfo) {
                    await recipeImplementation.clearLoginAttemptInfo({ userContext });
                }
                // If we don't have navigate available this would mean we are not using react-router-dom, so we use window's history
                if (navigate === undefined) {
                    return WindowHandlerReference.getReferenceOrThrow().windowHandler.getWindowUnsafe().history.back();
                }
                // If we do have navigate and goBack function on it this means we are using react-router-dom v5 or lower
                if ("goBack" in navigate) {
                    return navigate.goBack();
                }
                // If we reach this code this means we are using react-router-dom v6
                return navigate(-1);
            },
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
                dispatch({ type: "setError", showAccessDenied: false, error: "SOMETHING_WENT_WRONG_ERROR" });
            },
            recipeImplementation: recipeImplementation,
            config: recipe.config,
            contactMethod,
            validatePhoneNumber: recipe.config.validatePhoneNumber ?? defaultPhoneNumberValidator,
        };
    }, [contactMethod, state, recipeImplementation]);
}

const MFAFeatureInner: React.FC<
    FeatureBaseProps<{
        contactMethod: "PHONE" | "EMAIL";
        flowType: PasswordlessFlowType;
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }>
> = (props) => {
    const userContext = useUserContext();

    const [state, dispatch] = useFeatureReducer();
    const recipeImplementation = React.useMemo(
        () => props.recipe && getModifiedRecipeImplementation(props.recipe.webJSRecipe, props.recipe.config, dispatch),
        [props.recipe]
    );

    useOnLoad(props, recipeImplementation, dispatch, userContext);

    const childProps = useChildProps(
        props.recipe,
        recipeImplementation,
        state,
        props.contactMethod,
        dispatch,
        userContext,
        props.navigate
    )!;

    return (
        <Fragment>
            {/* No custom theme, use default. */}
            {props.children === undefined && (
                <MFAThemeWrapper {...childProps} featureState={state} dispatch={dispatch} />
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
    );
};

export const MFAFeature: React.FC<
    FeatureBaseProps<{
        contactMethod: "PHONE" | "EMAIL";
        flowType: PasswordlessFlowType;
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }>
> = (props) => {
    const recipeComponentOverrides = props.useComponentOverrides();

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={SuperTokens.getInstanceOrThrow().useShadowDom}
                defaultStore={defaultTranslationsPasswordless}>
                <MFAFeatureInner {...props} />
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};

export default MFAFeature;

function useOnLoad(
    props: React.PropsWithChildren<
        { navigate?: Navigate } & { children?: React.ReactNode } & {
            contactMethod: "PHONE" | "EMAIL";
            flowType: PasswordlessFlowType;
            recipe: Recipe;
            useComponentOverrides: () => ComponentOverrideMap;
        }
    >,
    recipeImplementation: RecipeInterface,
    dispatch: React.Dispatch<MFAAction>,
    userContext: UserContext
) {
    const fetchMFAInfo = React.useCallback(
        async () => MultiFactorAuth.getInstanceOrThrow().webJSRecipe.resyncSessionAndFetchMFAInfo({ userContext }),
        [userContext]
    );
    const handleLoadError = React.useCallback(
        () => dispatch({ type: "setError", showAccessDenied: true, error: "SOMETHING_WENT_WRONG_ERROR_RELOAD" }),
        [dispatch]
    );

    const onLoad = React.useCallback(
        async (mfaInfo: Awaited<ReturnType<typeof fetchMFAInfo>>) => {
            let error: string | undefined = undefined;
            const errorQueryParam = getQueryParams("error");
            const doSetup = getQueryParams("setup");
            if (errorQueryParam !== null) {
                error = "SOMETHING_WENT_WRONG_ERROR";
            }
            let loginAttemptInfo = await recipeImplementation.getLoginAttemptInfo<AdditionalLoginAttemptInfoProperties>(
                {
                    userContext,
                }
            );

            const factorId = props.contactMethod === "EMAIL" ? FactorIds.OTP_EMAIL : FactorIds.OTP_PHONE;

            if (loginAttemptInfo && props.contactMethod !== loginAttemptInfo.contactMethod) {
                await recipeImplementation?.clearLoginAttemptInfo({ userContext });
                loginAttemptInfo = undefined;
            }

            // If the next array only has a single option, it means the we were redirected here
            // automatically during the sign in process. In that case, anywhere the back button
            // could go would redirect back here, making it useless.
            const showBackButton =
                mfaInfo.factors.next.length === 0 ||
                getAvailableFactors(mfaInfo.factors, undefined, MultiFactorAuth.getInstanceOrThrow(), userContext)
                    .length !== 1;
            const contactInfoList =
                (props.contactMethod === "EMAIL" ? mfaInfo.emails[factorId] : mfaInfo.phoneNumbers[factorId]) || [];

            if (!loginAttemptInfo) {
                if (contactInfoList.length > 0 && doSetup !== "true") {
                    // In this branch we are either:
                    // 1. Completing an already set up factor.
                    // 2. Setting up based on pre-existing info.
                    // We know this is allowed, since the contactInfoList coming from the backend
                    //   is supposed to only contain email addresses/phone numbers that we can use at this point
                    //   and we checked that at least one of these options are valid
                    // Devs can force us to ask for the email address using the forceSetup param when redirecting here
                    const createCodeInfo =
                        props.contactMethod === "EMAIL"
                            ? { email: contactInfoList[0] }
                            : { phoneNumber: contactInfoList[0] };

                    let createResp;
                    try {
                        dispatch({
                            type: "load",
                            showAccessDenied: false,
                            loginAttemptInfo: undefined,
                            error,
                            canChangeEmail: contactInfoList.length === 0,
                            showBackButton,
                            callingCreateCode: true,
                        });
                        // createCode also dispatches the event that marks this page fully loaded
                        createResp = await recipeImplementation!.createCode({
                            ...createCodeInfo,
                            userContext,
                        });
                    } catch (err: any) {
                        if (
                            "status" in err &&
                            err.status === SessionRecipe.getInstanceOrThrow().config.invalidClaimStatusCode
                        ) {
                            const invalidClaims = await getInvalidClaimsFromResponse({ response: err, userContext });
                            if (invalidClaims.some((i) => i.id === EmailVerificationClaim.id)) {
                                try {
                                    // it's OK if this throws,
                                    const evInstance = EmailVerificationRecipe.getInstanceOrThrow();
                                    await evInstance.redirect(
                                        {
                                            action: "VERIFY_EMAIL",
                                        },
                                        props.navigate,
                                        undefined,
                                        userContext
                                    );
                                    return;
                                } catch {
                                    // If we couldn't redirect to EV we fall back to showing the something went wrong error
                                }
                            }
                        }
                        // If it isn't a 403 or if it is not an EV claim error, we show the error
                        dispatch({
                            type: "setError",
                            showAccessDenied: true,
                            error: "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                        });
                        return;
                    }
                    if (createResp?.status !== "OK") {
                        dispatch({
                            type: "setError",
                            showAccessDenied: true,
                            error:
                                createResp.status === "SIGN_IN_UP_NOT_ALLOWED"
                                    ? createResp.reason
                                    : "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                        });
                    }
                } else {
                    // this will ask the user for the email/phone
                    dispatch({
                        type: "load",
                        showAccessDenied: false,
                        loginAttemptInfo,
                        error,
                        canChangeEmail: true,
                        showBackButton,
                        callingCreateCode: false,
                    });
                }
            } else {
                // In this branch we already have a valid login attempt so we show the OTP screen
                dispatch({
                    type: "load",
                    showAccessDenied: false,
                    loginAttemptInfo,
                    error,
                    canChangeEmail: contactInfoList.length === 0,
                    showBackButton,
                    callingCreateCode: false,
                });
            }
        },
        [dispatch, recipeImplementation, props.contactMethod, userContext]
    );

    useOnMountAPICall(fetchMFAInfo, onLoad, handleLoadError);
}

function getModifiedRecipeImplementation(
    originalImpl: RecipeInterface,
    config: NormalisedConfig,
    dispatch: React.Dispatch<MFAAction>
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
                const loginAttemptInfo = (await originalImpl.getLoginAttemptInfo<AdditionalLoginAttemptInfoProperties>({
                    userContext: input.userContext,
                }))!;
                dispatch({ type: "startVerify", loginAttemptInfo });
            }
            return res;
        },
        resendCode: async (input) => {
            /**
             * In this case we want the code that is calling resendCode in the
             * UI to handle STGeneralError so we let this throw
             */
            const res = await originalImpl.resendCode(input);

            if (res.status === "OK") {
                const loginAttemptInfo = await originalImpl.getLoginAttemptInfo<AdditionalLoginAttemptInfoProperties>({
                    userContext: input.userContext,
                });

                if (loginAttemptInfo !== undefined) {
                    const timestamp = Date.now();

                    await originalImpl.setLoginAttemptInfo<AdditionalLoginAttemptInfoProperties>({
                        userContext: input.userContext,
                        attemptInfo: {
                            ...loginAttemptInfo,
                            lastResend: timestamp,
                        },
                    });
                    dispatch({ type: "resendCode", timestamp });
                }
            } else if (res.status === "RESTART_FLOW_ERROR") {
                await originalImpl.clearLoginAttemptInfo({
                    userContext: input.userContext,
                });

                dispatch({ type: "restartFlow", error: "ERROR_SIGN_IN_UP_RESEND_RESTART_FLOW" });
            }
            return res;
        },

        consumeCode: async (input) => {
            const res = await originalImpl.consumeCode(input);

            if (res.status === "RESTART_FLOW_ERROR") {
                await originalImpl.clearLoginAttemptInfo({
                    userContext: input.userContext,
                });

                dispatch({ type: "restartFlow", error: "ERROR_SIGN_IN_UP_CODE_CONSUME_RESTART_FLOW" });
            } else if (res.status === "SIGN_IN_UP_NOT_ALLOWED") {
                // This should never happen, but technically possible based on the API specs
                // so we keep this here to cover all cases
                await originalImpl.clearLoginAttemptInfo({
                    userContext: input.userContext,
                });

                dispatch({ type: "restartFlow", error: res.reason });
            } else if (res.status === "OK") {
                await originalImpl.clearLoginAttemptInfo({
                    userContext: input.userContext,
                });
                // we wait for the redirection to happen in this case.
            }

            return res;
        },

        clearLoginAttemptInfo: async (input) => {
            await originalImpl.clearLoginAttemptInfo({
                userContext: input.userContext,
            });
            clearErrorQueryParam();
            dispatch({ type: "restartFlow", error: undefined });
        },
    };
}
