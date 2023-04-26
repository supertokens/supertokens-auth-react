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
    clearBrowserCookiesWithoutAffectingConsole,
    getPasswordlessDevice,
    setInputValues,
    waitForSTElement,
    waitFor,
    getFeatureFlags,
    waitForText,
    screenshotOnFailure,
    setPasswordlessFlowType,
    isReact16,
    clickOnPasswordlessResendButton,
    isGeneralErrorSupported,
    setGeneralErrorToLocalStorage,
    getInputField,
    assertProviders,
    getProvidersLabels,
    getInputNames,
    assertNoSTComponents,
} from "../helpers";
import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL, DEFAULT_WEBSITE_BASE_PATH, LOGIN_METHODS_API } from "../constants";

// Run the tests in a DOM environment.
require("jsdom-global")();

/*
 * Tests.
 */
describe("SuperTokens Multitenancy", function () {
    let browser;
    let page;

    afterEach(function () {
        return screenshotOnFailure(this, browser);
    });

    before(async function () {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-web-security"],
            headless: false,
        });
        page = await browser.newPage();
    });

    after(async function () {
        // await browser.close();
        await fetch(`${TEST_SERVER_BASE_URL}/after`, {
            method: "POST",
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/stopst`, {
            method: "POST",
        }).catch(console.error);
    });

    it("Renders correct signup form with emailpassword only when list of providers is empty", async function () {
        await page.setRequestInterception(true);
        const requestHandler = (request) => {
            if (request.method() === "GET" && request.url() === LOGIN_METHODS_API) {
                request.respond({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({
                        emailPassword: { enabled: true },
                        passwordless: { enabled: true },
                        thirdParty: {
                            enabled: true,
                            providers: [],
                        },
                    }),
                });
                page.off("request", requestHandler);
                page.setRequestInterception(false);
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

    it("Renders providers from core", async function () {
        await page.setRequestInterception(true);
        const requestHandler = (request) => {
            if (request.method() === "GET" && request.url() === LOGIN_METHODS_API) {
                request.respond({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({
                        emailPassword: { enabled: true },
                        passwordless: { enabled: true },
                        thirdParty: {
                            enabled: true,
                            providers: [
                                { id: "apple", name: "Apple" },
                                { id: "github", name: "Github" },
                            ],
                        },
                    }),
                });
                page.off("request", requestHandler);
                page.setRequestInterception(false);
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
        assert.deepStrictEqual(providers, ["Continue with Apple", "Continue with Github"]);
    });

    it("throws error when core recipes have no overlap with frontend recipes", async function () {
        await page.setRequestInterception(true);
        const requestHandler = (request) => {
            if (request.method() === "GET" && request.url() === LOGIN_METHODS_API) {
                request.respond({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({
                        emailPassword: { enabled: false },
                        passwordless: { enabled: false },
                        thirdParty: {
                            enabled: false,
                            providers: [],
                        },
                    }),
                });
                page.off("request", requestHandler);
                page.setRequestInterception(false);
            } else {
                request.continue();
            }
        };
        page.on("request", requestHandler);
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?authRecipe=thirdparty&multitenancy=enabled`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        const innerHTML = await page.evaluate(() => document.documentElement.innerHTML);
        assert.deepStrictEqual(innerHTML.trim(), "");
    });

    it("should postpone render with no react-router-dom", async function () {
        await page.setRequestInterception(true);
        const requestHandler = async (request) => {
            if (request.method() === "GET" && request.url() === LOGIN_METHODS_API) {
                request.respond({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({
                        emailPassword: { enabled: false },
                        passwordless: { enabled: false },
                        thirdParty: {
                            enabled: true,
                            providers: [
                                { id: "apple", name: "Apple" },
                                { id: "github", name: "Github" },
                            ],
                        },
                    }),
                });
                page.off("request", requestHandler);
                page.setRequestInterception(false);
            } else {
                request.continue();
            }
        };
        page.on("request", requestHandler);
        await Promise.all([
            page.goto(
                `${TEST_CLIENT_BASE_URL}${DEFAULT_WEBSITE_BASE_PATH}?authRecipe=thirdparty&multitenancy=enabled&router=no-router`
            ),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        assertNoSTComponents(page);
        page.on("response", async function () {
            if (response.url() === LOGIN_METHODS_API) {
                await response.waitForEnd();
            }
        });
        const providers = await getProvidersLabels(page);
        assert.deepStrictEqual(providers, ["Continue with Apple", "Continue with Githup"]);
    });
});
