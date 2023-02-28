/* eslint-disable react/jsx-no-literals */
import React from "react";

import { signOut } from "../../..";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { hasFontDefined } from "../../../../../styles/styles";
import SuperTokens from "../../../../../superTokens";
import { useTranslation } from "../../../../../translation/translationContext";
import { BackButton } from "../../library/backButton";
import { LogoutButton } from "../../library/logoutButton";
import { ThemeBase } from "../themeBase";

import type { AccessDeniedThemeProps } from "../../../types";
import type { FC } from "react";

const AccessDeniedScreen: FC<AccessDeniedThemeProps> = () => {
    const t = useTranslation();
    const history = SuperTokens.getReactRouterDomWithCustomHistory()?.useHistoryCustom();
    const onLogout = async () => {
        try {
            await signOut();
        } catch (error) {
        } finally {
            history.navigate("/auth");
        }
    };
    return (
        <div>
            <LogoutButton onClick={onLogout} />
            <div data-supertokens="center">
                <div data-supertokens="headerTitle">{t("ACCESS_DENIED")}</div>
                // eslint-disable-next-line no-console
                <BackButton onClick={() => null} />
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
