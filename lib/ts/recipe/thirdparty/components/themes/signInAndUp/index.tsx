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
import { useContext } from "react";
import StyleContext from "../../../../../styles/styleContext";
import SignUpFooter from "../../../../authRecipeModule/components/themes/signInAndUp/signUpFooter";
import { SignInAndUpThemeProps } from "../../../types";
import { ThemeBase } from "../themeBase";
import SignInAndUpProvidersForm from "./providersForm";
/*
 * Component.
 */

function SignInAndUpTheme(props: SignInAndUpThemeProps): JSX.Element {
    const styles = useContext(StyleContext);
    return (
        <ThemeBase>
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row" css={styles.row}>
                    <div data-supertokens="headerTitle" css={styles.headerTitle}>
                        Sign Up / Sign In
                    </div>
                    <div data-supertokens="divider" css={styles.divider}></div>
                    <SignInAndUpProvidersForm {...props} />
                    <SignUpFooter
                        privacyPolicyLink={props.privacyPolicyLink}
                        termsOfServiceLink={props.termsOfServiceLink}
                    />
                </div>
            </div>
        </ThemeBase>
    );
}

export default SignInAndUpTheme;
