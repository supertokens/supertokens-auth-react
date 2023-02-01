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

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";

export const SignInUpFooter = withOverride(
    "PasswordlessSignInUpFooter",
    function PasswordlessSignInUpFooter({
        termsOfServiceLink,
        privacyPolicyLink,
    }: {
        privacyPolicyLink?: string;
        termsOfServiceLink?: string;
    }): JSX.Element | null {
        const t = useTranslation();

        if (termsOfServiceLink === undefined && privacyPolicyLink === undefined) {
            return null;
        }

        return (
            <div data-supertokens="secondaryText privacyPolicyAndTermsAndConditions">
                {t("PWLESS_SIGN_IN_UP_FOOTER_START")}
                {termsOfServiceLink !== undefined && (
                    <a data-supertokens="link" href={termsOfServiceLink} target="_blank" rel="noopener noreferer">
                        {t("PWLESS_SIGN_IN_UP_FOOTER_TOS")}
                    </a>
                )}
                {termsOfServiceLink !== undefined &&
                    privacyPolicyLink !== undefined &&
                    t("PWLESS_SIGN_IN_UP_FOOTER_AND")}
                {privacyPolicyLink !== undefined && (
                    <a data-supertokens="link" href={privacyPolicyLink} target="_blank" rel="noopener noreferer">
                        {t("PWLESS_SIGN_IN_UP_FOOTER_PP")}
                    </a>
                )}
                {t("PWLESS_SIGN_IN_UP_FOOTER_END")}
            </div>
        );
    }
);
