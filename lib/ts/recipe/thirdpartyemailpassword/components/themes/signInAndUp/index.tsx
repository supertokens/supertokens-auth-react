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
import React, { useContext, useState } from "react";
import { Fragment } from "react";
import StyleContext, { StyleProvider } from "../../../../../styles/styleContext";
import { ThirdPartyEmailPasswordSignInAndUpThemeProps } from "../../../types";
import { ThemeBase } from "../themeBase";
import { Header } from "./header";
import { default as ThirdPartySignInAndUp } from "../../../../thirdparty/components/features/signInAndUp";
import { default as EmailPasswordSignInAndUp } from "../../../../emailpassword/components/features/signInAndUp";
import { SignInAndUpForm as EmailPasswordSignInAndUpForm } from "../../themes/signInAndUp/signInAndUpForm";
import { SignInAndUpThemeProps as ThirdPartySignInAndUpThemeProps } from "../../../../thirdparty/types";
import { SignInAndUpThemeProps as EmailPasswordSignInAndUpThemeProps } from "../../../../emailpassword/types";
import { ProvidersForm } from "../../../../thirdparty/components/themes/signInAndUp/providersForm";
import { defaultPalette, hasFontDefined } from "../../../../../styles/styles";
import { getStyles } from "../styles";
import { getQueryParams } from "../../../../../utils";
import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import { useTranslation } from "../../../../../components/translationContext";

const SignInAndUpTheme: React.FC<ThirdPartyEmailPasswordSignInAndUpThemeProps> = (props) => {
    const show = getQueryParams("show");
    let isSignUpConf = props.config.signInAndUpFeature.defaultToSignUp;
    if (show !== null) {
        isSignUpConf = show === "signup";
    }
    const [isSignUp, setIsSignUp] = useState(isSignUpConf);
    const t = useTranslation();
    const styles = useContext(StyleContext);
    return (
        <div data-supertokens="container" css={styles.container}>
            <div data-supertokens="row" css={styles.row}>
                <Header isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
                {props.thirdPartyRecipe !== undefined && (
                    <Fragment>
                        <ThirdPartySignInAndUp
                            recipe={props.thirdPartyRecipe}
                            history={props.history}
                            isEmbedded={true}>
                            <ProvidersForm
                                // Seed props. Real props will be given by parent feature.
                                {...({} as ThirdPartySignInAndUpThemeProps)}
                            />
                        </ThirdPartySignInAndUp>
                    </Fragment>
                )}
                {props.config.disableEmailPassword !== true && props.thirdPartyRecipe !== undefined && (
                    <div data-supertokens="thirdPartyEmailPasswordDivider" css={styles.thirdPartyEmailPasswordDivider}>
                        <div data-supertokens="divider" css={styles.divider}></div>
                        <div
                            data-supertokens="thirdPartyEmailPasswordDividerOr"
                            css={styles.thirdPartyEmailPasswordDividerOr}>
                            {t("THIRD_PARTY_EMAIL_PASSWORD_SIGN_IN_AND_UP_DIVIDER_OR")}
                        </div>
                        <div data-supertokens="divider" css={styles.divider}></div>
                    </div>
                )}
                {props.emailPasswordRecipe !== undefined && (
                    <EmailPasswordSignInAndUp
                        recipe={props.emailPasswordRecipe}
                        history={props.history}
                        isEmbedded={true}>
                        <EmailPasswordSignInAndUpForm
                            // Seed props. Real props will be given by parent feature.
                            {...({} as EmailPasswordSignInAndUpThemeProps)}
                            isSignUp={isSignUp}
                        />
                    </EmailPasswordSignInAndUp>
                )}
            </div>
            <SuperTokensBranding />
        </div>
    );
};

export default function SignInAndUpThemeWrapper(props: ThirdPartyEmailPasswordSignInAndUpThemeProps): JSX.Element {
    const hasFont = hasFontDefined(props.config.rootStyle);

    return (
        <ThemeBase loadDefaultFont={!hasFont}>
            <StyleProvider
                rawPalette={props.config.palette}
                defaultPalette={defaultPalette}
                styleFromInit={props.config.signInAndUpFeature.style}
                rootStyleFromInit={props.config.rootStyle}
                getDefaultStyles={getStyles}>
                <SignInAndUpTheme {...props} />
            </StyleProvider>
        </ThemeBase>
    );
}
