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
import {
    clearErrorQueryParam,
    getQueryParams,
    getRedirectToPathFromURL,
    useRethrowInRender,
} from "../../../../../utils";
import { EmailVerificationClaim } from "../../../../emailverification";
import EmailVerification from "../../../../emailverification/recipe";
import { useDynamicLoginMethods } from "../../../../multitenancy/dynamicLoginMethodsContext";
import { getInvalidClaimsFromResponse } from "../../../../session";
import SessionRecipe from "../../../../session/recipe";
import Session from "../../../../session/recipe";
import useSessionContext from "../../../../session/useSessionContext";
import { getPhoneNumberUtils } from "../../../phoneNumberUtils";
import { getEnabledContactMethods } from "../../../utils";
import SignInUpThemeWrapper from "../../themes/signInUp";
import { defaultTranslationsPasswordless } from "../../themes/translations";

import type { Navigate, FeatureBaseProps, UserContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { AdditionalLoginAttemptInfoProperties, ComponentOverrideMap } from "../../../types";
import type { PasswordlessSignInUpAction, SignInUpState, SignInUpChildProps, NormalisedConfig } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import type { User } from "supertokens-web-js/types";

export const useFeatureReducer = (
    recipeImpl: RecipeInterface | undefined,
    contactMethod: NormalisedConfig["contactMethod"],
    userContext: UserContext
): [SignInUpState, React.Dispatch<PasswordlessSignInUpAction>] => {
    const dynamicLoginMethods = useDynamicLoginMethods();
    const [state, dispatch] = React.useReducer(
        (oldState: SignInUpState, action: PasswordlessSignInUpAction) => {
            switch (action.type) {
                case "load":
                    return {
                        loaded: true,
                        error: action.error,
                        loginAttemptInfo: action.loginAttemptInfo,
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
                        loginAttemptInfo: action.loginAttemptInfo,
                        error: undefined,
                    };
                default:
                    return oldState;
            }
        },
        {
            error: undefined,
            loaded: false,
            loginAttemptInfo: undefined,
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
            let loginAttemptInfo = await recipeImpl?.getLoginAttemptInfo<AdditionalLoginAttemptInfoProperties>({
                userContext,
            });
            const enabledContactMethods = getEnabledContactMethods(contactMethod, dynamicLoginMethods);
            if (loginAttemptInfo && !enabledContactMethods.includes(loginAttemptInfo.contactMethod)) {
                await recipeImpl?.clearLoginAttemptInfo({ userContext });
                loginAttemptInfo = undefined;
            }
            // No need to check if the component is unmounting, since this has no effect then.
            dispatch({ type: "load", loginAttemptInfo, error });
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
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    state: SignInUpState,
    userContext: UserContext,
    navigate?: Navigate
): SignInUpChildProps;
export function useChildProps(
    recipe: Recipe | undefined,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    state: SignInUpState,
    userContext: UserContext,
    navigate?: Navigate
): SignInUpChildProps | undefined;

export function useChildProps(
    recipe: Recipe | undefined,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>,
    state: SignInUpState,
    userContext: UserContext,
    navigate?: Navigate
): SignInUpChildProps | undefined {
    const session = useSessionContext();
    const recipeImplementation = React.useMemo(
        () => recipe && getModifiedRecipeImplementation(recipe.webJSRecipe, recipe.config, dispatch),
        [recipe]
    );
    const rethrowInRender = useRethrowInRender();

    return useMemo(() => {
        if (!recipe || !recipeImplementation) {
            return undefined;
        }
        return {
            userContext,
            onSuccess: async (result: { createdNewRecipeUser: boolean; user: User }) => {
                const payloadAfterSuccess = await SessionRecipe.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                    userContext,
                });
                return SessionRecipe.getInstanceOrThrow()
                    .validateGlobalClaimsAndHandleSuccessRedirection(
                        {
                            action: "SUCCESS",
                            createdNewUser: result.createdNewRecipeUser && result.user.loginMethods.length === 1,
                            isNewRecipeUser: result.createdNewRecipeUser,
                            newSessionCreated:
                                session.loading ||
                                !session.doesSessionExist ||
                                session.accessTokenPayload.sessionHandle !== payloadAfterSuccess.sessionHandle,
                            recipeId: recipe.recipeID,
                        },
                        recipe.recipeID,
                        getRedirectToPathFromURL(),
                        userContext,
                        navigate
                    )
                    .catch(rethrowInRender);
            },
            onFetchError: async (err: Response) => {
                if (err.status === Session.getInstanceOrThrow().config.invalidClaimStatusCode) {
                    const invalidClaims = await getInvalidClaimsFromResponse({ response: err, userContext });
                    if (invalidClaims.some((i) => i.validatorId === EmailVerificationClaim.id)) {
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
            recipeImplementation: recipeImplementation,
            config: recipe.config,
        };
    }, [state, recipeImplementation]);
}

const SignInUpFeatureInner: React.FC<
    FeatureBaseProps<{
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
        userContext?: UserContext;
    }>
> = (props) => {
    let userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    const [state, dispatch] = useFeatureReducer(
        props.recipe.webJSRecipe,
        props.recipe.config.contactMethod,
        userContext
    );
    const childProps = useChildProps(props.recipe, dispatch, state, userContext, props.navigate)!;

    return (
        <Fragment>
            {/* No custom theme, use default. */}
            {props.children === undefined && (
                <SignInUpThemeWrapper {...childProps} featureState={state} dispatch={dispatch} />
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

export const SignInUpFeature: React.FC<
    FeatureBaseProps<{
        recipe: Recipe;
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }>
> = (props) => {
    const recipeComponentOverrides = props.useComponentOverrides();

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={props.recipe.config.useShadowDom}
                defaultStore={defaultTranslationsPasswordless}>
                <SignInUpFeatureInner {...props} />
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};

export default SignInUpFeature;

function getModifiedRecipeImplementation(
    originalImpl: RecipeInterface,
    config: NormalisedConfig,
    dispatch: React.Dispatch<PasswordlessSignInUpAction>
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
