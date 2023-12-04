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

import type { TOTPMFACommonProps } from "../../../types";

export const DeviceSetupHeader = withOverride(
    "TOTPDeviceSetupHeader",
    function TOTPDeviceSetupHeader(
        props: TOTPMFACommonProps & { showBackButton: boolean; onBackButtonClicked: () => void }
    ): JSX.Element {
        const t = useTranslation();

        return (
            <Fragment>
                <div data-supertokens="headerTitle withBackButton totp-mfa deviceSetupHeader">
                    {props.showBackButton ? (
                        <BackButton onClick={props.onBackButtonClicked} />
                    ) : (
                        <span data-supertokens="backButtonPlaceholder backButtonCommon">
                            {/* empty span for spacing the back button */}
                        </span>
                    )}
                    {t("TOTP_DEVICE_SETUP_HEADER_TITLE")}
                    <span data-supertokens="backButtonPlaceholder backButtonCommon">
                        {/* empty span for spacing the back button */}
                    </span>
                </div>
                <div data-supertokens="headerSubtitle secondaryText">{t("TOTP_DEVICE_SETUP_HEADER_SUBTITLE")}</div>
                <div data-supertokens="divider"></div>
            </Fragment>
        );
    }
);
