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
/*
 * Imports.
 */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext } from "react";
import StyleContext from "../../../../../styles/styleContext";
import { hasFontDefined } from "../../../../../styles/styles";
import { SignUpFooter } from "./signUpFooter";
import { SignInAndUpThemeProps } from "../../../types";
import { ThemeBase } from "../themeBase";
import { ProvidersForm } from "./providersForm";
import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import { useTranslation } from "../../../../..";

/*
 * Component.
 */

function SignInAndUpTheme(props: SignInAndUpThemeProps): JSX.Element {
    const t = useTranslation();
    const styles = useContext(StyleContext);
    const hasFont = hasFontDefined(props.config.rootStyle);

    return (
        <ThemeBase loadDefaultFont={!hasFont}>
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row" css={styles.row}>
                    <div data-supertokens="headerTitle" css={styles.headerTitle}>
                        {t("THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE")}
                    </div>
                    <div data-supertokens="divider" css={styles.divider}></div>
                    <ProvidersForm {...props} />
                    <SignUpFooter
                        privacyPolicyLink={props.config.signInAndUpFeature.privacyPolicyLink}
                        termsOfServiceLink={props.config.signInAndUpFeature.termsOfServiceLink}
                    />
                </div>
                <SuperTokensBranding />
            </div>
        </ThemeBase>
    );
}

export default SignInAndUpTheme;
