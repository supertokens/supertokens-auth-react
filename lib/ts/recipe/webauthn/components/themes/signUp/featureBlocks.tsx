/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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

import FingerPrintIcon from "../../../../../components/assets/fingerPrintIcon";
import MultipleDevicesIcon from "../../../../../components/assets/multipleDevicesIcon";
import SecurityIcon from "../../../../../components/assets/securityIcon";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";

import type { FeatureBlockDetailProps } from "../../../types";

const blockDetails = [
    {
        title: "WEBAUTHN_FEATURE_BLOCK_NO_NEED_TO_REMEMBER_PASSWORD",
        subText: "WEBAUTHN_FEATURE_BLOCK_NO_NEED_TO_REMEMBER_PASSWORD_DETAIL",
        icon: <FingerPrintIcon />,
    },
    {
        title: "WEBAUTHN_FEATURE_BLOCK_WORKS_ON_ALL_DEVICES",
        subText: "WEBAUTHN_FEATURE_BLOCK_WORKS_ON_ALL_DEVICES_DETAIL",
        icon: <MultipleDevicesIcon />,
    },
    {
        title: "WEBAUTHN_FEATURE_BLOCK_KEEP_ACCOUNT_SAFER",
        subText: "WEBAUTHN_FEATURE_BLOCK_KEEP_ACCOUNT_SAFER_DETAIL",
        icon: <SecurityIcon />,
    },
];

export const PasskeyFeatureBlock = withOverride(
    "WebauthnPasskeyFeatureBlock",
    function FeatureBlock(props: FeatureBlockDetailProps): JSX.Element {
        const t = useTranslation();
        return (
            <div data-supertokens="passkeyFeatureBlock">
                <div data-supertokens="passkeyFeatureBlockIcon">{props.icon}</div>
                <div data-supertokens="passkeyFeatureBlockDetails">
                    <div data-supertokens="passkeyFeatureBlockTitle">{t(props.title)}</div>
                    <div data-supertokens="passkeyFeatureBlockSubText">{t(props.subText)}</div>
                </div>
            </div>
        );
    }
);

export const PasskeyFeatureBlockList = () => {
    return (
        <div data-supertokens="passkeyFeatureBlocksContainer">
            {blockDetails.map((blockDetail) => (
                <PasskeyFeatureBlock {...blockDetail} />
            ))}
        </div>
    );
};
