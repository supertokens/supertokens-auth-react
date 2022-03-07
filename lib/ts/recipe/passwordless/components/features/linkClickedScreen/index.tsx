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
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Fragment } from "react";

import { FeatureBaseProps } from "../../../../../types";
import { getQueryParams, getURLHash } from "../../../../../utils";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette } from "../../../../../styles/styles";
import { getStyles } from "../../themes/styles";
import { LinkClickedScreen as LinkClickedScreenTheme } from "../../themes/linkClickedScreen";
import Recipe from "../../../recipe";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import { defaultTranslationsPasswordless } from "../../themes/translations";
import { useEffect } from "react";
import { useUserContext } from "../../../../../usercontext";

type PropType = FeatureBaseProps & { recipe: Recipe };

const LinkClickedScreen: React.FC<PropType> = (props) => {
    const userContext = useUserContext();

    useEffect(() => {
        const abortController = new AbortController();
        async function onLoad() {
            try {
                const preAuthSessionId = getQueryParams("preAuthSessionId");
                const linkCode = getURLHash();

                if (preAuthSessionId === null || preAuthSessionId.length === 0 || linkCode.length === 0) {
                    return props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                        error: "signin",
                    });
                }

                const response = await props.recipe.recipeImpl.consumeCode({
                    preAuthSessionId,
                    linkCode,
                    config: props.recipe.config,
                    userContext,
                });
                if (abortController.signal.aborted) {
                    return;
                }

                if (response.status === "GENERAL_ERROR") {
                    return props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                        error: "custom",
                        message: response.message,
                    });
                }

                if (response.status === "RESTART_FLOW_ERROR") {
                    return props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                        error: "restart_link",
                    });
                }
                if (response.status === "OK") {
                    const loginAttemptInfo = await props.recipe.recipeImpl.getLoginAttemptInfo();
                    await props.recipe.recipeImpl.clearLoginAttemptInfo();
                    return props.recipe.redirect(
                        {
                            action: "SUCCESS",
                            isNewUser: response.createdUser,
                            redirectToPath: loginAttemptInfo?.redirectToPath,
                        },
                        props.history
                    );
                }
            } catch (err) {
                return props.recipe.redirectToAuthWithoutRedirectToPath(undefined, props.history, {
                    error: "signin",
                });
            }
        }
        void onLoad();
        return () => {
            abortController.abort();
        };
    }, [props.recipe, userContext]);

    const componentOverrides = props.recipe.config.override.components;

    const linkClickedScreen = props.recipe.config.linkClickedScreenFeature;

    const childProps = {
        recipeImplementation: props.recipe.recipeImpl,
        config: props.recipe.config,
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
