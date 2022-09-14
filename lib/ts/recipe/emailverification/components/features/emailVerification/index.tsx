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
import { clearQueryParams, getQueryParams, useOnMountAPICall } from "../../../../../utils";
import { EmailVerificationTheme } from "../../themes/emailVerification";
import { FeatureBaseProps } from "../../../../../types";
import FeatureWrapper from "../../../../../components/featureWrapper";
import Recipe from "../../../recipe";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import { SessionContext } from "../../../../session";
import { defaultTranslationsEmailVerification } from "../../themes/translations";
import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
import { useUserContext } from "../../../../../usercontext";
import Session from "../../../../session/recipe";
import SuperTokens from "../../../../../superTokens";

type Prop = FeatureBaseProps & { recipe: Recipe; userContext?: any };

export const EmailVerification: React.FC<Prop> = (props) => {
    const sessionContext = useContext(SessionContext);
    const [status, setStatus] = useState("LOADING");
    const userContext = useUserContext();

    const modifiedRecipeImplementation = useMemo<RecipeInterface>(
        () => ({
            ...props.recipe.recipeImpl,
            sendVerificationEmail: async (input) => {
                const response = await props.recipe.recipeImpl.sendVerificationEmail(input);
                clearQueryParams(["token"]);
                return response;
            },
        }),
        [props.recipe]
    );

    const onSuccess = useCallback(async () => {
        return Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
            undefined,
            userContext,
            props.history
        );
    }, [props.recipe, props.history, userContext]);

    const fetchIsEmailVerified = useCallback(async () => {
        if (sessionContext.loading === true) {
            // This callback should only be called if the session is already loaded
            throw new Error("Should never come here");
        }
        const token = getQueryParams("token") ?? undefined;
        if (token === undefined) {
            if (!sessionContext.doesSessionExist) {
                await SuperTokens.getInstanceOrThrow().redirectToAuth({
                    history: props.history,
                    redirectBack: false,
                });
            } else {
                // we check if the email is already verified, and if it is, then we redirect the user
                return (await props.recipe.recipeImpl.isEmailVerified({ userContext })).isVerified;
            }
        }
        return false;
    }, [props.recipe, sessionContext]);

    const checkIsEmailVerified = useCallback(
        async (isVerified: boolean): Promise<void> => {
            if (isVerified) {
                return onSuccess();
            }
            setStatus("READY");
        },
        [props.recipe, setStatus, onSuccess]
    );
    useOnMountAPICall(fetchIsEmailVerified, checkIsEmailVerified, undefined, sessionContext.loading === false);

    const signOut = useCallback(async (): Promise<void> => {
        const session = Session.getInstanceOrThrow();
        await session.signOut(props.userContext);
        return SuperTokens.getInstanceOrThrow().redirectToAuth({
            history: props.history,
            redirectBack: false,
        });
    }, [props.recipe]);

    const onTokenInvalidRedirect = useCallback(
        () =>
            SuperTokens.getInstanceOrThrow().redirectToAuth({
                history: props.history,
                redirectBack: false,
            }),
        [props.recipe, props.history]
    );

    if (status === "LOADING") {
        return <Fragment />;
    }

    const componentOverrides = props.recipe.config.override.components;

    const sendVerifyEmailScreenFeature = props.recipe.config.sendVerifyEmailScreen;

    const sendVerifyEmailScreen = {
        styleFromInit: sendVerifyEmailScreenFeature.style,
        recipeImplementation: modifiedRecipeImplementation,
        config: props.recipe.config,
        signOut: signOut,
        onEmailAlreadyVerified: onSuccess,
    };

    const verifyEmailLinkClickedScreenFeature = props.recipe.config.verifyEmailLinkClickedScreen;
    const token = getQueryParams("token") ?? undefined;

    const verifyEmailLinkClickedScreen =
        token === undefined
            ? undefined
            : {
                  styleFromInit: verifyEmailLinkClickedScreenFeature.style,
                  onTokenInvalidRedirect: onTokenInvalidRedirect,
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
        <ComponentOverrideContext.Provider value={componentOverrides}>
            <FeatureWrapper
                useShadowDom={props.recipe.config.useShadowDom}
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
