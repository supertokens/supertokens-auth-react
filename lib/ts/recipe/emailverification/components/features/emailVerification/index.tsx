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
import { useContext, useState, useMemo, useCallback, Fragment } from "react";

import { redirectToAuth } from "../../../../..";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import { useUserContext } from "../../../../../usercontext";
import { clearQueryParams, getQueryParams, useOnMountAPICall, useRethrowInRender } from "../../../../../utils";
import { SessionContext } from "../../../../session";
import Session from "../../../../session/recipe";
import EmailVerificationTheme from "../../themes/emailVerification";
import { defaultTranslationsEmailVerification } from "../../themes/translations";

import type { FeatureBaseProps, UserContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailverification";

type Prop = FeatureBaseProps<{
    recipe: Recipe;
    userContext?: UserContext;
    useComponentOverrides: () => ComponentOverrideMap;
}>;

export const EmailVerification: React.FC<Prop> = (props) => {
    const sessionContext = useContext(SessionContext);
    const [status, setStatus] = useState("LOADING");
    const rethrowInRender = useRethrowInRender();
    const recipeComponentOverrides = props.useComponentOverrides();
    let userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }

    const redirectToAuthWithHistory = useCallback(async () => {
        await redirectToAuth({ redirectBack: false, navigate: props.navigate });
    }, [props.navigate]);

    const modifiedRecipeImplementation = useMemo<RecipeInterface>(
        () => ({
            ...props.recipe.webJSRecipe,
            sendVerificationEmail: async (input) => {
                const response = await props.recipe.webJSRecipe.sendVerificationEmail(input);
                clearQueryParams(["token"]);
                return response;
            },
        }),
        [props.recipe]
    );

    const onSuccess = useCallback(async () => {
        return Session.getInstanceOrThrow()
            .validateGlobalClaimsAndHandleSuccessRedirection(
                undefined,
                props.recipe.recipeID,
                undefined,
                userContext,
                props.navigate
            )
            .catch(rethrowInRender);
    }, [props.recipe, props.navigate, userContext]);

    const fetchIsEmailVerified = useCallback(async () => {
        if (sessionContext.loading === true) {
            // This callback should only be called if the session is already loaded
            throw new Error("Should never come here");
        }
        const token = getQueryParams("token") ?? undefined;
        if (token === undefined) {
            if (!sessionContext.doesSessionExist) {
                await redirectToAuthWithHistory();
            } else {
                // we check if the email is already verified, and if it is, then we redirect the user
                return (await props.recipe.webJSRecipe.isEmailVerified({ userContext })).isVerified;
            }
        }
        return false;
    }, [props.recipe, sessionContext, redirectToAuthWithHistory]);

    const checkIsEmailVerified = useCallback(
        async (isVerified: boolean): Promise<void> => {
            if (isVerified) {
                return onSuccess();
            }
            setStatus("READY");
        },
        [props.recipe, setStatus, onSuccess]
    );

    const handleError = useCallback(
        async (err: any) => {
            // TODO: we will not need this after restructuring the emailverification components, since it should be handled by SessionAuth
            // If the error cleared the session we redirect away, otherwise we have no way of handling it.
            if (await Session.getInstanceOrThrow().doesSessionExist({ userContext })) {
                throw err;
            } else {
                await redirectToAuthWithHistory();
            }
        },
        [redirectToAuthWithHistory]
    );

    useOnMountAPICall(fetchIsEmailVerified, checkIsEmailVerified, handleError, sessionContext.loading === false);

    const signOut = useCallback(async (): Promise<void> => {
        const session = Session.getInstanceOrThrow();
        await session.signOut({ userContext });
        return redirectToAuthWithHistory();
    }, [redirectToAuthWithHistory, userContext]);

    if (status === "LOADING") {
        return <Fragment />;
    }

    const sendVerifyEmailScreenFeature = props.recipe.config.sendVerifyEmailScreen;

    const sendVerifyEmailScreen = {
        styleFromInit: sendVerifyEmailScreenFeature.style,
        recipeImplementation: modifiedRecipeImplementation,
        config: props.recipe.config,
        signOut: signOut,
        onEmailAlreadyVerified: onSuccess,
        redirectToAuth: redirectToAuthWithHistory,
    };

    const verifyEmailLinkClickedScreenFeature = props.recipe.config.verifyEmailLinkClickedScreen;
    const token = getQueryParams("token") ?? undefined;

    const verifyEmailLinkClickedScreen =
        token === undefined
            ? undefined
            : {
                  styleFromInit: verifyEmailLinkClickedScreenFeature.style,
                  onTokenInvalidRedirect: redirectToAuthWithHistory,
                  onSuccess,
                  recipeImplementation: modifiedRecipeImplementation,
                  config: props.recipe.config,
                  token,
              };

    const childProps = {
        config: props.recipe.config,
        sendVerifyEmailScreen: sendVerifyEmailScreen,
        verifyEmailLinkClickedScreen,
        hasToken: token !== undefined,
    };
    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={SuperTokens.getInstanceOrThrow().useShadowDom}
                defaultStore={defaultTranslationsEmailVerification}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {props.children === undefined && <EmailVerificationTheme {...childProps} />}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {props.children &&
                        React.Children.map(props.children, (child) => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, childProps);
                            }

                            return child;
                        })}
                </Fragment>
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};

export default EmailVerification;
