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
import { FeatureBaseProps } from "../../../../../types";
import { NormalisedThirdPartyEmailPasswordConfig } from "../../../types";
import SuperTokens from "../../../../../superTokens";
import AuthRecipeModule from "../../../../authRecipeModule";
import {
    SignInAndUpTheme,
    ThirdPartyEmailPasswordGetRedirectionURLContext,
    ThirdPartyEmailPasswordOnHandleEventContext,
    ThirdPartyEmailPasswordPreAPIHookContext,
} from "../../..";
import { NormalisedAuthRecipeConfig } from "../../../../authRecipeModule/types";
import FeatureWrapper from "../../../../../components/featureWrapper";

/*
 * Component.
 */

class SignInAndUp extends PureComponent<FeatureBaseProps> {
    getRecipeInstanceOrThrow = (): AuthRecipeModule<
        ThirdPartyEmailPasswordGetRedirectionURLContext,
        ThirdPartyEmailPasswordPreAPIHookContext,
        ThirdPartyEmailPasswordOnHandleEventContext,
        NormalisedThirdPartyEmailPasswordConfig
    > => {
        if (this.props.recipeId === undefined) {
            throw new Error("No recipeId props given to SignInAndUp component");
        }

        const recipe = SuperTokens.getInstanceOrThrow().getRecipeOrThrow(this.props.recipeId);
        if (recipe instanceof AuthRecipeModule === false) {
            throw new Error(`${recipe.recipeId} must be an instance of AuthRecipeModule to use SignInAndUp component.`);
        }

        return recipe as AuthRecipeModule<
            ThirdPartyEmailPasswordGetRedirectionURLContext,
            ThirdPartyEmailPasswordPreAPIHookContext,
            ThirdPartyEmailPasswordOnHandleEventContext,
            NormalisedThirdPartyEmailPasswordConfig
        >;
    };

    getRecipeConfigOrThrow = (): NormalisedThirdPartyEmailPasswordConfig & NormalisedAuthRecipeConfig => {
        return this.getRecipeInstanceOrThrow().getConfig<
            NormalisedThirdPartyEmailPasswordConfig & NormalisedAuthRecipeConfig
        >();
    };

    getIsEmbedded = (): boolean => {
        if (this.props.isEmbedded !== undefined) {
            return this.props.isEmbedded;
        }
        return false;
    };

    render = (): JSX.Element => {
        /*
         * Render.
         */

        const hideEmailPassword = this.getRecipeConfigOrThrow().disableEmailPassword;
        const hideThirdParty = this.getRecipeConfigOrThrow().signInAndUpFeature.providers.length === 0;
        return (
            <FeatureWrapper useShadowDom={this.getRecipeConfigOrThrow().useShadowDom}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {this.props.children === undefined && (
                        <SignInAndUpTheme
                            rawPalette={this.getRecipeConfigOrThrow().palette}
                            styleFromInit={this.getRecipeConfigOrThrow().signInAndUpFeature.style}
                            hideThirdParty={hideThirdParty}
                            hideEmailPassword={hideEmailPassword}
                            defaultToSignUp={this.getRecipeConfigOrThrow().signInAndUpFeature.defaultToSignUp}
                            history={this.props.history}
                            recipeId={this.getRecipeInstanceOrThrow().recipeId}
                        />
                    )}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {this.props.children &&
                        React.cloneElement(this.props.children, {
                            hideThirdParty,
                            hideEmailPassword,
                            rawPalette: this.getRecipeConfigOrThrow().palette,
                            styleFromInit: this.getRecipeConfigOrThrow().signInAndUpFeature.style,
                            defaultToSignUp: this.getRecipeConfigOrThrow().signInAndUpFeature.defaultToSignUp,
                            history: this.props.history,
                            recipeId: this.getRecipeInstanceOrThrow().recipeId,
                        })}
                </Fragment>
            </FeatureWrapper>
        );
    };
}

export default SignInAndUp;
