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
import SpinnerIcon from "../../../../../components/assets/spinnerIcon";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import SuperTokens from "../../../../../superTokens";
import { ThemeBase } from "../themeBase";

import type { NormalisedConfig } from "../../../types";

const MultitenancyDynamicLoginMethodsSpinnerTheme: React.FC = () => {
    return (
        <div data-supertokens="container delayedRender">
            <div data-supertokens="row">
                <div data-supertokens="spinner delayedRender">
                    <SpinnerIcon />
                </div>
            </div>
        </div>
    );
};

const DynamicLoginMethodsSpinnerThemeWithOverride = withOverride(
    "MultitenancyDynamicLoginMethodsSpinnerTheme",
    MultitenancyDynamicLoginMethodsSpinnerTheme
);

export const DynamicLoginMethodsSpinnerTheme = (props: { config: NormalisedConfig }) => {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;

    return (
        <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle]}>
            <DynamicLoginMethodsSpinnerThemeWithOverride />
        </ThemeBase>
    );
};
