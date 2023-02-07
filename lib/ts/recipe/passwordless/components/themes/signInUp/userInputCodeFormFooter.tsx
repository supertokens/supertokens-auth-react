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

import ArrowLeftIcon from "../../../../../components/assets/arrowLeftIcon";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";
import { useUserContext } from "../../../../../usercontext";

import type { UserInputCodeFormFooterProps } from "../../../types";

export const UserInputCodeFormFooter = withOverride(
    "PasswordlessUserInputCodeFormFooter",
    function PasswordlessUserInputCodeFormFooter({
        loginAttemptInfo,
        recipeImplementation,
    }: UserInputCodeFormFooterProps): JSX.Element {
        const t = useTranslation();
        const userContext = useUserContext();

        return (
            <Fragment>
                <div
                    data-supertokens="secondaryText secondaryLinkWithLeftArrow"
                    onClick={() =>
                        recipeImplementation.clearLoginAttemptInfo({
                            userContext,
                        })
                    }>
                    <ArrowLeftIcon color="rgb(var(--palette-textPrimary))" />
                    {loginAttemptInfo.contactMethod === "EMAIL"
                        ? t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL")
                        : t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE")}
                </div>
            </Fragment>
        );
    }
);
