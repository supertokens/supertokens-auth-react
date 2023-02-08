/* eslint-disable react/jsx-no-literals */
import React, { Fragment } from "react";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { hasFontDefined } from "../../../../../styles/styles";
import { useTranslation } from "../../../../../translation/translationContext";
import { AccessDeniedThemeProps } from "../../../types";
import { ThemeBase } from "../themeBase";

export const AccessDeniedTheme = withOverride<React.FC<AccessDeniedThemeProps>>(
    "SessionAccessDenied",
    function AccessDeniedThemeScreen(props) {
        const t = useTranslation();
        const hasFont = hasFontDefined(props.config.rootStyle);

        return (
            <ThemeBase
                loadDefaultFont={!hasFont}
                userStyles={[props.config.rootStyle, props.config.accessDeniedScreen.style]}>
                <Fragment>
                    <div data-supertokens="headerTitle">{t("ACCESS_DENIED")}</div>
                    <div data-supertokens="headerTitle">
                        <div>Claim ID: {props.denialInfo?.validatorId}</div>
                        <div>Reason: {props.denialInfo?.reason}</div>
                    </div>
                </Fragment>
            </ThemeBase>
        );
    }
);
