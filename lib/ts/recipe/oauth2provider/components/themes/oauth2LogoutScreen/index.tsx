/* eslint-disable react/jsx-no-literals */
import React from "react";

import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import SuperTokens from "../../../../../superTokens";
import DynamicLoginMethodsSpinner from "../../../../multitenancy/components/features/dynamicLoginMethodsSpinner";
import { ThemeBase } from "../themeBase";

import { OAuth2LogoutScreenInner } from "./OAuth2LogoutScreenInner";

import type { OAuth2LogoutScreenThemeProps } from "../../../types";
import type { FC } from "react";

const OAuth2LogoutScreen: FC<OAuth2LogoutScreenThemeProps> = (props) => {
    if (props.showSpinner) {
        return <DynamicLoginMethodsSpinner />;
    }
    return (
        <div data-supertokens="oauth2Logout container">
            <div data-supertokens="row">
                <OAuth2LogoutScreenInner isLoggingOut={props.isLoggingOut} onLogoutClicked={props.onLogoutClicked} />
            </div>
            <SuperTokensBranding />
        </div>
    );
};

export const OAuth2LogoutScreenTheme: React.FC<OAuth2LogoutScreenThemeProps> = (props) => {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;

    return (
        <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle, props.config.oauth2LogoutScreen.style]}>
            <OAuth2LogoutScreen {...props} />
        </ThemeBase>
    );
};
