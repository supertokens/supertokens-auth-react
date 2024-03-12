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
import { Fragment } from "react";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import BackButton from "../../../../emailpassword/components/library/backButton";

import type { MFAHeaderProps } from "../../../types";

export const MFAHeader = withOverride(
    "PasswordlessMFAHeader",
    function PasswordlessMFAHeader(props: MFAHeaderProps): JSX.Element {
        const t = useTranslation();

        return (
            <Fragment>
                <div data-supertokens="headerTitle withBackButton pwless-mfa header">
                    {props.showBackButton ? (
                        <BackButton onClick={props.onBackButtonClicked} />
                    ) : (
                        <span data-supertokens="backButtonPlaceholder backButtonCommon">
                            {/* empty span for spacing the back button */}
                        </span>
                    )}
                    {props.contactMethod === "EMAIL"
                        ? t("PWLESS_MFA_HEADER_TITLE_EMAIL")
                        : t("PWLESS_MFA_HEADER_TITLE_PHONE")}
                    <span data-supertokens="backButtonPlaceholder backButtonCommon">
                        {/* empty span for spacing the back button */}
                    </span>
                </div>
                <div data-supertokens="divider"></div>
            </Fragment>
        );
    }
);
