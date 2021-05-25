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
import ThirdParty from "../../../../lib/build/recipe/thirdparty/recipe";
import { Google, Github, Facebook } from "../../../../lib/build/recipe/thirdparty";
import assert from "assert";
import SuperTokens from "../../../../lib/build/superTokens";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe("ThirdParty", function () {
    const privacyPolicyLink = "https://example.com/privacy";
    const termsOfServiceLink = "https://example.com/terms";

    before(async function () {
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
        await assert.throws(
            () => ThirdParty.init()(SuperTokens.getInstanceOrThrow().appInfo),
            new Error("ThirdParty signInAndUpFeature providers array cannot be empty.")
        );
    });

    it("Initializing ThirdParty with empty signInAndUp attr throws", async function () {
        await assert.throws(
            () => ThirdParty.init({ signInAndUpFeature: {} })(SuperTokens.getInstanceOrThrow().appInfo),
            new Error("ThirdParty signInAndUpFeature providers array cannot be empty.")
        );
    });

    it("Initializing ThirdParty with empty providers config throws", async function () {
        await assert.throws(
            () => ThirdParty.init({ signInAndUpFeature: { providers: [] } })(SuperTokens.getInstanceOrThrow().appInfo),
            new Error("ThirdParty signInAndUpFeature providers array cannot be empty.")
        );
    });

    it("Initializing ThirdParty with Google provider", async function () {
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [Google.init()],
            },
        })(SuperTokens.getInstanceOrThrow().appInfo);
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
                termsOfServiceLink,
                privacyPolicyLink,
                providers: [Google.init()],
            },
        })(SuperTokens.getInstanceOrThrow().appInfo);
        assert.notDeepStrictEqual(ThirdParty.getInstanceOrThrow(), undefined);
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.recipeId, "thirdparty");
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.appInfo,
            SuperTokens.getInstanceOrThrow().appInfo
        );
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.termsOfServiceLink,
            termsOfServiceLink
        );
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.privacyPolicyLink,
            privacyPolicyLink
        );
    });

    it("Initializing ThirdParty with Google/Github provider", async function () {
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [Google.init(), Github.init()],
            },
        })(SuperTokens.getInstanceOrThrow().appInfo);
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
                        providers: [{}],
                    },
                })(SuperTokens.getInstanceOrThrow().appInfo),
            new Error("Custom provider config should contain id and name attributes")
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
                            },
                        ],
                    },
                })(SuperTokens.getInstanceOrThrow().appInfo),
            new Error("Custom provider config should contain id and name attributes")
        );
    });

    it("Initializing ThirdParty with Custom provider with empty config should throw", async function () {
        assert.throws(
            () =>
                ThirdParty.init({
                    signInAndUpFeature: {
                        providers: [
                            {
                                id: "twitch",
                            },
                        ],
                    },
                })(SuperTokens.getInstanceOrThrow().appInfo),
            new Error("Custom provider config should contain id and name attributes")
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
        })(SuperTokens.getInstanceOrThrow().appInfo);
        assert.notDeepStrictEqual(ThirdParty.getInstanceOrThrow(), undefined);
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.recipeId, "thirdparty");
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.appInfo,
            SuperTokens.getInstanceOrThrow().appInfo
        );
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers.length, 1);
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers[0].getButton().props.children.props
                .children,
            ["Continue with ", "Twitch"]
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
        })(SuperTokens.getInstanceOrThrow().appInfo);
        assert.notDeepStrictEqual(ThirdParty.getInstanceOrThrow(), undefined);
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.recipeId, "thirdparty");
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.appInfo,
            SuperTokens.getInstanceOrThrow().appInfo
        );
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers.length, 1);
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers[0].getButton().props.children.props
                .children,
            ["Continue with ", "Slack First Provider"]
        );
    });

    it("Initializing ThirdParty with custom provider and use buttonComponent if provided", async function () {
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    {
                        id: "slack",
                        name: "Slack",
                        buttonComponent: "LOGIN WITH SLACK",
                    },
                ],
            },
        })(SuperTokens.getInstanceOrThrow().appInfo);
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

    it("Initializing ThirdParty with Google twice only shows a warning and filters duplicate", async function () {
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [Google.init(), Github.init(), Google.init()],
            },
        })(SuperTokens.getInstanceOrThrow().appInfo);
        assert.notDeepStrictEqual(ThirdParty.getInstanceOrThrow(), undefined);
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.recipeId, "thirdparty");
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.appInfo,
            SuperTokens.getInstanceOrThrow().appInfo
        );
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers.length, 2);
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers[0].getButton().props.children.props
                .children,
            ["Continue with ", "Google"]
        );
    });

    it("Initializing ThirdParty with anything other than a provider throws.", async function () {
        assert.throws(
            () =>
                ThirdParty.init({
                    signInAndUpFeature: {
                        providers: [Google.init(), Github.init(), "facebook"],
                    },
                })(SuperTokens.getInstanceOrThrow().appInfo),
            new Error("Custom provider config should contain id and name attributes")
        );
    });

    it("Initializing Google with custom button", async function () {
        const CustomGoogle = "LOGIN WITH GMAIL"; // Should be a component, JSX not supported in unit tests.
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    Google.init({
                        buttonComponent: CustomGoogle,
                    }),
                ],
            },
        })(SuperTokens.getInstanceOrThrow().appInfo);
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers[0].buttonComponent,
            CustomGoogle
        );
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers[0].getButton(),
            CustomGoogle
        );
    });

    it("Initializing ThirdParty with custom authRecipeModule custom configs.", async function () {
        ThirdParty.init({
            palette: {
                primary: "blue",
            },
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
            signInAndUpFeature: {
                providers: [Google.init(), Github.init(), Facebook.init()],
            },
        })(SuperTokens.getInstanceOrThrow().appInfo);
        assert.notDeepStrictEqual(ThirdParty.getInstanceOrThrow(), undefined);
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.recipeId, "thirdparty");
        assert.deepStrictEqual(
            ThirdParty.getInstanceOrThrow().config.appInfo,
            SuperTokens.getInstanceOrThrow().appInfo
        );
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.signInAndUpFeature.providers.length, 3);
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.palette.primary, "blue");
        assert.deepStrictEqual(ThirdParty.getInstanceOrThrow().config.useShadowDom, false);
        assert.throws(() => ThirdParty.getInstanceOrThrow().config.preAPIHook(), new Error("PRE API HOOK THROWS"));
        assert.throws(
            () => ThirdParty.getInstanceOrThrow().config.onHandleEvent(),
            new Error("ON HANDLE EVENTS HOOK THROWS")
        );
        assert.throws(
            () => ThirdParty.getInstanceOrThrow().config.getRedirectionURL(),
            new Error("GET REDIRECTION HOOK THROWS")
        );
    });
});
