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

import { RecipeComponentsOverrideContextProvider } from "./componentOverrideContext";
import OAuth2 from "./recipe";
import { UserInput } from "./types";

import type { RecipeInterface } from "supertokens-web-js/recipe/oauth2";

export default class Wrapper {
    static init(config?: UserInput) {
        return OAuth2.init(config);
    }

    static ComponentsOverrideProvider = RecipeComponentsOverrideContextProvider;
}

const init = Wrapper.init;
const MultitenancyComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

export { init, UserInput, RecipeInterface, MultitenancyComponentsOverrideProvider };
