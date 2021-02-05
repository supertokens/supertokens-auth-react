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
import AuthRecipeModule from ".";
import { getShouldUseShadowDom } from "../../utils";
import { normaliseEmailVerificationFeature } from "../emailverification/utils";
import { AuthRecipeModuleConfig, NormalisedAuthRecipeConfig } from "./types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isAuthRecipeModule(x: any): x is AuthRecipeModule {
    return x instanceof AuthRecipeModule;
}

/*
 * normaliseAuthRecipeModuleConfig
 */
export function normaliseAuthRecipeModuleConfig(
    config: AuthRecipeModuleConfig<unknown, unknown, unknown>
): NormalisedAuthRecipeConfig {
    const useShadowDom = config.useShadowDom === undefined ? true : config.useShadowDom;
    const palette = config.palette === undefined ? {} : config.palette;
    const emailVerificationFeature = normaliseEmailVerificationFeature(config.emailVerificationFeature);
    return {
        useShadowDom: getShouldUseShadowDom(useShadowDom),
        palette,
        emailVerificationFeature
    };
}
