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

import assert from "assert";
import puppeteer from "puppeteer";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    clickForgotPasswordLink,
    getFieldErrors,
    getGeneralError,
    getInputNames,
    getInputTypes,
    getLogoutButton,
    getLabelsText,
    getPlaceholders,
    getUserIdWithAxios,
    getSessionHandleWithAxios,
    getUserIdWithFetch,
    getSessionHandleWithFetch,
    getShowPasswordIcon,
    getSubmitFormButtonLabel,
    getInputAdornmentsSuccess,
    hasMethodBeenCalled,
    setInputValues,
    submitForm,
    submitFormReturnRequestAndResponse,
    toggleShowPasswordIcon,
    toggleSignInSignUp,
    getInputAdornmentsError,
    defaultSignUp,
    getUserIdFromSessionContext,
    getTextInDashboardNoAuth,
    waitForSTElement,
    screenshotOnFailure,
    isGeneralErrorSupported,
    setGeneralErrorToLocalStorage,
    getInvalidClaimsJSON as getInvalidClaims,
    waitForText,
    backendBeforeEach,
    getTestEmail,
    getPasswordlessDevice,
    waitFor,
} from "../helpers";
import fetch from "isomorphic-fetch";
import { SOMETHING_WENT_WRONG_ERROR, TEST_APPLICATION_SERVER_BASE_URL } from "../constants";

import { EMAIL_EXISTS_API, SIGN_IN_API, TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL, SIGN_OUT_API } from "../constants";

/*
 * Tests.
 */
describe("SuperTokens SignIn", function () {
    let browser;
    let page;
    let consoleLogs = [];

    before(async function () {
        await backendBeforeEach();

        await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
            method: "POST",
        }).catch(console.error);

        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true,
        });
    });

    after(async function () {
        await browser.close();

        await fetch(`${TEST_SERVER_BASE_URL}/after`, {
            method: "POST",
        }).catch(console.error);

        await fetch(`${TEST_SERVER_BASE_URL}/stopst`, {
            method: "POST",
        }).catch(console.error);
    });

    afterEach(async function () {
        await screenshotOnFailure(this, browser);
        if (page) {
            page.evaluate(() => window.localStorage.removeItem("firstFactors"));
            await page.close();
        }
    });

    beforeEach(async function () {
        page = await browser.newPage();
        page.on("console", (consoleObj) => {
            const log = consoleObj.text();
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
        });
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, []);
        await page.evaluate(() => {
            window.localStorage.setItem("enableAllRecipes", "true");
        });
    });

    describe("with firstFactors set on the client", () => {
        it("should display pwless w/ phone for [otp-phone]", async () => {
            await page.evaluate(() => {
                window.localStorage.setItem("firstFactors", "otp-phone");
            });

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await checkPasswordlessLoginUI(page, "PHONE");
        });
        it("should display pwless w/ email for [otp-phone]", async () => {
            await page.evaluate(() => {
                window.localStorage.setItem("firstFactors", "otp-email");
            });

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await checkPasswordlessLoginUI(page, "EMAIL");
        });
        it("should display pwless w/ email for [otp-phone]", async () => {
            await page.evaluate(() => {
                window.localStorage.setItem("firstFactors", "otp-email, otp-phone");
            });

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await checkPasswordlessLoginUI(page, "EMAIL_OR_PHONE");
        });

        it("should display tp-pwless w/ email for [thirdparty, otp-email]", async () => {
            await page.evaluate(() => {
                window.localStorage.setItem("firstFactors", "thirdparty, otp-email");
            });

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await checkThirdPartyLoginUI(page);
            await checkPasswordlessLoginUI(page, "EMAIL");
        });

        it("should display tp-ep for [thirdparty, emailpassword]", async () => {
            await page.evaluate(() => {
                window.localStorage.setItem("firstFactors", "thirdparty, emailpassword");
            });

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await checkThirdPartyLoginUI(page);
            await checkEmailPasswordLoginUI(page);
        });

        it("should throw for [unknown]", async () => {
            await page.evaluate(() => {
                window.localStorage.setItem("firstFactors", "unknown");
            });

            let hitErrorBoundary = false;
            page.on("console", (ev) => {
                if (ev.text() === "ST_THROWN_ERROR") {
                    hitErrorBoundary = true;
                }
            });
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await waitFor(500);
            assert(hitErrorBoundary);
        });
    });

    describe("with firstFactors set on the tenant", () => {
        beforeEach(async () => {
            await page.evaluate(() => {
                window.localStorage.setItem("usesDynamicLoginMethods", "true");
            });
        });
        it("should display pwless w/ phone for [otp-phone] even if the client side firstFactor array is different", async () => {
            await page.evaluate((dynLoginMethods) => {
                window.localStorage.setItem("mockLoginMethodsForDynamicLogin", dynLoginMethods);
                window.localStorage.setItem("firstFactors", "unknown");
            }, getDynLoginMethods(["otp-phone"]));

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await checkPasswordlessLoginUI(page, "PHONE");
        });
        it("should display pwless w/ phone for [otp-phone]", async () => {
            await page.evaluate((dynLoginMethods) => {
                window.localStorage.setItem("mockLoginMethodsForDynamicLogin", dynLoginMethods);
            }, getDynLoginMethods(["otp-phone"]));

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await checkPasswordlessLoginUI(page, "PHONE");
        });
        it("should display pwless w/ email for [otp-phone]", async () => {
            await page.evaluate((dynLoginMethods) => {
                window.localStorage.setItem("mockLoginMethodsForDynamicLogin", dynLoginMethods);
            }, getDynLoginMethods(["otp-email"]));

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await checkPasswordlessLoginUI(page, "EMAIL");
        });
        it("should display pwless w/ email for [otp-phone]", async () => {
            await page.evaluate((dynLoginMethods) => {
                window.localStorage.setItem("mockLoginMethodsForDynamicLogin", dynLoginMethods);
            }, getDynLoginMethods(["otp-email", "otp-phone"]));

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await checkPasswordlessLoginUI(page, "EMAIL_OR_PHONE");
        });

        it("should display tp-pwless w/ email for [thirdparty, otp-email]", async () => {
            await page.evaluate((dynLoginMethods) => {
                window.localStorage.setItem("mockLoginMethodsForDynamicLogin", dynLoginMethods);
            }, getDynLoginMethods(["thirdparty", "otp-email"]));

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await checkThirdPartyLoginUI(page);
            await checkPasswordlessLoginUI(page, "EMAIL");
        });

        it("should display tp-ep for [thirdparty, emailpassword]", async () => {
            await page.evaluate((dynLoginMethods) => {
                window.localStorage.setItem("mockLoginMethodsForDynamicLogin", dynLoginMethods);
            }, getDynLoginMethods(["thirdparty", "emailpassword"]));

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await checkThirdPartyLoginUI(page);
            await checkEmailPasswordLoginUI(page);
        });

        it("should throw for [unknown]", async () => {
            await page.evaluate((dynLoginMethods) => {
                window.localStorage.setItem("mockLoginMethodsForDynamicLogin", dynLoginMethods);
            }, getDynLoginMethods(["unknown"]));

            let hitErrorBoundary = false;
            page.on("console", (ev) => {
                if (ev.text() === "ST_THROWN_ERROR") {
                    hitErrorBoundary = true;
                }
            });
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await waitFor(500);
            assert(hitErrorBoundary);
        });
    });
});

function getDynLoginMethods(firstFactors) {
    return JSON.stringify({
        emailPassword: { enabled: true },
        passwordless: { enabled: true },
        thirdParty: { enabled: true, providers: [{ id: "google", name: "Google" }] },
        firstFactors,
    });
}

async function checkPasswordlessLoginUI(page, contactMethod) {
    switch (contactMethod) {
        case "EMAIL_OR_PHONE":
            await waitForSTElement(page, "[data-supertokens~=input][name=emailOrPhone]");
            break;
        case "EMAIL":
            await waitForSTElement(page, "[data-supertokens~=input][name=email]");
            break;
        case "PHONE":
            await waitForSTElement(page, "[data-supertokens~=input][name=phoneNumber_text]");
            break;
        default:
            throw new Error("Unknown contact method " + contactMethod);
    }
}

async function checkThirdPartyLoginUI(page) {
    // This basically checks that there is a provider shown
    await waitForSTElement(page, "[data-supertokens~=providerContainer]");
}

async function checkEmailPasswordLoginUI(page) {
    // This basically checks that there is a provider shown
    await waitForSTElement(page, "[data-supertokens~=input][name=password]");
}
