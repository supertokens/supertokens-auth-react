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
import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding";
import { hasFontDefined } from "../../../../../styles/styles";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper";
import GeneralError from "../../../../emailpassword/components/library/generalError";
import { ThemeBase } from "../themeBase";

import { ProvidersForm } from "./providersForm";
import { SignInAndUpHeader } from "./signInAndUpHeader";
import { SignUpFooter } from "./signUpFooter";

import type { SignInAndUpThemeProps } from "../../../types";

const SignInAndUpTheme: React.FC<SignInAndUpThemeProps> = (props) => {
    return (
        <div data-supertokens="container">
            <div data-supertokens="row">
                <SignInAndUpHeader />

                <div data-supertokens="divider"></div>

                {props.featureState.error && <GeneralError error={props.featureState.error} />}

                <ProvidersForm {...props} />

                <SignUpFooter
                    privacyPolicyLink={props.config.signInAndUpFeature.privacyPolicyLink}
                    termsOfServiceLink={props.config.signInAndUpFeature.termsOfServiceLink}
                />
            </div>
            <SuperTokensBranding />
        </div>
    );
};

const SignInAndUpThemeWrapper: React.FC<SignInAndUpThemeProps> = (
    props: SignInAndUpThemeProps & {
        userContext?: any;
    }
) => {
    const hasFont = hasFontDefined(props.config.rootStyle);

    return (
        <UserContextWrapper userContext={props.userContext}>
            <ThemeBase
                loadDefaultFont={!hasFont}
                userStyles={[props.config.rootStyle, props.config.signInAndUpFeature.style]}>
                <SignInAndUpTheme {...props} />
            </ThemeBase>
        </UserContextWrapper>
    );
};

export default SignInAndUpThemeWrapper;
