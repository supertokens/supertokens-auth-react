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
import Header from "./header";
import { default as ThirdPartySignInAndUp } from "../../../../thirdparty/components/features/signInAndUp";
import { default as EmailPasswordSignInAndUp } from "../../../../emailpassword/components/features/signInAndUp";
import EmailPasswordSignInAndUpForm from "../../themes/signInAndUp/signInAndUpForm";
import { SignInAndUpThemeProps as ThirdPartySignInAndUpThemeProps } from "../../../../thirdparty/types";
import { SignInAndUpThemeProps as EmailPasswordSignInAndUpThemeProps } from "../../../../emailpassword/types";
import SignInAndUpProvidersForm from "../../../../thirdparty/components/themes/signInAndUp/providersForm";
import { defaultPalette } from "../../../../../styles/styles";
import { getStyles } from "../styles";
import { getWindowOrThrow } from "../../../../../utils";

class SignInAndUpTheme extends React.PureComponent<
    ThirdPartyEmailPasswordSignInAndUpThemeProps,
    {
        isSignUp: boolean;
    }
> {
    static contextType = StyleContext;

    constructor(props: ThirdPartyEmailPasswordSignInAndUpThemeProps) {
        super(props);

        const urlParams = new URLSearchParams(getWindowOrThrow().location.search);
        const show = urlParams.get("show");
        let isSignUp = props.defaultToSignUp;
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
                    {this.props.hideThirdParty !== true && (
                        <Fragment>
                            <ThirdPartySignInAndUp
                                history={this.props.history}
                                recipeId={this.props.recipeId}
                                isEmbedded={true}>
                                <SignInAndUpProvidersForm
                                    // Seed props. Real props will be given by parent feature.
                                    {...({} as ThirdPartySignInAndUpThemeProps)}
                                />
                            </ThirdPartySignInAndUp>
                        </Fragment>
                    )}
                    {this.props.hideEmailPassword !== true && this.props.hideThirdParty !== true && (
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
                    {this.props.hideEmailPassword !== true && (
                        <EmailPasswordSignInAndUp
                            history={this.props.history}
                            recipeId={this.props.recipeId}
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
    return (
        <ThemeBase>
            <StyleProvider
                rawPalette={props.rawPalette}
                defaultPalette={defaultPalette}
                styleFromInit={props.styleFromInit}
                getDefaultStyles={getStyles}>
                <SignInAndUpTheme {...props} />
            </StyleProvider>
        </ThemeBase>
    );
}
