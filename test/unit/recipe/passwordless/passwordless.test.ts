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
import Passwordless from "../../../../lib/ts/recipe/passwordless/recipe";
import assert from "assert";
import SuperTokens from "../../../../lib/ts/superTokens";

// Run the tests in a DOM environment.
/*
 * Tests.
 */
describe("Passwordless", function () {
    const privacyPolicyLink = "https://example.com/privacy";
    const termsOfServiceLink = "https://example.com/terms";

    beforeAll(async function () {
        SuperTokens.init({
            appInfo: {
                appName: "SuperTokens",
                websiteDomain: "supertokens.io",
                apiDomain: "api.supertokens.io",
            },
            recipeList: [
                Passwordless.init({
                    contactMethod: "EMAIL",
                }),
            ],
        });
    });

    afterEach(async function () {
        Passwordless.reset();
    });

    it("Initializing Passwordless with empty configs throws", async function () {
        await assert.throws(() => Passwordless.init({} as any)(SuperTokens.getInstanceOrThrow().appInfo, false), {
            message: "Please pass one of 'PHONE', 'EMAIL' or 'EMAIL_OR_PHONE' as the contactMethod",
        });
    });

    it("Initializing Passwordless with wrong contactMethod throws", async function () {
        await assert.throws(
            () => Passwordless.init({ contactMethod: "NOPE" as any })(SuperTokens.getInstanceOrThrow().appInfo, false),
            { message: "Please pass one of 'PHONE', 'EMAIL' or 'EMAIL_OR_PHONE' as the contactMethod" }
        );
    });

    it("Initializing Passwordless with wrong resendEmailOrSMSGapInSecondsthrows", async function () {
        await assert.throws(
            () =>
                Passwordless.init({ contactMethod: "PHONE", signInUpFeature: { resendEmailOrSMSGapInSeconds: 0 } })(
                    SuperTokens.getInstanceOrThrow().appInfo,
                    false
                ),
            { message: `Please pass a positive number as resendEmailOrSMSGapInSeconds` }
        );
    });

    it("Initializing Passwordless with resendCodeTimeGap", async function () {
        Passwordless.init({ contactMethod: "PHONE", signInUpFeature: { resendEmailOrSMSGapInSeconds: 5 } })(
            SuperTokens.getInstanceOrThrow().appInfo,
            false
        );
        assert.strictEqual(Passwordless.getInstanceOrThrow().config.signInUpFeature.resendEmailOrSMSGapInSeconds, 5);
    });

    it("Initializing Passwordless with TOS", async function () {
        Passwordless.init({
            contactMethod: "PHONE",
            signInUpFeature: {
                termsOfServiceLink,
                privacyPolicyLink,
            },
        })(SuperTokens.getInstanceOrThrow().appInfo, false);
        assert.notDeepStrictEqual(Passwordless.getInstanceOrThrow(), undefined);
        assert.deepStrictEqual(Passwordless.getInstanceOrThrow().config.recipeId, "passwordless");
        assert.deepStrictEqual(
            Passwordless.getInstanceOrThrow().config.appInfo,
            SuperTokens.getInstanceOrThrow().appInfo
        );
        assert.deepStrictEqual(
            Passwordless.getInstanceOrThrow().config.signInUpFeature.termsOfServiceLink,
            termsOfServiceLink
        );
        assert.deepStrictEqual(
            Passwordless.getInstanceOrThrow().config.signInUpFeature.privacyPolicyLink,
            privacyPolicyLink
        );
    });

    it("Initializing Passwordless with custom authRecipeModule custom configs.", async function () {
        Passwordless.init({
            contactMethod: "PHONE",
            preAPIHook: () => {
                throw new Error("PRE API HOOK THROWS");
            },
            onHandleEvent: () => {
                throw new Error("ON HANDLE EVENTS HOOK THROWS");
            },
            getRedirectionURL: () => {
                throw new Error("GET REDIRECTION HOOK THROWS");
            },
            useShadowDom: false,
        })(SuperTokens.getInstanceOrThrow().appInfo, false);
        assert.notDeepStrictEqual(Passwordless.getInstanceOrThrow(), undefined);
        assert.deepStrictEqual(Passwordless.getInstanceOrThrow().config.recipeId, "passwordless");
        assert.deepStrictEqual(
            Passwordless.getInstanceOrThrow().config.appInfo,
            SuperTokens.getInstanceOrThrow().appInfo
        );
        assert.deepStrictEqual(Passwordless.getInstanceOrThrow().config.useShadowDom, false);
        assert.throws(() => Passwordless.getInstanceOrThrow().config.preAPIHook({} as any), {
            message: "PRE API HOOK THROWS",
        });
        assert.throws(() => Passwordless.getInstanceOrThrow().config.onHandleEvent({} as any), {
            message: "ON HANDLE EVENTS HOOK THROWS",
        });
        assert.throws(() => Passwordless.getInstanceOrThrow().config.getRedirectionURL({} as any), {
            message: "GET REDIRECTION HOOK THROWS",
        });
    });
});
