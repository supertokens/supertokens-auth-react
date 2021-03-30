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
import ArrowRightIcon from "../../../../../components/assets/arrowRightIcon";
import CheckedRoundIcon from "../../../../../components/assets/checkedRoundIcon";
import ErrorLargeIcon from "../../../../../components/assets/errorLargeIcon";
import SpinnerIcon from "../../../../../components/assets/spinnerIcon";
import StyleContext from "../../../../../styles/styleContext";
import { Button } from "../../../../emailpassword/components/library";

import { VerifyEmailLinkClickedThemeProps, VerifyEmailLinkClickedThemeState } from "../../../types";

/*
 * Component.
 */

export default class VerifyEmailLinkClicked extends PureComponent<
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
            status: "LOADING",
        };
    }

    onSuccess = (): void => {
        this.setState(() => ({
            status: "SUCCESSFUL",
        }));

        this.props.onSuccess();
    };

    componentDidMount = async (): Promise<void> => {
        try {
            const response = await this.props.verifyEmailAPI();
            this.setState(() => ({
                status: response.status,
            }));
        } catch (e) {
            this.setState(() => ({
                status: "GENERAL_ERROR",
            }));
        }
    };

    /*
     * Render.
     */

    render(): JSX.Element {
        const styles = this.context;
        const { status } = this.state;
        const { onTokenInvalidRedirect, onContinueClicked } = this.props;

        if (status === "LOADING") {
            return (
                <div data-supertokens="container" css={styles.container}>
                    <div data-supertokens="row" css={styles.row}>
                        <div data-supertokens="spinner" css={styles.spinner}>
                            <SpinnerIcon color={styles.palette.colors.primary} />
                        </div>
                    </div>
                </div>
            );
        }

        if (status === "SUCCESSFUL") {
            return (
                <div data-supertokens="container" css={styles.container}>
                    <div data-supertokens="row noFormRow" css={[styles.row, styles.noFormRow]}>
                        <CheckedRoundIcon color={styles.palette.colors.success} />
                        <div
                            data-supertokens="headerTitle headerTinyTitle"
                            css={[styles.headerTitle, styles.headerTinyTitle]}>
                            Email verification successful!
                        </div>
                        <div
                            data-supertokens="emailVerificationButtonWrapper"
                            css={styles.emailVerificationButtonWrapper}>
                            <Button isLoading={false} onClick={onContinueClicked} type="button" label={"CONTINUE"} />
                        </div>
                    </div>
                </div>
            );
        }

        if (status === "INVALID") {
            return (
                <div data-supertokens="container" css={styles.container}>
                    <div data-supertokens="row noFormRow" css={[styles.row, styles.noFormRow]}>
                        <div
                            data-supertokens="headerTitle headerTinyTitle"
                            css={[styles.headerTitle, styles.headerTinyTitle]}>
                            The email verification link has expired
                        </div>
                        <div
                            onClick={onTokenInvalidRedirect}
                            data-supertokens="secondaryText secondaryLinkWithArrow"
                            css={[styles.secondaryText, styles.secondaryLinkWithArrow]}>
                            Continue <ArrowRightIcon color={styles.palette.colors.textPrimary} />
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row noFormRow" css={[styles.row, styles.noFormRow]}>
                    <div data-supertokens="headerTitle error" css={[styles.headerTitle, styles.error]}>
                        <ErrorLargeIcon color={styles.palette.colors.error} /> Something went wrong
                    </div>
                    <div data-supertokens="primaryText" css={styles.primaryText}>
                        We encountered an unexpected error. Please contact support for assistance
                    </div>
                </div>
            </div>
        );
    }
}
