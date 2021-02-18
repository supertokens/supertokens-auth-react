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
import React, { PureComponent } from "react";
import { SignUpThemeProps } from "../../../types";

import FormBase from "../../library/formBase";
import SignUpFooter from "../../../../authRecipeModule/components/themes/signInAndUp/signUpFooter";
import SignUpHeader from "./signUpHeader";
import StyleContext from "../../../../../styles/styleContext";

/*
 * Component.
 */

export function SignUpForm(
    props: SignUpThemeProps & {
        header?: JSX.Element;
        footer?: JSX.Element;
    }
): JSX.Element {
    return (
        <FormBase
            formFields={props.formFields}
            buttonLabel={"SIGN UP"}
            onSuccess={props.onSuccess}
            callAPI={props.signUpAPI}
            validateOnBlur={true}
            showLabels={true}
            header={props.header}
            footer={props.footer}
        />
    );
}

export default class SignUpTheme extends PureComponent<SignUpThemeProps> {
    static contextType = StyleContext;

    /*
     * Render.
     */
    render(): JSX.Element {
        const styles = this.context;
        return (
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row" css={styles.row}>
                    <SignUpForm
                        {...this.props}
                        header={<SignUpHeader onClick={this.props.signInClicked} />}
                        footer={
                            <SignUpFooter
                                privacyPolicyLink={this.props.privacyPolicyLink}
                                termsOfServiceLink={this.props.termsOfServiceLink}
                            />
                        }
                    />
                </div>
            </div>
        );
    }
}
