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
import { Fragment, useEffect, useState } from "react";
import { useMemo } from "react";

import AuthComponentWrapper from "../../../../../components/authCompWrapper";
import FeatureWrapper from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import { useUserContext } from "../../../../../usercontext";
import { useRethrowInRender } from "../../../../../utils";
import Session from "../../../../session/recipe";
import useSessionContext from "../../../../session/useSessionContext";
import { ContinueWithPasskeyTheme } from "../../themes/continueWithPasskey";
import SignUpTheme from "../../themes/signUp";
import { defaultTranslationsWebauthn } from "../../themes/translations";

import type { UserContext, PartialAuthComponentProps, Navigate } from "../../../../../types";
import type { AuthSuccessContext } from "../../../../authRecipe/types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
import type { SignUpThemeProps } from "../../../types";
import type { User } from "supertokens-web-js/types";

export function useChildProps(
    recipe: Recipe,
    factorIds: string[],
    onAuthSuccess: (successContext: AuthSuccessContext) => Promise<void>,
    error: string | undefined,
    onError: (err: string) => void,
    userContext: UserContext,
    clearError: () => void,
    resetFactorList: () => void,
    onSignInUpSwitcherClick: () => void,
    showBackButton: boolean,
    navigate?: Navigate
): SignUpThemeProps {
    const session = useSessionContext();
    const recipeImplementation = recipe.webJSRecipe;
    const rethrowInRender = useRethrowInRender();

    const onRecoverAccountClick = () =>
        recipe.redirect({ action: "SEND_RECOVERY_EMAIL", tenantIdFromQueryParams: "" }, navigate, {}, userContext);

    return useMemo(() => {
        return {
            userContext,
            onSuccess: async (result: { createdNewRecipeUser: boolean; user: User }) => {
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
                    recipeId: "webauthn",
                }).catch(rethrowInRender);
            },
            error,
            onError,
            clearError,
            onFetchError: async (/* err: Response*/) => {
                // TODO: Do we need to do something else?
                onError("SOMETHING_WENT_WRONG_ERROR");
            },
            factorIds,
            recipeImplementation: recipeImplementation,
            config: recipe.config,
            resetFactorList: resetFactorList,
            onSignInUpSwitcherClick,
            onRecoverAccountClick,
            showBackButton,
        };
    }, [error, factorIds, userContext, showBackButton, recipeImplementation]);
}

const SignUpFeatureInner: React.FC<
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
        userContext,
        props.clearError,
        props.resetFactorList,
        props.onSignInUpSwitcherClick,
        props.showBackButton,
        props.navigate
    );

    return (
        <Fragment>
            {/* No custom theme, use default. */}
            {props.children === undefined && <SignUpTheme {...childProps} />}

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

export const SignInUpFeatureFullPage: React.FC<
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
            <SignUpFeatureInner {...props} />
        </AuthComponentWrapper>
    );
};

export const SignUpWithPasskeyFeature: React.FC<
    PartialAuthComponentProps & {
        recipe: Recipe;
        factorIds: string[];
        userContext?: UserContext;
        useComponentOverrides: () => ComponentOverrideMap;
    }
> = (props) => {
    const recipeComponentOverrides = props.useComponentOverrides();
    let userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }

    const [isPasskeySupported, setIsPasskeySupported] = useState(true);
    useEffect(() => {
        void (async () => {
            const browserSupportsWebauthn = await props.recipe.webJSRecipe.doesBrowserSupportWebAuthn({
                userContext: userContext,
            });
            if (browserSupportsWebauthn.status !== "OK") {
                console.error(browserSupportsWebauthn.error);
                return;
            }

            setIsPasskeySupported(browserSupportsWebauthn.browserSupportsWebauthn);
        })();
    }, [props.recipe.webJSRecipe]);

    return (
        <AuthComponentWrapper recipeComponentOverrides={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={SuperTokens.getInstanceOrThrow().useShadowDom}
                defaultStore={defaultTranslationsWebauthn}>
                <ContinueWithPasskeyTheme
                    {...props}
                    continueWithPasskeyClicked={() => props.setFactorList(props.factorIds)}
                    config={props.recipe.config}
                    continueTo="SIGN_UP"
                    recipeImplementation={props.recipe.webJSRecipe}
                    isPasskeySupported={isPasskeySupported}
                    isLoading={false}
                />
            </FeatureWrapper>
        </AuthComponentWrapper>
    );
};

export default SignInUpFeatureFullPage;
