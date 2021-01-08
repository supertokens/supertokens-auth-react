/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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
import React, { PureComponent } from "react";
import StyleContext from "../../../../styles/styleContext";

import { SendVerifyEmailThemeProps, SendVerifyEmailThemeState } from "../../../../../types";

/** @jsx jsx */
import { jsx } from "@emotion/react";
import EmailIcon from "../../../../../assets/emailLargeIcon";
import ArrowRightIcon from "../../../../../assets/arrowRightIcon";
import { API_RESPONSE_STATUS, SEND_VERIFY_EMAIL_STATUS } from "../../../../../constants";
import { SOMETHING_WENT_WRONG_ERROR } from "../../../../../../../constants";

/*
 * Component.
 */

export default class SendVerifyEmail extends PureComponent<SendVerifyEmailThemeProps, SendVerifyEmailThemeState> {
    static contextType = StyleContext;
    /*
     * Constructor.
     */
    constructor(props: SendVerifyEmailThemeProps) {
        super(props);
        this.state = {
            status: SEND_VERIFY_EMAIL_STATUS.READY
        };
    }

    /*
     * Methods.
     */

    onSuccess = (): void => {
        this.setState(() => ({
            status: SEND_VERIFY_EMAIL_STATUS.SUCCESS
        }));
        if (this.props.onSuccess !== undefined) {
            this.props.onSuccess();
        }
    };

    sendEmail = async (): Promise<void> => {
        const { callAPI } = this.props;
        try {
            const response = await callAPI();

            if (response.status === API_RESPONSE_STATUS.OK) {
                this.setState({
                    status: SEND_VERIFY_EMAIL_STATUS.SUCCESS
                });
                return;
            }

            this.setState({
                status: SEND_VERIFY_EMAIL_STATUS.ERROR
            });
        } catch (e) {
            this.setState({
                status: SEND_VERIFY_EMAIL_STATUS.ERROR
            });
        }
    };

    /*
     * Render.
     */
    render(): JSX.Element {
        const styles = this.context;
        const { signOut } = this.props;
        const { status } = this.state;

        return (
            <div className="container" css={styles.container}>
                <div className="row" css={styles.row}>
                    {status === SEND_VERIFY_EMAIL_STATUS.ERROR && (
                        <div className="generalError" css={styles.generalError}>
                            {SOMETHING_WENT_WRONG_ERROR}
                        </div>
                    )}
                    {status === SEND_VERIFY_EMAIL_STATUS.SUCCESS && (
                        <div className="generalSuccess" css={styles.generalSuccess}>
                            Email resent
                        </div>
                    )}
                    <div className="sendVerifyEmailIcon" css={styles.sendVerifyEmailIcon}>
                        <EmailIcon />
                    </div>
                    <div className="headerTitle headerTinyTitle" css={[styles.headerTitle, styles.headerTinyTitle]}>
                        Verify your email address
                    </div>
                    <div
                        className="primaryText sendVerifyEmailText"
                        css={[styles.primaryText, styles.sendVerifyEmailText]}>
                        <strong>Please click on the link</strong> in the email we just sent you to confirm your email
                        address.
                    </div>
                    {status !== SEND_VERIFY_EMAIL_STATUS.SUCCESS && (
                        <div
                            className="link sendVerifyEmailResend"
                            css={[styles.link, styles.sendVerifyEmailResend]}
                            onClick={this.sendEmail}>
                            Resend Email
                        </div>
                    )}
                    {
                        <div
                            className="secondaryText secondaryLinkWithArrow"
                            css={[styles.secondaryText, styles.secondaryLinkWithArrow]}
                            onClick={() => signOut()}>
                            Logout <ArrowRightIcon color={styles.palette.colors.textPrimary} />
                        </div>
                    }
                </div>
            </div>
        );
    }
}
