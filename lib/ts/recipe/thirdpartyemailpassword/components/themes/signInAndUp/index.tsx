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
import { defaultPalette } from "../../../../../styles/styles";
import { getStyles } from "../styles";
import { getQueryParams, hasFontFamilyOverridden } from "../../../../../utils";

class SignInAndUpTheme extends React.PureComponent<
    ThirdPartyEmailPasswordSignInAndUpThemeProps,
    {
        isSignUp: boolean;
    }
> {
    static contextType = StyleContext;

    constructor(props: ThirdPartyEmailPasswordSignInAndUpThemeProps) {
        super(props);

        const show = getQueryParams("show");
        let isSignUp = props.config.signInAndUpFeature.defaultToSignUp;
        if (show !== null) {
            isSignUp = show === "signup";
        }

        this.state = {
            isSignUp,
        };
    }

    render(): JSX.Element {
        const styles = this.context;
        return (
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row" css={styles.row}>
                    <Header
                        isSignUp={this.state.isSignUp}
                        setIsSignUp={(isSignUp: boolean) => {
                            this.setState((oldState) => {
                                return {
                                    ...oldState,
                                    isSignUp,
                                };
                            });
                        }}
                    />
                    {this.props.thirdPartyRecipe !== undefined && (
                        <Fragment>
                            <ThirdPartySignInAndUp
                                recipe={this.props.thirdPartyRecipe}
                                history={this.props.history}
                                isEmbedded={true}>
                                <ProvidersForm
                                    // Seed props. Real props will be given by parent feature.
                                    {...({} as ThirdPartySignInAndUpThemeProps)}
                                />
                            </ThirdPartySignInAndUp>
                        </Fragment>
                    )}
                    {this.props.config.disableEmailPassword !== true && this.props.thirdPartyRecipe !== undefined && (
                        <div
                            data-supertokens="thirdPartyEmailPasswordDivider"
                            css={styles.thirdPartyEmailPasswordDivider}>
                            <div data-supertokens="divider" css={styles.divider}></div>
                            <div
                                data-supertokens="thirdPartyEmailPasswordDividerOr"
                                css={styles.thirdPartyEmailPasswordDividerOr}>
                                or
                            </div>
                            <div data-supertokens="divider" css={styles.divider}></div>
                        </div>
                    )}
                    {this.props.emailPasswordRecipe !== undefined && (
                        <EmailPasswordSignInAndUp
                            recipe={this.props.emailPasswordRecipe}
                            history={this.props.history}
                            isEmbedded={true}>
                            <EmailPasswordSignInAndUpForm
                                // Seed props. Real props will be given by parent feature.
                                {...({} as EmailPasswordSignInAndUpThemeProps)}
                                isSignUp={this.state.isSignUp}
                            />
                        </EmailPasswordSignInAndUp>
                    )}
                </div>
            </div>
        );
    }
}

export default function SignInAndUpThemeWrapper(props: ThirdPartyEmailPasswordSignInAndUpThemeProps): JSX.Element {
    const fontOverridden = hasFontFamilyOverridden(props.config.signInAndUpFeature.style);

    return (
        <ThemeBase fontOverridden={fontOverridden}>
            <StyleProvider
                rawPalette={props.config.palette}
                defaultPalette={defaultPalette}
                styleFromInit={props.config.signInAndUpFeature.style}
                getDefaultStyles={getStyles}>
                <SignInAndUpTheme {...props} />
            </StyleProvider>
        </ThemeBase>
    );
}
