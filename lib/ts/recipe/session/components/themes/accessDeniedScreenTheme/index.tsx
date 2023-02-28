/* eslint-disable react/jsx-no-literals */
import React from "react";

// import { signOut } from "../../..";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { hasFontDefined } from "../../../../../styles/styles";
import SuperTokens from "../../../../../superTokens";
import { useTranslation } from "../../../../../translation/translationContext";
import { useUserContext } from "../../../../../usercontext";
import Session from "../../../recipe";
import { BackButton } from "../../library/backButton";
import { LogoutButton } from "../../library/logoutButton";
import { ThemeBase } from "../themeBase";

import type { AccessDeniedThemeProps } from "../../../types";
import type { FC } from "react";

const AccessDeniedScreen: FC<AccessDeniedThemeProps> = () => {
    const userContext = useUserContext();
    const t = useTranslation();
    const history = SuperTokens.getReactRouterDomWithCustomHistory()?.useHistoryCustom();

    const onLogout = async () => {
        try {
            await Session.getInstanceOrThrow().signOut({ userContext });
        } catch (error) {
        } finally {
            history.navigate("/auth");
        }
    };

    const onBackButtonClicked = () => {
        return SuperTokens.getInstanceOrThrow().redirectToAuth({
            show: "signin",
            history,
            redirectBack: false,
        });
    };

    return (
        <div data-supertokens="center">
            <div data-supertokens="headerTitle">{t("ACCESS_DENIED")}</div>
            <div data-supertokens="buttons">
                <BackButton onClick={onBackButtonClicked} />
                <LogoutButton onClick={onLogout} />
            </div>
        </div>
    );
};

const AccessDeniedThemeWithOverride = withOverride("SessionAccessDenied", AccessDeniedScreen);

export const AccessDeniedTheme: React.FC<AccessDeniedThemeProps> = (props) => {
    const hasFont = hasFontDefined(props.config.rootStyle);

    return (
        <ThemeBase
            loadDefaultFont={!hasFont}
            userStyles={[props.config.rootStyle, props.config.accessDeniedScreen.style]}>
            <AccessDeniedThemeWithOverride {...props} />
        </ThemeBase>
    );
};
