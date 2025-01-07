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

import { Fragment } from "react";
import STGeneralError from "supertokens-web-js/utils/error";

import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useUserContext } from "../../../../../usercontext";
import { getProviderLogo } from "../../../constants";
import { redirectToThirdPartyLogin } from "../../../utils";

import type { SignInAndUpThemeProps } from "../../../types";

export const ThirdPartySignInAndUpProvidersForm: React.FC<SignInAndUpThemeProps> = (props) => {
    const userContext = useUserContext();

    const signInClick = async (providerId: string): Promise<void> => {
        try {
            let response;
            let generalError: STGeneralError | undefined;

            try {
                response = await redirectToThirdPartyLogin({
                    recipeImplementation: props.recipeImplementation,
                    thirdPartyId: providerId,
                    config: props.config,
                    shouldTryLinkingWithSessionUser: false,
                    userContext,
                });
            } catch (e) {
                if (STGeneralError.isThisError(e)) {
                    generalError = e;
                } else {
                    throw e;
                }
            }

            if (generalError !== undefined) {
                props.onError(generalError.message);
            } else {
                if (response === undefined) {
                    throw new Error("Should not come here");
                }

                if (response.status === "ERROR") {
                    props.onError("SOMETHING_WENT_WRONG_ERROR");
                }
            }
        } catch (err) {
            props.onError("SOMETHING_WENT_WRONG_ERROR");
        }
    };

    return (
        <Fragment>
            {props.providers.map((provider) => {
                return (
                    <div key={`provider-${provider.id}`} data-supertokens="providerContainer">
                        <span onClick={() => signInClick(provider.id)}>
                            {provider.getButton(undefined, getProviderLogo(provider.id, provider.name))}
                        </span>
                    </div>
                );
            })}
        </Fragment>
    );
};

export const ProvidersForm = withOverride("ThirdPartySignInAndUpProvidersForm", ThirdPartySignInAndUpProvidersForm);
