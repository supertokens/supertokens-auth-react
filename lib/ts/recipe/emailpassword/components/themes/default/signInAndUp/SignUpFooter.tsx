/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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

import React from "react";
import { Styles } from "../../../../../../types";
import { StyleConsumer } from "../../../themes/default/styles/styleContext";

/** @jsx jsx */
import { jsx } from "@emotion/core";

export default function SignUpFooter({
    componentStyles,
    termsOfServiceLink,
    privacyPolicyLink
}: {
    componentStyles: Styles;
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
}): JSX.Element | null {
    if (termsOfServiceLink === undefined && privacyPolicyLink === undefined) {
        return null;
    }

    return (
        <StyleConsumer>
            {styles => (
                <div
                    className="secondaryText privacyPolicyAndTermsAndConditions"
                    css={[
                        componentStyles.privacyPolicyAndTermsAndConditions,
                        styles.secondaryText,
                        styles.privacyPolicyAndTermsAndConditions
                    ]}>
                    By signing up, you agree to our
                    {termsOfServiceLink !== undefined && (
                        <a className="link" css={styles.link} target="_blank" href={termsOfServiceLink}>
                            Terms of Service
                        </a>
                    )}
                    {termsOfServiceLink !== undefined && privacyPolicyLink !== undefined && "and"}
                    {privacyPolicyLink !== undefined && (
                        <a className="link" css={styles.link} href={privacyPolicyLink} target="_blank">
                            Privacy Policy
                        </a>
                    )}
                </div>
            )}
        </StyleConsumer>
    );
}
