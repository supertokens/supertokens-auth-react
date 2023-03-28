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

import type { BuiltInProviderConfig, CustomProviderConfig } from "./types";

import Provider from ".";

/*
 * Class.
 */
export default class BoxySAML extends Provider {
    /*
     * Static Attributes.
     */
    private static instance?: BoxySAML;

    buttonComponent?: CustomProviderConfig["buttonComponent"];

    /*
     * Constructor.
     */
    constructor(config?: BuiltInProviderConfig) {
        super({
            id: "boxy-saml",
            name: "BoxySAML",
            clientId: config?.clientId,
            getFrontendRedirectURI: config?.getFrontendRedirectURI,
        });

        if (config === undefined) {
            return;
        }

        this.buttonComponent = config.buttonComponent;
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

    getLogo = (): JSX.Element => {
        return (
            <svg width="18" height="18" viewBox="0 0 315 315" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M77.105 1.63917C73.508 2.90917 68.328 7.66517 48.6 27.8102C9.78001 67.4512 4.335 73.2352 2.366 76.9282C0.576997 80.2832 0.5 84.9492 0.5 189.428V298.428L2.653 302.428C5.419 307.568 8.402 310.306 14 312.844C18.441 314.857 19.926 314.884 127 314.884C234.09 314.884 235.558 314.858 240 312.843C245.891 310.171 310.072 246.476 313.03 240.366C314.954 236.392 314.999 233.722 314.978 126.862C314.957 22.7132 314.867 17.2322 313.114 13.3722C310.846 8.37917 304.317 2.63917 299.142 1.08917C296.299 0.237168 266.809 -0.0508316 188.384 0.00716838C94.448 0.0761684 80.968 0.274168 77.105 1.63917ZM299.587 16.2342L302 19.0402V126.895V234.75L298.923 237.339L295.847 239.928H188.569H81.292L78.712 237.537C77.293 236.221 75.859 233.634 75.527 231.787C75.195 229.939 75.053 181.338 75.211 123.783C75.496 20.7532 75.531 19.1032 77.5 16.9152C78.6 15.6922 80.4 14.3202 81.5 13.8662C82.6 13.4122 131.577 13.1282 190.337 13.2342L297.173 13.4282L299.587 16.2342ZM189.775 79.4872C188.276 80.3002 186.578 81.8482 186.001 82.9262C184.177 86.3332 173.018 165.844 174 168.429C177.035 176.411 188.093 177.229 192.086 169.767C192.692 168.635 195.809 149.655 199.012 127.59C205.461 83.1672 205.462 82.7702 199.128 79.4942C195.412 77.5722 193.306 77.5712 189.775 79.4872ZM147.151 92.3012C145.86 93.0182 138.78 100.089 131.419 108.016C117.072 123.464 115.535 126.23 118.33 131.557C119.159 133.136 126.097 140.616 133.749 148.178C146.43 160.712 147.978 161.928 151.253 161.928C153.66 161.928 155.863 161.073 157.923 159.339C160.53 157.146 161 156.054 161 152.194C161 147.768 160.716 147.349 151.011 137.487L141.022 127.337L151.011 116.416C160.041 106.543 161 105.125 161 101.646C161 96.5122 159.53 94.0472 155.452 92.3432C151.342 90.6262 150.183 90.6202 147.151 92.3012ZM219.923 94.8512C217.643 97.1312 217 98.6762 217 101.873C217 106.272 218.273 108.028 231.174 121.43L236.951 127.433L227.491 137.575C217.182 148.627 215.888 150.869 217.139 155.509C218.403 160.197 221.481 162.428 226.684 162.428C231.123 162.428 231.269 162.315 245.459 147.864C260.272 132.777 262.086 129.914 260.113 124.725C259.055 121.943 233.866 94.4622 230.937 92.8942C227.407 91.0052 222.983 91.7912 219.923 94.8512Z"
                    fill="black"
                />
            </svg>
        );
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
