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
import SuperTokens from "../lib/build/index";
import EmailPassword from "../lib/build/recipes/emailpassword";
import assert from "assert";

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

const defaultBasePaths = {
    api: "/auth",
    website: "/auth"
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
        assert.strictEqual(SuperTokens.getAppInfo().websiteDomain, `https://${defaultConfigs.appInfo.websiteDomain}`);
        assert.strictEqual(SuperTokens.getAppInfo().apiDomain, `https://${defaultConfigs.appInfo.apiDomain}`);
        assert.strictEqual(SuperTokens.getAppInfo().apiBasePath, defaultBasePaths.api);
        assert.strictEqual(SuperTokens.getAppInfo().websiteBasePath, defaultBasePaths.website);
        assert.strictEqual(SuperTokens.getAppInfo().logoFullURL, undefined);
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

    it("Initializing SuperTokens with logofullURL", async function() {
        const logoFullURL = "https://my.beautiful.logo.com/logo.png";
        SuperTokens.init({
            ...defaultConfigs,
            appInfo: {
                logoFullURL,
                ...defaultConfigs.appInfo
            }
        });
        assert.strictEqual(SuperTokens.getAppInfo().logoFullURL, logoFullURL);
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
        assert.strictEqual(SuperTokens.getAppInfo().websiteDomain, `http://${websiteDomain}`);
        assert.strictEqual(SuperTokens.getAppInfo().apiDomain, apiDomain);
    });

    it("Initializing SuperTokens with EmailPassword module", async function() {
        SuperTokens.init({
            ...defaultConfigs,
            recipeList: [EmailPassword.init()]
        });
        assert.strictEqual(SuperTokens.getRecipeList().length, 1);
    });

    it("SuperTokens handleRoute should work approriately", async function() {
        SuperTokens.init({
            ...defaultConfigs,
            recipeList: [EmailPassword.init()]
        });

        // Get URL from configs (will use window.location.href) in prod, but window object not available in tests.
        const randomWebsitePath = SuperTokens.getAppInfo().websiteDomain;

        assert.strictEqual(SuperTokens.handleRoute(`${randomWebsitePath}/blog/`), false);
        assert.strictEqual(SuperTokens.handleRoute(`${randomWebsitePath}/blog/.`), false);
        assert.strictEqual(SuperTokens.handleRoute(`${randomWebsitePath}/blog/auth`), false);
        assert.strictEqual(SuperTokens.handleRoute(`${randomWebsitePath}/auth/404`), false);
        assert.strictEqual(SuperTokens.handleRoute(`${randomWebsitePath}/auth`), true);
        assert.strictEqual(SuperTokens.handleRoute(`${randomWebsitePath}/auth/`), true);
        assert.strictEqual(SuperTokens.handleRoute(`${randomWebsitePath}/auth/.`), true);
    });
});
