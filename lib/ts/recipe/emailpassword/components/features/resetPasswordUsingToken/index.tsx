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
import ResetPasswordUsingTokenTheme from "../../themes/resetPasswordUsingToken";
import { FeatureBaseProps } from "../../../../../types";

import { getQueryParams } from "../../../../../utils";
import FeatureWrapper from "../../../../../components/featureWrapper";
import Recipe from "../../../recipe";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import { defaultTranslationsEmailPassword } from "../../themes/translations";

type PropType = FeatureBaseProps & {
    recipe: Recipe;
};

class ResetPasswordUsingToken extends PureComponent<PropType, { token: string | undefined }> {
    /*
     * Constructor.
     */
    constructor(props: PropType) {
        super(props);

        const token = getQueryParams("token");
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

        const componentOverrides = this.props.recipe.config.override.components;

        const submitNewPasswordFormFeature =
            this.props.recipe.config.resetPasswordUsingTokenFeature.submitNewPasswordForm;

        const submitNewPasswordForm =
            this.state.token === undefined
                ? undefined
                : {
                      styleFromInit: submitNewPasswordFormFeature.style,
                      formFields: submitNewPasswordFormFeature.formFields,
                      recipeImplementation: this.props.recipe.recipeImpl,
                      config: this.props.recipe.config,
                      onSignInClicked: () => {
                          void this.props.recipe.redirectToAuthWithoutRedirectToPath("signin", this.props.history);
                      },
                      token: this.state.token,
                      recipe: this.props.recipe,
                  };

        const enterEmailForm = {
            recipe: this.props.recipe,
            styleFromInit: enterEmailFormFeature.style,
            formFields: enterEmailFormFeature.formFields,
            recipeImplementation: this.props.recipe.recipeImpl,
            config: this.props.recipe.config,
        };

        const props = {
            recipe: this.props.recipe,
            config: this.props.recipe.config,
            submitNewPasswordForm: submitNewPasswordForm,
            enterEmailForm: enterEmailForm,
        };

        return (
            <ComponentOverrideContext.Provider value={componentOverrides}>
                <FeatureWrapper
                    isEmbedded={this.getIsEmbedded()}
                    useShadowDom={this.props.recipe.config.useShadowDom}
                    defaultStore={defaultTranslationsEmailPassword}>
                    <Fragment>
                        {/* No custom theme, use default. */}
                        {this.props.children === undefined && <ResetPasswordUsingTokenTheme {...props} />}
                        {/* Otherwise, custom theme is provided, propagate props. */}
                        {this.props.children &&
                            React.Children.map(this.props.children, (child) => {
                                if (React.isValidElement(child)) {
                                    return React.cloneElement(child, props);
                                }

                                return child;
                            })}
                    </Fragment>
                </FeatureWrapper>
            </ComponentOverrideContext.Provider>
        );
    };
}

export default ResetPasswordUsingToken;
