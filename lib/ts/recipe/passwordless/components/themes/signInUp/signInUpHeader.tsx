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
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Fragment, useContext } from "react";
import StyleContext from "../../../../../styles/styleContext";
import { withOverride } from "../../../../../components/componentOverride/withOverride";

export const SignInUpHeader = withOverride(
    "PasswordlessSignInUpHeader",
    function PasswordlessSignInUpHeader(): JSX.Element {
        const styles = useContext(StyleContext);

        return (
            <Fragment>
                <div data-supertokens="headerTitle" css={styles.headerTitle}>
                    Sign Up or Log In
                </div>
                <div data-supertokens="divider" css={styles.divider}></div>
            </Fragment>
        );
    }
);
