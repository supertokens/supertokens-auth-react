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
import ArrowLeftIcon from "../../../../../components/assets/arrowLeftIcon";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import { useUserContext } from "../../../../../usercontext";
import { MultiFactorAuthClaim } from "../../../../multifactorauth";
import { useClaimValue } from "../../../../session";

import type { MFAOTPFooterProps } from "../../../types";

export const MFAOTPFooter = withOverride(
    "PasswordlessMFAOTPFooter",
    function PasswordlessMFAOTPFooter({
        loginAttemptInfo,
        recipeImplementation,
        onSignOutClicked,
        onFactorChooserButtonClicked,
        isSetupAllowed,
    }: MFAOTPFooterProps): JSX.Element {
        const t = useTranslation();
        const claim = useClaimValue(MultiFactorAuthClaim);
        const userContext = useUserContext();

        return (
            <div data-supertokens="footerLinkGroupVert pwless-mfa otpFooter">
                {isSetupAllowed ? (
                    <div
                        data-supertokens="secondaryText"
                        onClick={() =>
                            recipeImplementation.clearLoginAttemptInfo({
                                userContext,
                            })
                        }>
                        {loginAttemptInfo.contactMethod === "EMAIL"
                            ? t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL")
                            : t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE")}
                    </div>
                ) : (
                    claim.loading === false &&
                    (claim.value?.n.length ?? 0) > 1 && (
                        <div data-supertokens="secondaryText" onClick={onFactorChooserButtonClicked}>
                            {t("PWLESS_MFA_FOOTER_CHOOSER_ANOTHER")}
                        </div>
                    )
                )}
                <div data-supertokens="secondaryText secondaryLinkWithLeftArrow" onClick={onSignOutClicked}>
                    <ArrowLeftIcon color="rgb(var(--palette-textPrimary))" />
                    {t("PWLESS_MFA_LOGOUT")}
                </div>
            </div>
        );
    }
);