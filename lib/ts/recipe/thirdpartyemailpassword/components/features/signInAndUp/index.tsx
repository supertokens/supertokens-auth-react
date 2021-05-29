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
import { SignInAndUpTheme } from "../../..";
import FeatureWrapper from "../../../../../components/featureWrapper";
import Recipe from "../../../recipe";

/*
 * Component.
 */

class SignInAndUp extends PureComponent<
    FeatureBaseProps & {
        recipe: Recipe;
    }
> {
    getIsEmbedded = (): boolean => {
        if (this.props.isEmbedded !== undefined) {
            return this.props.isEmbedded;
        }
        return false;
    };

    render = (): JSX.Element => {
        const props = {
            emailPasswordRecipe: this.props.recipe.emailPasswordRecipe,
            thirdPartyRecipe: this.props.recipe.thirdPartyRecipe,
            config: this.props.recipe.config,
            history: this.props.history,
        };

        return (
            <FeatureWrapper useShadowDom={this.props.recipe.config.useShadowDom}>
                <Fragment>
                    {/* No custom theme, use default. */}
                    {this.props.children === undefined && <SignInAndUpTheme {...props} />}
                    {/* Otherwise, custom theme is provided, propagate props. */}
                    {this.props.children && React.cloneElement(this.props.children, props)}
                </Fragment>
            </FeatureWrapper>
        );
    };
}

export default SignInAndUp;
