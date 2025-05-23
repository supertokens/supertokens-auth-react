/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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
import STGeneralError from "supertokens-web-js/lib/build/error";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import SuperTokens from "../../../../../superTokens";
import { useUserContext } from "../../../../../usercontext";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import { validateForm } from "../../../../../utils";
import FormBase from "../../library/formBase";
import { ThemeBase } from "../themeBase";

import type { SignUpThemeProps } from "../../../types";

export const SignUpForm = withOverride(
    "EmailPasswordSignUpForm",
    function EmailPasswordSignUpForm(
        props: SignUpThemeProps & {
            header?: JSX.Element;
            footer?: JSX.Element;
        }
    ): JSX.Element {
        const userContext = useUserContext();

        return (
            <FormBase
                formFields={props.formFields}
                clearError={props.clearError}
                onError={props.onError}
                onFetchError={props.onFetchError}
                buttonLabel={"EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN"}
                onSuccess={props.onSuccess}
                callAPI={async (formFields) => {
                    const validationErrors = await validateForm(
                        formFields,
                        props.config.signInAndUpFeature.signUpForm.formFields
                    );

                    if (validationErrors.length > 0) {
                        return {
                            status: "FIELD_ERROR",
                            formFields: validationErrors,
                        };
                    }

                    const res = await props.recipeImplementation.signUp({
                        formFields,
                        shouldTryLinkingWithSessionUser: false,
                        userContext,
                    });

                    if (res.status === "SIGN_UP_NOT_ALLOWED") {
                        throw new STGeneralError(res.reason);
                    }
                    return res;
                }}
                validateOnBlur={true}
                showLabels={true}
                footer={props.footer}
            />
        );
    }
);

function SignUpTheme(props: SignUpThemeProps): JSX.Element {
    const rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;

    const activeStyle = props.config.signInAndUpFeature.signUpForm.style;

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase userStyles={[rootStyle, props.config.recipeRootStyle, activeStyle]}>
                <SignUpForm {...props} />
            </ThemeBase>
        </UserContextWrapper>
    );
}

export default SignUpTheme;
