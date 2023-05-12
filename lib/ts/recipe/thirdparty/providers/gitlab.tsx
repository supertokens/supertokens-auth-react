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

import type { BuiltInProviderConfig } from "./types";

import Provider from ".";

/*
 * Class.
 */
export default class Gitlab extends Provider {
    /*
     * Static Attributes.
     */
    private static instance?: Gitlab;

    buttonComponent?: JSX.Element;

    /*
     * Constructor.
     */
    constructor(config?: BuiltInProviderConfig) {
        super({
            id: "gitlab",
            name: "Gitlab",
            clientId: config?.clientId,
            getRedirectURL: config?.getRedirectURL,
        });

        if (config === undefined) {
            return;
        }

        this.buttonComponent = config.buttonComponent;
    }

    getButton = (): JSX.Element => {
        if (this.buttonComponent !== undefined) {
            return this.buttonComponent;
        }

        return this.getDefaultButton();
    };

    getLogo = (): JSX.Element => {
        return (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M17.7004 6.86178L17.6751 6.79711L15.2251 0.403269C15.1753 0.277953 15.087 0.171648 14.973 0.0996044C14.8589 0.0287852 14.7259 -0.00532357 14.5918 0.00188338C14.4577 0.00909034 14.3291 0.057266 14.2232 0.139906C14.1186 0.224918 14.0426 0.340113 14.0058 0.469813L12.3516 5.5309H5.65312L3.99889 0.469813C3.96302 0.339406 3.88693 0.223634 3.78145 0.138968C3.67562 0.0563286 3.54698 0.0081529 3.41289 0.000945942C3.27881 -0.00626101 3.14574 0.0278478 3.03166 0.0986669C2.91791 0.171001 2.82972 0.277214 2.77954 0.402332L0.324918 6.79336L0.30055 6.85803C-0.0521303 7.77953 -0.0956629 8.79071 0.176516 9.73911C0.448694 10.6875 1.02183 11.5217 1.8095 12.1159L1.81794 12.1225L1.84043 12.1384L5.57251 14.9333L7.41888 16.3307L8.54356 17.1798C8.67512 17.2797 8.83575 17.3338 9.00093 17.3338C9.16611 17.3338 9.32675 17.2797 9.45831 17.1798L10.583 16.3307L12.4293 14.9333L16.1839 12.1216L16.1933 12.1141C16.9792 11.5197 17.551 10.6864 17.8228 9.73926C18.0945 8.79214 18.0516 7.7824 17.7004 6.86178Z"
                    fill="#E24329"
                />
                <path
                    d="M17.7004 6.86154L17.6751 6.79688C16.4813 7.04191 15.3564 7.54756 14.3807 8.27771L9 12.3463C10.8323 13.7324 12.4275 14.9368 12.4275 14.9368L16.1821 12.1251L16.1914 12.1176C16.9785 11.5233 17.5511 10.6894 17.8233 9.74145C18.0954 8.79352 18.0523 7.78284 17.7004 6.86154Z"
                    fill="#FC6D26"
                />
                <path
                    d="M5.57251 14.9362L7.41887 16.3337L8.54356 17.1828C8.67511 17.2827 8.83575 17.3367 9.00093 17.3367C9.16611 17.3367 9.32674 17.2827 9.4583 17.1828L10.583 16.3337L12.4293 14.9362C12.4293 14.9362 10.8323 13.7281 8.99999 12.3457C7.16769 13.7281 5.57251 14.9362 5.57251 14.9362Z"
                    fill="#FCA326"
                />
                <path
                    d="M3.61837 8.27755C2.64345 7.5459 1.51877 7.03893 0.324918 6.79297L0.30055 6.85764C-0.0521303 7.77914 -0.0956629 8.79031 0.176516 9.73871C0.448694 10.6871 1.02183 11.5213 1.8095 12.1155L1.81794 12.1221L1.84043 12.138L5.57251 14.9329C5.57251 14.9329 7.16582 13.7285 9 12.3424L3.61837 8.27755Z"
                    fill="#FC6D26"
                />
            </svg>
        );
    };

    /*
     * Static Methods
     */
    static init(config?: BuiltInProviderConfig): Provider {
        if (Gitlab.instance !== undefined) {
            console.warn("Gitlab Provider was already initialized");
            return Gitlab.instance;
        }
        Gitlab.instance = new Gitlab(config);
        return Gitlab.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }
        Gitlab.instance = undefined;
        return;
    }
}
