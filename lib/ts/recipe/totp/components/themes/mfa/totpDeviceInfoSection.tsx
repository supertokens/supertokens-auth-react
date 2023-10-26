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

import type { TOTPMFACommonProps } from "../../../types";
import type { DeviceInfo } from "supertokens-web-js/recipe/totp";
import QRCode from "react-qr-code";
import { useTranslation } from "../../../../../translation/translationContext";

export const DeviceInfoSection = withOverride(
    "TOTPDeviceInfoSection",
    function TOTPDeviceInfoSection(
        props: TOTPMFACommonProps & {
            deviceInfo: DeviceInfo;
            showSecret: boolean;
            onShowSecretClick: () => void;
        }
    ): JSX.Element {
        const t = useTranslation();

        return (
            <>
                <div data-supertokens="totpDeviceInfoWithQR">
                    <QRCode value={props.deviceInfo.qrCodeString} data-supertokens="totpDeviceQR" level="L" />
                    <span data-supertokens="showTOTPSecret">
                        {t("TOTP_SHOW_SECRET_START")}
                        <button
                            type="button"
                            onClick={props.onShowSecretClick}
                            data-supertokens="link linkButton showTOTPSecretBtn">
                            {t("TOTP_SHOW_SECRET_LINK")}
                        </button>
                        {t("TOTP_SHOW_SECRET_END")}
                    </span>
                    {props.showSecret && <span data-supertokens="totpSecret">{props.deviceInfo.secret}</span>}
                </div>
                <div data-supertokens="divider" />
            </>
        );
    }
);
