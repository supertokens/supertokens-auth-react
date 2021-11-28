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
import { SignInUpCodeInputFooterProps } from "../../../types";
import ArrowRightIcon from "../../../../../components/assets/arrowRightIcon";

export const SignInUpCodeInputFooter = withOverride(
    "PasswordlessSignInUpCodeInputFooter",
    function PasswordlessSignInUpCodeInputFooter({
        loginAttemptInfo,
        recipeImplementation,
    }: SignInUpCodeInputFooterProps): JSX.Element {
        const styles = useContext(StyleContext);

        return (
            <Fragment>
                <div
                    data-supertokens="secondaryText secondaryLinkWithArrow"
                    css={[styles.secondaryText, styles.secondaryLinkWithArrow]}
                    onClick={() => recipeImplementation.clearLoginAttemptInfo()}>
                    Change {loginAttemptInfo.contactInfoType === "EMAIL" ? "email" : "phone number"}{" "}
                    <ArrowRightIcon color={styles.palette.colors.textPrimary} />
                </div>
            </Fragment>
        );
    }
);
