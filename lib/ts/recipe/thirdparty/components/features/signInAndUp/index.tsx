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
import * as React from "react";
import { PureComponent, Fragment } from "react";
import { SignInAndUpTheme } from "../../..";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette } from "../../../../../styles/styles";
import { FeatureBaseProps } from "../../../../../types";
import { getQueryParams } from "../../../../../utils";
import { getStyles } from "../../../components/themes/styles";
import { ThirdPartySignInAndUpState, RecipeInterface } from "../../../types";
import Recipe from "../../../recipe";
import { getRedirectToPathFromURL } from "../../../../../utils";

type PropType = FeatureBaseProps & { recipe: Recipe };
class SignInAndUp extends PureComponent<PropType, ThirdPartySignInAndUpState> {
    constructor(props: PropType) {
        super(props);

        let error: string | undefined = undefined;
        const errorQueryParam = getQueryParams("error");
        if (errorQueryParam !== null) {
            if (errorQueryParam === "signin") {
                error = "Something went wrong. Please try again";
            } else if (errorQueryParam === "no_email_present") {
                error = "Could not retrieve email. Please try a different method.";
            } else {
                const customError = getQueryParams("message");
                if (customError === null) {
                    error = "Something went wrong. Please try again";
                } else {
                    error = customError;
                }
            }
        }
        this.state = {
            status: "LOADING",
            error,
        };
    }

    getIsEmbedded = (): boolean => {
        if (this.props.isEmbedded !== undefined) {
            return this.props.isEmbedded;
        }
        return false;
    };

    componentDidMount = async (): Promise<void> => {
        const sessionExists = await this.props.recipe.doesSessionExist();
        if (sessionExists) {
            this.props.recipe.config.onHandleEvent({
                action: "SESSION_ALREADY_EXISTS",
            });
            await this.props.recipe.redirect({ action: "SUCCESS", isNewUser: false }, this.props.history);
            return;
        }

        this.setState((oldState) => {
            if (oldState.status !== "LOADING") {
                return oldState;
            }
            return {
                ...oldState,
                status: "READY",
            };
        });
    };

    getModifiedRecipeImplementation = (): RecipeInterface => {
        return {
            ...this.props.recipe.recipeImpl,
            redirectToThirdPartyLogin: (input) => {
                input = {
                    ...input,
                    state: {
                        ...input.state,
                        redirectToPath: getRedirectToPathFromURL(),
                    },
                };
                return this.props.recipe.recipeImpl.redirectToThirdPartyLogin(input);
            },
        };
    };

    render = (): JSX.Element => {
        if (this.state.status === "LOADING") {
            return <Fragment />;
        }

        const signInAndUpFeature = this.props.recipe.config.signInAndUpFeature;

        const providers = signInAndUpFeature.providers.map((provider) => ({
            id: provider.id,
            buttonComponent: provider.getButton(),
        }));

        const props = {
            error: this.state.error,
            providers: providers,
            recipeImplementation: this.getModifiedRecipeImplementation(),
            config: this.props.recipe.config,
            privacyPolicyLink: signInAndUpFeature.privacyPolicyLink,
            termsOfServiceLink: signInAndUpFeature.termsOfServiceLink,
        };

        return (
            <FeatureWrapper useShadowDom={this.props.recipe.config.useShadowDom} isEmbedded={this.getIsEmbedded()}>
                <StyleProvider
                    rawPalette={this.props.recipe.config.palette}
                    defaultPalette={defaultPalette}
                    styleFromInit={signInAndUpFeature.style}
                    getDefaultStyles={getStyles}>
                    <Fragment>
                        {/* No custom theme, use default. */}
                        {this.props.children === undefined && <SignInAndUpTheme {...props} />}

                        {/* Otherwise, custom theme is provided, propagate props. */}
                        {this.props.children && React.cloneElement(this.props.children, props)}
                    </Fragment>
                </StyleProvider>
            </FeatureWrapper>
        );
    };
}

export default SignInAndUp;
