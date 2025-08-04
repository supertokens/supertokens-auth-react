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
import ThirdParty from "../../../../lib/ts/recipe/thirdparty/recipe";
import { Google, Github, Facebook } from "../../../../lib/ts/recipe/thirdparty";
import assert from "assert";
import SuperTokens from "../../../../lib/ts/superTokens";
import ThirdPartyIndex from "../../../../lib/ts/recipe/thirdparty";

/*
 * Tests.
 */
describe("ThirdParty", function () {
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
                ThirdParty.init({
                    signInAndUpFeature: {
                        providers: [Google.init()],
                    },
                }),
            ],
        });
    });

    afterEach(async function () {
        ThirdParty.reset();
        Github.reset();
        Google.reset();
        Facebook.reset();
    });

    it("Initializing ThirdParty with empty configs throws", async function () {
        assert.throws(() => ThirdParty.init({}).authReact(SuperTokens.getInstanceOrThrow().appInfo, false), {
            message: "ThirdParty signInAndUpFeature providers array cannot be empty.",
        });
    });

    it("Initializing ThirdParty with empty signInAndUp attr throws", async function () {
        assert.throws(
            () =>
                ThirdParty.init({ signInAndUpFeature: {} }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false),
            { message: "ThirdParty signInAndUpFeature providers array cannot be empty." }
        );
    });

    it("Initializing ThirdParty with empty providers config throws", async function () {
        assert.throws(
            () =>
                ThirdParty.init({ signInAndUpFeature: { providers: [] } }).authReact(
                    SuperTokens.getInstanceOrThrow().appInfo,
                    false
                ),
            { message: "ThirdParty signInAndUpFeature providers array cannot be empty." }
        );
    });

    it("Initializing ThirdParty with Google provider", async function () {
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [Google.init()],
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        assert.notDeepStrictEqual(ThirdParty.getInstanceOrThrow(), undefined);
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.recipeId, "thirdparty");
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.appInfo,
            SuperTokens.getInstanceOrThrow().appInfo
        );
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers.length, 1);
    });

    it("Initializing ThirdParty with TOS", async function () {
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [Google.init()],
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        assert.notDeepStrictEqual(ThirdParty.getInstanceOrThrow(), undefined);
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.recipeId, "thirdparty");
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.appInfo,
            SuperTokens.getInstanceOrThrow().appInfo
        );
    });

    it("Initializing ThirdParty with Google/Github provider", async function () {
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [Google.init(), Github.init()],
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        assert.notDeepStrictEqual(ThirdParty.getInstanceOrThrow(), undefined);
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.recipeId, "thirdparty");
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.appInfo,
            SuperTokens.getInstanceOrThrow().appInfo
        );
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers.length, 2);
    });

    it("Initializing ThirdParty with Custom provider with no id config should throw", async function () {
        assert.throws(
            () =>
                ThirdParty.init({
                    signInAndUpFeature: {
                        providers: [{} as any],
                    },
                }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false),
            { message: "Custom provider config should contain an id attribute" }
        );
    });

    it("Initializing ThirdParty with Custom provider with empty config should throw", async function () {
        assert.throws(
            () =>
                ThirdParty.init({
                    signInAndUpFeature: {
                        providers: [
                            {
                                name: "Twitch",
                            } as any,
                        ],
                    },
                }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false),
            { message: "Custom provider config should contain an id attribute" }
        );
    });

    it("Initializing ThirdParty with custom provider", async function () {
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    {
                        id: "twitch",
                        name: "Twitch",
                    },
                ],
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        assert.notDeepStrictEqual(ThirdParty.getInstanceOrThrow(), undefined);
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.recipeId, "thirdparty");
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.appInfo,
            SuperTokens.getInstanceOrThrow().appInfo
        );
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers.length, 1);
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers[0].getButton().props.displayName,
            "Twitch"
        );
    });

    it("Initializing ThirdParty with custom provider with same id keeps only the first one", async function () {
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    {
                        id: "slack",
                        name: "Slack First Provider",
                    },
                    {
                        id: "slack",
                        name: "Slack Second Provider",
                    },
                ],
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        assert.notDeepStrictEqual(ThirdParty.getInstanceOrThrow(), undefined);
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.recipeId, "thirdparty");
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.appInfo,
            SuperTokens.getInstanceOrThrow().appInfo
        );
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers.length, 1);
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers[0].getButton().props.displayName,
            "Slack First Provider"
        );
    });

    it("Initializing ThirdParty with custom provider and use buttonComponent if provided", async function () {
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    {
                        id: "slack",
                        name: "Slack",
                        buttonComponent: "LOGIN WITH SLACK" as any, // TODO: check the type error
                    },
                ],
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        assert.notDeepStrictEqual(ThirdParty.getInstanceOrThrow(), undefined);
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.recipeId, "thirdparty");
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.appInfo,
            SuperTokens.getInstanceOrThrow().appInfo
        );
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers.length, 1);
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers[0].getButton(),
            "LOGIN WITH SLACK"
        );
    });

    it("Initializing ThirdParty with custom provider and custom logo if provided", async function () {
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    {
                        id: "slack",
                        name: "Slack",
                        logo: "LOGO" as any,
                    },
                ],
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        assert.notDeepStrictEqual(ThirdParty.getInstanceOrThrow(), undefined);
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.recipeId, "thirdparty");
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.appInfo,
            SuperTokens.getInstanceOrThrow().appInfo
        );
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers.length, 1);
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers[0].getLogo(),
            "LOGO"
        );
    });

    it("Initializing ThirdParty with Google twice only shows a warning and filters duplicate", async function () {
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [Google.init(), Github.init(), Google.init()],
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        assert.notDeepStrictEqual(ThirdParty.getInstanceOrThrow(), undefined);
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.recipeId, "thirdparty");
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.appInfo,
            SuperTokens.getInstanceOrThrow().appInfo
        );
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers.length, 2);
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers[0].getButton().props.displayName,
            "Google"
        );
    });

    it("Initializing ThirdParty with anything other than a provider throws.", async function () {
        assert.throws(
            () =>
                ThirdParty.init({
                    signInAndUpFeature: {
                        providers: [Google.init(), Github.init(), "facebook" as any],
                    },
                }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false),
            { message: "Custom provider config should contain an id attribute" }
        );
    });

    it("Initializing Google with custom button", async function () {
        const CustomGoogle = "LOGIN WITH GMAIL" as any; // Should be a component, JSX not supported in unit tests.
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    Google.init({
                        buttonComponent: CustomGoogle,
                    }),
                ],
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        assert.deepStrictEqual(
            (ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers[0] as any).config.buttonComponent,
            CustomGoogle
        );
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers[0].getButton(),
            CustomGoogle
        );
    });

    it("Initializing ThirdParty with custom authRecipeModule custom configs.", async function () {
        ThirdParty.init({
            preAPIHook: () => {
                throw new Error("PRE API HOOK THROWS");
            },
            onHandleEvent: () => {
                throw new Error("ON HANDLE EVENTS HOOK THROWS");
            },
            getRedirectionURL: () => {
                throw new Error("GET REDIRECTION HOOK THROWS");
            },
            signInAndUpFeature: {
                providers: [Google.init(), Github.init(), Facebook.init()],
            },
        }).authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        assert.notDeepStrictEqual(ThirdParty.getInstanceOrThrow(), undefined);
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.recipeId, "thirdparty");
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.appInfo,
            SuperTokens.getInstanceOrThrow().appInfo
        );
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers.length, 3);
        assert.throws(() => ThirdParty.getInstanceOrThrow().config.preAPIHook({} as any), {
            message: "PRE API HOOK THROWS",
        });
        assert.throws(() => ThirdParty.getInstanceOrThrow().config.onHandleEvent({} as any), {
            message: "ON HANDLE EVENTS HOOK THROWS",
        });
    });

    it("Test that when calling redirectToThirdPartyLogin, userContext is passed to other functions", async function () {
        const { authReact, webJS } = ThirdParty.init({
            signInAndUpFeature: {
                providers: [Google.init(), Github.init(), Facebook.init()],
            },
            override: {
                functions: (oI) => {
                    return {
                        ...oI,
                        getAuthorizationURLWithQueryParamsAndSetState: async function (input) {
                            assert(input.userContext["key"] !== undefined);
                            return oI.getAuthorisationURLWithQueryParamsAndSetState(input);
                        },
                        generateStateToSendToOAuthProvider: function (input) {
                            assert(input?.userContext["key"] !== undefined);
                            /**
                             * generateStateToSendToOAuthProvider internally uses crypto,
                             * which is not defined for mocha and jest
                             *
                             * Since we dont need to actually make a network call,
                             * this is easier than defining crypto for the tests
                             */
                            return "";
                        },
                        setStateAndOtherInfoToStorage: async function (input) {
                            /**
                             * Similar to generateStateToSendToOAuthProvider, this is
                             * easier than defining sessionStorage for tests
                             */
                            assert(input.userContext["key"] !== undefined);
                            return;
                        },
                        getAuthorisationURLFromBackend: async function (input) {
                            assert(input.userContext["key"] !== undefined);
                            throw new Error("Expected Test Error");
                        },
                    };
                },
            },
        });
        authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        webJS(SuperTokens.getInstanceOrThrow().appInfo, undefined, false, []);

        try {
            await ThirdPartyIndex.redirectToThirdPartyLogin({
                thirdPartyId: "google",
                userContext: {
                    key: "value",
                },
                shouldTryLinkingWithSessionUser: false,
            });
            throw new Error("redirectToThirdPartyLogin should have failed but didnt");
        } catch (e) {
            if ((e as any).message !== "Expected Test Error") {
                throw e;
            }
        }
    });

    it("Test that when calling signInAndUp, userContext is passed to other functions", async function () {
        const { authReact, webJS } = ThirdParty.init({
            signInAndUpFeature: {
                providers: [Google.init(), Github.init(), Facebook.init()],
            },
            override: {
                functions: (oI) => {
                    return {
                        ...oI,
                        getStateAndOtherInfoFromStorage: function (input) {
                            assert(input.userContext["key"] !== undefined);
                            return {} as any;
                        },
                        getAuthStateFromURL: function (input) {
                            assert(input.userContext["key"] !== undefined);
                            return "";
                        },
                        verifyAndGetStateOrThrowError: function (input) {
                            assert(input.userContext["key"] !== undefined);
                            return {} as any;
                        },
                        signInAndUp: function (input) {
                            assert(input.userContext["key"] !== undefined);
                            throw new Error("Expected Test Error");
                        },
                    };
                },
            },
        });

        authReact(SuperTokens.getInstanceOrThrow().appInfo, false);
        webJS(SuperTokens.getInstanceOrThrow().appInfo, undefined, false, []);

        try {
            await ThirdPartyIndex.signInAndUp({
                userContext: {
                    key: "value",
                },
            });
            throw new Error("signInAndUp should have failed but didnt");
        } catch (e) {
            if ((e as any).message !== "Expected Test Error") {
                throw e;
            }
        }
    });
});
