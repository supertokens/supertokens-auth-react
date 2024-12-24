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

import SuperTokens from "../../../../../superTokens";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import { ThemeBase } from "../themeBase";

import type { SignUpThemeProps } from "../../../types";

function SignUpTheme(props: SignUpThemeProps): JSX.Element {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;

    const activeStyle = props.config.signUpFeature.style;

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle, activeStyle]}>
                <div></div>
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default SignUpTheme;
