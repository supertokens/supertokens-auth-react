/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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

import * as React from "react";

import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import SuperTokens from "../../../../../superTokens";
import { getQueryParams } from "../../../../../utils";
import { defaultTranslationsEmailPassword } from "../../../../emailpassword/components/themes/translations";
import RecoverAccountWithToken from "../../themes/recoverAccountWithToken";

import type { RecoverAccountWithTokenProps } from "../../../types";

export const RecoverAccountUsingToken: React.FC<RecoverAccountWithTokenProps> = (props): JSX.Element => {
    const token = getQueryParams("token");
    let userContext;
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    const [error, setError] = React.useState<string>();

    const childProps = {
        config: props.recipe.config,
        error: error,
        onError: (error: string) => setError(error),
        clearError: () => setError(undefined),
        recipeImplementation: props.recipe.webJSRecipe,
        token,
        useComponentOverride: props.useComponentOverrides,
        userContext,
    };
    const recipeComponentOverrides = props.useComponentOverrides();

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper
                useShadowDom={SuperTokens.getInstanceOrThrow().useShadowDom}
                defaultStore={defaultTranslationsEmailPassword}>
                <React.Fragment>
                    {/* No custom theme, use default. */}
                    {props.children === undefined && <RecoverAccountWithToken {...childProps} />}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {props.children &&
                        React.Children.map(props.children, (child) => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, childProps);
                            }

                            return child;
                        })}
                </React.Fragment>
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};
