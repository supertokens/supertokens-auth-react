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
import { getQueryParams, getRedirectToPathFromURL, useOnMountAPICall, useRethrowInRender } from "../../../../../utils";
import MultiFactorAuth from "../../../../multifactorauth/recipe";
import { FactorIds } from "../../../../multifactorauth/types";
import { getAvailableFactors } from "../../../../multifactorauth/utils";
import SessionRecipe from "../../../../session/recipe";
import MFATOTPThemeWrapper from "../../themes/mfa";
import { defaultTranslationsTOTP } from "../../themes/translations";

import type { FeatureBaseProps, Navigate, UserContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type {
    ComponentOverrideMap,
    TOTPDeviceInfo,
    TOTPMFAAction,
    TOTPMFAChildProps,
    TOTPMFAState,
} from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/totp";

export const useFeatureReducer = (): [TOTPMFAState, React.Dispatch<TOTPMFAAction>] => {
    return React.useReducer(
        (oldState: TOTPMFAState, action: TOTPMFAAction): TOTPMFAState => {
            switch (action.type) {
                case "load":
                    return {
                        // We want to wait for createDevice to finish before marking the page fully loaded
                        loaded: !action.callingCreateDevice,
                        error: action.error,
                        deviceInfo: action.deviceInfo,
                        showBackButton: action.showBackButton,
                        showAccessDenied: action.showAccessDenied,
                        isBlocked: false,
                        showSecret: false,
                    };
                case "setBlocked":
                    return {
                        ...oldState,
                        isBlocked: true,
                        nextRetryAt: action.nextRetryAt,
                        error: action.error,
                    };
                case "setError":
                    return {
                        ...oldState,
                        loaded: true,
                        maxAttemptCount: action.maxAttemptCount ?? oldState.maxAttemptCount,
                        currAttemptCount: action.currAttemptCount ?? oldState.currAttemptCount,
                        showAccessDenied: action.showAccessDenied,
                        error: action.error,
                    };
                case "createDevice":
                    return {
                        ...oldState,
                        deviceInfo: action.deviceInfo,
                        isBlocked: false,
                        showSecret: false,
                        nextRetryAt: undefined,
                        error: undefined,
                    };
                case "showSecret":
                    return {
                        ...oldState,
                        showSecret: true,
                    };
                case "restartFlow":
                    return {
                        ...oldState,
                        isBlocked: false,
                        showSecret: false,
                        nextRetryAt: undefined,
                        error: action.error,
                    };
                default:
                    return oldState;
            }
        },
        {
            error: undefined,
            loaded: false,
            deviceInfo: undefined,
            showSecret: false,
            isBlocked: false,
            showBackButton: false,
            showAccessDenied: false,
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

function useOnLoad(recipeImpl: RecipeInterface, dispatch: React.Dispatch<TOTPMFAAction>, userContext: UserContext) {
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
            const alreadySetup = mfaInfo.factors.alreadySetup.includes(FactorIds.TOTP);

            // If the next array only has a single option, it means the we were redirected here
            // automatically during the sign in process. In that case, anywhere the back button
            // could go would redirect back here, making it useless.
            const showBackButton =
                mfaInfo.factors.next.length === 0 ||
                getAvailableFactors(mfaInfo.factors, undefined, MultiFactorAuth.getInstanceOrThrow(), userContext)
                    .length !== 1;

            let deviceInfo: TOTPDeviceInfo | undefined;
            if (doSetup || !alreadySetup) {
                let createResp;
                try {
                    dispatch({
                        type: "load",
                        deviceInfo: undefined,
                        error,
                        showBackButton,
                        showAccessDenied: false,
                        callingCreateDevice: true,
                    });
                    createResp = await recipeImpl.createDevice({ userContext });
                } catch {
                    dispatch({
                        type: "setError",
                        showAccessDenied: true,
                        error: "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                    });
                    return;
                }
                if (createResp.status !== "OK") {
                    dispatch({
                        type: "setError",
                        showAccessDenied: true,
                        error: "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                    });
                    return;
                }
                deviceInfo = {
                    ...createResp,
                };
                delete (deviceInfo as any).status;
            }

            // No need to check if the component is unmounting, since this has no effect then.
            dispatch({
                type: "load",
                deviceInfo,
                error,
                showBackButton,
                showAccessDenied: false,
                callingCreateDevice: false,
            });
        },
        [dispatch, recipeImpl, userContext]
    );

    useOnMountAPICall(fetchMFAInfo, onLoad, handleLoadError);
}

export function useChildProps(
    recipe: Recipe,
    recipeImplementation: RecipeInterface,
    state: TOTPMFAState,
    dispatch: React.Dispatch<TOTPMFAAction>,
    userContext: UserContext,
    navigate?: Navigate
): TOTPMFAChildProps | undefined {
    const rethrowInRender = useRethrowInRender();

    return useMemo(() => {
        return {
            onShowSecretClicked: () => {
                dispatch({ type: "showSecret" });
            },
            onBackButtonClicked: async () => {
                if (state.deviceInfo) {
                    await recipeImplementation.removeDevice({
                        deviceName: state.deviceInfo.deviceName,
                        userContext,
                    });
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
            onRetryClicked: () => {
                dispatch({ type: "restartFlow", error: undefined });
            },
            onSignOutClicked: async () => {
                if (state.deviceInfo) {
                    await recipeImplementation.removeDevice({ deviceName: state.deviceInfo.deviceName, userContext });
                }
                await SessionRecipe.getInstanceOrThrow().signOut({ userContext });
                await redirectToAuth({ redirectBack: false, navigate: navigate });
            },
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
            recipeImplementation: recipeImplementation,
            config: recipe.config,
        };
    }, [state, recipeImplementation]);
}

export const SignInUpFeature: React.FC<
    FeatureBaseProps<{
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }>
> = (props) => {
    const recipeComponentOverrides = props.useComponentOverrides();
    const [state, dispatch] = useFeatureReducer();
    const userContext = useUserContext();

    const recipeImplementation = React.useMemo(
        () => getModifiedRecipeImplementation(props.recipe.webJSRecipe, dispatch),
        [props.recipe]
    );
    const childProps = useChildProps(props.recipe, recipeImplementation, state, dispatch, userContext, props.navigate)!;
    useOnLoad(recipeImplementation, dispatch, userContext);

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={SuperTokens.getInstanceOrThrow().useShadowDom}
                defaultStore={defaultTranslationsTOTP}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {props.children === undefined && (
                        <MFATOTPThemeWrapper {...childProps} featureState={state} dispatch={dispatch} />
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

export default SignInUpFeature;

function getModifiedRecipeImplementation(
    originalImpl: Recipe["webJSRecipe"],
    dispatch: React.Dispatch<TOTPMFAAction>
): RecipeInterface {
    return {
        ...originalImpl,
        createDevice: async (input) => {
            const res = await originalImpl.createDevice(input);
            if (res.status === "OK") {
                const deviceInfo = {
                    ...res,
                };
                delete (deviceInfo as any).status;
                dispatch({ type: "createDevice", deviceInfo });
            }
            return res;
        },

        verifyCode: async (input) => {
            const res = await originalImpl.verifyCode(input);

            if (res.status === "LIMIT_REACHED_ERROR") {
                dispatch({
                    type: "setBlocked",
                    error: "ERROR_SIGN_IN_UP_CODE_VERIFY_BLOCKED",
                    nextRetryAt: Date.now() + res.retryAfterMs,
                });
            } else if (res.status === "INVALID_TOTP_ERROR") {
                dispatch({
                    type: "setError",
                    error: "ERROR_TOTP_INVALID_CODE",
                    showAccessDenied: false,
                    maxAttemptCount: res.maxNumberOfFailedAttempts,
                    currAttemptCount: res.currentNumberOfFailedAttempts,
                });
            }

            return res;
        },

        verifyDevice: async (input) => {
            const res = await originalImpl.verifyDevice(input);

            if (res.status === "LIMIT_REACHED_ERROR") {
                dispatch({
                    type: "setBlocked",
                    error: "ERROR_TOTP_MFA_VERIFY_DEVICE_BLOCKED",
                    nextRetryAt: Date.now() + res.retryAfterMs,
                });
            } else if (res.status === "UNKNOWN_DEVICE_ERROR") {
                dispatch({ type: "setError", error: "ERROR_TOTP_UNKNOWN_DEVICE", showAccessDenied: true });
            } else if (res.status === "INVALID_TOTP_ERROR") {
                dispatch({
                    type: "setError",
                    error: "ERROR_TOTP_INVALID_CODE",
                    showAccessDenied: false,
                    maxAttemptCount: res.maxNumberOfFailedAttempts,
                    currAttemptCount: res.currentNumberOfFailedAttempts,
                });
            }

            return res;
        },

        removeDevice: async (input) => {
            const res = await originalImpl.removeDevice(input);

            dispatch({ type: "restartFlow", error: undefined });
            return res;
        },
    };
}
