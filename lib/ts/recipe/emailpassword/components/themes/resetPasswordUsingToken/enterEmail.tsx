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
import { PureComponent, Fragment } from "react";
import StyleContext from "../../../../../styles/styleContext";

import { EnterEmailThemeProps, EnterEmailThemeState } from "../../../types";

import FormBase from "../../library/formBase";

/*
 * Component.
 */

export default class EnterEmailTheme extends PureComponent<EnterEmailThemeProps, EnterEmailThemeState> {
    static contextType = StyleContext;
    /*
     * Constructor.
     */
    constructor(props: EnterEmailThemeProps) {
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
            status: "SENT",
        }));
        this.props.onSuccess();
    };

    resend = (): void => {
        this.setState(() => ({
            status: "READY",
        }));
    };

    /*
     * Render.
     */
    render(): JSX.Element {
        const styles = this.context;
        const { formFields, enterEmailAPI } = this.props;
        const { status } = this.state;

        if (status === "SENT") {
            return (
                <div data-supertokens="container" css={styles.container}>
                    <div data-supertokens="row" css={styles.row}>
                        <div
                            data-supertokens="primaryText enterEmailSuccessMessage"
                            css={[styles.primaryText, styles.enterEmailSuccessMessage]}>
                            Please check your email for the password recovery link.{" "}
                            <span data-supertokens="link" css={styles.link} onClick={this.resend}>
                                Resend
                            </span>
                        </div>
                    </div>
                </div>
            );
        }

        // Otherwise, return Form.
        return (
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row" css={styles.row}>
                    <FormBase
                        formFields={formFields}
                        buttonLabel={"Email me"}
                        onSuccess={this.onSuccess}
                        callAPI={enterEmailAPI}
                        showLabels={false}
                        validateOnBlur={true}
                        header={
                            <Fragment>
                                <div data-supertokens="headerTitle" css={styles.headerTitle}>
                                    Reset your password
                                </div>
                                <div data-supertokens="headerSubtitle" css={styles.headerSubtitle}>
                                    <div data-supertokens="secondaryText" css={styles.secondaryText}>
                                        We will send you an email to reset your password
                                    </div>
                                </div>
                            </Fragment>
                        }
                    />
                </div>
            </div>
        );
    }
}
