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
import { Fragment, useCallback, useState } from "react";

import { FeatureBaseProps } from "../../../../../types";
import { getQueryParams, getURLHash, useOnMountAPICall } from "../../../../../utils";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette } from "../../../../../styles/styles";
import { getStyles } from "../../themes/styles";
import { Awaited } from "../../../../../types";
import { LinkClickedScreen as LinkClickedScreenTheme } from "../../themes/linkClickedScreen";
import Recipe from "../../../recipe";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import { defaultTranslationsPasswordless } from "../../themes/translations";
import { useUserContext } from "../../../../../usercontext";
import { getLoginAttemptInfo } from "../../../utils";
import STGeneralError from "supertokens-web-js/utils/error";

type PropType = FeatureBaseProps & { recipe: Recipe };

const LinkClickedScreen: React.FC<PropType> = (props) => {
    const userContext = useUserContext();
    const [requireUserInteraction, setRequireUserInteraction] = useState<boolean>(false);

    const consumeCodeAtMount = useCallback(async () => {
        const preAuthSessionId = getQueryParams("preAuthSessionId");
        const linkCode = getURLHash();

        if (preAuthSessionId === null || preAuthSessionId.length === 0 || linkCode.length === 0) {
            await props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                error: "signin",
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
                return props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                    error: "restart_link",
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
                return props.recipe.redirect(
                    {
                        action: "SUCCESS",
                        isNewUser: response.createdUser,
                        redirectToPath: loginAttemptInfo?.redirectToPath,
                    },
                    props.history
                );
            }
        },
        [props.history, props.recipe]
    );

    const handleConsumeError = useCallback(
        (err) => {
            if (STGeneralError.isThisError(err)) {
                return props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                    error: "custom",
                    message: err.message,
                });
            } else {
                return props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                    error: "restart_link",
                });
            }
        },
        [props.recipe, props.history]
    );
    useOnMountAPICall(consumeCodeAtMount, handleConsumeResp, handleConsumeError);

    const componentOverrides = props.recipe.config.override.components;

    const linkClickedScreen = props.recipe.config.linkClickedScreenFeature;

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
        <ComponentOverrideContext.Provider value={componentOverrides}>
            <FeatureWrapper
                useShadowDom={props.recipe.config.useShadowDom}
                defaultStore={defaultTranslationsPasswordless}>
                <StyleProvider
                    rawPalette={props.recipe.config.palette}
                    defaultPalette={defaultPalette}
                    styleFromInit={linkClickedScreen.style}
                    rootStyleFromInit={props.recipe.config.rootStyle}
                    getDefaultStyles={getStyles}>
                    <Fragment>
                        {/* No custom theme, use default. */}
                        {props.children === undefined && <LinkClickedScreenTheme {...childProps} />}

                        {/* Otherwise, custom theme is provided, propagate props. */}
                        {props.children}
                    </Fragment>
                </StyleProvider>
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};

export default LinkClickedScreen;
