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
 * Imports
 */

/* https://github.com/babel/babel/issues/9849#issuecomment-487040428 */
import regeneratorRuntime from "regenerator-runtime";
import SuperTokens from "../../lib/build/superTokens";
import EmailPassword, { SignInAndUp } from "../../lib/build/recipe/emailpassword";
import { DEFAULT_WEBSITE_BASE_PATH, DEFAULT_API_BASE_PATH } from "../../lib/build/constants";
import assert from "assert";
import { mockWindowLocation } from "../helpers";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Consts.
 */
const defaultConfigs = {
    appInfo: {
        appName: "SuperTokens",
        websiteDomain: "supertokens.io",
        apiDomain: "api.supertokens.io"
    },
    recipeList: []
};

/*
 * Tests.
 */
describe("SuperTokens", function() {
    afterEach(async function() {
        SuperTokens.reset();
    });

    it("Initializing SuperTokens config with default values", async function() {
        SuperTokens.init(defaultConfigs);
        assert.strictEqual(SuperTokens.getAppInfo().appName, defaultConfigs.appInfo.appName);
        assert.strictEqual(
            SuperTokens.getAppInfo().websiteDomain.getAsStringDangerous(),
            `https://${defaultConfigs.appInfo.websiteDomain}`
        );
        assert.strictEqual(
            SuperTokens.getAppInfo().apiDomain.getAsStringDangerous(),
            `https://${defaultConfigs.appInfo.apiDomain}`
        );
        assert.strictEqual(SuperTokens.getAppInfo().apiBasePath.getAsStringDangerous(), DEFAULT_API_BASE_PATH);
        assert.strictEqual(SuperTokens.getAppInfo().websiteBasePath.getAsStringDangerous(), DEFAULT_WEBSITE_BASE_PATH);
    });

    it("Initializing SuperTokens twice should throw", async function() {
        SuperTokens.init(defaultConfigs);
        assert.throws(
            () => {
                SuperTokens.init(defaultConfigs);
            },
            Error,
            "SuperTokens was already initialized"
        );
    });

    it("Initializing SuperTokens with corrupted URL should throw", async function() {
        assert.throws(
            () => {
                SuperTokens.init({
                    ...defaultConfigs,
                    appInfo: {
                        ...defaultConfigs.appInfo,
                        apiDomain: ":"
                    }
                });
            },
            Error,
            "There was an error parsing the url you provided: (:). Please make sure it is correct."
        );
        assert.throws(
            () => {
                SuperTokens.init({
                    ...defaultConfigs,
                    appInfo: {
                        ...defaultConfigs.appInfo,
                        websiteDomain: "http:://malformed.url"
                    }
                });
            },
            Error,
            "There was an error parsing the url you provided: (http:://malformed.url). Please make sure it is correct."
        );
    });

    it("Initializing SuperTokens with localhost and unsecure protocol", async function() {
        const websiteDomain = "localhost:4000";
        const apiDomain = "http://api.supertokens.io";
        SuperTokens.init({
            ...defaultConfigs,
            appInfo: {
                ...defaultConfigs.appInfo,
                websiteDomain,
                apiDomain
            }
        });
        assert.strictEqual(SuperTokens.getAppInfo().websiteDomain.getAsStringDangerous(), `http://${websiteDomain}`);
        assert.strictEqual(SuperTokens.getAppInfo().apiDomain.getAsStringDangerous(), apiDomain);
    });

    it("Initializing SuperTokens with EmailPassword module", async function() {
        SuperTokens.init({
            ...defaultConfigs,
            recipeList: [EmailPassword.init()]
        });
        assert.strictEqual(SuperTokens.getRecipeList().length, 1);
    });

    it("SuperTokens canHandleRoute should work approriately", async function() {
        SuperTokens.init({
            ...defaultConfigs,
            recipeList: [EmailPassword.init()]
        });

        const randomWebsitePath = SuperTokens.getAppInfo().websiteDomain.getAsStringDangerous();

        mockWindowLocation(`${randomWebsitePath}/blog/`);
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
        mockWindowLocation(`${randomWebsitePath}/blog/.`);
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
        mockWindowLocation(`${randomWebsitePath}/blog/auth`);
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
        mockWindowLocation(`${randomWebsitePath}/auth/404`);
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
        mockWindowLocation(`${randomWebsitePath}/auth`);
        assert.strictEqual(SuperTokens.canHandleRoute(), true);
        mockWindowLocation(`${randomWebsitePath}/auth/`);
        assert.strictEqual(SuperTokens.canHandleRoute(), true);
        mockWindowLocation(`${randomWebsitePath}/auth/.`);
        assert.strictEqual(SuperTokens.canHandleRoute(), true);
        mockWindowLocation(`${randomWebsitePath}/auth?rid=email-password`);
        assert.strictEqual(SuperTokens.canHandleRoute(), true);
        mockWindowLocation(`${randomWebsitePath}/auth?rid=unknown-id`);
        assert.strictEqual(SuperTokens.canHandleRoute(), false);
    });

    it("SuperTokens getRoutingComponent should work approriately", async function() {
        SuperTokens.init({
            ...defaultConfigs,
            recipeList: [EmailPassword.init()]
        });

        const randomWebsitePath = SuperTokens.getAppInfo().websiteDomain.getAsStringDangerous();

        mockWindowLocation(`${randomWebsitePath}/blog/`);
        assert.strictEqual(SuperTokens.getRoutingComponent(), undefined);
        mockWindowLocation(`${randomWebsitePath}/blog/.`);
        assert.strictEqual(SuperTokens.getRoutingComponent(), undefined);
        mockWindowLocation(`${randomWebsitePath}/blog/auth`);
        assert.strictEqual(SuperTokens.getRoutingComponent(), undefined);
        mockWindowLocation(`${randomWebsitePath}/auth/404`);
        assert.strictEqual(SuperTokens.getRoutingComponent(), undefined);
        mockWindowLocation(`${randomWebsitePath}/auth`);
        assert.strictEqual(SuperTokens.getRoutingComponent(), SignInAndUp);
        mockWindowLocation(`${randomWebsitePath}/auth/`);
        assert.strictEqual(SuperTokens.getRoutingComponent(), SignInAndUp);
        mockWindowLocation(`${randomWebsitePath}/auth/.`);
        assert.strictEqual(SuperTokens.getRoutingComponent(), SignInAndUp);
        mockWindowLocation(`${randomWebsitePath}/auth?rid=email-password`);
        assert.strictEqual(SuperTokens.getRoutingComponent(), SignInAndUp);
        mockWindowLocation(`${randomWebsitePath}/auth?rid=unknown-id`);
        assert.strictEqual(SuperTokens.getRoutingComponent(), undefined);
    });
});
