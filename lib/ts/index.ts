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
import { SuperTokensWrapper } from "./components/supertokensWrapper";
import SuperTokens from "./superTokens";
import { useTranslation } from "./translation/translationContext";
import { useUserContext } from "./usercontext";
import { getNormalisedUserContext } from "./utils";

import type { TranslationStore } from "./translation/translationHelpers";
import type { Navigate, SuperTokensConfig, UserContext } from "./types";

/*
 * API Wrapper exposed to user.
 */

export default class SuperTokensAPIWrapper {
    static SuperTokensWrapper = SuperTokensWrapper;

    static init(config: SuperTokensConfig): void {
        SuperTokens.init(config);
    }

    static changeLanguage(language: string): Promise<void> {
        return SuperTokens.getInstanceOrThrow().changeLanguage(language);
    }

    static loadTranslation(store: TranslationStore): void {
        return SuperTokens.getInstanceOrThrow().loadTranslation(store);
    }

    static redirectToAuth = async (options?: {
        show?: "signin" | "signup";
        navigate?: Navigate;
        queryParams?: any;
        redirectBack?: boolean;
        userContext?: UserContext;
    }) => {
        return SuperTokens.getInstanceOrThrow().redirectToAuth({
            ...options,
            redirectBack: options?.redirectBack ?? true,
            userContext: getNormalisedUserContext(options?.userContext),
        });
    };

    static useTranslation = useTranslation;

    static useUserContext = useUserContext;
}

export const init = SuperTokensAPIWrapper.init;
export const changeLanguage = SuperTokensAPIWrapper.changeLanguage;
export const loadTranslation = SuperTokensAPIWrapper.loadTranslation;
export const redirectToAuth = SuperTokensAPIWrapper.redirectToAuth;

export { SuperTokensWrapper } from "./components/supertokensWrapper";
export { useTranslation } from "./translation/translationContext";
export { useUserContext } from "./usercontext";
