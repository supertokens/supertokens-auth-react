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
import BackButton from "../../../../emailpassword/components/library/backButton";

export const AuthPageHeader = withOverride(
    "AuthPageHeader",
    function AuthPageHeader({
        onSignInUpSwitcherClick,
        hasSeparateSignUpView,
        isSignUp,
        showBackButton,
        resetFactorList,
        oauth2ClientInfo,
        headerLabel,
        hideSignInSwitcher = false,
    }: {
        factorIds: string[];
        isSignUp: boolean;
        hasSeparateSignUpView: boolean;
        onSignInUpSwitcherClick: (() => void) | undefined;
        resetFactorList: () => void;
        showBackButton: boolean;
        oauth2ClientInfo?: {
            logoUri?: string;
            clientUri?: string;
            clientName: string;
        };
        headerLabel?: string;
        hideSignInSwitcher?: boolean;
    }): JSX.Element {
        const t = useTranslation();

        return (
            <Fragment>
                {oauth2ClientInfo?.logoUri && (
                    <img
                        src={oauth2ClientInfo.logoUri}
                        alt={oauth2ClientInfo.clientName}
                        data-supertokens="authPageTitleOAuthClientLogo"
                    />
                )}
                <div data-supertokens="headerTitle withBackButton">
                    {showBackButton ? (
                        <BackButton onClick={resetFactorList} />
                    ) : (
                        <span data-supertokens="backButtonPlaceholder backButtonCommon">
                            {/* empty span for spacing the back button */}
                        </span>
                    )}
                    {headerLabel !== undefined
                        ? t(headerLabel)
                        : !hasSeparateSignUpView
                        ? t("AUTH_PAGE_HEADER_TITLE_SIGN_IN_AND_UP")
                        : isSignUp
                        ? t("AUTH_PAGE_HEADER_TITLE_SIGN_UP")
                        : t("AUTH_PAGE_HEADER_TITLE_SIGN_IN")}
                    <span data-supertokens="backButtonPlaceholder backButtonCommon">
                        {/* empty span for spacing the back button */}
                    </span>
                </div>
                {oauth2ClientInfo &&
                    oauth2ClientInfo.clientName !== undefined &&
                    oauth2ClientInfo.clientName.length > 0 && (
                        <div data-supertokens="authPageTitleOAuthClient">
                            {t("AUTH_PAGE_HEADER_TITLE_SIGN_IN_UP_TO_APP")}
                            {oauth2ClientInfo.clientUri !== undefined ? (
                                <a
                                    data-supertokens="authPageTitleOAuthClientUrl link"
                                    href={oauth2ClientInfo.clientUri}>
                                    {oauth2ClientInfo.clientName}
                                </a>
                            ) : (
                                <span data-supertokens="authPageTitleOAuthClientName">
                                    {oauth2ClientInfo.clientName}
                                </span>
                            )}
                        </div>
                    )}
                {!hideSignInSwitcher &&
                    hasSeparateSignUpView &&
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
