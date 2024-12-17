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
import { useContext, Fragment } from "react";

import { redirectToAuth } from "../../../../..";
import FeatureWrapper from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import { useUserContext } from "../../../../../usercontext";
import { getQueryParams, getTenantIdFromQueryParams, useRethrowInRender } from "../../../../../utils";
import DynamicLoginMethodsSpinner from "../../../../multitenancy/components/features/dynamicLoginMethodsSpinner";
import { SessionContext, attemptRefreshingSession } from "../../../../session";
import { defaultTranslationsOAuth2Provider } from "../../themes/translations";

import type { FeatureBaseProps, UserContext } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";

type Prop = FeatureBaseProps<{
    recipe: Recipe;
    userContext?: UserContext;
    useComponentOverrides: () => ComponentOverrideMap;
}>;

export const TryRefreshPage: React.FC<Prop> = (props) => {
    const rethrowInRender = useRethrowInRender();
    const sessionContext = useContext(SessionContext);
    const loginChallenge = getQueryParams("loginChallenge") ?? undefined;
    const forceRefresh = getQueryParams("forceRefresh") ?? undefined;
    let userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }

    React.useEffect(() => {
        if (sessionContext.loading === false) {
            (async function () {
                console.log("forceRefresh", forceRefresh);
                if (forceRefresh) {
                    await attemptRefreshingSession();
                }
                console.log("loginChallenge", loginChallenge);
                if (loginChallenge) {
                    const { frontendRedirectTo } = await props.recipe.webJSRecipe.getRedirectURLToContinueOAuthFlow({
                        loginChallenge,
                        userContext,
                    });
                    return props.recipe.redirect(
                        {
                            action: "CONTINUE_OAUTH2_AFTER_REFRESH",
                            frontendRedirectTo,
                            tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                            recipeId: "oauth2provider",
                        },
                        props.navigate,
                        {},
                        userContext
                    );
                } else {
                    await redirectToAuth({
                        redirectBack: false,
                        userContext,
                    });
                }
            })().catch(rethrowInRender);
        }
    }, [loginChallenge, props.recipe, props.navigate, userContext, sessionContext]);

    const childProps = {
        config: props.recipe.config,
    };
    return (
        <FeatureWrapper
            useShadowDom={SuperTokens.getInstanceOrThrow().useShadowDom}
            defaultStore={defaultTranslationsOAuth2Provider}>
            <Fragment>
                {/* No custom theme, use default. */}
                {props.children === undefined && <DynamicLoginMethodsSpinner />}
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
    );
};

export default TryRefreshPage;
