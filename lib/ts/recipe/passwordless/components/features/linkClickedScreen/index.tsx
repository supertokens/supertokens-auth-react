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
import { getQueryParams, getURLHash, useOnMountAPICall } from "../../../../../utils";
import Session from "../../../../session/recipe";
import { getLoginAttemptInfo } from "../../../utils";
import { LinkClickedScreen as LinkClickedScreenTheme } from "../../themes/linkClickedScreen";
import { defaultTranslationsPasswordless } from "../../themes/translations";

import type { Awaited } from "../../../../../types";
import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";

type PropType = FeatureBaseProps & { recipe: Recipe; useComponentOverrides: () => ComponentOverrideMap };

const LinkClickedScreen: React.FC<PropType> = (props) => {
    const userContext = useUserContext();
    const [requireUserInteraction, setRequireUserInteraction] = useState<boolean>(false);

    const consumeCodeAtMount = useCallback(async () => {
        const preAuthSessionId = getQueryParams("preAuthSessionId");
        const linkCode = getURLHash();

        if (preAuthSessionId === null || preAuthSessionId.length === 0 || linkCode.length === 0) {
            await SuperTokens.getInstanceOrThrow().redirectToAuth({
                history: props.history,
                queryParams: {
                    error: "signin",
                },
                redirectBack: false,
            });
            return "REDIRECTING";
        }
        const loginAttemptInfo = await props.recipe.recipeImpl.getLoginAttemptInfo({ userContext });

        if (loginAttemptInfo?.preAuthSessionId !== preAuthSessionId) {
            return "REQUIRES_INTERACTION";
        }

        return props.recipe.recipeImpl.consumeCode({
            preAuthSessionId,
            linkCode,
            userContext,
        });
    }, [props.recipe, props.history]);

    const handleConsumeResp = useCallback(
        async (response: Awaited<ReturnType<typeof consumeCodeAtMount>>): Promise<void> => {
            if (response === "REQUIRES_INTERACTION") {
                // We set this here, to make sure it's set after a possible remount
                setRequireUserInteraction(true);
            }

            if (typeof response === "string") {
                // In this case we are already redirecting or showing the continue button
                return;
            }

            if (response.status === "RESTART_FLOW_ERROR") {
                return SuperTokens.getInstanceOrThrow().redirectToAuth({
                    history: props.history,
                    queryParams: {
                        error: "restart_link",
                    },
                    redirectBack: false,
                });
            }

            if (response.status === "OK") {
                const loginAttemptInfo = await getLoginAttemptInfo({
                    recipeImplementation: props.recipe.recipeImpl,
                    userContext,
                });
                await props.recipe.recipeImpl.clearLoginAttemptInfo({
                    userContext,
                });
                return Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                    {
                        rid: props.recipe.config.recipeId,
                        successRedirectContext: {
                            action: "SUCCESS",
                            isNewUser: response.createdNewUser,
                            redirectToPath: loginAttemptInfo?.redirectToPath,
                        },
                    },
                    userContext,
                    props.history
                );
            }
        },
        [props.history, props.recipe]
    );

    const handleConsumeError = useCallback(
        (err) => {
            if (STGeneralError.isThisError(err)) {
                return SuperTokens.getInstanceOrThrow().redirectToAuth({
                    history: props.history,
                    queryParams: {
                        error: "custom",
                        message: err.message,
                    },
                    redirectBack: false,
                });
            } else {
                return SuperTokens.getInstanceOrThrow().redirectToAuth({
                    history: props.history,
                    queryParams: {
                        error: "signin",
                    },
                    redirectBack: false,
                });
            }
        },
        [props.recipe, props.history]
    );
    useOnMountAPICall(consumeCodeAtMount, handleConsumeResp, handleConsumeError);

    const recipeComponentOverrides = props.useComponentOverrides();

    const childProps = {
        recipeImplementation: props.recipe.recipeImpl,
        config: props.recipe.config,
        requireUserInteraction,
        consumeCode: async () => {
            const preAuthSessionId = getQueryParams("preAuthSessionId");
            const linkCode = getURLHash();

            if (preAuthSessionId === null || preAuthSessionId.length === 0 || linkCode.length === 0) {
                // This should never happen, and even if it does the we should be already redirecting
                throw new Error("Called consumeCode withouth link info");
            }

            try {
                const consumeResp = await props.recipe.recipeImpl.consumeCode({
                    preAuthSessionId,
                    linkCode,
                    userContext,
                });
                await handleConsumeResp(consumeResp);
            } catch (err) {
                void handleConsumeError(err);
            }
        },
    };

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={props.recipe.config.useShadowDom}
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
