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

/** @jsx jsx */
import { jsx } from "@emotion/react";
import { PureComponent, Fragment } from "react";
import StyleContext from "../../../../../styles/styleContext";
import { SignInAndUpThemeProps } from "../../../types";

export default class SignInAndUpProvidersForm extends PureComponent<SignInAndUpThemeProps, { error?: string }> {
    static contextType = StyleContext;

    constructor(props: SignInAndUpThemeProps) {
        super(props);
        if (this.props.error !== undefined) {
            this.state = {
                error: this.props.error,
            };
        } else {
            this.state = {};
        }
    }

    componentDidUpdate() {
        if (this.props.error !== undefined) {
            this.setState(() => ({
                error: this.props.error,
            }));
        }
    }

    signInClick = async (providerId: string): Promise<void> => {
        try {
            const response = await this.props.recipeImplementation.redirectToThirdPartyLogin({
                thirdPartyId: providerId,
                config: this.props.config,
            });
            if (response.status === "ERROR") {
                this.setState(() => ({
                    error: "Something went wrong. Please try again",
                }));
            }
        } catch (err) {
            this.setState(() => ({
                error: "Something went wrong. Please try again",
            }));
        }
    };

    render = (): JSX.Element => {
        const styles = this.context;

        return (
            <Fragment>
                {this.state.error !== undefined ? (
                    <div data-supertokens="generalError" css={styles.generalError}>
                        {this.state.error}
                    </div>
                ) : null}
                {this.props.providers.map((provider) => {
                    return (
                        <div
                            key={`provider-${provider.id}`}
                            style={styles.providerContainer}
                            data-supertokens="providerContainer">
                            <span onClick={() => this.signInClick(provider.id)}>{provider.buttonComponent}</span>
                        </div>
                    );
                })}
            </Fragment>
        );
    };
}
