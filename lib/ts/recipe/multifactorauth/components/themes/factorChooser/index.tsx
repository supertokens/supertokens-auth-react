/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import { hasFontDefined } from "../../../../../styles/styles";
import { useTranslation } from "../../../../../translation/translationContext";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import { AccessDeniedScreen } from "../../../../session/prebuiltui";
import { ThemeBase } from "../themeBase";

import { FactorChooserFooter } from "./factorChooserFooter";
import { FactorChooserHeader } from "./factorChooserHeader";
import { FactorList } from "./factorList";

import type { FactorChooserThemeProps } from "../../../types";

export function FactorChooserTheme(props: FactorChooserThemeProps): JSX.Element {
    const t = useTranslation();
    if (props.availableFactors.length === 0) {
        return (
            <AccessDeniedScreen
                useShadowDom={props.config.useShadowDom}
                error={props.showBackButton ? t("MFA_NO_AVAILABLE_OPTIONS") : t("MFA_NO_AVAILABLE_OPTIONS_LOGIN")}
            />
        );
    }
    return (
        <div data-supertokens="container">
            <FactorChooserHeader
                onBackButtonClicked={props.onBackButtonClicked}
                showBackButton={props.showBackButton}
            />
            <FactorList
                availableFactors={props.availableFactors}
                mfaInfo={props.mfaInfo}
                navigateToFactor={props.navigateToFactor}
            />
            <FactorChooserFooter logout={props.onLogoutClicked} />
            <SuperTokensBranding />
        </div>
    );
}

function FactorChooserThemeWrapper(props: FactorChooserThemeProps): JSX.Element {
    const hasFont = hasFontDefined(props.config.rootStyle);

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase
                loadDefaultFont={!hasFont}
                userStyles={[props.config.rootStyle, props.config.factorChooserScreen.style]}>
                <FactorChooserTheme {...props} />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default FactorChooserThemeWrapper;
