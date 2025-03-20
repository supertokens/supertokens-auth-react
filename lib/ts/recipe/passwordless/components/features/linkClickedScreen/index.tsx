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
import React from "react";
import { Fragment, useCallback, useState } from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import { useUserContext } from "../../../../../usercontext";
import {
    getQueryParams,
    getTenantIdFromQueryParams,
    getURLHash,
    useOnMountAPICall,
    useRethrowInRender,
} from "../../../../../utils";
import Session from "../../../../session/recipe";
import { LinkClickedScreen as LinkClickedScreenTheme } from "../../themes/linkClickedScreen";
import { defaultTranslationsPasswordless } from "../../themes/translations";

import type { Awaited, UserContext } from "../../../../../types";
import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { AdditionalLoginAttemptInfoProperties, ComponentOverrideMap } from "../../../types";

type PropType = FeatureBaseProps<{
    recipe: Recipe;
    userContext?: UserContext;
    useComponentOverrides: () => ComponentOverrideMap;
}>;

const LinkClickedScreen: React.FC<PropType> = (props) => {
    const rethrowInRender = useRethrowInRender();
    let userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    const [requireUserInteraction, setRequireUserInteraction] = useState<boolean>(false);

    const consumeCodeAtMount = useCallback(async () => {
        const preAuthSessionId = getQueryParams("preAuthSessionId");
        const linkCode = getURLHash();

        if (preAuthSessionId === null || preAuthSessionId.length === 0 || linkCode.length === 0) {
            await SuperTokens.getInstanceOrThrow().redirectToAuth({
                navigate: props.navigate,
                queryParams: {
                    error: "signin",
                },
                redirectBack: false,
                userContext,
            });
            return "REDIRECTING";
        }
        const loginAttemptInfo = await props.recipe.webJSRecipe.getLoginAttemptInfo({ userContext });

        if (loginAttemptInfo?.preAuthSessionId !== preAuthSessionId) {
            return "REQUIRES_INTERACTION";
        }
        let payloadBeforeCall;
        try {
            payloadBeforeCall = await Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                userContext: userContext,
            });
        } catch {
            // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
            payloadBeforeCall = undefined;
        }

        return {
            payloadBeforeCall,
            response: await props.recipe.webJSRecipe.consumeCode({
                userContext,
            }),
        };
    }, [props.recipe, props.navigate, userContext]);

    const handleConsumeResp = useCallback(
        async (consumeRes: Awaited<ReturnType<typeof consumeCodeAtMount>>): Promise<void> => {
            if (consumeRes === "REQUIRES_INTERACTION") {
                // We set this here, to make sure it's set after a possible remount
                setRequireUserInteraction(true);
            }

            if (typeof consumeRes === "string") {
                // In this case we are already redirecting or showing the continue button
                return;
            }
            const { response, payloadBeforeCall } = consumeRes;

            if (response.status === "RESTART_FLOW_ERROR") {
                return SuperTokens.getInstanceOrThrow().redirectToAuth({
                    navigate: props.navigate,
                    queryParams: {
                        error: "restart_link",
                    },
                    redirectBack: false,
                    userContext,
                });
            }

            if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
                return SuperTokens.getInstanceOrThrow().redirectToAuth({
                    navigate: props.navigate,
                    queryParams: {
                        error: response.reason,
                    },
                    redirectBack: false,
                    userContext,
                });
            }

            if (response.status === "OK") {
                let payloadAfterCall;
                try {
                    payloadAfterCall = await Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                        userContext,
                    });
                } catch {
                    payloadAfterCall = undefined;
                }

                const loginAttemptInfo =
                    await props.recipe.webJSRecipe.getLoginAttemptInfo<AdditionalLoginAttemptInfoProperties>({
                        userContext,
                    });
                await props.recipe.webJSRecipe.clearLoginAttemptInfo({
                    userContext,
                });
                return Session.getInstanceOrThrow()
                    .validateGlobalClaimsAndHandleSuccessRedirection(
                        {
                            action: "SUCCESS",
                            createdNewUser: response.createdNewRecipeUser && response.user.loginMethods.length === 1,
                            isNewRecipeUser: response.createdNewRecipeUser,
                            newSessionCreated:
                                payloadAfterCall !== undefined &&
                                (payloadBeforeCall === undefined ||
                                    payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                            recipeId: props.recipe.recipeID,
                            tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                        },
                        props.recipe.recipeID,
                        loginAttemptInfo?.redirectToPath,
                        userContext,
                        props.navigate
                    )
                    .catch(rethrowInRender);
            }
        },
        [props.navigate, props.recipe, userContext]
    );

    const handleConsumeError = useCallback(
        (err: any) => {
            if (STGeneralError.isThisError(err)) {
                return SuperTokens.getInstanceOrThrow().redirectToAuth({
                    navigate: props.navigate,
                    queryParams: {
                        error: "custom",
                        message: err.message,
                    },
                    redirectBack: false,
                    userContext,
                });
            } else {
                return SuperTokens.getInstanceOrThrow().redirectToAuth({
                    navigate: props.navigate,
                    queryParams: {
                        error: "signin",
                    },
                    redirectBack: false,
                    userContext,
                });
            }
        },
        [props.navigate, userContext]
    );
    useOnMountAPICall(consumeCodeAtMount, handleConsumeResp, handleConsumeError);

    const recipeComponentOverrides = props.useComponentOverrides();

    const childProps = {
        recipeImplementation: props.recipe.webJSRecipe,
        config: props.recipe.config,
        requireUserInteraction,
        consumeCode: async () => {
            try {
                let payloadBeforeCall;
                try {
                    payloadBeforeCall = await Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                        userContext: userContext,
                    });
                } catch {
                    // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                    payloadBeforeCall = undefined;
                }

                const consumeResp = await props.recipe.webJSRecipe.consumeCode({
                    userContext,
                });
                await handleConsumeResp({ response: consumeResp, payloadBeforeCall });
            } catch (err) {
                void handleConsumeError(err);
            }
        },
    };

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={SuperTokens.getInstanceOrThrow().useShadowDom}
                defaultStore={defaultTranslationsPasswordless}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {props.children === undefined && <LinkClickedScreenTheme {...childProps} />}

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

export default LinkClickedScreen;
