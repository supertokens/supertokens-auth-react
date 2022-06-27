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
import { useTranslation } from "./translation/translationContext";
import SuperTokens from "./superTokens";
import { TranslationStore } from "./translation/translationHelpers";
import { SuperTokensConfig } from "./types";
import { useUserContext } from "./usercontext";

/*
 * API Wrapper exposed to user.
 */

export default class SuperTokensAPIWrapper {
    static init(config: SuperTokensConfig): void {
        SuperTokens.init(config);
    }

    static canHandleRoute(): boolean {
        return SuperTokens.canHandleRoute();
    }

    static getRoutingComponent(): JSX.Element | null {
        return SuperTokens.getRoutingComponent();
    }

    static changeLanguage(language: string): Promise<void> {
        return SuperTokens.getInstanceOrThrow().changeLanguage(language);
    }

    static loadTranslation(store: TranslationStore): void {
        return SuperTokens.getInstanceOrThrow().loadTranslation(store);
    }

    static getSuperTokensRoutesForReactRouterDom(reactRouterDom: any): JSX.Element[] {
        return SuperTokens.getSuperTokensRoutesForReactRouterDom(reactRouterDom);
    }

    static useTranslation = useTranslation;

    static useUserContext = useUserContext;
}

export const canHandleRoute = SuperTokensAPIWrapper.canHandleRoute;
export const init = SuperTokensAPIWrapper.init;
export const changeLanguage = SuperTokensAPIWrapper.changeLanguage;
export const loadTranslation = SuperTokensAPIWrapper.loadTranslation;
export const getRoutingComponent = SuperTokensAPIWrapper.getRoutingComponent;
export const getSuperTokensRoutesForReactRouterDom = SuperTokens.getSuperTokensRoutesForReactRouterDom;

export { useTranslation } from "./translation/translationContext";
export { useUserContext } from "./usercontext";
