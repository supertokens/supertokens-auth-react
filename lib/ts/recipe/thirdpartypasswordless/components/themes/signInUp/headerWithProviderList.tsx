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
import { ThirdPartyPasswordlessSignInAndUpThemeProps } from "../../../types";
import { Header } from "./header";
import { default as ThirdPartySignInAndUp } from "../../../../thirdparty/components/features/signInAndUp";
import { SignInAndUpThemeProps as ThirdPartySignInAndUpThemeProps } from "../../../../thirdparty/types";
import { ProvidersForm } from "../../../../thirdparty/components/themes/signInAndUp/providersForm";
import { useContext } from "react";
import StyleContext from "../../../../../styles/styleContext";

export const HeaderWithProviderList: React.FC<ThirdPartyPasswordlessSignInAndUpThemeProps> = (
    props: React.PropsWithChildren<ThirdPartyPasswordlessSignInAndUpThemeProps>
) => {
    const styles = useContext(StyleContext);

    if (props.thirdPartyRecipe === undefined) {
        throw new Error("HeaderWithProviderList loaded without thirdPartyRecipe");
    }

    return (
        <React.Fragment>
            <Header />
            <ThirdPartySignInAndUp recipe={props.thirdPartyRecipe} history={history} isEmbedded={true}>
                <ProvidersForm
                    // Seed props. Real props will be given by parent feature.
                    {...({} as ThirdPartySignInAndUpThemeProps)}
                />
            </ThirdPartySignInAndUp>

            <div data-supertokens="thirdPartyPasswordlessDivider" css={styles.thirdPartyPasswordlessDivider}>
                <div data-supertokens="divider" css={styles.divider}></div>
                <div
                    data-supertokens="thirdPartyPasswordlessDividerText"
                    css={styles.thirdPartyPasswordlessDividerText}>
                    or
                </div>
                <div data-supertokens="divider" css={styles.divider}></div>
            </div>
        </React.Fragment>
    );
};
