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
import { useRef } from "react";
import { useEffect } from "react";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

import { redirectToAuth } from "../../../../..";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { useUserContext } from "../../../../../usercontext";
import {
    clearErrorQueryParam,
    getQueryParams,
    getRedirectToPathFromURL,
    useOnMountAPICall,
} from "../../../../../utils";
import MultiFactorAuth from "../../../../multifactorauth/recipe";
import SessionRecipe from "../../../../session/recipe";
import { getPhoneNumberUtils } from "../../../phoneNumberUtils";
import MFAThemeWrapper from "../../themes/mfa";
import { defaultTranslationsPasswordless } from "../../themes/translations";

import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { AdditionalLoginAttemptInfoProperties, ComponentOverrideMap, MFAChildProps } from "../../../types";
import type { MFAAction, MFAState, NormalisedConfig } from "../../../types";
import type { MFAFactorInfo } from "supertokens-web-js/recipe/multifactorauth/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import type { PasswordlessFlowType } from "supertokens-web-js/recipe/thirdpartypasswordless";

export const useSuccessInAnotherTabChecker = (
    callingConsumeCodeRef: React.MutableRefObject<boolean>,
    recipeImpl: RecipeInterface,
    state: MFAState,
    dispatch: React.Dispatch<MFAAction>,
    userContext: any
) => {
    useEffect(() => {
        // We only need to start checking this if we have an active login attempt
        if (state.loginAttemptInfo && !state.successInAnotherTab) {
            const checkSessionIntervalHandle = setInterval(async () => {
                if (callingConsumeCodeRef.current === false) {
                    const currLoginAttempt = await recipeImpl.getLoginAttemptInfo({ userContext });
                    if (
                        currLoginAttempt === undefined ||
                        currLoginAttempt.deviceId !== state.loginAttemptInfo?.deviceId
                    ) {
                        dispatch({ type: "successInAnotherTab" });
                    }
                }
            }, 2000);

            return () => {
                clearInterval(checkSessionIntervalHandle);
            };
        }
        // Nothing to clean up
        return;
    }, [state.loginAttemptInfo, state.successInAnotherTab]);
};

export const useFeatureReducer = (): [MFAState, React.Dispatch<MFAAction>] => {
    return React.useReducer(
        (oldState: MFAState, action: MFAAction): MFAState => {
            switch (action.type) {
                case "load":
                    return {
                        loaded: true,
                        error: action.error,
                        loginAttemptInfo: action.loginAttemptInfo,
                        isSetupAllowed: action.isAllowedToSetup,
                        successInAnotherTab: false,
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
                    };
                case "setError":
                    return {
                        ...oldState,
                        error: action.error,
                    };
                case "startLogin":
                    return {
                        ...oldState,
                        loaded: true,
                        loginAttemptInfo: action.loginAttemptInfo,
                        error: undefined,
                        successInAnotherTab: false,
                    };
                case "successInAnotherTab":
                    return {
                        ...oldState,
                        successInAnotherTab: true,
                    };
                default:
                    return oldState;
            }
        },
        {
            error: undefined,
            loaded: false,
            loginAttemptInfo: undefined,
            isSetupAllowed: false,
            successInAnotherTab: false,
        },
        (initArg) => {
            let error: string | undefined = undefined;
            const errorQueryParam = getQueryParams("error");
            const messageQueryParam = getQueryParams("message");
            if (errorQueryParam !== null) {
                if (errorQueryParam === "signin") {
                    error = "SOMETHING_WENT_WRONG_ERROR";
                } else if (errorQueryParam === "restart_link") {
                    error = "ERROR_SIGN_IN_UP_LINK";
                } else if (errorQueryParam === "custom" && messageQueryParam !== null) {
                    error = messageQueryParam;
                }
            }
            return {
                ...initArg,
                error,
            };
        }
    );
};

// We are overloading to explicitly state that if recipe is defined then the return value is defined as well.
export function useChildProps(
    recipe: Recipe,
    recipeImplementation: RecipeInterface,
    state: MFAState,
    contactMethod: "PHONE" | "EMAIL",
    userContext: any,
    history: any
): MFAChildProps;
export function useChildProps(
    recipe: Recipe | undefined,
    recipeImplementation: RecipeInterface,
    state: MFAState,
    contactMethod: "PHONE" | "EMAIL",
    userContext: any,
    history: any
): MFAChildProps | undefined;

export function useChildProps(
    recipe: Recipe | undefined,
    recipeImplementation: RecipeInterface,
    state: MFAState,
    contactMethod: "PHONE" | "EMAIL",
    userContext: any,
    history: any
): MFAChildProps | undefined {
    return useMemo(() => {
        if (!recipe || !recipeImplementation) {
            return undefined;
        }
        return {
            onSuccess: () => {
                const redirectToPath = getRedirectToPathFromURL();
                const redirectInfo =
                    redirectToPath === undefined
                        ? undefined
                        : {
                              rid: "totp",
                              successRedirectContext: {
                                  action: "SUCCESS",
                                  isNewRecipeUser: false,
                                  user: undefined,
                                  redirectToPath,
                              },
                          };

                return SessionRecipe.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                    redirectInfo,
                    userContext,
                    history
                );
            },
            onSignOutClicked: async () => {
                await SessionRecipe.getInstanceOrThrow().signOut({ userContext });
                await recipeImplementation.clearLoginAttemptInfo({ userContext });
                await redirectToAuth({ redirectBack: false, history: history });
            },
            onBackButtonClicked: () => {
                // If we don't have history available this would mean we are not using react-router-dom, so we use window's history
                if (history === undefined) {
                    return WindowHandlerReference.getReferenceOrThrow().windowHandler.getWindowUnsafe().history.back();
                }
                // If we do have history and goBack function on it this means we are using react-router-dom v5 or lower
                if (history.goBack !== undefined) {
                    return history.goBack();
                }
                // If we reach this code this means we are using react-router-dom v6
                return history(-1);
            },
            onFactorChooserButtonClicked: () => {
                return MultiFactorAuth.getInstanceOrThrow().redirectToFactorChooser(false, history);
            },
            recipeImplementation: recipeImplementation,
            config: recipe.config,
            contactMethod,
        };
    }, [contactMethod, state, recipeImplementation]);
}

export const MFAFeature: React.FC<
    FeatureBaseProps & {
        contactMethod: "PHONE" | "EMAIL";
        flowType: PasswordlessFlowType;
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }
> = (props) => {
    const recipeComponentOverrides = props.useComponentOverrides();
    const userContext = useUserContext();

    const callingConsumeCodeRef = useRef(false);
    const [state, dispatch] = useFeatureReducer();
    const recipeImplementation = React.useMemo(
        () =>
            props.recipe &&
            getModifiedRecipeImplementation(
                props.recipe.webJSRecipe,
                props.recipe.config,
                dispatch,
                callingConsumeCodeRef
            ),
        [props.recipe]
    );

    useOnLoad(props, recipeImplementation, dispatch, userContext);

    const childProps = useChildProps(
        props.recipe,
        recipeImplementation,
        state,
        props.contactMethod,
        userContext,
        props.history
    )!;
    useSuccessInAnotherTabChecker(callingConsumeCodeRef, recipeImplementation, state, dispatch, userContext);

    useEffect(() => {
        if (state.loaded && state.isSetupAllowed === false && state.loginAttemptInfo === undefined) {
            void MultiFactorAuth.getInstanceOrThrow().redirectToFactorChooser(false, props.history);
        }
    }, [state.loaded, state.isSetupAllowed, state.loginAttemptInfo]);

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={props.recipe.config.useShadowDom}
                defaultStore={defaultTranslationsPasswordless}>
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
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};

export default MFAFeature;

function useOnLoad(
    props: React.PropsWithChildren<
        { history?: any } & { children?: React.ReactNode } & {
            contactMethod: "PHONE" | "EMAIL";
            flowType: PasswordlessFlowType;
            recipe: Recipe;
            useComponentOverrides: () => ComponentOverrideMap;
        }
    >,
    recipeImplementation: RecipeInterface,
    dispatch: React.Dispatch<MFAAction>,
    userContext: any
) {
    const fetchMFAInfo = React.useCallback(
        async () => MultiFactorAuth.getInstanceOrThrow().webJSRecipe.getMFAInfo({ userContext }),
        [userContext]
    );
    const handleLoadError = React.useCallback(
        // Test this, it may show an empty screen in many cases
        () => dispatch({ type: "setError", error: "Getting mfaInfo failed!" }),
        [dispatch]
    ); // TODO: translation/proper error handling)
    const onLoad = React.useCallback(
        async (mfaInfo: { factors: MFAFactorInfo; email?: string; phoneNumber?: string }) => {
            let error: string | undefined = undefined;
            const errorQueryParam = getQueryParams("error");
            const messageQueryParam = getQueryParams("message");
            const doSetup = getQueryParams("setup");
            if (errorQueryParam !== null) {
                if (errorQueryParam === "signin") {
                    error = "SOMETHING_WENT_WRONG_ERROR";
                } else if (errorQueryParam === "restart_link") {
                    error = "ERROR_SIGN_IN_UP_LINK";
                } else if (errorQueryParam === "custom" && messageQueryParam !== null) {
                    error = messageQueryParam;
                }
            }
            const loginAttemptInfo =
                await recipeImplementation.getLoginAttemptInfo<AdditionalLoginAttemptInfoProperties>({
                    userContext,
                });

            const isAlreadySetup =
                props.contactMethod === "EMAIL"
                    ? mfaInfo.factors.isAlreadySetup.includes("otp-email")
                    : mfaInfo.factors.isAlreadySetup.includes("otp-phone");
            const isAllowedToSetup =
                props.contactMethod === "EMAIL"
                    ? mfaInfo.factors.isAllowedToSetup.includes("otp-email")
                    : mfaInfo.factors.isAllowedToSetup.includes("otp-phone");

            if (!loginAttemptInfo) {
                if (props.contactMethod === "EMAIL") {
                    if (isAlreadySetup && doSetup !== "true") {
                        // createCode also dispatches the necessary events
                        await recipeImplementation!.createCode({
                            email: mfaInfo.email!, // We can assume this is set here, since the mfaInfo states that otp-email has been set up
                            userContext,
                        });
                    } else if (!mfaInfo.factors.isAllowedToSetup.includes("otp-email")) {
                        dispatch({ type: "setError", error: "Factor not enabled" }); // TODO: translation
                    } else {
                        dispatch({ type: "load", loginAttemptInfo, error, isAllowedToSetup: true }); // since loginAttemptInfo is undefined, this will ask the user for the email
                    }
                } else {
                    if (isAlreadySetup && doSetup !== "true") {
                        // createCode also dispatches the necessary events
                        await recipeImplementation!.createCode({
                            phoneNumber: mfaInfo.phoneNumber!, // We can assume this is set here, since the mfaInfo states that otp-phone has been set up
                            userContext,
                        });
                    } else if (!mfaInfo.factors.isAllowedToSetup.includes("otp-phone")) {
                        dispatch({ type: "setError", error: "Factor not enabled" }); // TODO: translation
                    } else {
                        dispatch({ type: "load", loginAttemptInfo, error, isAllowedToSetup: true }); // since loginAttemptInfo is undefined, this will ask the user for the phone number
                    }
                }
            } else {
                // No need to check if the component is unmounting, since this has no effect then.
                dispatch({ type: "load", loginAttemptInfo, error, isAllowedToSetup });
            }
        },
        [dispatch, recipeImplementation, props.contactMethod, userContext]
    );

    useOnMountAPICall(fetchMFAInfo, onLoad, handleLoadError);
}

function getModifiedRecipeImplementation(
    originalImpl: RecipeInterface,
    config: NormalisedConfig,
    dispatch: React.Dispatch<MFAAction>,
    callingConsumeCodeRef: React.MutableRefObject<boolean>
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
                const loginAttemptInfo = (await originalImpl.getLoginAttemptInfo<AdditionalLoginAttemptInfoProperties>({
                    userContext: input.userContext,
                }))!;
                dispatch({ type: "startLogin", loginAttemptInfo });
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
            // We need to call consume code while callingConsume, so we don't detect
            // the session creation too early and go to successInAnotherTab too early
            callingConsumeCodeRef.current = true;

            const res = await originalImpl.consumeCode(input);

            if (res.status === "RESTART_FLOW_ERROR") {
                await originalImpl.clearLoginAttemptInfo({
                    userContext: input.userContext,
                });

                dispatch({ type: "restartFlow", error: "ERROR_SIGN_IN_UP_CODE_CONSUME_RESTART_FLOW" });
            } else if (res.status === "SIGN_IN_UP_NOT_ALLOWED") {
                await originalImpl.clearLoginAttemptInfo({
                    userContext: input.userContext,
                });

                dispatch({ type: "restartFlow", error: res.reason });
            } else if (res.status === "OK") {
                await originalImpl.clearLoginAttemptInfo({
                    userContext: input.userContext,
                });
            }

            callingConsumeCodeRef.current = false;

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