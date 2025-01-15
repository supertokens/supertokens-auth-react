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

import { redirectToAuth } from "../../../../..";
import RecoverySuccessIcon from "../../../../../components/assets/recoverySuccessIcon";
import { useTranslation } from "../../../../../translation/translationContext";
import { Button } from "../../../../emailpassword/components/library";

export const PasskeyRecoverAccountSuccess = (): JSX.Element => {
    const t = useTranslation();

    const onContinueClick = async () => {
        await redirectToAuth({ show: "signin" });
    };

    return (
        <div data-supertokens="passkeyRecoverAccountSuccessContainer">
            <div data-supertokens="header">
                <RecoverySuccessIcon />
                <div data-supertokens="headerText">{t("WEBAUTHN_ACCOUNT_RECOVERY_SUCCESSFUL_LABEL")}</div>
            </div>
            <div data-supertokens="divider"></div>
            <Button
                disabled={false}
                isLoading={false}
                type="button"
                onClick={onContinueClick}
                label="WEBAUTHN_EMAIL_CONTINUE_BUTTON"
            />
        </div>
    );
};
