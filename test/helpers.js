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
 * Imports.
 */
import {
    ST_ROOT_SELECTOR,
    TEST_APPLICATION_SERVER_BASE_URL,
    SIGN_UP_API,
    EMAIL_EXISTS_API,
    TEST_CLIENT_BASE_URL,
} from "./constants";

import path from "path";
import assert from "assert";
import mkdirp from "mkdirp";

const SESSION_STORAGE_STATE_KEY = "supertokens-oauth-state";

/*
 * General Helpers.
 */

export function mockWindowLocation(url) {
    try {
        const location = new URL(url);
        global.window = Object.create(window);
        Object.defineProperty(window, "location", {
            value: location,
        });
    } catch (e) {
        throw Error(`Failed to mock window location object with ${url}`, e);
    }
}

export async function getFeatureFlags() {
    const response = await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/test/featureFlags`);
    if (response.status === 200) {
        const { available } = await response.json();
        return available;
    } else {
        return [];
    }
}

export async function waitFor(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

/*
 * Selectors and actions helpers.
 * Using Puppeteer within shadowDom https://github.com/puppeteer/puppeteer/issues/858#issuecomment-438540596
 */

export async function waitForSTElement(page, selector, inverted = false) {
    await page.waitForSelector(ST_ROOT_SELECTOR);
    const res = await page.waitForFunction(
        (elementSelector, rootSelector, inverted) => {
            const root = document.querySelector(rootSelector);
            if (!root || !root.shadowRoot) {
                return false;
            }
            if (elementSelector === undefined) {
                return true;
            }
            const elem = root.shadowRoot.querySelector(elementSelector);
            return inverted ? elem === null : elem;
        },
        { polling: 50 },
        selector,
        ST_ROOT_SELECTOR,
        inverted
    );
    if (res) {
        return res.asElement();
    }
    return res;
}

export async function waitForText(page, selector, text, timeout = 10000, pollDelay = 50) {
    const start = new Date().getTime();

    while (true) {
        const header = await waitForSTElement(page, selector);
        const headerText = await header.evaluate((e) => e.textContent);
        if (headerText === text) {
            break;
        } else {
            if (timeout < new Date().getTime() - start) {
                assert.fail(`Timeout while waiting for "${selector}" to have text "${text}"`);
            }
            await waitFor(pollDelay);
        }
    }
}

export async function getSubmitFormButtonLabel(page) {
    await waitForSTElement(page);
    return await page.evaluate(
        (ST_ROOT_SELECTOR) =>
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("form > div > button").innerText,
        ST_ROOT_SELECTOR
    );
}

export async function getProvidersLabels(page) {
    await waitForSTElement(page);
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            Array.from(
                document
                    .querySelector(ST_ROOT_SELECTOR)
                    .shadowRoot.querySelectorAll("[data-supertokens~='providerButtonText']"),
                (i) => i.innerText
            ),
        { ST_ROOT_SELECTOR }
    );
}

export async function getSubmitFormButtonLabelWithoutShadowDom(page) {
    return await page.evaluate(() => document.querySelector("form > div > button").innerText);
}

export async function getSubmitFormButton(page) {
    return waitForSTElement(page, "[data-supertokens='button']");
}

export async function getInputField(page, name) {
    return waitForSTElement(page, `input[name='${name}'`);
}

export async function submitForm(page) {
    const submitButton = await getSubmitFormButton(page);
    await submitButton.click();
}

export async function clickOnPasswordlessResendButton(page) {
    const resendButton = await waitForSTElement(page, "[data-supertokens='link linkButton resendCodeBtn']");
    resendButton.click();
}

export async function getLogoutButton(page) {
    return await page.waitForSelector(".logoutButton");
}

export async function getSignInOrSignUpSwitchLink(page) {
    return waitForSTElement(
        page,
        "div > div > [data-supertokens~='headerSubtitle'] > div > [data-supertokens~='link']"
    );
}

export async function getForgotPasswordLink(page) {
    return waitForSTElement(page, "form > div > [data-supertokens~='forgotPasswordLink']");
}

export async function getResendResetPasswordEmailLink(page) {
    return waitForSTElement(page, "div > div > [data-supertokens~='enterEmailSuccessMessage'] > span");
}

export async function getTextByDataSupertokens(page, value) {
    await waitForSTElement(page, `[data-supertokens~='${value}']`);
    return await page.evaluate(
        (value) =>
            document.querySelector("#supertokens-root").shadowRoot.querySelector(`[data-supertokens~='${value}']`)
                .innerText,
        value
    );
}

export async function sendEmailResetPasswordSuccessMessage(page) {
    return getTextByDataSupertokens(page, "enterEmailSuccessMessage");
}

export async function getLoginWithRedirectToSignIn(page) {
    return await page.evaluateHandle(() => {
        return document.getElementById("login-signin");
    });
}

export async function getLoginWithRedirectToSignUp(page) {
    return await page.evaluateHandle(() => {
        return document.getElementById("login-signup");
    });
}

export async function getAuthPageHeaderText(page) {
    // returns the big header text in /auth page
    return getTextByDataSupertokens(page, "headerTitle");
}

export async function assertNoSTComponents(page) {
    const superTokensComponent = await page.$(ST_ROOT_SELECTOR);
    assert.strictEqual(superTokensComponent, null);
}

export async function getInputNames(page) {
    await waitForSTElement(page);
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            Array.from(
                document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelectorAll("[data-supertokens~='input']"),
                (i) => i.name
            ),
        { ST_ROOT_SELECTOR }
    );
}

export async function getInputAdornmentsSuccess(page) {
    await waitForSTElement(page);
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            Array.from(
                document
                    .querySelector(ST_ROOT_SELECTOR)
                    .shadowRoot.querySelectorAll("[data-supertokens~='inputAdornmentSuccess']"),
                (i) => i.name
            ),
        { ST_ROOT_SELECTOR }
    );
}

export async function getInputAdornmentsError(page) {
    await waitForSTElement(page);
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            Array.from(
                document
                    .querySelector(ST_ROOT_SELECTOR)
                    .shadowRoot.querySelectorAll("[data-supertokens~='inputAdornmentError']"),
                (i) => i.name
            ),
        { ST_ROOT_SELECTOR }
    );
}

export async function getInputTypes(page) {
    await waitForSTElement(page);
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            Array.from(
                document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelectorAll("[data-supertokens~='input']"),
                (i) => i.type
            ),
        { ST_ROOT_SELECTOR }
    );
}

export async function getLabelsText(page) {
    await waitForSTElement(page);
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            Array.from(
                document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelectorAll("[data-supertokens~='label']"),
                (i) => i.innerText
            ),
        { ST_ROOT_SELECTOR }
    );
}

export async function getPlaceholders(page) {
    await waitForSTElement(page);
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            Array.from(
                document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelectorAll("[data-supertokens~='input']"),
                (i) => i.placeholder
            ),
        { ST_ROOT_SELECTOR }
    );
}

export async function getShowPasswordIcon(page) {
    await waitForSTElement(page);
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("[data-supertokens~='showPassword']"),
        { ST_ROOT_SELECTOR }
    );
}

export async function toggleShowPasswordIcon(page) {
    const icon = await waitForSTElement(page, "[data-supertokens~='showPassword']");
    return icon.click();
}

export async function sendVerifyEmail(page) {
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            document
                .querySelector(ST_ROOT_SELECTOR)
                .shadowRoot.querySelector("[data-supertokens~='sendVerifyEmailResend']")
                .click(),
        { ST_ROOT_SELECTOR }
    );
}

export async function clickLinkWithRightArrow(page) {
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            document
                .querySelector(ST_ROOT_SELECTOR)
                .shadowRoot.querySelector("[data-supertokens~='secondaryLinkWithArrow']")
                .click(),
        { ST_ROOT_SELECTOR }
    );
}

export async function getFieldErrors(page) {
    await waitForSTElement(page);
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            Array.from(
                document
                    .querySelector(ST_ROOT_SELECTOR)
                    .shadowRoot.querySelectorAll(
                        "[data-supertokens~='formRow'] [data-supertokens~='inputErrorMessage']"
                    ),
                (i) => i.innerText
            ),
        { ST_ROOT_SELECTOR }
    );
}

export async function getGeneralError(page) {
    return getTextByDataSupertokens(page, "generalError");
}

export async function getGeneralSuccess(page) {
    return getTextByDataSupertokens(page, "generalSuccess");
}

export async function getVerificationEmailTitle(page) {
    return getTextByDataSupertokens(page, "headerTinyTitle");
}

export async function getVerificationEmailErrorTitle(page) {
    return getTextByDataSupertokens(page, "error");
}

export async function getVerificationEmailErrorMessage(page) {
    return getTextByDataSupertokens(page, "primaryText");
}

export async function setInputValues(page, fields) {
    for (const field of fields) {
        await waitForSTElement(page, `input[name=${field.name}]`);

        // Reset input value.
        await page.evaluate(
            ({ field, ST_ROOT_SELECTOR }) => {
                const inputNode = document
                    .querySelector(ST_ROOT_SELECTOR)
                    .shadowRoot.querySelector(`input[name=${field.name}]`);
                inputNode.value = "";
            },
            { field, ST_ROOT_SELECTOR }
        );

        // Type new value.
        const passwordInput = await getInputField(page, field.name);
        await passwordInput.type(field.value);

        // Blur.
        await page.evaluate(
            ({ field, ST_ROOT_SELECTOR }) => {
                const inputNode = document
                    .querySelector(ST_ROOT_SELECTOR)
                    .shadowRoot.querySelector(`input[name=${field.name}]`);
                inputNode.blur();
            },
            { field, ST_ROOT_SELECTOR }
        );
    }

    // Make sure to wait for success feedbacks.
    return await new Promise((r) => setTimeout(r, 300));
}

export async function clearBrowserCookiesWithoutAffectingConsole(page, console) {
    let toReturn = [...console];
    const client = await page.target().createCDPSession();
    await client.send("Network.clearBrowserCookies");
    await client.send("Network.clearBrowserCache");
    // we need this navigation cause the the /auth page will reset the cookie according to how the tests expect it
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
    return toReturn;
}

export async function clickForgotPasswordLink(page) {
    // Click on Forgot Password Link.
    const forgotPasswordLink = await getForgotPasswordLink(page);
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), forgotPasswordLink.click()]);
}

export async function toggleSignInSignUp(page) {
    // Click on Sign Up.
    const signUpLink = await getSignInOrSignUpSwitchLink(page);
    await signUpLink.click();
}

export async function submitFormReturnRequestAndResponse(page, URL) {
    let [, request, response] = await Promise.all([
        submitForm(page),
        page.waitForRequest((request) => request.url() === URL && request.method() === "POST"),
        page.waitForResponse((response) => response.url() === URL && response.status() === 200),
    ]);
    response = await response.json();
    return {
        request,
        response,
    };
}

export async function hasMethodBeenCalled(page, URL, method = "GET", timeout = 1000) {
    let methodCalled = false;

    const onRequestVerifyMatch = (request) => {
        // If method called before hasMethodBeenCalled timeouts, update methodCalled.
        if (request.url() === URL && request.method() === method) {
            methodCalled = true;
        }
        request.continue();
    };

    await page.setRequestInterception(true);
    page.on("request", onRequestVerifyMatch);
    await new Promise((r) => setTimeout(r, timeout));
    await page.setRequestInterception(false);
    page.off("request", onRequestVerifyMatch);
    return methodCalled;
}

export async function assertFormFieldsEqual(actual, expected, values) {
    assert.deepStrictEqual(actual.length, expected.length);
    assert.deepStrictEqual(actual.length, values.length);

    for (const i in actual) {
        assert.deepStrictEqual(actual[i].id, expected[i].id);
        assert.deepStrictEqual(actual[i].email, expected[i].email);
        assert.deepStrictEqual(actual[i].label, expected[i].label);
        assert.deepStrictEqual(actual[i].placeholder, expected[i].placeholder);
        assert.deepStrictEqual(actual[i].optional, expected[i].optional);
        await assertValidator(actual[i].validate, expected[i].validate, values[i]);
    }
}

async function assertValidator(actualValidate, expectedValidate, values) {
    for (const j in values) {
        const actualError = await actualValidate(values[j]);
        const expectedError = await expectedValidate(values[j]);
        assert.deepStrictEqual(actualError, expectedError);
    }
}

export async function getLatestURLWithToken() {
    const response = await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/token`);
    const { latestURLWithToken } = await response.json();
    return latestURLWithToken;
}
export async function assertProviders(page) {
    const providers = await getProvidersLabels(page);
    assert.deepStrictEqual(providers, [
        "Continue with Github",
        "Continue with Google",
        "Continue with Facebook",
        "Continue with Apple",
        "Continue with Custom",
        "Continue with Auth0",
    ]);
}

export async function clickOnProviderButton(page, provider) {
    await waitForSTElement(page);
    return await Promise.all([
        page.evaluate(
            ({ ST_ROOT_SELECTOR, provider }) => {
                Array.from(
                    document
                        .querySelector(ST_ROOT_SELECTOR)
                        .shadowRoot.querySelectorAll("[data-supertokens~='providerButton']")
                )
                    .find((button) => {
                        return button.innerText === `Continue with ${provider}`;
                    })
                    .click();
            },
            { ST_ROOT_SELECTOR, provider }
        ),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
}

export async function loginWithGoogle(page) {
    await page.focus("input[type=email]");
    await page.keyboard.type(process.env.GOOGLE_EMAIL);
    await Promise.all([page.click('input[name="signIn"]'), page.waitForNavigation({ waitUntil: "networkidle0" })]);
    await page.focus("input[type=password]");
    await page.keyboard.type(process.env.GOOGLE_PASSWORD);
    // Submit login
    await Promise.all([page.keyboard.press("Enter"), page.waitForNavigation({ waitUntil: "networkidle0" })]);
    // Accept OAuth terms
    await Promise.all([page.click("button"), page.waitForNavigation({ waitUntil: "networkidle0" })]);
}

export async function loginWithFacebook(page) {
    await page.click('button[data-cookiebanner="accept_button"'), await page.focus("input[name=email]");
    await page.keyboard.type(process.env.FACEBOOK_EMAIL);
    await page.focus("input[name=pass]");
    await page.keyboard.type(process.env.FACEBOOK_PASSWORD);
    await Promise.all([page.keyboard.press("Enter"), page.waitForNavigation({ waitUntil: "networkidle0" })]);
}

export async function loginWithAuth0(page) {
    await page.focus("input[type=email]");
    await page.keyboard.type(process.env.AUTH0_EMAIL);
    await page.focus("input[type=password]");
    await page.keyboard.type(process.env.AUTH0_PASSWORD);
    await Promise.all([page.keyboard.press("Enter"), page.waitForNavigation({ waitUntil: "networkidle0" })]);
    await new Promise((res) => setTimeout(res, 1500));
}

export async function loginWithGithub(page) {
    await page.focus("input[type=text]");
    await page.keyboard.type(process.env.GITHUB_EMAIL);
    await page.focus("input[type=password]");
    await page.keyboard.type(process.env.GITHUB_PASSWORD);
    await Promise.all([page.keyboard.press("Enter"), page.waitForNavigation({ waitUntil: "networkidle0" })]);
    await new Promise((res) => setTimeout(res, 1500));
}

export async function defaultSignUp(page, rid = "emailpassword") {
    return await signUp(
        page,
        [
            { name: "email", value: "john.doe@supertokens.io" },
            { name: "password", value: "Str0ngP@ssw0rd" },
            { name: "name", value: "John Doe" },
            { name: "age", value: "20" },
        ],
        '{"formFields":[{"id":"email","value":"john.doe@supertokens.io"},{"id":"password","value":"Str0ngP@ssw0rd"},{"id":"name","value":"John Doe"},{"id":"age","value":"20"},{"id":"country","value":""}]}',
        rid
    );
}
export async function signUp(page, values, postValues, rid = "emailpassword") {
    // Set values.
    await setInputValues(page, values);
    const successAdornments = await getInputAdornmentsSuccess(page);
    assert.strictEqual(successAdornments.length, 4);

    const errorAdornments = await getInputAdornmentsError(page);
    assert.strictEqual(errorAdornments.length, 0);
    let [{ request, response }, hasEmailExistMethodBeenCalled] = await Promise.all([
        submitFormReturnRequestAndResponse(page, SIGN_UP_API),
        hasMethodBeenCalled(page, EMAIL_EXISTS_API),
    ]);

    // Verify that email exists API has not been called.
    assert.strictEqual(hasEmailExistMethodBeenCalled, false);

    assert.strictEqual(request.headers().rid, rid);
    assert.strictEqual(request.postData(), postValues);

    assert.strictEqual(response.status, "OK");
    await page.setRequestInterception(false);
    await new Promise((r) => setTimeout(r, 500)); // Make sure to wait for navigation. TODO Make more robust.
}

export async function generateState(state, page) {
    await page.evaluate(
        ({ state, SESSION_STORAGE_STATE_KEY }) => {
            window.sessionStorage.setItem(SESSION_STORAGE_STATE_KEY, JSON.stringify(state));
        },
        { state, SESSION_STORAGE_STATE_KEY }
    );
}

export async function getUserIdWithAxios(page) {
    return await page.evaluate(
        () => document.querySelector("#root > div > div.fill > div > div.axios > ul > li.sessionInfo-user-id").innerText
    );
}

export async function getSessionHandleWithAxios(page) {
    return await page.evaluate(
        () =>
            document.querySelector("#root > div > div.fill > div > div.axios > ul > li.sessionInfo-session-handle")
                .innerText
    );
}

export async function getUserIdWithFetch(page) {
    return await page.evaluate(
        () => document.querySelector("#root > div > div.fill > div > div.fetch > ul > li.sessionInfo-user-id").innerText
    );
}

export async function getSessionHandleWithFetch(page) {
    return await page.evaluate(
        () =>
            document.querySelector("#root > div > div.fill > div > div.fetch > ul > li.sessionInfo-session-handle")
                .innerText
    );
}

export async function getUserIdFromSessionContext(page) {
    return await page.evaluate(
        () => document.querySelector("#root > div > div.fill > div > div.session-context-userId").innerText
    );
}

export async function getTextInDashboardNoAuth(page) {
    return await page.evaluate(() => document.querySelector("#root > div > div.fill > div.not-logged-in").innerText);
}

/**
 * @param {import("mocha").Context} ctx
 * @param {import("puppeteer").Browser} browser
 */
export async function screenshotOnFailure(ctx, browser) {
    if (ctx.currentTest?.isFailed()) {
        const pages = await browser.pages();

        let screenshotRoot;

        if (process.env.SCREENSHOT_ROOT !== undefined) {
            screenshotRoot = process.env.SCREENSHOT_ROOT;
        } else if (process.env.MOCHA_FILE !== undefined) {
            const reportFile = path.parse(process.env.MOCHA_FILE);
            screenshotRoot = path.join(reportFile.dir, "screenshots", reportFile.name.replace(".xml", ""));
        } else {
            return;
        }

        const testFileName = ctx.currentTest.file
            .substring(ctx.currentTest.file.lastIndexOf("/") + 1)
            .replace(".test.js", "");
        await mkdirp(path.join(screenshotRoot, testFileName));
        for (let i = 0; i < pages.length; ++i) {
            if (pages[i].url() === "about:blank") {
                continue;
            }

            const title = ctx.currentTest
                .fullTitle()
                .split(/\W/)
                .filter((a) => a.length !== 0)
                .join("_");
            await pages[i].screenshot({
                path: path.join(screenshotRoot, testFileName, `${title}-tab_${i}-${Date.now()}.png`),
            });
            await new Promise((r) => setTimeout(r, 500));
            await pages[i].screenshot({
                path: path.join(screenshotRoot, testFileName, `${title}-tab_${i}-delayed-${Date.now()}.png`),
            });
        }
    }
}

export async function getPasswordlessDevice(loginAttemptInfo) {
    const deviceResp = await fetch(
        `${TEST_APPLICATION_SERVER_BASE_URL}/test/getDevice?preAuthSessionId=${encodeURIComponent(
            loginAttemptInfo.preAuthSessionId
        )}`,
        {
            method: "GET",
        }
    );
    return await deviceResp.json();
}

export function setPasswordlessFlowType(contactMethod, flowType) {
    return fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/test/setFlow`, {
        method: "POST",
        headers: [["content-type", "application/json"]],
        body: JSON.stringify({
            contactMethod,
            flowType,
        }),
    });
}

export function isReact16() {
    return process.env.IS_REACT_16 === "true";
}

export async function getResetPasswordFormBackButton(page) {
    const backButtonSelector =
        "[data-supertokens='headerTitle resetPasswordHeaderTitle'] > [data-supertokens='backButton backButtonCommon']";

    return await waitForSTElement(page, backButtonSelector);
}

export async function getResetPasswordSuccessBackToSignInButton(page) {
    const backToSignInSelector =
        "[data-supertokens='container'] > [data-supertokens='row'] > [data-supertokens='secondaryText secondaryLinkWithLeftArrow']";

    return await waitForSTElement(page, backToSignInSelector);
}
