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
import SignInAndUpTheme from "../../themes/signInAndUp";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette } from "../../../../../styles/styles";
import { FeatureBaseProps } from "../../../../../types";
import { getQueryParams } from "../../../../../utils";
import { getStyles } from "../../../components/themes/styles";
import { ThirdPartySignInAndUpState, RecipeInterface } from "../../../types";
import Recipe from "../../../recipe";
import { getRedirectToPathFromURL } from "../../../../../utils";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import { defaultTranslationsThirdParty } from "../../themes/translations";

type PropType = FeatureBaseProps & { recipe: Recipe };
class SignInAndUp extends PureComponent<PropType, ThirdPartySignInAndUpState> {
    constructor(props: PropType) {
        super(props);

        let error: string | undefined = undefined;
        const errorQueryParam = getQueryParams("error");
        if (errorQueryParam !== null) {
            if (errorQueryParam === "signin") {
                error = "SOMETHING_WENT_WRONG_ERROR";
            } else if (errorQueryParam === "no_email_present") {
                error = "THIRD_PARTY_ERROR_NO_EMAIL";
            } else {
                const customError = getQueryParams("message");
                if (customError === null) {
                    error = "SOMETHING_WENT_WRONG_ERROR";
                } else {
                    error = customError;
                }
            }
        }
        this.state = {
            error,
        };
    }

    getIsEmbedded = (): boolean => {
        if (this.props.isEmbedded !== undefined) {
            return this.props.isEmbedded;
        }
        return false;
    };

    modifiedRecipeImplementation: RecipeInterface = {
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

    render = (): JSX.Element => {
        const componentOverrides = this.props.recipe.config.override.components;

        const signInAndUpFeature = this.props.recipe.config.signInAndUpFeature;

        const providers = signInAndUpFeature.providers.map((provider) => ({
            id: provider.id,
            buttonComponent: provider.getButton(),
        }));

        const props = {
            error: this.state.error,
            providers: providers,
            recipeImplementation: this.modifiedRecipeImplementation,
            config: this.props.recipe.config,
        };

        return (
            <ComponentOverrideContext.Provider value={componentOverrides}>
                <FeatureWrapper
                    useShadowDom={this.props.recipe.config.useShadowDom}
                    isEmbedded={this.getIsEmbedded()}
                    defaultStore={defaultTranslationsThirdParty}>
                    <StyleProvider
                        rawPalette={this.props.recipe.config.palette}
                        defaultPalette={defaultPalette}
                        styleFromInit={signInAndUpFeature.style}
                        rootStyleFromInit={this.props.recipe.config.rootStyle}
                        getDefaultStyles={getStyles}>
                        <Fragment>
                            {/* No custom theme, use default. */}
                            {this.props.children === undefined && <SignInAndUpTheme {...props} />}

                            {/* Otherwise, custom theme is provided, propagate props. */}
                            {this.props.children &&
                                React.Children.map(this.props.children, (child) => {
                                    if (React.isValidElement(child)) {
                                        return React.cloneElement(child, props);
                                    }

                                    return child;
                                })}
                        </Fragment>
                    </StyleProvider>
                </FeatureWrapper>
            </ComponentOverrideContext.Provider>
        );
    };
}

export default SignInAndUp;
