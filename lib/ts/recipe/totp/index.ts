/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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
import { RecipeInterface } from "supertokens-web-js/recipe/totp";

import { getNormalisedUserContext } from "../../utils";

import { RecipeComponentsOverrideContextProvider } from "./componentOverrideContext";
import TOTPRecipe from "./recipe";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { UserInput } from "./types";

import type { UserContext } from "../../types";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/totp";

export default class Wrapper {
    static init(config?: UserInput) {
        return TOTPRecipe.init(config);
    }
    static createDevice(input?: { deviceName?: string; options?: RecipeFunctionOptions; userContext?: UserContext }) {
        return TOTPRecipe.getInstanceOrThrow().webJSRecipe.createDevice({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }
    static verifyCode(input: { totp: string; options?: RecipeFunctionOptions; userContext?: UserContext }) {
        return TOTPRecipe.getInstanceOrThrow().webJSRecipe.verifyCode({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }
    static verifyDevice(input: {
        deviceName: string;
        totp: string;
        options?: RecipeFunctionOptions | undefined;
        userContext?: UserContext;
    }) {
        return TOTPRecipe.getInstanceOrThrow().webJSRecipe.verifyDevice({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }
    static removeDevice(input: { deviceName: string; options?: RecipeFunctionOptions; userContext?: UserContext }) {
        return TOTPRecipe.getInstanceOrThrow().webJSRecipe.removeDevice({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }
    static listDevices(input?: { options?: RecipeFunctionOptions; userContext?: UserContext }) {
        return TOTPRecipe.getInstanceOrThrow().webJSRecipe.listDevices({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    static ComponentsOverrideProvider = RecipeComponentsOverrideContextProvider;
}

const init = Wrapper.init;
const createDevice = Wrapper.createDevice;
const verifyCode = Wrapper.verifyCode;
const verifyDevice = Wrapper.verifyDevice;
const removeDevice = Wrapper.removeDevice;
const listDevices = Wrapper.listDevices;
const TOTPComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

export {
    init,
    createDevice,
    verifyCode,
    verifyDevice,
    removeDevice,
    listDevices,
    TOTPComponentsOverrideProvider,
    GetRedirectionURLContext,
    PreAPIHookContext as PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
