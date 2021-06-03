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
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext } from "react";
import { SignUpThemeProps } from "../../../types";

import SignUpFooter from "./signUpFooter";
import SignUpHeader from "./signUpHeader";
import StyleContext from "../../../../../styles/styleContext";
import SignUpForm from "./signUpForm";
import { withOverride } from "../../../../withOverride";

export default withOverride("EmailPasswordSignUp", function EmailPasswordSignUp(props: SignUpThemeProps) {
    const styles = useContext(StyleContext);

    return (
        <div data-supertokens="container" css={styles.container}>
            <div data-supertokens="row" css={styles.row}>
                <SignUpForm
                    {...props}
                    header={<SignUpHeader onClick={props.signInClicked} />}
                    footer={
                        <SignUpFooter
                            privacyPolicyLink={props.config.signInAndUpFeature.signUpForm.privacyPolicyLink}
                            termsOfServiceLink={props.config.signInAndUpFeature.signUpForm.termsOfServiceLink}
                        />
                    }
                />
            </div>
        </div>
    );
});
