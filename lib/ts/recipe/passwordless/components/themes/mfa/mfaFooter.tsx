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

import type { MFAFooterProps } from "../../../types";

export const MFAFooter = withOverride(
    "PasswordlessMFAFooter",
    function PasswordlessMFAFooter(props: MFAFooterProps): JSX.Element | null {
        const t = useTranslation();

        return (
            <div data-supertokens="footerLinkGroupVert pwless-mfa footer">
                <div data-supertokens="secondaryText secondaryLinkWithLeftArrow" onClick={props.onSignOutClicked}>
                    <ArrowLeftIcon color="rgb(var(--palette-textPrimary))" />
                    {t("PWLESS_MFA_FOOTER_LOGOUT")}
                </div>
            </div>
        );
    }
);
