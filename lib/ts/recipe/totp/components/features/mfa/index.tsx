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
import { useEffect } from "react";

import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { useUserContext } from "../../../../../usercontext";
import { getQueryParams, getRedirectToPathFromURL } from "../../../../../utils";
import SessionRecipe from "../../../../session/recipe";
import MFATOTPThemeWrapper from "../../themes/mfa";
import { defaultTranslationsTOTP } from "../../themes/translations";

import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type {
    AdditionalDeviceInfoProperties,
    ComponentOverrideMap,
    TOTPMFAAction,
    TOTPMFAChildProps,
    TOTPMFAState,
} from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/totp";

export const useFeatureReducer = (
    recipeImpl: RecipeInterface | undefined,
    userContext: any
): [TOTPMFAState, React.Dispatch<TOTPMFAAction>] => {
    const [state, dispatch] = React.useReducer(
        (oldState: TOTPMFAState, action: TOTPMFAAction) => {
            switch (action.type) {
                case "load":
                    return {
                        loaded: true,
                        error: action.error,
                        deviceInfo: action.deviceInfo,
                        isBlocked: false,
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
            deviceInfo: undefined,
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
    useEffect(() => {
        if (recipeImpl === undefined) {
            return;
        }
        async function load() {
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
            const deviceInfo = await recipeImpl?.getDeviceInfo({
                userContext,
            });
            // No need to check if the component is unmounting, since this has no effect then.
            dispatch({ type: "load", deviceInfo, error });
        }
        if (state.loaded === false) {
            void load();
        }
    }, [state.loaded, recipeImpl, userContext]);
    return [state, dispatch];
};

// We are overloading to explicitly state that if recipe is defined then the return value is defined as well.
export function useChildProps(
    recipe: Recipe,
    dispatch: React.Dispatch<TOTPMFAAction>,
    state: TOTPMFAState,
    userContext: any,
    history: any
): TOTPMFAChildProps;
export function useChildProps(
    recipe: Recipe | undefined,
    dispatch: React.Dispatch<TOTPMFAAction>,
    state: TOTPMFAState,
    userContext: any,
    history: any
): TOTPMFAChildProps | undefined;

export function useChildProps(
    recipe: Recipe | undefined,
    dispatch: React.Dispatch<TOTPMFAAction>,
    state: TOTPMFAState,
    userContext: any,
    history: any
): TOTPMFAChildProps | undefined {
    const recipeImplementation = React.useMemo(
        () => recipe && getModifiedRecipeImplementation(recipe.webJSRecipe, dispatch),
        [recipe]
    );

    return useMemo(() => {
        if (!recipe || !recipeImplementation) {
            return undefined;
        }
        return {
            onSuccess: () => {
                return SessionRecipe.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                    {
                        rid: recipe.config.recipeId,
                        successRedirectContext: {
                            action: "SUCCESS",
                            redirectToPath: getRedirectToPathFromURL(),
                        },
                    },
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
    const userContext = useUserContext();
    const [state, dispatch] = useFeatureReducer(props.recipe.webJSRecipe, userContext);
    const childProps = useChildProps(props.recipe, dispatch, state, userContext, props.history)!;

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
            const additionalAttemptInfo = {
                redirectToPath: getRedirectToPathFromURL(),
            };

            const res = await originalImpl.createDevice({
                ...input,
                userContext: { ...input.userContext, additionalAttemptInfo },
            });
            if (res.status === "OK") {
                const deviceInfo = (await originalImpl.getDeviceInfo<AdditionalDeviceInfoProperties>({
                    userContext: input.userContext,
                }))!;
                dispatch({ type: "createDevice", deviceInfo });
            }
            return res;
        },

        verifyCode: async (input) => {
            const res = await originalImpl.verifyCode(input);

            if (res.status === "LIMIT_REACHED_ERROR") {
                dispatch({ type: "setBlocked", error: "ERROR_SIGN_IN_UP_CODE_VERIFY_BLOCKED" });
            } else if (res.status === "INVALID_TOTP_ERROR") {
                dispatch({ type: "setError", error: "ERROR_SIGN_IN_UP_CODE_VERIFY_INVALID_TOTP" });
            }

            return res;
        },

        verifyDevice: async (input) => {
            const res = await originalImpl.verifyDevice(input);

            if (res.status === "LIMIT_REACHED_ERROR") {
                dispatch({ type: "setBlocked", error: "ERROR_TOTP_MFA_VERIFY_DEVICE_BLOCKED" });
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
