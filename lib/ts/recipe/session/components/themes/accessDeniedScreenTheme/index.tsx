/* eslint-disable react/jsx-no-literals */
import React from "react";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { hasFontDefined } from "../../../../../styles/styles";
import SuperTokens from "../../../../../superTokens";
import { useTranslation } from "../../../../../translation/translationContext";
import { useUserContext } from "../../../../../usercontext";
import BackButton from "../../../../emailpassword/components/library/backButton";
import Session from "../../../recipe";
import { ThemeBase } from "../themeBase";

import type { AccessDeniedThemeProps } from "../../../types";
import type { FC } from "react";

type LogoutButtonProps = {
    onClick: () => void;
};

export function LogoutButton({ onClick }: LogoutButtonProps): JSX.Element {
    const t = useTranslation();
    return (
        <button data-supertokens="logoutButton" onClick={onClick}>
            {t("SIGN_OUT")}
        </button>
    );
}

const AccessDeniedScreen: FC<AccessDeniedThemeProps> = () => {
    const userContext = useUserContext();
    const t = useTranslation();

    const onLogout = async () => {
        try {
            await Session.getInstanceOrThrow().signOut({ userContext });
        } catch (error) {
        } finally {
            await SuperTokens.getInstanceOrThrow().redirectToAuth({
                show: "signin",
                redirectBack: false,
            });
        }
    };

    const onBackButtonClicked = () => {
        try {
            WindowHandlerReference.getReferenceOrThrow().windowHandler.getWindowUnsafe().history.back();
        } catch (error) {}
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
