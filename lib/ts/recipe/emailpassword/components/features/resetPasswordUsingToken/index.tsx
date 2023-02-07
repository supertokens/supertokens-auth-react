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
import * as React from "react";
import { Fragment } from "react";

import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import { getQueryParams } from "../../../../../utils";
import ResetPasswordUsingTokenTheme from "../../themes/resetPasswordUsingToken";
import { defaultTranslationsEmailPassword } from "../../themes/translations";

import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";

type PropType = FeatureBaseProps & {
    recipe: Recipe;
    useComponentOverrides: () => ComponentOverrideMap;
};

const ResetPasswordUsingToken: React.FC<PropType> = (props) => {
    const token = getQueryParams("token");
    const [error, setError] = React.useState<string>();

    const enterEmailFormFeature = props.recipe.config.resetPasswordUsingTokenFeature.enterEmailForm;

    const submitNewPasswordFormFeature = props.recipe.config.resetPasswordUsingTokenFeature.submitNewPasswordForm;

    const submitNewPasswordForm =
        token === undefined || token === null
            ? undefined
            : {
                  error: error,
                  onError: (error: string) => setError(error),
                  clearError: () => setError(undefined),
                  styleFromInit: submitNewPasswordFormFeature.style,
                  formFields: submitNewPasswordFormFeature.formFields,
                  recipeImplementation: props.recipe.recipeImpl,
                  config: props.recipe.config,
                  onSignInClicked: () => {
                      void SuperTokens.getInstanceOrThrow().redirectToAuth({
                          show: "signin",
                          history: props.history,
                          redirectBack: false,
                      });
                  },
                  token: token,
              };

    const enterEmailForm = {
        onBackButtonClicked: () =>
            SuperTokens.getInstanceOrThrow().redirectToAuth({
                show: "signin",
                history: props.history,
                redirectBack: false,
            }),
        error: error,
        onError: (error: string) => setError(error),
        clearError: () => setError(undefined),
        styleFromInit: enterEmailFormFeature.style,
        formFields: enterEmailFormFeature.formFields,
        recipeImplementation: props.recipe.recipeImpl,
        config: props.recipe.config,
    };

    const childProps = {
        config: props.recipe.config,
        submitNewPasswordForm: submitNewPasswordForm,
        enterEmailForm: enterEmailForm,
    };
    const recipeComponentOverrides = props.useComponentOverrides();

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={props.recipe.config.useShadowDom}
                defaultStore={defaultTranslationsEmailPassword}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {props.children === undefined && <ResetPasswordUsingTokenTheme {...childProps} />}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {props.children &&
                        React.Children.map(props.children, (child) => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, childProps);
                            }

                            return child;
                        })}
                </Fragment>
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};

export default ResetPasswordUsingToken;
