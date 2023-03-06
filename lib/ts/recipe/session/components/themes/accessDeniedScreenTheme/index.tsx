/* eslint-disable react/jsx-no-literals */
import React from "react";

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
        try {
            await props.recipe.signOut({ userContext });
        } catch (error) {
        } finally {
            await SuperTokens.getInstanceOrThrow().redirectToAuth({
                show: "signin",
                redirectBack: false,
            });
        }
    };

    const onBackButtonClicked = () => {
        throw "Not implemented";
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
