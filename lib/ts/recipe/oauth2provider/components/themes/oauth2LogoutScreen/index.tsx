/* eslint-disable react/jsx-no-literals */
import React from "react";

import LogoutIcon from "../../../../../components/assets/logoutIcon";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import { hasFontDefined } from "../../../../../styles/styles";
import SuperTokens from "../../../../../superTokens";
import { useTranslation } from "../../../../../translation/translationContext";
import { Button } from "../../../../emailpassword/components/library";
import DynamicLoginMethodsSpinner from "../../../../multitenancy/components/features/dynamicLoginMethodsSpinner";
import { ThemeBase } from "../themeBase";

import type { OAuth2LogoutScreenThemeProps } from "../../../types";
import type { FC } from "react";

const OAuth2LogoutScreen: FC<OAuth2LogoutScreenThemeProps> = (props) => {
    const t = useTranslation();

    if (props.showSpinner) {
        return <DynamicLoginMethodsSpinner />;
    }

    return (
        <div data-supertokens="oauth2Logout">
            <div data-supertokens="container">
                <div data-supertokens="row">
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
                    <SuperTokensBranding />
                </div>
            </div>
        </div>
    );
};

const OAuth2LogoutThemeWithOverride = withOverride("OAuth2LogoutScreen", OAuth2LogoutScreen);

export const OAuth2LogoutScreenTheme: React.FC<OAuth2LogoutScreenThemeProps> = (props) => {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    const hasFont = hasFontDefined(rootStyle) || hasFontDefined(props.config.recipeRootStyle);

    return (
        <ThemeBase
            loadDefaultFont={!hasFont}
            userStyles={[rootStyle, props.config.recipeRootStyle, props.config.oauth2LogoutScreen.style]}>
            <OAuth2LogoutThemeWithOverride {...props} />
        </ThemeBase>
    );
};
