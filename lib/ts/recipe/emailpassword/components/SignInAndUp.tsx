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
import * as React from "react";
import { ST_ROOT_CONTAINER } from "../../../constants";
import { EmailPasswordProps } from '../types';
import EmailPassword from "../emailPassword";
import {SignInAndUpTheme} from '..';
import root from 'react-shadow/emotion';
import { defaultStyles } from "../../../styles/styles";
/** @jsx jsx */
import { jsx } from '@emotion/core';

/*
 * Component.
 */

export default class SignInAndUp extends React.Component<EmailPasswordProps> {
    getRecipeInstanceOrThrow = () => {
		let instance;
		if (this.props.__internal !== undefined && this.props.__internal.instance !== undefined) {
			instance = this.props.__internal.instance;
		} else {
			instance = EmailPassword.getInstanceOrThrow();
		}
		return instance;
    }

    render () {

        const signUpFeature = this.getRecipeInstanceOrThrow().getSignUpFeature();
        const privacyPolicyLink = signUpFeature.getPrivacyPolicyLink();
        const termsAndConditionsLink = signUpFeature.getTermsAndConditionsLink();
        const signUpFormFields = signUpFeature.getFormFields();

        const signInFeature = this.getRecipeInstanceOrThrow().getSignInFeature();
        const resetPasswordURL = signInFeature.getResetPasswordURL();
        const signInFormFields = signInFeature.getFormFields();

        return (
            <root.div css={defaultStyles.root} id={ST_ROOT_CONTAINER}>

                <SignInAndUpTheme

                    signInForm={{
                        formFields: signInFormFields,
                        resetPasswordURL
                    }}

                    signUpForm={{
                        formFields: signUpFormFields,
                        privacyPolicyLink,
                        termsAndConditionsLink
                    }}

                />

            </root.div>
        );
    }

}
