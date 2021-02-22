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
import { NormalisedThirdPartyEmailPasswordConfig, ThirdPartyEmailPasswordConfig } from "./types";

import { normaliseEmailPasswordConfig } from "../emailpassword/utils";
import { normaliseThirdPartyConfig } from "../thirdparty/utils";
import { ThirdPartyConfig } from "../thirdparty/types";
import { EmailPasswordConfig } from "../emailpassword/types";

/*
 * Methods.
 */
export function normaliseThirdPartyEmailPasswordConfig(
    config: ThirdPartyEmailPasswordConfig
): NormalisedThirdPartyEmailPasswordConfig {
    const thirdPartyUserInput = isThirdPartyConfig(config);
    const emailPasswordUserInput = isEmailPasswordConfig(config);

    const emailPasswordConfig = normaliseEmailPasswordConfig(emailPasswordUserInput);
    const thirdPartyConfig = normaliseThirdPartyConfig(thirdPartyUserInput, true);
    const disableEmailPassword = config.disableEmailPassword === true;

    if (disableEmailPassword && thirdPartyConfig.signInAndUpFeature.providers.length === 0) {
        throw new Error("You need to enable either email password or third party providers login.");
    }
    return {
        signInAndUpFeature: {
            ...thirdPartyConfig.signInAndUpFeature,
            ...emailPasswordConfig.signInAndUpFeature
        },
        resetPasswordUsingTokenFeature: emailPasswordConfig.resetPasswordUsingTokenFeature,
        disableEmailPassword
    };
}

export function isEmailPasswordConfig(config: ThirdPartyEmailPasswordConfig): EmailPasswordConfig {
    return config as EmailPasswordConfig;
}

export function isThirdPartyConfig(config: ThirdPartyEmailPasswordConfig): ThirdPartyConfig {
    if (config.signInAndUpFeature === undefined) {
        config.signInAndUpFeature = {
            providers: []
        };
    }
    if (config.signInAndUpFeature.providers === undefined) {
        config.signInAndUpFeature.providers = [];
    }
    return (config as unknown) as ThirdPartyConfig;
}
