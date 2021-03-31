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
import * as React from "react";
import { SignInAndUpThemeProps } from "../../../types";

import SignUp from "./signUp";
import SignIn from "./signIn";
import { ThemeBase } from "../themeBase";
import { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette } from "../../../../../styles/styles";
import { getStyles } from "../styles/styles";
import { getWindowOrThrow } from "../../../../../utils";

/*
 * Component.
 */
export class SignInAndUpTheme extends React.PureComponent<
    SignInAndUpThemeProps,
    {
        isSignUp: boolean;
    }
> {
    constructor(props: SignInAndUpThemeProps) {
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
        // If isSignUp, return signUp.
        if (this.state.isSignUp) {
            return (
                <StyleProvider
                    rawPalette={this.props.rawPalette}
                    defaultPalette={defaultPalette}
                    styleFromInit={this.props.signUpForm.styleFromInit}
                    getDefaultStyles={getStyles}>
                    <SignUp
                        {...this.props.signUpForm}
                        signInClicked={() => {
                            this.setState((oldState) => {
                                return {
                                    ...oldState,
                                    isSignUp: false,
                                };
                            });
                        }}
                    />
                </StyleProvider>
            );
        }

        // Otherwise, return SignIn.
        return (
            <StyleProvider
                rawPalette={this.props.rawPalette}
                defaultPalette={defaultPalette}
                styleFromInit={this.props.signInForm.styleFromInit}
                getDefaultStyles={getStyles}>
                <SignIn
                    {...this.props.signInForm}
                    signUpClicked={() => {
                        this.setState((oldState) => {
                            return {
                                ...oldState,
                                isSignUp: true,
                            };
                        });
                    }}
                />
            </StyleProvider>
        );
    }
}

function SignInAndUpThemeWrapper(props: SignInAndUpThemeProps): JSX.Element {
    return (
        <ThemeBase>
            <SignInAndUpTheme {...props} />
        </ThemeBase>
    );
}

export default SignInAndUpThemeWrapper;
