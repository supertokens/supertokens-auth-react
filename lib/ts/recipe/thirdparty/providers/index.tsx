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

import type { BuiltInProviderConfig, ProviderConfig } from "./types";

/*
 * Imports.
 */

/*
 * Class.
 */
export default abstract class Provider {
    /*
     * Instance Attributes.
     */
    id: string;
    name: string;
    getFrontendRedirectURI: () => string;
    clientId?: string;
    buttonComponent?: BuiltInProviderConfig["buttonComponent"];
    /*
     * Constructor.
     */

    constructor(config: ProviderConfig) {
        this.id = config.id;
        this.name = config.name;
        this.clientId = config.clientId;
        this.getFrontendRedirectURI =
            config.getFrontendRedirectURI !== undefined
                ? config.getFrontendRedirectURI
                : () => this.defaultGetFrontendRedirectURI();
    }

    /*
     * Components.
     */

    getDefaultButton(name?: string): JSX.Element {
        const providerName = name !== undefined ? name : this.name;
        return <ProviderButton logo={this.getLogo()} providerName={providerName} displayName={this.name} />;
    }

    defaultGetFrontendRedirectURI(): string {
        const domain = SuperTokens.getInstanceOrThrow().appInfo.websiteDomain.getAsStringDangerous();
        const callbackPath = new NormalisedURLPath(`/callback/${this.id}`);
        const path = SuperTokens.getInstanceOrThrow()
            .appInfo.websiteBasePath.appendPath(callbackPath)
            .getAsStringDangerous();
        return `${domain}${path}`;
    }

    getRedirectURIOnProviderDashboard(): string | undefined {
        return undefined;
    }

    setId(id: string): void {
        this.id = id;
    }

    setName(name: string): void {
        this.name = name;
    }

    getButton = (): JSX.Element => {
        if (this.buttonComponent !== undefined) {
            if (typeof this.buttonComponent === "function") {
                return <this.buttonComponent name={this.name} />;
            }
            return this.buttonComponent;
        }

        return this.getDefaultButton();
    };

    abstract getLogo(): JSX.Element | undefined;

    /*
     * State management.
     */

    generateState = (): string => {
        // Generate state using algorithm described in https://github.com/supertokens/supertokens-auth-react/issues/154#issue-796867579
        return `${1e20}`.replace(/[018]/g, (c) =>
            (parseInt(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))).toString(16)
        );
    };
}
