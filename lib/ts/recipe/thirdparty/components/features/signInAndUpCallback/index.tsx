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
import { defaultTranslationsThirdParty } from "../../themes/translations";
import STGeneralError from "supertokens-web-js/lib/build/error";

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
            // TODO NEMI: handle user context for pre built UI
            const response = await this.props.recipe.recipeImpl.signInAndUp({
                thirdPartyId: providerId,
                config: this.props.recipe.config,
                userContext: {},
            });

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
                // TODO NEMI: handle user context for pre built UI
                const stateResponse = this.props.recipe.recipeImpl.getOAuthState({
                    config: this.props.recipe.config,
                    userContext: {},
                });
                const redirectToPath =
                    stateResponse.state === undefined ? undefined : stateResponse.state.redirectToPath;

                if (this.props.recipe.emailVerification.config.mode === "REQUIRED") {
                    let isEmailVerified = true;
                    try {
                        // TODO NEMI: handle user context for pre built UI
                        isEmailVerified = (await this.props.recipe.emailVerification.isEmailVerified({})).isVerified;
                    } catch (ignored) {}
                    if (!isEmailVerified) {
                        await this.props.recipe.savePostEmailVerificationSuccessRedirectState({
                            redirectToPath: redirectToPath,
                            isNewUser: true,
                            action: "SUCCESS",
                        });
                        return this.props.recipe.emailVerification.redirect(
                            {
                                action: "VERIFY_EMAIL",
                            },
                            this.props.history
                        );
                    }
                }
                return this.props.recipe.redirect(
                    { action: "SUCCESS", isNewUser: response.createdNewUser, redirectToPath },
                    this.props.history
                );
            }
        } catch (err) {
            if (STGeneralError.isThisError(err)) {
                return this.props.recipe.redirectToAuthWithoutRedirectToPath(undefined, this.props.history, {
                    error: "signin",
                });
            }

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
                <FeatureWrapper
                    useShadowDom={this.props.recipe.config.useShadowDom}
                    isEmbedded={this.getIsEmbedded()}
                    defaultStore={defaultTranslationsThirdParty}>
                    <StyleProvider
                        rawPalette={this.props.recipe.config.palette}
                        defaultPalette={defaultPalette}
                        styleFromInit={oAuthCallbackScreen.style}
                        rootStyleFromInit={this.props.recipe.config.rootStyle}
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
