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
import { ResetPasswordUsingTokenTheme } from "../../..";
import { FeatureBaseProps } from "../../../../../types";

import { getWindowOrThrow } from "../../../../../utils";
import FeatureWrapper from "../../../../../components/featureWrapper";
import Recipe from "../../../recipe";

type PropType = FeatureBaseProps & {
    recipe: Recipe;
};

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

    getIsEmbedded = (): boolean => {
        if (this.props.isEmbedded !== undefined) {
            return this.props.isEmbedded;
        }
        return false;
    };

    render = (): JSX.Element => {
        const enterEmailFormFeature = this.props.recipe.config.resetPasswordUsingTokenFeature.enterEmailForm;

        const submitNewPasswordFormFeature =
            this.props.recipe.config.resetPasswordUsingTokenFeature.submitNewPasswordForm;

        const submitNewPasswordForm = {
            styleFromInit: submitNewPasswordFormFeature.style,
            formFields: submitNewPasswordFormFeature.formFields,
            recipeImplementation: this.props.recipe.recipeImpl,
            config: this.props.recipe.config,
            onSuccess: () => {
                this.props.recipe.config.onHandleEvent({
                    action: "PASSWORD_RESET_SUCCESSFUL",
                });
            },
            onSignInClicked: () => {
                this.props.recipe.redirectToAuthWithoutRedirectToPath("signin", this.props.history);
            },
            token: this.state.token || "",
        };

        const enterEmailForm = {
            styleFromInit: enterEmailFormFeature.style,
            formFields: enterEmailFormFeature.formFields,
            onSuccess: () => {
                this.props.recipe.config.onHandleEvent({
                    action: "RESET_PASSWORD_EMAIL_SENT",
                });
            },
            recipeImplementation: this.props.recipe.recipeImpl,
            config: this.props.recipe.config,
        };

        const props = {
            rawPalette: this.props.recipe.config.palette,
            submitNewPasswordForm: submitNewPasswordForm,
            enterEmailForm: enterEmailForm,
            token: this.state.token,
        };

        return (
            <FeatureWrapper isEmbedded={this.getIsEmbedded()} useShadowDom={this.props.recipe.config.useShadowDom}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {this.props.children === undefined && <ResetPasswordUsingTokenTheme {...props} />}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {this.props.children && React.cloneElement(this.props.children, props)}
                </Fragment>
            </FeatureWrapper>
        );
    };
}

export default ResetPasswordUsingToken;
