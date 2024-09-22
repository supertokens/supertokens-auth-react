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

import LogoutIcon from "../../../../../components/assets/logoutIcon";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import { Button } from "../../../../emailpassword/components/library";

export const OAuth2LogoutScreenInner = withOverride(
    "OAuth2LogoutScreenInner",
    function OAuth2LogoutScreenInner(props: { isLoggingOut: boolean; onLogoutClicked: () => void }): JSX.Element {
        const t = useTranslation();
        return (
            <>
                <LogoutIcon />
                <div data-supertokens="headerTitle">{t("LOGGING_OUT")}</div>
                <div data-supertokens="headerSubtitle">{t("LOGOUT_CONFIRMATION")}</div>
                <div data-supertokens="divider" />
                <Button
                    disabled={props.isLoggingOut}
                    isLoading={props.isLoggingOut}
                    type="button"
                    label={t("LOGOUT")}
                    onClick={props.onLogoutClicked}
                />
            </>
        );
    }
);
