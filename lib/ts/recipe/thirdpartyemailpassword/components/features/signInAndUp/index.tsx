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
import * as React from "react";
import { PureComponent, Fragment } from "react";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { StyleProvider } from "../../../../../styles/styleContext";
import { defaultPalette } from "../../../../../styles/styles";
import { FeatureBaseProps } from "../../../../../types";
import { getStyles } from "../../themes/styles";
import ThirdPartyEmailPassword from "../../../thirdpartyEmailpassword";
import { ThirdPartyEmailPasswordSignInAndUpState } from "../../../types";

/*
 * Component.
 */

class SignInAndUp extends PureComponent<FeatureBaseProps, ThirdPartyEmailPasswordSignInAndUpState> {

    render = (): JSX.Element => {
        // Before session is verified, return empty fragment, prevent UI glitch.
        if (this.state.status === "LOADING") {
            return <Fragment />;
        }

        const signInAndUpFeature = ThirdPartyEmailPassword.getInstanceOrThrow().config.signInAndUpFeature;
        const useShadowDom = ThirdPartyEmailPassword.getInstanceOrThrow().config.useShadowDom;

        /*
         * Render.
         */
        return (
            <FeatureWrapper useShadowDom={useShadowDom}>
                <StyleProvider
                    rawPalette={ThirdPartyEmailPassword.getInstanceOrThrow().config.palette}
                    defaultPalette={defaultPalette}
                    styleFromInit={signInAndUpFeature.style}
                    getDefaultStyles={getStyles}>
                    <Fragment>
                        TEST
                    </Fragment>
                </StyleProvider>
            </FeatureWrapper>
        );
    };
}

export default SignInAndUp;
