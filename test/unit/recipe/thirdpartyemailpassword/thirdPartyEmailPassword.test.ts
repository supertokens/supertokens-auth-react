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
 * Imports
 */

/* https://github.com/babel/babel/issues/9849#issuecomment-487040428 */
import regeneratorRuntime from "regenerator-runtime";
import ThirdPartyEmailPassword from "../../../../lib/ts/recipe/thirdpartyemailpassword";
import ThirdPartyEmailPasswordRaw from "../../../../lib/ts/recipe/thirdpartyemailpassword/recipe";
import { Google, Github, Facebook } from "../../../../lib/ts/recipe/thirdpartyemailpassword";
import assert from "assert";
import SuperTokens from "../../../../lib/ts/index";
import SuperTokensRaw from "../../../../lib/ts/superTokens";

/*
 * Tests.
 */
describe("ThirdPartyEmailPassword", function () {
    beforeEach(function () {
        SuperTokensRaw.reset();
    });

    afterEach(async function () {
        Google.reset();
    });

    it("Initializing without any third party providers", async function () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                websiteDomain: "supertokens.io",
                apiDomain: "api.supertokens.io",
            },
            recipeList: [ThirdPartyEmailPassword.init({})],
        });
        assert(ThirdPartyEmailPasswordRaw.getInstanceOrThrow().emailPasswordRecipe !== undefined);
        assert(ThirdPartyEmailPasswordRaw.getInstanceOrThrow().thirdPartyRecipe === undefined);
    });

    it("Initializing with empty third party providers", async function () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                websiteDomain: "supertokens.io",
                apiDomain: "api.supertokens.io",
            },
            recipeList: [
                ThirdPartyEmailPassword.init({
                    signInAndUpFeature: {
                        providers: [],
                    },
                }),
            ],
        });
        assert(ThirdPartyEmailPasswordRaw.getInstanceOrThrow().emailPasswordRecipe !== undefined);
        assert(ThirdPartyEmailPasswordRaw.getInstanceOrThrow().thirdPartyRecipe === undefined);
    });

    it("Initializing with disable email password", async function () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                websiteDomain: "supertokens.io",
                apiDomain: "api.supertokens.io",
            },
            recipeList: [
                ThirdPartyEmailPassword.init({
                    disableEmailPassword: true,
                    signInAndUpFeature: {
                        providers: [Google.init()],
                    },
                }),
            ],
        });
        assert(ThirdPartyEmailPasswordRaw.getInstanceOrThrow().emailPasswordRecipe === undefined);
        assert(ThirdPartyEmailPasswordRaw.getInstanceOrThrow().thirdPartyRecipe !== undefined);
    });

    it("Initializing with disable email password and no third party - should throw an error", async function () {
        try {
            SuperTokens.init({
                appInfo: {
                    appName: "SuperTokens",
                    websiteDomain: "supertokens.io",
                    apiDomain: "api.supertokens.io",
                },
                recipeList: [
                    ThirdPartyEmailPassword.init({
                        disableEmailPassword: true,
                    }),
                ],
            });
            fail();
        } catch (err) {
            assert((err as any).message === "You need to enable either email password or third party providers login.");
        }
    });
});
