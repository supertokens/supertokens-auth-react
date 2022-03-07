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
import { Fragment, useContext } from "react";
import StyleContext from "../../../../../styles/styleContext";
import { SignInAndUpThemeProps } from "../../../types";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { redirectToThirdPartyLogin } from "../../../utils";
import STGeneralError from "supertokens-web-js/lib/build/error";
import { useUserContext } from "../../../../../usercontext";

export const ThirdPartySignInAndUpProvidersForm: React.FC<SignInAndUpThemeProps> = (props) => {
    const styles = useContext(StyleContext);
    const userContext = useUserContext();

    const signInClick = async (providerId: string): Promise<void> => {
        try {
            const response = await redirectToThirdPartyLogin({
                recipeImplementation: props.recipeImplementation,
                thirdPartyId: providerId,
                config: props.config,
                userContext,
            });
            if (response.status === "ERROR") {
                props.dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
            }
        } catch (err) {
            if (STGeneralError.isThisError(err)) {
                props.dispatch({
                    type: "setError",
                    error: err.message,
                });
            }

            props.dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
        }
    };

    return (
        <Fragment>
            {props.providers.map((provider) => {
                return (
                    <div
                        key={`provider-${provider.id}`}
                        css={styles.providerContainer}
                        data-supertokens="providerContainer">
                        <span onClick={() => signInClick(provider.id)}>{provider.buttonComponent}</span>
                    </div>
                );
            })}
        </Fragment>
    );
};

export const ProvidersForm = withOverride("ThirdPartySignInAndUpProvidersForm", ThirdPartySignInAndUpProvidersForm);
