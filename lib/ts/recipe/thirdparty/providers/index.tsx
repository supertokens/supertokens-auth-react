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

import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";

import SuperTokens from "../../../superTokens";
import ProviderButton from "../components/library/providerButton";

import type { ProviderConfig } from "./types";

export default abstract class Provider {
    get id(): string {
        return this.config.id;
    }

    get name(): string {
        if (this.config.name === undefined) {
            throw new Error(`Name not defined for provider ${this.config.id}`);
        }
        return this.config.name;
    }

    constructor(public readonly config: ProviderConfig) {}

    getRedirectURL(): string {
        if (this.config.getRedirectURL) {
            return this.config.getRedirectURL(this.config.id);
        }

        const domain = SuperTokens.getInstanceOrThrow().appInfo.websiteDomain.getAsStringDangerous();
        const callbackPath = new NormalisedURLPath(`/callback/${this.config.id}`);
        const path = SuperTokens.getInstanceOrThrow()
            .appInfo.websiteBasePath.appendPath(callbackPath)
            .getAsStringDangerous();
        return `${domain}${path}`;
    }

    getRedirectURIOnProviderDashboard(): string | undefined {
        return undefined;
    }

    getButton = (name?: string, defaultLogo?: JSX.Element): JSX.Element => {
        if (this.config.buttonComponent !== undefined) {
            if (typeof this.config.buttonComponent === "function") {
                return <this.config.buttonComponent name={name ?? this.name} />;
            }
            return this.config.buttonComponent;
        }

        const providerName = name !== undefined ? name : this.name;
        const logo = this.getLogo() ?? defaultLogo;
        return <ProviderButton logo={logo} providerName={providerName} displayName={providerName} />;
    };

    abstract getLogo(): JSX.Element | undefined;
}
