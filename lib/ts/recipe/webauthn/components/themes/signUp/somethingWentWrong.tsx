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

import SomethingWentWrongIcon from "../../../../../components/assets/somethingWentWrongIcon";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";

export const SignUpSomethingWentWrong = withOverride(
    "WebauthnPasskeySignUpSomethingWentWrong",
    function SomethingWentWrong(props: { onClick: () => void }): JSX.Element {
        const t = useTranslation();
        return (
            <div data-supertokens="somethingWentWrongContainer">
                <SomethingWentWrongIcon />
                <div data-supertokens="somethingWentWrongErrorDetailsContainer">
                    <div data-supertokens="label">{t("WEBAUTHN_UNRECOVERABLE_ERROR")}</div>
                    <div data-supertokens="divider"></div>
                    <div data-supertokens="errorDetails">{t("WEBAUTHN_UNRECOVERABLE_ERROR_DETAILS")}</div>
                </div>
                <div data-supertokens="goBackButtonContainer">
                    <a onClick={props.onClick} data-supertokens="formLabelLinkBtn errorGoBackLabel">
                        {t("WEBAUTHN_ERROR_GO_BACK_BUTTON_LABEL")}
                    </a>
                </div>
            </div>
        );
    }
);
