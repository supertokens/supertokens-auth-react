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
import { PureComponent } from "react";
import { SOMETHING_WENT_WRONG_ERROR } from "../../../../../constants";

import StyleContext from "../../../../../styles/styleContext";
import ArrowLeftIcon from "../../../../../components/assets/arrowLeftIcon";
import EmailLargeIcon from "../../../../../components/assets/emailLargeIcon";
import { LinkEmailSentThemeProps } from "../../../types";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { ResendButton } from "./resendButton";
import SMSLargeIcon from "../../../../../components/assets/smsLargeIcon";

type LinkEmailSentState = {
    status: "READY" | "EMAIL_RESENT" | "ERROR";
    resendNotifTimeout?: any;
};

/*
 * Component.
 */

class PasswordlessLinkSent extends PureComponent<LinkEmailSentThemeProps, LinkEmailSentState> {
    static contextType = StyleContext;

    constructor(props: LinkEmailSentThemeProps) {
        super(props);

        this.state = {
            status: props.error !== undefined ? "ERROR" : "READY",
        };
    }

    componentWillUnmount() {
        if (this.state.resendNotifTimeout) {
            clearTimeout(this.state.resendNotifTimeout);
        }
    }

    resendEmail = async (): Promise<void> => {
        try {
            const response = await this.props.recipeImplementation.resendCode({
                deviceId: this.props.loginAttemptInfo.deviceId,
                preAuthSessionId: this.props.loginAttemptInfo.preAuthSessionId,
                config: this.props.config,
            });

            if (response.status === "OK") {
                this.setState(() => ({
                    status: "EMAIL_RESENT",
                    resendNotifTimeout: setTimeout(() => {
                        this.setState((os) => (os.status === "EMAIL_RESENT" ? { ...os, status: "READY" } : os));
                    }, 2000),
                }));
            } else {
                this.setState({
                    status: "ERROR",
                });
            }
        } catch (e) {
            this.setState({
                status: "ERROR",
            });
        }
    };

    render(): JSX.Element {
        const styles = this.context;
        const { status } = this.state;

        const resendActive = status === "EMAIL_RESENT";

        return (
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row" css={styles.row}>
                    {status === "ERROR" && (
                        <div data-supertokens="generalError" css={styles.generalError}>
                            {SOMETHING_WENT_WRONG_ERROR}
                        </div>
                    )}
                    {resendActive && (
                        <div data-supertokens="generalSuccess" css={styles.generalSuccess}>
                            Link resent
                        </div>
                    )}
                    <div data-supertokens="sendCodeIcon" css={styles.sendCodeIcon}>
                        {this.props.loginAttemptInfo.contactMethod === "EMAIL" ? <EmailLargeIcon /> : <SMSLargeIcon />}
                    </div>
                    <div
                        data-supertokens="headerTitle headerTinyTitle"
                        css={[styles.headerTitle, styles.headerTinyTitle]}>
                        Link sent!
                    </div>
                    <div data-supertokens="primaryText sendCodeText" css={[styles.primaryText, styles.sendCodeText]}>
                        We sent a link to
                        {this.props.loginAttemptInfo.contactMethod === "EMAIL" ? "" : " your mobile number"}
                        <br />
                        <strong>{this.props.loginAttemptInfo.contactInfo}</strong>
                        <br />
                        Click the link to login or sign up
                    </div>
                    {status !== "EMAIL_RESENT" && (
                        <ResendButton
                            loginAttemptInfo={this.props.loginAttemptInfo}
                            resendCodeTimeGap={this.props.config.resendCodeTimeGap}
                            target={"link"}
                            onClick={this.resendEmail}
                        />
                    )}
                    {
                        <div
                            data-supertokens="secondaryText secondaryLinkWithLeftArrow"
                            css={[styles.secondaryText, styles.secondaryLinkWithLeftArrow]}
                            onClick={() => this.props.recipeImplementation.clearLoginAttemptInfo()}>
                            <ArrowLeftIcon color={styles.palette.colors.textPrimary} /> Change{" "}
                            {this.props.loginAttemptInfo.contactMethod === "EMAIL" ? "email" : "phone number"}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export const LinkSent = withOverride("PasswordlessLinkSent", PasswordlessLinkSent);
