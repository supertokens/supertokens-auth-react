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

import { useTranslation } from "../../../../../translation/translationContext";
import { Button } from "../../../../emailpassword/components/library";

export const PasskeyRecoverAccountSuccess = (): JSX.Element => {
    const t = useTranslation();

    return (
        <div data-supertokens="passkeyRecoverAccountSuccessContainer">
            <div data-supertokens="header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.08 9.72L5.4 11.4L10.8 16.8L22.8 4.8L21.12 3.12L10.8 13.44L7.08 9.72ZM21.6 12C21.6 17.28 17.28 21.6 12 21.6C6.72 21.6 2.4 17.28 2.4 12C2.4 6.72 6.72 2.4 12 2.4C12.96 2.4 13.8 2.52 14.64 2.76L16.56 0.84C15.12 0.36 13.56 0 12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12H21.6Z"
                        fill="#40A700"
                    />
                </svg>
                <div data-supertokens="headerText">{t("WEBAUTHN_ACCOUNT_RECOVERY_SUCCESSFUL_LABEL")}</div>
            </div>
            <div data-supertokens="divider"></div>
            <Button
                disabled={false}
                isLoading={false}
                type="button"
                onClick={() => {}}
                label="WEBAUTHN_EMAIL_CONTINUE_BUTTON"
            />
        </div>
    );
};
