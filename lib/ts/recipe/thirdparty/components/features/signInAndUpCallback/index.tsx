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
import { getCurrentNormalisedUrlPath } from "../../../../../utils";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette } from "../../../../../styles/styles";
import { getStyles } from "../../themes/styles";
import {} from "../../../types";
import { SignInAndUpCallbackTheme } from "../../themes/signInAndUpCallback";
import Recipe from "../../../recipe";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";

type PropType = FeatureBaseProps & { recipe: Recipe };

class SignInAndUpCallback extends PureComponent<PropType, unknown> {
    getIsEmbedded = (): boolean => {
        if (this.props.isEmbedded !== undefined) {
            return this.props.isEmbedded;
        }
        return false;
    };

    componentDidMount = async (): Promise<void> => {
        try {
            const pathName = getCurrentNormalisedUrlPath().getAsStringDangerous();
            const providerId = pathName.split("/")[pathName.split("/").length - 1];
            const response = await this.props.recipe.recipeImpl.signInAndUp({
                thirdPartyId: providerId,
                config: this.props.recipe.config,
            });
            if (response.status === "GENERAL_ERROR") {
                return this.props.recipe.redirectToAuthWithoutRedirectToPath(undefined, this.props.history, {
                    error: "signin",
                });
            }
            if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
                return this.props.recipe.redirectToAuthWithoutRedirectToPath(undefined, this.props.history, {
                    error: "no_email_present",
                });
            }
            if (response.status === "FIELD_ERROR") {
                return this.props.recipe.redirectToAuthWithoutRedirectToPath(undefined, this.props.history, {
                    error: "custom",
                    message: response.error,
                });
            }
            if (response.status === "OK") {
                const state = this.props.recipe.recipeImpl.getOAuthState();
                const redirectToPath = state === undefined ? undefined : state.redirectToPath;
                return this.props.recipe.redirect(
                    { action: "SUCCESS", isNewUser: response.createdNewUser, redirectToPath },
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

        const oAuthCallbackScreen = this.props.recipe.config.oAuthCallbackScreen;

        return (
            <ComponentOverrideContext.Provider value={componentOverrides}>
                <FeatureWrapper useShadowDom={this.props.recipe.config.useShadowDom} isEmbedded={this.getIsEmbedded()}>
                    <StyleProvider
                        rawPalette={this.props.recipe.config.palette}
                        defaultPalette={defaultPalette}
                        styleFromInit={oAuthCallbackScreen.style}
                        getDefaultStyles={getStyles}>
                        <Fragment>
                            {/* No custom theme, use default. */}
                            {this.props.children === undefined && <SignInAndUpCallbackTheme />}

                            {/* Otherwise, custom theme is provided, propagate props. */}
                            {this.props.children}
                        </Fragment>
                    </StyleProvider>
                </FeatureWrapper>
            </ComponentOverrideContext.Provider>
        );
    };
}

export default SignInAndUpCallback;
