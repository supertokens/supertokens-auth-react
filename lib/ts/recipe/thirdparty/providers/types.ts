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
import type { FC } from "react";

export type ProviderConfig = {
    /*
     * Provider Id
     */
    id: string;

    /*
     * Provider Name
     */
    name: string;

    clientId?: string; // optional clientId to be sent during signinup
    getFrontendRedirectURI?: () => string;
    buttonComponent?: BuiltInProviderConfig["buttonComponent"];
};

export type BuiltInProviderConfig = {
    /*
     * Button Component
     */
    buttonComponent?: FC<{ name: string }> | { new (props: { name: string }): React.Component<any, any> };

    clientId?: string; // optional clientId to be sent during signinup API

    /*
     * Where to redirect the user during the callback.
     * Defaults to `${websiteDomain}/${websiteBasePath}/callback/${id}`
     */
    getFrontendRedirectURI?: () => string;
};

export type CustomProviderConfig = {
    /*
     * Provider Id
     */
    id: string;

    /*
     * Provider Name
     */
    name: string;

    clientId?: string;

    /*
     * Button Component
     */
    buttonComponent?: FC<{ name: string }> | { new (props: { name: string }): React.Component<any, any> };

    /*
     * Where to redirect the user during the callback.
     * Defaults to `${websiteDomain}/${websiteBasePath}/callback/${id}`
     */
    getRedirectURL?: () => string;
};
