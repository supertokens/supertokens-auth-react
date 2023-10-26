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

import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { useUserContext } from "../../../../../usercontext";
import { getQueryParams, getRedirectToPathFromURL, useOnMountAPICall } from "../../../../../utils";
import SessionRecipe from "../../../../session/recipe";
import MFATOTPThemeWrapper from "../../themes/mfa";
import { defaultTranslationsTOTP } from "../../themes/translations";

import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type {
    ComponentOverrideMap,
    TOTPDeviceInfo,
    TOTPMFAAction,
    TOTPMFAChildProps,
    TOTPMFAState,
} from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/totp";
import MultiFactorAuth from "../../../../multifactorauth/recipe";
import { MFAFactorInfo } from "supertokens-web-js/recipe/multifactorauth/types";

export const useFeatureReducer = (): [TOTPMFAState, React.Dispatch<TOTPMFAAction>] => {
    return React.useReducer(
        (oldState: TOTPMFAState, action: TOTPMFAAction): TOTPMFAState => {
            switch (action.type) {
                case "load":
                    return {
                        loaded: true,
                        error: action.error,
                        deviceInfo: action.deviceInfo,
                        isBlocked: false,
                        showSecret: false,
                    };
                case "setBlocked":
                    return {
                        ...oldState,
                        error: action.error,
                        deviceInfo: undefined,
                    };
                case "setError":
                    return {
                        ...oldState,
                        error: action.error,
                    };
                case "createDevice":
                    return {
                        ...oldState,
                        deviceInfo: action.deviceInfo,
                        error: undefined,
                    };
                case "showSecret":
                    return {
                        ...oldState,
                        showSecret: true,
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

function useOnLoad(recipeImpl: RecipeInterface, dispatch: React.Dispatch<TOTPMFAAction>, userContext: any) {
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
            const isAllowedToSetup = mfaInfo.factors.isAllowedToSetup.includes("totp");
            const isAlreadySetup = mfaInfo.factors.isAlreadySetup.includes("totp");
            if (!isAllowedToSetup && !isAlreadySetup) {
                // TODO: redirect to access denied
                dispatch({ type: "setError", error: "Setup and completion not allowed" });
                return;
            }
            if (doSetup && !isAllowedToSetup) {
                dispatch({ type: "setError", error: "Setup not allowed" });
                return;
            }
            // let deviceInfo = await recipeImpl.getDeviceInfo<AdditionalDeviceInfoProperties>({
            //     userContext,
            // });
            let deviceInfo: TOTPDeviceInfo | undefined;
            if (isAllowedToSetup && (doSetup || !isAlreadySetup)) {
                // if (!deviceInfo) {
                const createResp = await recipeImpl.createDevice({ userContext });
                if (createResp?.status !== "OK") {
                    throw new Error("TOTP device creation failed with duplicate name; should never happen");
                }
                deviceInfo = {
                    ...createResp,
                };
                delete (deviceInfo as any).status;
                // deviceInfo = await recipeImpl.getDeviceInfo<AdditionalDeviceInfoProperties>({
                //     userContext,
                // });
                // }
            }
            // if (deviceInfo && !isAllowedToSetup) {
            //     await recipeImpl.removeDevice({ deviceName: deviceInfo.deviceName, userContext });
            //     deviceInfo = undefined;
            // }

            // No need to check if the component is unmounting, since this has no effect then.
            dispatch({ type: "load", deviceInfo, error });
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
    userContext: any,
    history: any
): TOTPMFAChildProps | undefined {
    return useMemo(() => {
        return {
            onShowSecretClick: () => {
                dispatch({ type: "showSecret" });
            },
            onSuccess: () => {
                const redirectToPath = getRedirectToPathFromURL();
                const redirectInfo =
                    redirectToPath === undefined
                        ? undefined
                        : {
                              rid: "totp",
                              successRedirectContext: {
                                  action: "SUCCESS",
                                  redirectToPath,
                                  userContext,
                              },
                          };

                return SessionRecipe.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                    redirectInfo,
                    userContext,
                    history
                );
            },
            recipeImplementation: recipeImplementation,
            config: recipe.config,
        };
    }, [state, recipeImplementation]);
}

export const SignInUpFeature: React.FC<
    FeatureBaseProps & {
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }
> = (props) => {
    const recipeComponentOverrides = props.useComponentOverrides();
    const [state, dispatch] = useFeatureReducer();
    const userContext = useUserContext();

    const recipeImplementation = React.useMemo(
        () => getModifiedRecipeImplementation(props.recipe.webJSRecipe, dispatch),
        [props.recipe]
    );
    const childProps = useChildProps(props.recipe, recipeImplementation, state, dispatch, userContext, props.history)!;
    useOnLoad(recipeImplementation, dispatch, userContext);

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper useShadowDom={props.recipe.config.useShadowDom} defaultStore={defaultTranslationsTOTP}>
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
            const additionalDeviceInfo = {
                redirectToPath: getRedirectToPathFromURL(),
            };

            const res = await originalImpl.createDevice({
                ...input,
                userContext: { ...input.userContext, additionalDeviceInfo },
            });
            if (res.status === "OK") {
                // const deviceInfo = (await originalImpl.getDeviceInfo<AdditionalDeviceInfoProperties>({
                //     userContext: input.userContext,
                // }))!;
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
                dispatch({ type: "setBlocked", error: "ERROR_SIGN_IN_UP_CODE_VERIFY_BLOCKED", nextRetryAt: Date.now() + res.retryAfterMs });
            } else if (res.status === "INVALID_TOTP_ERROR") {
                dispatch({ type: "setError", error: "ERROR_SIGN_IN_UP_CODE_VERIFY_INVALID_TOTP" });
            }

            return res;
        },

        verifyDevice: async (input) => {
            const res = await originalImpl.verifyDevice(input);

            if (res.status === "LIMIT_REACHED_ERROR") {
                dispatch({ type: "setBlocked", error: "ERROR_TOTP_MFA_VERIFY_DEVICE_BLOCKED", nextRetryAt: Date.now() + res.retryAfterMs });
            } else if (res.status === "INVALID_TOTP_ERROR") {
                dispatch({ type: "setError", error: "ERROR_TOTP_MFA_VERIFY_DEVICE_INVALID_TOTP" });
            } else if (res.status === "UNKNOWN_DEVICE_ERROR") {
                await originalImpl.clearDeviceInfo({ userContext: input.userContext });
                dispatch({ type: "restartFlow", error: "ERROR_TOTP_MFA_VERIFY_DEVICE_UNKNOWN_DEVICE" });
            }

            return res;
        },

        clearDeviceInfo: async (input) => {
            await originalImpl.clearDeviceInfo({
                userContext: input.userContext,
            });
            dispatch({ type: "restartFlow", error: undefined });
        },

        removeDevice: async (input) => {
            const res = await originalImpl.removeDevice(input);

            await originalImpl.clearDeviceInfo({
                userContext: input.userContext,
            });
            dispatch({ type: "restartFlow", error: undefined });
            return res;
        },
    };
}
