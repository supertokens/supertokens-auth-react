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

/** @jsx jsx */
import { jsx } from "@emotion/react";
import { VerifyEmailLinkClickedThemeProps, VerifyEmailLinkClickedThemeState } from "../../../../../types";
import SpinnerIcon from "../../../../../assets/spinnerIcon";
import { VERIFY_EMAIL_LINK_CLICKED_STATUS } from "../../../../../constants";
import ErrorLargeIcon from "../../../../../assets/errorLargeIcon";
import ArrowRightIcon from "../../../../../assets/arrowRightIcon";
import { Button } from "../../../../library";
import CheckedRoundIcon from "../../../../../assets/checkedRoundIcon";

/*
 * Component.
 */

export default class VerifyEmailLinkClickedTheme extends PureComponent<
    VerifyEmailLinkClickedThemeProps,
    VerifyEmailLinkClickedThemeState
> {
    static contextType = StyleContext;

    /*
     * Constructor.
     */
    constructor(props: VerifyEmailLinkClickedThemeProps) {
        super(props);
        this.state = {
            status: VERIFY_EMAIL_LINK_CLICKED_STATUS.LOADING
        };
    }

    onSuccess = (): void => {
        this.setState(() => ({
            status: VERIFY_EMAIL_LINK_CLICKED_STATUS.SUCCESSFUL
        }));

        if (this.props.onSuccess !== undefined) {
            this.props.onSuccess();
        }
    };

    componentDidMount = async (): Promise<void> => {
        const response = await this.props.callAPI();
        this.setState(() => ({
            status: response.status
        }));
        return;
    };

    /*
     * Render.
     */

    render(): JSX.Element {
        const styles = this.context;
        const { status } = this.state;
        const { redirectToVerifyEmailScreen, onContinueClicked } = this.props;

        if (status === VERIFY_EMAIL_LINK_CLICKED_STATUS.LOADING) {
            return (
                <div className="container" css={styles.container}>
                    <div className="row" css={styles.row}>
                        <div className="spinner" css={styles.spinner}>
                            <SpinnerIcon color={styles.palette.colors.primary} />
                        </div>
                    </div>
                </div>
            );
        }

        if (status === VERIFY_EMAIL_LINK_CLICKED_STATUS.SUCCESSFUL) {
            return (
                <div className="container" css={styles.container}>
                    <div className="row noFormRow" css={[styles.row, styles.noFormRow]}>
                        <CheckedRoundIcon color={styles.palette.colors.success} />
                        <div className="headerTitle headerTinyTitle" css={[styles.headerTitle, styles.headerTinyTitle]}>
                            Email verification successful!
                        </div>
                        <div className="emailVerificationButtonWrapper" css={styles.emailVerificationButtonWrapper}>
                            <Button isLoading={false} onClick={onContinueClicked} type="button" label={"CONTINUE"} />
                        </div>
                    </div>
                </div>
            );
        }

        if (status === VERIFY_EMAIL_LINK_CLICKED_STATUS.INVALID) {
            return (
                <div className="container" css={styles.container}>
                    <div className="row noFormRow" css={[styles.row, styles.noFormRow]}>
                        <div className="headerTitle headerTinyTitle" css={[styles.headerTitle, styles.headerTinyTitle]}>
                            The email verification link has expired
                        </div>
                        <div
                            onClick={redirectToVerifyEmailScreen}
                            className="secondaryText secondaryLinkWithArrow"
                            css={[styles.secondaryText, styles.secondaryLinkWithArrow]}>
                            Continue <ArrowRightIcon color={styles.palette.colors.textPrimary} />
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container" css={styles.container}>
                <div className="row noFormRow" css={[styles.row, styles.noFormRow]}>
                    <div className="headerTitle error" css={[styles.headerTitle, styles.error]}>
                        <ErrorLargeIcon color={styles.palette.colors.error} /> Something went wrong
                    </div>
                    <div className="secondaryText" css={styles.primaryText}>
                        We encountered an unexpected error. Please contact support for assistance
                    </div>
                </div>
            </div>
        );
    }
}
