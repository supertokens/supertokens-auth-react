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
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import { redirectToAuth } from "../../../../..";
import SessionRecipe from "../../../../session/recipe";
import { getAvailableFactors } from "../../../../multifactorauth/utils";
import { useUserContext } from "../../../../../usercontext";
import { defaultTranslationsWebauthn } from "../../themes/translations";
import { FactorIds } from "../../../../multifactorauth/types";
import MFAThemeWrapper from "../../themes/mfa";
import MultiFactorAuth from "../../../../multifactorauth/recipe";
import type { FieldState } from "../../../../emailpassword/components/library/formBase";
import type { APIFormField } from "../../../../../types";
import {
    getQueryParams,
    getRedirectToPathFromURL,
    useOnMountAPICall,
    handleCallAPI,
    useRethrowInRender,
} from "../../../../../utils";

import type { FeatureBaseProps, UserContext, Navigate } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap, WebAuthnMFAAction, WebAuthnMFAProps, WebAuthnMFAState } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/webauthn";

export const useFeatureReducer = (): [WebAuthnMFAState, React.Dispatch<WebAuthnMFAAction>] => {
    return React.useReducer(
        (oldState: WebAuthnMFAState, action: WebAuthnMFAAction): WebAuthnMFAState => {
            switch (action.type) {
                case "setError":
                    return {
                        ...oldState,
                        loaded: true,
                        error: action.error,
                        accessDenied: action.accessDenied || false,
                    };
                case "load":
                    return {
                        ...oldState,
                        loaded: true,
                        deviceSupported: action.deviceSupported,
                        email: action.email,
                        showBackButton: action.showBackButton,
                        canRegisterPasskey: action.canRegisterPasskey,
                    };
                default:
                    return oldState;
            }
        },
        {
            error: undefined,
            deviceSupported: false,
            canRegisterPasskey: false,
            loaded: false,
            showBackButton: true,
            email: undefined,
            accessDenied: false,
        }
    );
};

export function useChildProps(
    recipe: Recipe,
    recipeImplementation: RecipeInterface,
    state: WebAuthnMFAState,
    dispatch: React.Dispatch<WebAuthnMFAAction>,
    userContext: UserContext,
    navigate?: Navigate
): Omit<WebAuthnMFAProps, "featureState" | "dispatch"> {
    const rethrowInRender = useRethrowInRender();
    const callSignInAPI = React.useCallback(
        async (_: APIFormField[], __: (id: string, value: string) => any) => {
            const response = await recipeImplementation.authenticateCredentialWithSignIn({
                shouldTryLinkingWithSessionUser: true,
                userContext,
            });

            switch (response.status) {
                case "INVALID_CREDENTIALS_ERROR":
                    dispatch({ type: "setError", error: "WEBAUTHN_PASSKEY_INVALID_CREDENTIALS_ERROR" });
                    break;
                case "FAILED_TO_AUTHENTICATE_USER":
                case "INVALID_OPTIONS_ERROR":
                    dispatch({ type: "setError", error: "WEBAUTHN_PASSKEY_RECOVERABLE_ERROR" });
                    break;
                case "WEBAUTHN_NOT_SUPPORTED":
                    dispatch({ type: "setError", error: "WEBAUTHN_NOT_SUPPORTED_ERROR" });
                    break;
            }

            return response;
        },
        [recipeImplementation, userContext]
    );

    const callSignUpAPI = React.useCallback(
        async (email: string, _: APIFormField[], __: (id: string, value: string) => any) => {
            const response = await recipeImplementation.registerCredentialWithSignUp({
                email,
                shouldTryLinkingWithSessionUser: true,
                userContext,
            });

            if (response.status !== "OK") {
                dispatch({ type: "setError", error: "WEBAUTHN_PASSKEY_RECOVERABLE_ERROR" });
            }

            if (response.status === "EMAIL_ALREADY_EXISTS_ERROR") {
                dispatch({ type: "setError", error: "WEBAUTHN_EMAIL_ALREADY_EXISTS_ERROR" });
            }

            if (response.status === "WEBAUTHN_NOT_SUPPORTED") {
                dispatch({ type: "setError", error: "WEBAUTHN_NOT_SUPPORTED_ERROR" });
            }

            return response;
        },
        [state]
    );

    const onSuccess = React.useCallback(() => {
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
    }, [recipe, userContext, navigate]);

    return React.useMemo(() => {
        return {
            onSignIn: async () => {
                const fieldUpdates: FieldState[] = [];
                try {
                    const { result, generalError, fetchError } = await handleCallAPI<any>({
                        apiFields: [],
                        fieldUpdates,
                        callAPI: callSignInAPI,
                    });

                    if (generalError !== undefined) {
                        dispatch({ type: "setError", error: generalError.message });
                    } else if (fetchError !== undefined) {
                        dispatch({ type: "setError", error: "Failed to fetch from upstream" });
                    } else if (result.status === "OK") {
                        dispatch({ type: "setError", error: undefined });
                        onSuccess();
                    }
                } catch (e) {
                    dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
                }
            },
            onSignUp: async (email: string) => {
                const fieldUpdates: FieldState[] = [];

                try {
                    const { result, generalError, fetchError } = await handleCallAPI<any>({
                        apiFields: [],
                        fieldUpdates,
                        callAPI: (...params) => callSignUpAPI(email, ...params),
                    });

                    if (generalError !== undefined) {
                        dispatch({ type: "setError", error: generalError.message });
                    } else if (fetchError !== undefined) {
                        dispatch({ type: "setError", error: "WEBAUTHN_PASSKEY_RECOVERABLE_ERROR" });
                    } else if (result?.status === "OK") {
                        dispatch({ type: "setError", error: undefined });
                        onSuccess();
                    }
                } catch (e) {
                    dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
                    console.error("error", e);
                }
            },
            onSignOutClicked: async () => {
                await SessionRecipe.getInstanceOrThrow().signOut({ userContext });
                await redirectToAuth({ redirectBack: false, navigate: navigate });
            },
            onBackButtonClicked: async () => {
                // If we don't have navigate available this would mean we are using react-router-dom, so we use window's history
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
            onRecoverAccountClick: () => {
                recipe.redirect(
                    { action: "SEND_RECOVERY_EMAIL", tenantIdFromQueryParams: "" },
                    navigate,
                    {},
                    userContext
                );
            },
            recipeImplementation: recipeImplementation,
            config: recipe.config,
        };
    }, [recipeImplementation, state, recipe, userContext, navigate]);
}

export const MFAFeature: React.FC<
    FeatureBaseProps<{
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }>
> = (props) => {
    const recipeComponentOverrides = props.useComponentOverrides();

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={SuperTokens.getInstanceOrThrow().useShadowDom}
                defaultStore={defaultTranslationsWebauthn}
            >
                <MFAFeatureInner {...props} />
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};

export default MFAFeature;

const MFAFeatureInner: React.FC<
    FeatureBaseProps<{
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }>
> = (props) => {
    const userContext = useUserContext();
    const [state, dispatch] = useFeatureReducer();

    const childProps = useChildProps(
        props.recipe,
        props.recipe.webJSRecipe as RecipeInterface,
        state,
        dispatch,
        userContext,
        props.navigate
    )!;

    useOnLoad(props, props.recipe.webJSRecipe as RecipeInterface, dispatch, userContext);

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

function useOnLoad(
    props: React.PropsWithChildren<
        { navigate?: Navigate } & { children?: React.ReactNode } & {
            recipe: Recipe;
            useComponentOverrides: () => ComponentOverrideMap;
        }
    >,
    recipeImplementation: RecipeInterface,
    dispatch: React.Dispatch<WebAuthnMFAAction>,
    userContext: UserContext
) {
    const fetchMFAInfo = React.useCallback(
        async () => MultiFactorAuth.getInstanceOrThrow().webJSRecipe.resyncSessionAndFetchMFAInfo({ userContext }),
        [userContext]
    );

    const handleLoadError = React.useCallback(
        () => dispatch({ type: "setError", accessDenied: true, error: "SOMETHING_WENT_WRONG_ERROR_RELOAD" }),
        [dispatch]
    );

    const onLoad = React.useCallback(
        async (mfaInfo: Awaited<ReturnType<typeof fetchMFAInfo>>) => {
            let error: string | undefined = undefined;
            const errorQueryParam = getQueryParams("error");
            const doSetup = getQueryParams("setup");
            const stepUp = getQueryParams("stepUp");

            if (errorQueryParam !== null) {
                error = "SOMETHING_WENT_WRONG_ERROR";
            }

            if (mfaInfo.factors.next.length === 0 && stepUp !== "true" && doSetup !== "true") {
                const redirectToPath = getRedirectToPathFromURL();
                try {
                    await SessionRecipe.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                        undefined,
                        props.recipe.recipeID,
                        redirectToPath,
                        userContext,
                        props.navigate
                    );
                } catch {
                    // If we couldn't redirect to EV (or an unknown claim validation failed or somehow the redirection threw an error)
                    // we fall back to showing the something went wrong error
                    dispatch({
                        type: "setError",
                        accessDenied: true,
                        error: "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                    });
                    return;
                }
            }

            const alreadySetup = mfaInfo.factors.alreadySetup.includes(FactorIds.WEBAUTHN);
            if (alreadySetup) {
                dispatch({ type: "setError", accessDenied: true, error: "SOMETHING_WENT_WRONG_ERROR_RELOAD" });
                return;
            }

            // If the next array only has a single option, it means the we were redirected here
            // automatically during the sign in process. In that case, anywhere the back button
            // could go would redirect back here, making it useless.
            const showBackButton =
                mfaInfo.factors.next.length === 0 ||
                getAvailableFactors(mfaInfo.factors, undefined, MultiFactorAuth.getInstanceOrThrow(), userContext)
                    .length !== 1;

            const mfaInfoEmails = mfaInfo.emails[FactorIds.WEBAUTHN];
            const email = mfaInfoEmails ? mfaInfoEmails[0] : undefined;

            const canRegisterPasskey = !mfaInfo.factors.alreadySetup.includes(FactorIds.WEBAUTHN);
            const browserSupportsWebauthnResponse = await props.recipe.webJSRecipe.doesBrowserSupportWebAuthn({
                userContext: userContext,
            });
            const browserSupportsWebauthn =
                browserSupportsWebauthnResponse.status === "OK" &&
                browserSupportsWebauthnResponse?.browserSupportsWebauthn;

            dispatch({
                type: "load",
                canRegisterPasskey,
                error,
                showBackButton,
                email,
                deviceSupported: browserSupportsWebauthn,
            });
        },
        [dispatch, recipeImplementation, props.recipe, userContext]
    );

    useOnMountAPICall(fetchMFAInfo, onLoad, handleLoadError);
}
