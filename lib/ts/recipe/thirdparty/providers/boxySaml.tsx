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
import { isTest } from "../../../utils";
import {
    auth0Logo,
    genericSAMLLogo,
    googleLogo,
    jumpCloudLogo,
    microsoftADFSLogo,
    microsoftEntraIdLogo,
    oktaLogo,
    oneLoginLogo,
    openIdLogo,
    pingOneLogo,
    ripplingLogo,
} from "../constants";

import type { BuiltInProviderConfig } from "./types";

import Provider from ".";

function getSamlProviderLogo(name: string) {
    switch (name) {
        case "Microsoft Entra ID": {
            return microsoftEntraIdLogo;
        }
        case "Microsoft AD FS": {
            return microsoftADFSLogo;
        }
        case "Okta": {
            return oktaLogo;
        }
        case "Auth0": {
            return auth0Logo;
        }
        case "Google": {
            return googleLogo;
        }
        case "OneLogin": {
            return oneLoginLogo;
        }
        case "PingOne": {
            return pingOneLogo;
        }
        case "JumpCloud": {
            return jumpCloudLogo;
        }
        case "Rippling": {
            return ripplingLogo;
        }
        case "OpenID": {
            return openIdLogo;
        }
        default: {
            return genericSAMLLogo;
        }
    }
}

/*
 * Class.
 */
export default class BoxySAML extends Provider {
    /*
     * Static Attributes.
     */
    private static instance?: BoxySAML;

    /*
     * Constructor.
     */
    constructor(config?: BuiltInProviderConfig) {
        super({
            id: "boxy-saml",
            name: "BoxySAML",
            ...config,
        });
    }

    getLogo = (): JSX.Element => {
        return getSamlProviderLogo(this.name);
    };

    /*
     * Static Methods
     */
    static init(config?: BuiltInProviderConfig): Provider {
        if (BoxySAML.instance !== undefined) {
            console.warn("BoxySAML Provider was already initialized");
            return BoxySAML.instance;
        }
        BoxySAML.instance = new BoxySAML(config);
        return BoxySAML.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }
        BoxySAML.instance = undefined;
        return;
    }
}
