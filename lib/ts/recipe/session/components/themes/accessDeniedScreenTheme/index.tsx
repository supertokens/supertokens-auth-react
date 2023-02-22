/* eslint-disable react/jsx-no-literals */
import React, { Fragment } from "react";

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
        <Fragment>
            <div data-supertokens="headerTitle">{t("ACCESS_DENIED")}</div>
            <div data-supertokens="headerTitle">
                <div>Claim ID: {validatorId}</div>
                <div>Reason: {failureReason}</div>
            </div>
        </Fragment>
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
