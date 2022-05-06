/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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
import { defaultWindowHandler } from "supertokens-website/utils/windowHandling";
import { WindowHandler, WindowHandlerInput } from "supertokens-website/utils/windowHandling/types";

export default class SuperTokensWindowHandler {
    private static instance?: SuperTokensWindowHandler;

    windowHandler: WindowHandler;

    constructor(windowHandlerInput?: WindowHandlerInput) {
        let windowHandlerFunc: WindowHandlerInput = (original) => original;
        if (windowHandlerInput !== undefined) {
            windowHandlerFunc = windowHandlerInput;
        }

        this.windowHandler = windowHandlerFunc(defaultWindowHandler);
    }

    static init(windowHandlerInput?: WindowHandlerInput): void {
        if (SuperTokensWindowHandler.instance !== undefined) {
            console.warn("SuperTokensWindowHandler was already initialized");
            return;
        }

        SuperTokensWindowHandler.instance = new SuperTokensWindowHandler(windowHandlerInput);
    }

    static getInstanceOrThrow(): SuperTokensWindowHandler {
        if (SuperTokensWindowHandler.instance === undefined) {
            throw new Error("SuperTokensWindowHandler must be initialized before calling this method.");
        }

        return SuperTokensWindowHandler.instance;
    }
}
