/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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
import { SuperTokensConfig } from "./types";
import SuperTokens from "./superTokens";

/*
 * API Wrapper exposed to user.
 */

export default class SuperTokensAPIWrapper {
    static init(config: SuperTokensConfig) {
        SuperTokens.init(config);
    }

    static canHandleRoute(): boolean {
        return SuperTokens.canHandleRoute();
    }

    static getRoutingComponent() {
        return SuperTokens.getRoutingComponent();
    }

    static getSuperTokensRoutesForReactDomRouter() {
        return SuperTokens.getSuperTokensRoutesForReactDomRouter();
    }
}

export const canHandleRoute = SuperTokensAPIWrapper.canHandleRoute;
export const init = SuperTokensAPIWrapper.init;
export const getRoutingComponent = SuperTokensAPIWrapper.getRoutingComponent;
export const getSuperTokensRoutesForReactDomRouter = SuperTokens.getSuperTokensRoutesForReactDomRouter;
