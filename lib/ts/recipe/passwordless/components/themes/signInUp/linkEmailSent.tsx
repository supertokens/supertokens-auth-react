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
import { ResendLinkButton } from "./resendLinkButton";

type LinkEmailSentState = {
    status: "READY" | "EMAIL_RESENT" | "ERROR";
    secsUntilResendEnabled?: number;
    resendNotifTimeout?: any;
};

/*
 * Component.
 */

class PasswordlessLinkEmailSent extends PureComponent<LinkEmailSentThemeProps, LinkEmailSentState> {
    static contextType = StyleContext;

    constructor(props: LinkEmailSentThemeProps) {
        super(props);

        this.state = {
            status: "READY",
        };
    }

    componentWillUnmount() {
        if (this.state.resendNotifTimeout) {
            clearTimeout(this.state.resendNotifTimeout);
        }
    }

    resendEmail = async (): Promise<void> => {
        try {
            const response = await this.props.recipeImplementation.createCode({
                deviceId: this.props.loginAttemptInfo.deviceId,
                preAuthSessionId: this.props.loginAttemptInfo.preAuthSessionId,
                config: this.props.config,
            });

            if (response.status === "OK") {
                this.setState(() => ({
                    status: "EMAIL_RESENT",
                    resendNotifTimeout: setTimeout(() => {
                        this.setState((os) => (os.status === "EMAIL_RESENT" ? { ...os, status: "READY" } : os));
                    }, 2000), // We need this cast because for some reason this also has the node types loaded
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
                    <div data-supertokens="sendCodeEmailIcon" css={styles.sendCodeEmailIcon}>
                        <EmailLargeIcon />
                    </div>
                    <div
                        data-supertokens="headerTitle headerTinyTitle"
                        css={[styles.headerTitle, styles.headerTinyTitle]}>
                        Link sent!
                    </div>
                    <div
                        data-supertokens="primaryText sendCodeEmailText"
                        css={[styles.primaryText, styles.sendCodeEmailText]}>
                        We sent a link to <strong>{this.props.loginAttemptInfo.contactInfo}</strong>. Click the link to
                        login or sign up
                    </div>
                    {status !== "EMAIL_RESENT" && (
                        <ResendLinkButton
                            loginAttemptInfo={this.props.loginAttemptInfo}
                            resendCodeTimeGap={this.props.config.resendCodeTimeGap}
                            onClick={this.resendEmail}
                        />
                    )}
                    {
                        <div
                            data-supertokens="secondaryText secondaryLinkWithArrow"
                            css={[styles.secondaryText, styles.secondaryLinkWithArrow]}
                            onClick={() => this.props.recipeImplementation.clearLoginAttemptInfo()}>
                            <ArrowLeftIcon color={styles.palette.colors.textPrimary} /> Change{" "}
                            {this.props.loginAttemptInfo.contactInfoType === "EMAIL" ? "email" : "phone number"}{" "}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export const LinkEmailSent = withOverride("PasswordlessLinkEmailSent", PasswordlessLinkEmailSent);
