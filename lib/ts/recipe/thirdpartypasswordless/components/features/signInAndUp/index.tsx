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
import FeatureWrapper from "../../../../../components/featureWrapper";
import Recipe from "../../../recipe";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import { SignInUpTheme } from "../../themes/signInUp";

type PropType = FeatureBaseProps & {
    recipe: Recipe;
};

class SignInAndUp extends PureComponent<PropType, { status: "LOADING" | "READY" }> {
    getIsEmbedded = (): boolean => {
        if (this.props.isEmbedded !== undefined) {
            return this.props.isEmbedded;
        }
        return false;
    };

    render = (): JSX.Element => {
        const componentOverrides = this.props.recipe.config.override.components;

        const props = {
            passwordlessRecipe: this.props.recipe.passwordlessRecipe,
            thirdPartyRecipe: this.props.recipe.thirdPartyRecipe,
            config: this.props.recipe.config,
            history: this.props.history,
        };

        return (
            <ComponentOverrideContext.Provider value={componentOverrides}>
                <FeatureWrapper useShadowDom={this.props.recipe.config.useShadowDom}>
                    <Fragment>
                        {/* No custom theme, use default. */}
                        {this.props.children === undefined && <SignInUpTheme {...props} />}
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

export default SignInAndUp;
