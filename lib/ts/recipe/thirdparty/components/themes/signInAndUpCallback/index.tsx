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
import { PureComponent } from "react";

import SpinnerIcon from "../../../../../components/assets/spinnerIcon";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { hasFontDefined } from "../../../../../styles/styles";
import { ThemeBase } from "../themeBase";

import type { NormalisedConfig } from "../../../types";

/*
 * Component.
 */
class ThirdPartySignInAndUpCallbackTheme extends PureComponent {
    /*
     * Methods.
     */

    render = (): JSX.Element => {
        return (
            <div data-supertokens="container">
                <div data-supertokens="row">
                    <div data-supertokens="spinner">
                        <SpinnerIcon />
                    </div>
                </div>
            </div>
        );
    };
}

const SignInAndUpCallbackThemeWithOverride = withOverride(
    "ThirdPartySignInAndUpCallbackTheme",
    ThirdPartySignInAndUpCallbackTheme
);

export const SignInAndUpCallbackTheme = (props: { config: NormalisedConfig }) => {
    const hasFont = hasFontDefined(props.config.rootStyle);
    return (
        <ThemeBase
            loadDefaultFont={!hasFont}
            userStyles={[props.config.rootStyle, props.config.signInAndUpFeature.style]}>
            <SignInAndUpCallbackThemeWithOverride />
        </ThemeBase>
    );
};
