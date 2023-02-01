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
import SuperTokens from "../../lib/ts/superTokens";
import EmailPassword from "../../lib/ts/recipe/emailpassword";
import { DEFAULT_WEBSITE_BASE_PATH, DEFAULT_API_BASE_PATH } from "../constants";
import assert from "assert";

let currentPath = "/";
/*
 * Consts.
 */
const defaultConfigs = {
    appInfo: {
        appName: "SuperTokens",
        websiteDomain: "supertokens.io",
        apiDomain: "api.supertokens.io",
    },
    windowHandler: (orig) => ({
        ...orig,
        location: {
            ...orig.location,
            getPathName: () => currentPath,
        },
    }),
    recipeList: [EmailPassword.init()],
};

/*
 * Tests.
 */
describe("SuperTokens", function () {
    afterEach(async function () {
        SuperTokens.reset();
    });

    it("Initializing SuperTokens config with default values", async function () {
        SuperTokens.init(defaultConfigs);
        assert.strictEqual(SuperTokens.getInstanceOrThrow().appInfo.appName, defaultConfigs.appInfo.appName);
        assert.strictEqual(
            SuperTokens.getInstanceOrThrow().appInfo.websiteDomain.getAsStringDangerous(),
            `https://${defaultConfigs.appInfo.websiteDomain}`
        );
        assert.strictEqual(
            SuperTokens.getInstanceOrThrow().appInfo.apiDomain.getAsStringDangerous(),
            `https://${defaultConfigs.appInfo.apiDomain}`
        );
        assert.strictEqual(
            SuperTokens.getInstanceOrThrow().appInfo.apiBasePath.getAsStringDangerous(),
            DEFAULT_API_BASE_PATH
        );
        assert.strictEqual(
            SuperTokens.getInstanceOrThrow().appInfo.websiteBasePath.getAsStringDangerous(),
            DEFAULT_WEBSITE_BASE_PATH
        );
    });

    it("Test apiGatewayPath", async function () {
        {
            SuperTokens.init({
                appInfo: {
                    appName: "SuperTokens",
                    websiteDomain: "supertokens.io",
                    apiDomain: "api.supertokens.io",
                    apiGatewayPath: "/gateway",
                },
                recipeList: [EmailPassword.init()],
            });
            assert.strictEqual(
                SuperTokens.getInstanceOrThrow().appInfo.apiBasePath.getAsStringDangerous(),
                "/gateway/auth"
            );

            SuperTokens.reset();
        }

        {
            SuperTokens.init({
                appInfo: {
                    appName: "SuperTokens",
                    websiteDomain: "supertokens.io",
                    apiDomain: "api.supertokens.io",
                },
                recipeList: [EmailPassword.init()],
            });
            assert.strictEqual(SuperTokens.getInstanceOrThrow().appInfo.apiBasePath.getAsStringDangerous(), "/auth");

            SuperTokens.reset();
        }

        {
            SuperTokens.init({
                appInfo: {
                    appName: "SuperTokens",
                    websiteDomain: "supertokens.io",
                    apiDomain: "api.supertokens.io",
                    apiBasePath: "hello",
                    apiGatewayPath: "gateway/one/",
                },
                recipeList: [EmailPassword.init()],
            });
            assert.strictEqual(
                SuperTokens.getInstanceOrThrow().appInfo.apiBasePath.getAsStringDangerous(),
                "/gateway/one/hello"
            );

            SuperTokens.reset();
        }
    });

    it("Initializing SuperTokens twice should ignore new config", async function () {
        SuperTokens.init(defaultConfigs);
        SuperTokens.init({
            ...defaultConfigs,
            appInfo: {
                ...defaultConfigs.appInfo,
                appName: "NewAppName",
            },
        });
        assert.strictEqual(SuperTokens.getInstanceOrThrow().appInfo.appName, defaultConfigs.appInfo.appName);
    });

    it("Initializing SuperTokens without appInfo name should throw", async function () {
        assert.throws(
            () => {
                SuperTokens.init({
                    ...defaultConfigs,
                    appInfo: {
                        ...defaultConfigs.appInfo,
                        appName: undefined as any,
                    },
                });
            },
            { message: "Please provide your appName inside the appInfo object when calling supertokens.init" }
        );
    });

    it("Initializing SuperTokens with corrupted URL should throw", async function () {
        assert.throws(
            () => {
                SuperTokens.init({
                    ...defaultConfigs,
                    appInfo: {
                        ...defaultConfigs.appInfo,
                        apiDomain: ":",
                    },
                });
            },
            { message: "Please provide a valid domain name" }
        );
        assert.throws(
            () => {
                SuperTokens.init({
                    ...defaultConfigs,
                    appInfo: {
                        ...defaultConfigs.appInfo,
                        websiteDomain: "http:://malformed.url",
                    },
                });
            },
            { message: "Please provide a valid domain name" }
        );
    });

    it("Initializing SuperTokens with localhost and unsecure protocol", async function () {
        const websiteDomain = "localhost:4000";
        const apiDomain = "http://api.supertokens.io";
        SuperTokens.init({
            ...defaultConfigs,
            appInfo: {
                ...defaultConfigs.appInfo,
                websiteDomain,
                apiDomain,
            },
        });
        assert.strictEqual(
            SuperTokens.getInstanceOrThrow().appInfo.websiteDomain.getAsStringDangerous(),
            `http://${websiteDomain}`
        );
        assert.strictEqual(SuperTokens.getInstanceOrThrow().appInfo.apiDomain.getAsStringDangerous(), apiDomain);
    });

    it("Initializing SuperTokens with EmailPassword module", async function () {
        SuperTokens.init({
            ...defaultConfigs,
            recipeList: [EmailPassword.init()],
        });
        assert.strictEqual(SuperTokens.getInstanceOrThrow().recipeList.length, 1);
    });

    it("SuperTokens canHandleRoute should work appropriately", async function () {
        SuperTokens.init({
            ...defaultConfigs,
            recipeList: [EmailPassword.init()],
        });

        const randomWebsitePath = SuperTokens.getInstanceOrThrow().appInfo.websiteDomain.getAsStringDangerous();

        currentPath = `${randomWebsitePath}/blog/`;
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
        currentPath = `${randomWebsitePath}/blog/.`;
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
        currentPath = `${randomWebsitePath}/blog/auth`;
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
        currentPath = `${randomWebsitePath}/auth/404`;
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
        currentPath = `${randomWebsitePath}/auth`;
        assert.strictEqual(SuperTokens.canHandleRoute(), true);
        currentPath = `${randomWebsitePath}/auth/`;
        assert.strictEqual(SuperTokens.canHandleRoute(), true);
        currentPath = `${randomWebsitePath}/auth/.`;
        assert.strictEqual(SuperTokens.canHandleRoute(), true);
        currentPath = `${randomWebsitePath}/auth?rid=emailpassword`;
        assert.strictEqual(SuperTokens.canHandleRoute(), true);
        currentPath = `${randomWebsitePath}/auth?rid=unknown-id`;
        // returns first component if rid=unknown-id.
        assert.strictEqual(SuperTokens.canHandleRoute(), true);
    });

    it("SuperTokens disable default Implementation should disable default routes for Sign In and Up", async function () {
        SuperTokens.init({
            ...defaultConfigs,
            recipeList: [
                EmailPassword.init({
                    signInAndUpFeature: {
                        disableDefaultUI: true,
                    },
                }),
            ],
        });

        const randomWebsitePath = SuperTokens.getInstanceOrThrow().appInfo.websiteDomain.getAsStringDangerous();

        currentPath = `${randomWebsitePath}/auth`;
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
        currentPath = `${randomWebsitePath}/auth/`;
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
        currentPath = `${randomWebsitePath}/auth/.`;
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
    });

    it("SuperTokens canHandleRoute should work approriately", async function () {
        SuperTokens.init({
            ...defaultConfigs,
            recipeList: [EmailPassword.init()],
        });

        const randomWebsitePath = SuperTokens.getInstanceOrThrow().appInfo.websiteDomain.getAsStringDangerous();

        currentPath = `${randomWebsitePath}/blog/`;
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
        currentPath = `${randomWebsitePath}/blog/.`;
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
        currentPath = `${randomWebsitePath}/blog/auth`;
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
        currentPath = `${randomWebsitePath}/auth`;
        currentPath = `${randomWebsitePath}/auth/404`;
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
        currentPath = `${randomWebsitePath}/auth/.`;
        assert.strictEqual(SuperTokens.canHandleRoute(), true);
        currentPath = `${randomWebsitePath}/auth?rid=emailpassword`;
        assert.strictEqual(SuperTokens.canHandleRoute(), true);
        // returns first component if rid=unknown.
        currentPath = `${randomWebsitePath}/auth?rid=unknown-id`;
        assert.strictEqual(SuperTokens.canHandleRoute(), true);
        currentPath = `${randomWebsitePath}/auth/reset-password`;
        assert.strictEqual(SuperTokens.canHandleRoute(), true);
        currentPath = `${randomWebsitePath}/auth/reset-password?rid=unknown-id`;
        assert.strictEqual(SuperTokens.canHandleRoute(), true);
    });
});
