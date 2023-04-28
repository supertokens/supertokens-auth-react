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
import assert from "assert";
import puppeteer from "puppeteer";
import fetch from "isomorphic-fetch";
import {
    waitForSTElement,
    screenshotOnFailure,
    getProvidersLabels,
    getInputNames,
    assertNoSTComponents,
} from "../helpers";
import { TEST_CLIENT_BASE_URL, DEFAULT_WEBSITE_BASE_PATH, LOGIN_METHODS_API, ST_ROOT_SELECTOR } from "../constants";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe("SuperTokens Multitenancy", function () {
    let browser;
    let page;

    afterEach(async function () {
        page = await browser.newPage();
        return screenshotOnFailure(this, browser);
    });

    before(async function () {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-web-security"],
            headless: true,
        });
        page = await browser.newPage();
    });

    after(async function () {
        await browser.close();
    });

    function getResponder(request) {
        return function (body) {
            request.respond({
                status: 200,
                contentType: "application/json",
                headers: {
                    "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                    "access-control-allow-credentials": "true",
                },
                body: JSON.stringify({
                    emailPassword: { enabled: false },
                    passwordless: { enabled: false },
                    thirdParty: {
                        enabled: false,
                        providers: [],
                    },
                    ...body,
                }),
            });
        };
    }

    it("Renders correct signup form with emailpassword only when list of providers is empty", async function () {
        await page.setRequestInterception(true);
        const requestHandler = async (request) => {
            if (request.method() === "GET" && request.url() === LOGIN_METHODS_API) {
                getResponder(request)({
                    emailPassword: { enabled: true },
                    passwordless: { enabled: true },
                    thirdParty: {
                        enabled: true,
                        providers: [],
                    },
                });
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            } else {
                request.continue();
            }
        };
        page.on("request", requestHandler);
        await Promise.all([
            page.goto(
                `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?authRecipe=thirdpartyemailpassword&multitenancy=enabled`
            ),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        const providers = await getProvidersLabels(page);
        assert.deepStrictEqual(providers, []);
        const inputNames = await getInputNames(page);
        assert.deepStrictEqual(inputNames, ["email", "password"]);
    });

    it("renders empty page when core recipes have no overlap with frontend recipes", async function () {
        await page.setRequestInterception(true);
        const requestHandler = async (request) => {
            if (request.method() === "GET" && request.url() === LOGIN_METHODS_API) {
                getResponder(request)();
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            } else {
                request.continue();
            }
        };
        page.on("request", requestHandler);
        await Promise.all([
            page.goto(
                `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?authRecipe=thirdpartyemailpassword&multitenancy=enabled`
            ),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        await assertNoSTComponents(page);
    });

    it("Renders providers from core", async function () {
        await page.setRequestInterception(true);
        const requestHandler = async (request) => {
            if (request.method() === "GET" && request.url() === LOGIN_METHODS_API) {
                getResponder(request)({
                    emailPassword: { enabled: true },
                    passwordless: { enabled: true },
                    thirdParty: {
                        enabled: true,
                        providers: [{ id: "apple", name: "Apple" }],
                    },
                });
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            } else {
                request.continue();
            }
        };
        page.on("request", requestHandler);
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?authRecipe=thirdparty&multitenancy=enabled`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        const providers = await getProvidersLabels(page);
        assert.deepStrictEqual(providers, ["Continue with Apple"]);
    });

    it("should postpone render with no react-router-dom", async function () {
        await page.setRequestInterception(true);
        const requestHandler = (request) => {
            if (request.method() === "GET" && request.url() === LOGIN_METHODS_API) {
                setTimeout(async () => {
                    getResponder(request)({
                        thirdParty: {
                            enabled: true,
                            providers: [{ id: "apple", name: "Apple" }],
                        },
                    });
                    page.off("request", requestHandler);
                    await page.setRequestInterception(false);
                }, 2000);
            } else {
                request.continue();
            }
        };
        page.on("request", requestHandler);
        await Promise.all([
            page.goto(
                `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?authRecipe=thirdparty&multitenancy=enabled&router=no-router`
            ),
        ]);
        const superTokensComponent = await page.$(ST_ROOT_SELECTOR);
        assert.deepStrictEqual(superTokensComponent, null);
        await page.waitForTimeout(2000);
        const providers = await getProvidersLabels(page);
        assert.deepStrictEqual(providers, ["Continue with Apple"]);
    });

    it("renders passwordless form only when enabled on the core", async function () {
        await page.setRequestInterception(true);
        let requestHandler = async (request) => {
            if (request.method() === "GET" && request.url() === LOGIN_METHODS_API) {
                getResponder(request)({
                    passwordless: { enabled: false },
                });
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            } else {
                request.continue();
            }
        };
        page.on("request", requestHandler);
        await Promise.all([
            page.goto(
                `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?authRecipe=passwordless&multitenancy=enabled`
            ),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        const input = await page.$("[data-supertokens~=input][name=emailOrPhone]");
        assert.deepStrictEqual(input, null);

        await page.setRequestInterception(true);
        requestHandler = async (request) => {
            if (request.method() === "GET" && request.url() === LOGIN_METHODS_API) {
                getResponder(request)({
                    passwordless: { enabled: true },
                });
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            } else {
                request.continue();
            }
        };
        page.on("request", requestHandler);
        await Promise.all([page.reload(), page.waitForNavigation({ waitUntil: "networkidle0" })]);
        await waitForSTElement(page, "[data-supertokens~=input][name=emailOrPhone]");
    });

    it("renders thirdpartypasswordless form when enabled on the core", async function () {
        await page.setRequestInterception(true);
        let requestHandler = async (request) => {
            if (request.method() === "GET" && request.url() === LOGIN_METHODS_API) {
                getResponder(request)({
                    passwordless: { enabled: true },
                    thirdParty: {
                        enabled: true,
                        providers: [{ id: "apple", name: "Apple" }],
                    },
                });
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            } else {
                request.continue();
            }
        };
        page.on("request", requestHandler);
        await Promise.all([
            page.goto(
                `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?authRecipe=thirdpartypasswordless&multitenancy=enabled`
            ),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        const providers = await getProvidersLabels(page);
        assert.deepStrictEqual(providers, ["Continue with Apple"]);
        await waitForSTElement(page, "[data-supertokens~=input][name=emailOrPhone]");
    });

    it("thirdparty will be considered disabled if provider list is empty even if enabled is true", async function () {
        await page.setRequestInterception(true);
        let requestHandler = async (request) => {
            if (request.method() === "GET" && request.url() === LOGIN_METHODS_API) {
                getResponder(request)({
                    passwordless: { enabled: true },
                    thirdParty: {
                        enabled: true,
                        providers: [],
                    },
                });
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            } else {
                request.continue();
            }
        };
        page.on("request", requestHandler);
        await Promise.all([
            page.goto(
                `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?authRecipe=thirdpartypasswordless&multitenancy=enabled`
            ),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);

        const providers = await getProvidersLabels(page);
        assert.deepStrictEqual(providers, []);
        await waitForSTElement(page, "[data-supertokens~=input][name=emailOrPhone]");
    });
});
