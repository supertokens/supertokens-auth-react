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
import { Fragment, useMemo } from "react";

import Multitenancy from "../recipe/multitenancy/recipe";
import SuperTokens from "../superTokens";

import type Provider from "../recipe/thirdparty/providers";
import type { FC } from "react";

export const SignInAndUpFeatureWrapper: FC<{
    children: (providers: { id: string; buttonComponent: JSX.Element }[]) => JSX.Element;
    providers: Provider[];
}> = (props) => {
    const { children } = props;

    const providers = useMemo(() => {
        const usesDynamicLoginMethods = SuperTokens.usesDynamicLoginMethods === true;
        if (usesDynamicLoginMethods === false) {
            return props.providers.map((provider) => ({
                id: provider.id,
                buttonComponent: provider.getButton(),
            }));
        }
        const tenantProviders = Multitenancy.getInstanceOrThrow().dynamicLoginMethods?.thirdparty.providers || [];
        const providers: { id: string; buttonComponent: JSX.Element }[] = [];

        for (const tenantProvider of tenantProviders) {
            let provider = props.providers.find((provider) => {
                const { id } = tenantProvider;
                return provider.id === id || provider.id.includes(id);
            });
            if (provider === undefined) {
                provider = props.providers.find((provider) => {
                    const { id } = tenantProvider;
                    return id.startsWith(provider.id);
                });
            }
            if (provider !== undefined) {
                providers.push({
                    id: tenantProvider.id,
                    buttonComponent: provider.getButton(tenantProvider.name),
                });
            }
        }
        return providers;
    }, [props.providers]);

    return <Fragment>{children(providers)}</Fragment>;
};
