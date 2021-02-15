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

import { SOMETHING_WENT_WRONG_ERROR } from "../../../../../constants";
import RecipeModule from "../../../../recipeModule";
import { AuthorisationURLAPIResponse } from "../../../types";

/*
 * Methods.
 */

export async function getOAuthAuthorisationURLAPI(
    thirdPartyId: string,
    recipe: RecipeModule
): Promise<AuthorisationURLAPIResponse> {
    const response: AuthorisationURLAPIResponse = await recipe.httpRequest.get(
        "/authorisationurl",
        {},
        "GET_AUTHORISATION_URL",
        { thirdPartyId }
    );

    console.log(response);

    // If success.
    if (response.status === "OK") {
        return {
            status: "OK",
            url: response.url
        };
    }

    throw new Error(SOMETHING_WENT_WRONG_ERROR);
}
