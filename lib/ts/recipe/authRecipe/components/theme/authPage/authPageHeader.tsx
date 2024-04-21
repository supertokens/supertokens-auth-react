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

export const AuthPageHeader = withOverride(
    "AuthPageHeader",
    function AuthPageHeader({
        onSignInUpSwitcherClick,
        hasSeparateSignUpView,
        isSignUp,
    }: {
        factorIds: string[];
        isSignUp: boolean;
        hasSeparateSignUpView: boolean;
        onSignInUpSwitcherClick: (() => void) | undefined;
    }): JSX.Element {
        const t = useTranslation();

        return (
            <Fragment>
                <div data-supertokens="headerTitle">
                    {!hasSeparateSignUpView
                        ? t("AUTH_PAGE_HEADER_TITLE_SIGN_IN_AND_UP")
                        : isSignUp
                        ? t("AUTH_PAGE_HEADER_TITLE_SIGN_UP")
                        : t("AUTH_PAGE_HEADER_TITLE_SIGN_IN")}
                </div>
                {hasSeparateSignUpView &&
                    (!isSignUp ? (
                        <div data-supertokens="headerSubtitle secondaryText">
                            {t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_START")}
                            <span data-supertokens="link" onClick={onSignInUpSwitcherClick}>
                                {t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_SIGN_UP_LINK")}
                            </span>
                            {t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_END")}
                        </div>
                    ) : (
                        <div data-supertokens="headerSubtitle secondaryText">
                            {t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_START")}
                            <span data-supertokens="link" onClick={onSignInUpSwitcherClick}>
                                {t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_SIGN_IN_LINK")}
                            </span>
                            {t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_END")}
                        </div>
                    ))}
                <div data-supertokens="divider"></div>
            </Fragment>
        );
    }
);
