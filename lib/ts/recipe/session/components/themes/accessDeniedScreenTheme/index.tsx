/* eslint-disable react/jsx-no-literals */
import React from "react";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

import ErrorRoundIcon from "../../../../../components/assets/errorRoundIcon";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { hasFontDefined } from "../../../../../styles/styles";
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
        });
    };

    const onBackButtonClicked = () => {
        // If we don't have history available this would mean we are not using react-router-dom, so we use window's history
        if (props.history === undefined) {
            return WindowHandlerReference.getReferenceOrThrow().windowHandler.getWindowUnsafe().history.back();
        }
        // If we do have history and goBack function on it this means we are using react-router-dom v5 or lower
        if ("goBack" in props.history) {
            return props.history.goBack();
        }
        // If we reach this code this means we are using react-router-dom v6
        return props.history(-1);
    };

    return (
        <div data-supertokens="center">
            <div data-supertokens="container">
                <div data-supertokens="row">
                    <ErrorRoundIcon />
                    <div data-supertokens="headerTitle">{t("ACCESS_DENIED")}</div>
                    <div data-supertokens="divider"></div>
                    <div data-supertokens="buttonsGroup">
                        <LogoutButton onClick={onLogout} />
                        <BackButton onClick={onBackButtonClicked} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const AccessDeniedThemeWithOverride = withOverride("SessionAccessDenied", AccessDeniedScreen);

export const AccessDeniedScreenTheme: React.FC<AccessDeniedThemeProps> = (props) => {
    const hasFont = hasFontDefined(props.config.rootStyle);

    return (
        <ThemeBase
            loadDefaultFont={!hasFont}
            userStyles={[props.config.rootStyle, props.config.accessDeniedScreen.style]}>
            <AccessDeniedThemeWithOverride {...props} />
        </ThemeBase>
    );
};
