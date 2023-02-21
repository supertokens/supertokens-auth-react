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

import STGeneralError from "supertokens-web-js/utils/error";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useUserContext } from "../../../../../usercontext";
import { validateForm } from "../../../../../utils";
import FormBase from "../../library/formBase";

import type { SignInThemeProps } from "../../../types";

export const SignInForm = withOverride(
    "EmailPasswordSignInForm",
    function EmailPasswordSignInForm(
        props: SignInThemeProps & {
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
                buttonLabel={"EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN"}
                onSuccess={props.onSuccess}
                callAPI={async (formFields) => {
                    const validationErrors = await validateForm(
                        formFields,
                        props.config.signInAndUpFeature.signInForm.formFields
                    );

                    if (validationErrors.length > 0) {
                        return {
                            status: "FIELD_ERROR",
                            formFields: validationErrors,
                        };
                    }

                    const response = await props.recipeImplementation.signIn({
                        formFields,
                        userContext,
                    });
                    if (response.status === "WRONG_CREDENTIALS_ERROR") {
                        throw new STGeneralError("EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR");
                    } else {
                        return response;
                    }
                }}
                validateOnBlur={false}
                showLabels={true}
                footer={props.footer}
            />
        );
    }
);
