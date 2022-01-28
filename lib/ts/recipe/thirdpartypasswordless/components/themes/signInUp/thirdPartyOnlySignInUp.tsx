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
import * as React from "react";
import StyleContext, { StyleProvider } from "../../../../../styles/styleContext";
import { NormalisedConfig } from "../../../types";
import { ThemeBase } from "../themeBase";
import { Header } from "./header";
import { default as ThirdPartySignInAndUp } from "../../../../thirdparty/components/features/signInAndUp";
import { SignInAndUpThemeProps as ThirdPartySignInAndUpThemeProps } from "../../../../thirdparty/types";
import { ProvidersForm } from "../../../../thirdparty/components/themes/signInAndUp/providersForm";
import { defaultPalette, hasFontDefined } from "../../../../../styles/styles";
import { getStyles } from "../styles";
import ThirdParty from "../../../../thirdparty/recipe";

type ThirdPartyOnlySignInUpProps = {
    thirdPartyRecipe: ThirdParty;
    config: NormalisedConfig;
    history?: any;
};

const ThirdPartyOnlySignInUp: React.FC<ThirdPartyOnlySignInUpProps> = ({ thirdPartyRecipe, history }) => {
    const styles = React.useContext(StyleContext);

    return (
        <div data-supertokens="container" css={styles.container}>
            <div data-supertokens="row" css={styles.row}>
                <Header />
                <ThirdPartySignInAndUp recipe={thirdPartyRecipe} history={history} isEmbedded={true}>
                    <ProvidersForm
                        // Seed props. Real props will be given by parent feature.
                        {...({} as ThirdPartySignInAndUpThemeProps)}
                    />
                </ThirdPartySignInAndUp>
            </div>
        </div>
    );
};

export const ThirdPartyOnlySignInUpWrapper: React.FC<ThirdPartyOnlySignInUpProps> = ({
    thirdPartyRecipe,
    history,
    config,
}) => {
    const hasFont = hasFontDefined(config.rootStyle);

    // We can just use the providerAndEmailOrPhoneFormStyle because in this case we won't ever change screens
    return (
        <ThemeBase loadDefaultFont={!hasFont}>
            <StyleProvider
                rawPalette={config.palette}
                defaultPalette={defaultPalette}
                styleFromInit={config.signInUpFeature.providerAndEmailOrPhoneFormStyle}
                rootStyleFromInit={config.rootStyle}
                getDefaultStyles={getStyles}>
                <ThirdPartyOnlySignInUp history={history} config={config} thirdPartyRecipe={thirdPartyRecipe} />
            </StyleProvider>
        </ThemeBase>
    );
};
