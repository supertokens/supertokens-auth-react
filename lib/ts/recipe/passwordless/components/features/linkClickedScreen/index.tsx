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
import { Fragment, PureComponent } from "react";

import { FeatureBaseProps } from "../../../../../types";
import { getQueryParams, getURLHash } from "../../../../../utils";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette } from "../../../../../styles/styles";
import { getStyles } from "../../themes/styles";
import {} from "../../../types";
import { LinkClickedScreen as LinkClickedScreenTheme } from "../../themes/linkClickedScreen";
import Recipe from "../../../recipe";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import { defaultTranslationsPasswordless } from "../../../translations";

type PropType = FeatureBaseProps & { recipe: Recipe };

class LinkClickedScreen extends PureComponent<PropType, unknown> {
    getIsEmbedded = (): boolean => {
        if (this.props.isEmbedded !== undefined) {
            return this.props.isEmbedded;
        }
        return false;
    };

    componentDidMount = async (): Promise<void> => {
        try {
            const preAuthSessionId = getQueryParams("preAuthSessionId");
            const linkCode = getURLHash();

            if (preAuthSessionId === null || preAuthSessionId.length === 0 || linkCode.length === 0) {
                return this.props.recipe.redirectToAuthWithoutRedirectToPath(undefined, this.props.history, {
                    error: "signin",
                });
            }

            const response = await this.props.recipe.recipeImpl.consumeCode({
                preAuthSessionId,
                linkCode,
                config: this.props.recipe.config,
            });

            if (response.status === "GENERAL_ERROR") {
                return this.props.recipe.redirectToAuthWithoutRedirectToPath(undefined, this.props.history, {
                    error: "custom",
                    message: response.message,
                });
            }

            if (response.status === "RESTART_FLOW_ERROR") {
                return this.props.recipe.redirectToAuthWithoutRedirectToPath(undefined, this.props.history, {
                    error: "restart_link",
                });
            }
            if (response.status === "OK") {
                const loginAttemptInfo = await this.props.recipe.recipeImpl.getLoginAttemptInfo();
                await this.props.recipe.recipeImpl.clearLoginAttemptInfo();
                return this.props.recipe.redirect(
                    {
                        action: "SUCCESS",
                        isNewUser: response.createdUser,
                        redirectToPath: loginAttemptInfo?.redirectToPath,
                    },
                    this.props.history
                );
            }
        } catch (err) {
            return this.props.recipe.redirectToAuthWithoutRedirectToPath(undefined, this.props.history, {
                error: "signin",
            });
        }
    };

    render = (): JSX.Element => {
        const componentOverrides = this.props.recipe.config.override.components;

        const linkClickedScreen = this.props.recipe.config.linkClickedScreenFeature;

        const props = {
            recipeImplementation: this.props.recipe.recipeImpl,
            config: this.props.recipe.config,
        };

        return (
            <ComponentOverrideContext.Provider value={componentOverrides}>
                <FeatureWrapper
                    useShadowDom={this.props.recipe.config.useShadowDom}
                    isEmbedded={this.getIsEmbedded()}
                    defaultStore={defaultTranslationsPasswordless}>
                    <StyleProvider
                        rawPalette={this.props.recipe.config.palette}
                        defaultPalette={defaultPalette}
                        styleFromInit={linkClickedScreen.style}
                        rootStyleFromInit={this.props.recipe.config.rootStyle}
                        getDefaultStyles={getStyles}>
                        <Fragment>
                            {/* No custom theme, use default. */}
                            {this.props.children === undefined && <LinkClickedScreenTheme {...props} />}

                            {/* Otherwise, custom theme is provided, propagate props. */}
                            {this.props.children}
                        </Fragment>
                    </StyleProvider>
                </FeatureWrapper>
            </ComponentOverrideContext.Provider>
        );
    };
}

export default LinkClickedScreen;
