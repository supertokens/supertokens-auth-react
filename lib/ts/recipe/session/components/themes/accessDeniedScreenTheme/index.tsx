/* eslint-disable react/jsx-no-literals */
import React from "react";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { hasFontDefined } from "../../../../../styles/styles";
import { useTranslation } from "../../../../../translation/translationContext";
import { ThemeBase } from "../themeBase";

import type { AccessDeniedThemeProps } from "../../../types";
import type { FC } from "react";

const AccessDeniedScreen: FC<AccessDeniedThemeProps> = (props) => {
    const t = useTranslation();
    const { validatorId, reason = {} } = props.denialInfo || {};
    const failureReason =
        typeof reason === "string" ? reason : typeof reason.message === "string" ? reason.message : null;

    return (
        <div data-supertokens="center">
            <div data-supertokens="headerTitle">{t("ACCESS_DENIED")}</div>
            <div data-supertokens="headerTitle">
                <div>
                    {t("CLAIM_ID")}: {validatorId}
                </div>
                <div>
                    {t("REASON")}: {failureReason}
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
