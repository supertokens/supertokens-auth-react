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

import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import UI from "../../../../../ui";
import { useUserContext } from "../../../../../usercontext";
import { getQueryParams, useRethrowInRender } from "../../../../../utils";
import { SessionContext } from "../../../../session";
import OAuth2Provider from "../../../recipe";
import { OAuth2LogoutScreenTheme } from "../../themes/oauth2LogoutScreen";
import { defaultTranslationsOAuth2Provider } from "../../themes/translations";

import type { FeatureBaseProps, UserContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";

type Prop = FeatureBaseProps<{
    recipe: Recipe;
    userContext?: UserContext;
    useComponentOverrides: () => ComponentOverrideMap;
}>;

export const OAuth2LogoutScreen: React.FC<Prop> = (props) => {
    const rethrowInRender = useRethrowInRender();
    const sessionContext = React.useContext(SessionContext);
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);
    const recipeComponentOverrides = props.useComponentOverrides();
    let userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }

    const logoutChallenge = getQueryParams("logoutChallenge") ?? undefined;
    const navigate = props.navigate ?? UI.getReactRouterDomWithCustomHistory()?.useHistoryCustom();

    const onLogout = React.useCallback(async () => {
        if (logoutChallenge === undefined) {
            return;
        }
        setIsLoggingOut(true);
        try {
            const { frontendRedirectTo } = await OAuth2Provider.getInstanceOrThrow().webJSRecipe.logOut({
                logoutChallenge,
                userContext,
            });
            await props.recipe.redirect(
                {
                    recipeId: "oauth2provider",
                    action: "POST_OAUTH2_LOGOUT_REDIRECT",
                    frontendRedirectTo,
                },
                navigate,
                {},
                userContext
            );
        } catch (err: any) {
            rethrowInRender(err);
        }
    }, [logoutChallenge, navigate, props.recipe, userContext, rethrowInRender]);

    React.useEffect(() => {
        // Redirect to the auth page if there is no logoutChallenge
        if (logoutChallenge === undefined) {
            void SuperTokens.getInstanceOrThrow().redirectToAuth({
                userContext,
                redirectBack: false,
            });
        }

        // Call logOut directly if there is no session
        if (sessionContext.loading === false && sessionContext.doesSessionExist === false) {
            void onLogout();
        }
    }, [userContext, logoutChallenge, sessionContext, onLogout]);

    const childProps = {
        config: props.recipe.config,
        showSpinner: sessionContext.loading || sessionContext.doesSessionExist === false,
        onLogoutClicked: onLogout,
        isLoggingOut,
    };

    if (logoutChallenge === undefined) {
        return null;
    }

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={SuperTokens.getInstanceOrThrow().useShadowDom}
                defaultStore={defaultTranslationsOAuth2Provider}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {props.children === undefined && <OAuth2LogoutScreenTheme {...childProps} />}
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

export default OAuth2LogoutScreen;
