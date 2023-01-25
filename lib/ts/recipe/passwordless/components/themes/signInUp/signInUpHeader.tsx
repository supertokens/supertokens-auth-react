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

export const SignInUpHeader = withOverride(
    "PasswordlessSignInUpHeader",
    function PasswordlessSignInUpHeader(): JSX.Element {
        const t = useTranslation();

        return (
            <Fragment>
                <div data-supertokens="headerTitle">{t("PWLESS_SIGN_IN_UP_HEADER_TITLE")}</div>
                <div data-supertokens="divider"></div>
            </Fragment>
        );
    }
);
