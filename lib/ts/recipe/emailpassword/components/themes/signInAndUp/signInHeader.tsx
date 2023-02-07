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

export const SignInHeader = withOverride(
    "EmailPasswordSignInHeader",
    function EmailPasswordSignInHeader({ onClick }: { onClick: (() => void) | undefined }): JSX.Element {
        const t = useTranslation();

        return (
            <Fragment>
                <div data-supertokens="headerTitle">{t("EMAIL_PASSWORD_SIGN_IN_HEADER_TITLE")}</div>
                <div data-supertokens="headerSubtitle">
                    <div data-supertokens="secondaryText">
                        {t("EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_START")}
                        <span data-supertokens="link" onClick={onClick}>
                            {t("EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_SIGN_UP_LINK")}
                        </span>
                        {t("EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_END")}
                    </div>
                </div>
                <div data-supertokens="divider"></div>
            </Fragment>
        );
    }
);
