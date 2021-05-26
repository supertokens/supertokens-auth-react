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
import {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAPIHookContext,
    NormalisedConfig,
    RecipeInterface,
} from "../../../types";
import { ResetPasswordUsingTokenTheme } from "../../..";
import { FeatureBaseProps } from "../../../../../types";

import { getWindowOrThrow } from "../../../../../utils";
import FeatureWrapper from "../../../../../components/featureWrapper";
import AuthRecipeModule from "../../../../authRecipeModule";
import SuperTokens from "../../../../../superTokens";

type PropType = FeatureBaseProps & { recipeImplemetation: RecipeInterface };

class ResetPasswordUsingToken extends PureComponent<PropType, { token: string | undefined }> {
    /*
     * Constructor.
     */
    constructor(props: PropType) {
        super(props);

        const urlParams = new URLSearchParams(getWindowOrThrow().location.search);
        const token = urlParams.get("token");
        if (token === null) {
            this.state = { token: undefined };
        } else {
            this.state = {
                token,
            };
        }
    }

    getRecipeInstanceOrThrow = (): AuthRecipeModule<
        GetRedirectionURLContext,
        PreAPIHookContext,
        OnHandleEventContext,
        NormalisedConfig
    > => {
        if (this.props.recipeId === undefined) {
            throw new Error("No recipeId props given to SignInAndUp component");
        }

        const recipe = SuperTokens.getInstanceOrThrow().getRecipeOrThrow(this.props.recipeId);
        if (!(recipe instanceof AuthRecipeModule)) {
            throw new Error(
                `${recipe.config.recipeId} must be an instance of AuthRecipeModule to use SignInAndUp component.`
            );
        }

        return recipe;
    };

    getIsEmbedded = (): boolean => {
        if (this.props.isEmbedded !== undefined) {
            return this.props.isEmbedded;
        }
        return false;
    };

    render = (): JSX.Element => {
        const enterEmailFormFeature =
            this.getRecipeInstanceOrThrow().config.resetPasswordUsingTokenFeature.enterEmailForm;

        const submitNewPasswordFormFeature =
            this.getRecipeInstanceOrThrow().config.resetPasswordUsingTokenFeature.submitNewPasswordForm;

        const submitNewPasswordForm = {
            styleFromInit: submitNewPasswordFormFeature.style,
            formFields: submitNewPasswordFormFeature.formFields,
            recipeImplementation: this.props.recipeImplemetation,
            onSuccess: () => {
                this.getRecipeInstanceOrThrow().config.onHandleEvent({
                    action: "PASSWORD_RESET_SUCCESSFUL",
                });
            },
            onSignInClicked: () => {
                this.getRecipeInstanceOrThrow().redirectToAuthWithoutRedirectToPath("signin", this.props.history);
            },
            token: this.state.token || "",
        };

        const enterEmailForm = {
            styleFromInit: enterEmailFormFeature.style,
            formFields: enterEmailFormFeature.formFields,
            onSuccess: () => {
                this.getRecipeInstanceOrThrow().config.onHandleEvent({
                    action: "RESET_PASSWORD_EMAIL_SENT",
                });
            },
            recipeImplementation: this.props.recipeImplemetation,
        };

        return (
            <FeatureWrapper
                isEmbedded={this.getIsEmbedded()}
                useShadowDom={this.getRecipeInstanceOrThrow().config.useShadowDom}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {this.props.children === undefined && (
                        <ResetPasswordUsingTokenTheme
                            rawPalette={this.getRecipeInstanceOrThrow().config.palette}
                            submitNewPasswordForm={submitNewPasswordForm}
                            enterEmailForm={enterEmailForm}
                            token={this.state.token}
                        />
                    )}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {this.props.children &&
                        React.cloneElement(this.props.children, {
                            rawPalette: this.getRecipeInstanceOrThrow().config.palette,
                            submitNewPasswordForm,
                            enterEmailForm,
                            token: this.state.token,
                        })}
                </Fragment>
            </FeatureWrapper>
        );
    };
}

export default ResetPasswordUsingToken;
