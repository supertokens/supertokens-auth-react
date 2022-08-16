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
import ThirdPartyPasswordless from "../../../../recipe/thirdpartypasswordless";
import ThirdPartyPasswordlessRaw from "../../../../lib/build/recipe/thirdpartypasswordless/recipe";
import { Google } from "../../../../recipe/thirdpartypasswordless";
import assert from "assert";
import SuperTokens from "../../../..";
import SuperTokensRaw from "../../../../lib/build/superTokens";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe("ThirdPartyEmailPassword", function () {
    before(async function () {});

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
            recipeList: [
                ThirdPartyPasswordless.init({
                    contactMethod: "EMAIL_OR_PHONE",
                }),
            ],
        });
        assert(ThirdPartyPasswordlessRaw.getInstanceOrThrow().passwordlessRecipe !== undefined);
        assert(ThirdPartyPasswordlessRaw.getInstanceOrThrow().thirdPartyRecipe === undefined);
    });

    it("Initializing with empty third party providers", async function () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                websiteDomain: "supertokens.io",
                apiDomain: "api.supertokens.io",
            },
            recipeList: [
                ThirdPartyPasswordless.init({
                    contactMethod: "EMAIL_OR_PHONE",
                    signInUpFeature: {
                        providers: [],
                    },
                }),
            ],
        });
        assert(ThirdPartyPasswordlessRaw.getInstanceOrThrow().passwordlessRecipe !== undefined);
        assert(ThirdPartyPasswordlessRaw.getInstanceOrThrow().thirdPartyRecipe === undefined);
    });

    it("Initializing with disable email password", async function () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                websiteDomain: "supertokens.io",
                apiDomain: "api.supertokens.io",
            },
            recipeList: [
                ThirdPartyPasswordless.init({
                    contactMethod: "EMAIL_OR_PHONE",
                    disablePasswordless: true,
                    signInUpFeature: {
                        providers: [Google.init()],
                    },
                }),
            ],
        });
        assert(ThirdPartyPasswordlessRaw.getInstanceOrThrow().passwordlessRecipe === undefined);
        assert(ThirdPartyPasswordlessRaw.getInstanceOrThrow().thirdPartyRecipe !== undefined);
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
                    ThirdPartyPasswordless.init({
                        contactMethod: "EMAIL_OR_PHONE",
                        disablePasswordless: true,
                    }),
                ],
            });
            fail();
        } catch (err) {
            assert.strictEqual(err.message, "You need to enable either passwordless or third party providers login.");
        }
    });
});
