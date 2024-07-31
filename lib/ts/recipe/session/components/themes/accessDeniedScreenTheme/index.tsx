/* eslint-disable react/jsx-no-literals */
import React from "react";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

import ErrorRoundIcon from "../../../../../components/assets/errorRoundIcon";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import SuperTokens from "../../../../../superTokens";
import { useTranslation } from "../../../../../translation/translationContext";
import { useUserContext } from "../../../../../usercontext";
import BackButton from "../../library/backButton";
import LogoutButton from "../../library/logoutButton";
import { ThemeBase } from "../themeBase";

import type { AccessDeniedThemeProps } from "../../../types";
import type { FC } from "react";

const AccessDeniedScreen: FC<AccessDeniedThemeProps> = (props) => {
    const userContext = useUserContext();
    const t = useTranslation();

    const onLogout = async () => {
        await props.recipe.signOut({ userContext });
        await SuperTokens.getInstanceOrThrow().redirectToAuth({
            show: "signin",
            redirectBack: false,
            userContext,
        });
    };

    const onBackButtonClicked = () => {
        // If we don't have navigate available this would mean we are not using react-router-dom, so we use window's history
        if (props.navigate === undefined) {
            return WindowHandlerReference.getReferenceOrThrow().windowHandler.getWindowUnsafe().history.back();
        }
        // If we do have navigate and goBack function on it this means we are using react-router-dom v5 or lower
        if ("goBack" in props.navigate) {
            return props.navigate.goBack();
        }
        // If we reach this code this means we are using react-router-dom v6
        return props.navigate(-1);
    };

    return (
        <div data-supertokens="center accessDenied">
            <div data-supertokens="container">
                <div data-supertokens="row">
                    <ErrorRoundIcon />
                    <div data-supertokens="headerTitle">{t("ACCESS_DENIED")}</div>
                    <div data-supertokens="divider"></div>
                    {props.error && <div data-supertokens="primaryText accessDeniedError"> {props.error}</div>}
                    <div data-supertokens="buttonsGroup">
                        <BackButton onClick={onBackButtonClicked} />
                        <LogoutButton onClick={onLogout} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const AccessDeniedThemeWithOverride = withOverride("SessionAccessDenied", AccessDeniedScreen);

export const AccessDeniedScreenTheme: React.FC<AccessDeniedThemeProps> = (props) => {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;

    return (
        <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle, props.config.accessDeniedScreen.style]}>
            <AccessDeniedThemeWithOverride {...props} />
        </ThemeBase>
    );
};
