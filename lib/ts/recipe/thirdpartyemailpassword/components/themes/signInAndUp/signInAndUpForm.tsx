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
import { SignUpFooter } from "../../../../emailpassword/components/themes/signInAndUp/signUpFooter";
import { SignInFooter } from "../../../../emailpassword/components/themes/signInAndUp/signInFooter";
import { SignInForm } from "../../../../emailpassword/components/themes/signInAndUp/signInForm";
import { SignUpForm } from "../../../../emailpassword/components/themes/signInAndUp/signUpForm";
import { SignInAndUpThemeProps as EmailPasswordSignInAndUpThemeProps } from "../../../../emailpassword/types";
import { withOverride } from "../../../../../components/componentOverride/withOverride";

/*
 * Component.
 */
// We could actually remove this component
export const SignInAndUpForm = withOverride(
    "ThirdPartyEmailPasswordSignInAndUpForm",
    function ThirdPartyEmailPasswordSignInAndUpForm(props: EmailPasswordSignInAndUpThemeProps): JSX.Element {
        /*
         * Render.
         */

        if (props.featureState.isSignUp === true) {
            return (
                <SignUpForm
                    {...props.signUpForm}
                    footer={
                        <SignUpFooter
                            privacyPolicyLink={props.config.signInAndUpFeature.signUpForm.privacyPolicyLink}
                            termsOfServiceLink={props.config.signInAndUpFeature.signUpForm.termsOfServiceLink}
                        />
                    }
                />
            );
        } else {
            return (
                <SignInForm
                    {...props.signInForm}
                    footer={<SignInFooter onClick={props.signInForm.forgotPasswordClick} />}
                />
            );
        }
    }
);
