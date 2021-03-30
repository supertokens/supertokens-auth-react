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
import ArrowRightIcon from "../../../../../components/assets/arrowRightIcon";
import EmailLargeIcon from "../../../../../components/assets/emailLargeIcon";
import { SendVerifyEmailThemeState } from "../../../../emailpassword/types";
import { SendVerifyEmailThemeProps } from "../../../types";

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
            status: "READY",
        };
    }

    /*
     * Methods.
     */

    onSuccess = (): void => {
        this.setState(() => ({
            status: "SUCCESS",
        }));
        this.props.onSuccess();
    };

    sendEmail = async (): Promise<void> => {
        const { sendVerifyEmailAPI, onEmailAlreadyVerified } = this.props;
        try {
            const response = await sendVerifyEmailAPI();

            if (response.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
                return onEmailAlreadyVerified();
            }

            if (response.status === "OK") {
                this.setState({
                    status: "SUCCESS",
                });
                return;
            }
        } catch (e) {
            this.setState({
                status: "ERROR",
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
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row" css={styles.row}>
                    {status === "ERROR" && (
                        <div data-supertokens="generalError" css={styles.generalError}>
                            {SOMETHING_WENT_WRONG_ERROR}
                        </div>
                    )}
                    {status === "SUCCESS" && (
                        <div data-supertokens="generalSuccess" css={styles.generalSuccess}>
                            Email resent
                        </div>
                    )}
                    <div data-supertokens="sendVerifyEmailIcon" css={styles.sendVerifyEmailIcon}>
                        <EmailLargeIcon />
                    </div>
                    <div
                        data-supertokens="headerTitle headerTinyTitle"
                        css={[styles.headerTitle, styles.headerTinyTitle]}>
                        Verify your email address
                    </div>
                    <div
                        data-supertokens="primaryText sendVerifyEmailText"
                        css={[styles.primaryText, styles.sendVerifyEmailText]}>
                        <strong>Please click on the link</strong> in the email we just sent you to confirm your email
                        address.
                    </div>
                    {status !== "SUCCESS" && (
                        <div
                            data-supertokens="link sendVerifyEmailResend"
                            css={[styles.link, styles.sendVerifyEmailResend]}
                            onClick={this.sendEmail}>
                            Resend Email
                        </div>
                    )}
                    {
                        <div
                            data-supertokens="secondaryText secondaryLinkWithArrow"
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
