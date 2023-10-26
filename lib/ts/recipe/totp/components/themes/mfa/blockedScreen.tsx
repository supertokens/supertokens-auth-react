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
import { BlockedIcon } from "../../../../../components/assets/blockedIcon";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";

const TOTPBlockedScreen: React.FC = () => {
    const t = useTranslation();

    return (
        <div data-supertokens="container">
            <div data-supertokens="row noFormRow">
                <BlockedIcon />
                <div data-supertokens="headerTitle">{t("TOTP_BLOCKED_TITLE")}</div>
                <div data-supertokens="divider" />
                <div data-supertokens="headerSubtitle secondaryText">{t("TOTP_BLOCKED_SUBTITLE")}</div>
                <div data-supertokens="divider" />
            </div>
        </div>
    );
};

export const BlockedScreen = withOverride("TOTPBlockedScreen", TOTPBlockedScreen);
