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
    TEST_SERVER_BASE_URL,
} from "./constants";

import path from "path";
import assert from "assert";
import mkdirp from "mkdirp";
import addContext from "mochawesome/addContext";

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
    const start = Date.now();
    while (start > Date.now() - 30000) {
        try {
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
        } catch (ex) {
            if (start < Date.now() - 30000) {
                throw ex;
            }
            console.log("Caught exception in waitForSTElement, but retrying until timeout", ex);
        }
    }
    throw new Error(`Waiting for ${selector} to ${inverted ? "disappear" : "appear"} timed out`);
}

export function waitForUrl(page, url, onlyPath = true) {
    return page.waitForFunction(
        (pathname, onlyPath) => {
            return (
                (onlyPath
                    ? window.location.pathname
                    : window.location.pathname + window.location.search + window.location.hash) === pathname
            );
        },
        { polling: 50 },
        url,
        onlyPath
    );
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
                assert.fail(
                    `Timeout while waiting for "${selector}" to have text "${text}. It currently has: ${headerText}"`
                );
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
    await waitForSTElement(page, "[data-supertokens~=headerTitle]");
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

export async function getProviderLogoCount(page) {
    await waitForSTElement(page);
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            document
                .querySelector(ST_ROOT_SELECTOR)
                .shadowRoot.querySelectorAll("[data-supertokens~='providerButtonLogo']").length,
        { ST_ROOT_SELECTOR }
    );
}

export async function getSubmitFormButtonLabelWithoutShadowDom(page) {
    await page.waitForSelector("form > div > button");
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
    return waitForSTElement(page, "[data-supertokens~='headerSubtitle'] > [data-supertokens~='link']");
}

export async function getForgotPasswordLink(page) {
    return waitForSTElement(page, "[data-supertokens~='forgotPasswordLink']");
}

export async function getResendResetPasswordEmailLink(page) {
    return waitForSTElement(page, "[data-supertokens~='enterEmailSuccessMessage'] > span");
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
                (i) => i.textContent
            ),
        { ST_ROOT_SELECTOR }
    );
}

export async function getFactorChooserOptions(page) {
    await waitForSTElement(page, "[data-supertokens~='factorChooserList']");
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            Array.from(
                document
                    .querySelector(ST_ROOT_SELECTOR)
                    .shadowRoot.querySelectorAll("[data-supertokens~='factorChooserOption']"),
                (i) =>
                    i.dataset["supertokens"]
                        ?.split(" ")
                        .filter((x) => x !== "factorChooserOption")
                        .join(" ")
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

export async function logoutFromEmailVerification(page) {
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            document
                .querySelector(ST_ROOT_SELECTOR)
                .shadowRoot.querySelector("[data-supertokens~='buttonWithArrow']")
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
        // This selects all texts inside the input, so typing will clear it.
        await passwordInput.click({ clickCount: 3 });
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

export async function setSelectDropdownValue(page, selector, optionValue) {
    const dropdownEle = await waitForSTElement(page, selector);
    return dropdownEle.select(selector, optionValue);
}

export async function clearBrowserCookiesWithoutAffectingConsole(page, logs) {
    let toReturn = [...logs];
    const client = await page.target().createCDPSession();
    await client.send("Network.clearBrowserCookies");
    await client.send("Network.clearBrowserCache");
    // we need this navigation cause the the /auth page will reset the cookie according to how the tests expect it
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    // TODO: think about moving this elsewhere and/or renaming this function
    if (await isMFASupported()) {
        await page.evaluate(() => window.localStorage.setItem("enableMFA", "true"));
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
    }
    logs.length = 0;
    logs.push(...toReturn);

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

export async function hasMethodBeenCalled(page, URL, method = "GET", timeout = 2000) {
    try {
        await page.waitForResponse((response) => response.url() === URL && response.request().method() === method, {
            timeout,
        });
        return true;
    } catch (e) {
        return false;
    }
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
    let latestURLWithToken;
    const start = Date.now();
    while (!latestURLWithToken) {
        const response = await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/token`);
        const respBody = await response.json();
        latestURLWithToken = respBody.latestURLWithToken;
        if (!latestURLWithToken) {
            if (Date.now() - start > 10000) {
                throw new Error("Timeout waiting for latestURLWithToken");
            }
            await new Promise((res) => setTimeout(res, 250));
        }
    }
    return latestURLWithToken;
}

export async function assertProviders(page) {
    const providers = await getProvidersLabels(page);
    assert.deepStrictEqual(providers, [
        "Continue with GitHub",
        "Continue with Google",
        "Continue with Facebook",
        "Continue with Apple",
        "Continue with Custom",
        "Continue with Auth0",
        "Continue with Mock Provider",
    ]);
}

export async function clickOnProviderButton(page, provider) {
    await waitForSTElement(page);
    return await Promise.all([
        clickOnProviderButtonWithoutWaiting(page, provider),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
}

// Clicks on the provider button but does not wait for navigation
// This is useful if you want to listen to network requests after clicking
export async function clickOnProviderButtonWithoutWaiting(page, provider) {
    await waitForSTElement(page);
    return page.evaluate(
        ({ ST_ROOT_SELECTOR, provider }) => {
            Array.from(
                document
                    .querySelector(ST_ROOT_SELECTOR)
                    .shadowRoot.querySelectorAll(
                        "[data-supertokens~='providerButton'] [data-supertokens~='providerButtonText']"
                    )
            )
                .find((button) => {
                    return button.innerText === `Continue with ${provider}`;
                })
                .click();
        },
        { ST_ROOT_SELECTOR, provider }
    );
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

export async function loginWithMockProvider(
    page,
    email = "st_test_user@supertokens.io",
    userId = "123",
    isVerified = true
) {
    const url = new URL(page.url());
    await Promise.all([
        page.goto(
            `${TEST_CLIENT_BASE_URL}/auth/callback/mock-provider?code=asdf&email=${encodeURIComponent(
                email
            )}&userId=${encodeURIComponent(userId)}&isVerified=${isVerified}&state=${url.searchParams.get("state")}`
        ),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
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

export function getDefaultSignUpFieldValues({
    name = "John Doe",
    email = "john.doe@supertokens.io",
    password = "Str0ngP@ssw0rd",
    age = "20",
} = {}) {
    const fieldValues = [
        { name: "email", value: email },
        { name: "password", value: password },
        { name: "name", value: name },
        { name: "age", value: age },
    ];
    const postValues = `{"formFields":[{"id":"email","value":"${email}"},{"id":"password","value":"${password}"},{"id":"name","value":"${name}"},{"id":"age","value":"${age}"},{"id":"country","value":""}]}`;

    return { fieldValues, postValues };
}

export async function signUp(page, fields, postValues = undefined) {
    // Set values.
    await setInputValues(page, fields);
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

    assert.strictEqual(request.headers().rid, "emailpassword");
    if (postValues !== undefined) {
        assert.strictEqual(request.postData(), postValues);
    }

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
    await page.waitForSelector("#root > div > div.fill > div > div.axios > ul > li.sessionInfo-user-id");
    return await page.evaluate(
        () => document.querySelector("#root > div > div.fill > div > div.axios > ul > li.sessionInfo-user-id").innerText
    );
}

export async function getSessionHandleWithAxios(page) {
    await page.waitForSelector("#root > div > div.fill > div > div.axios > ul > li.sessionInfo-session-handle");
    return await page.evaluate(
        () =>
            document.querySelector("#root > div > div.fill > div > div.axios > ul > li.sessionInfo-session-handle")
                .innerText
    );
}

export async function getUserIdWithFetch(page) {
    await page.waitForSelector("#root > div > div.fill > div > div.fetch > ul > li.sessionInfo-user-id");
    return await page.evaluate(
        () => document.querySelector("#root > div > div.fill > div > div.fetch > ul > li.sessionInfo-user-id").innerText
    );
}

export async function getSessionHandleWithFetch(page) {
    await page.waitForSelector("#root > div > div.fill > div > div.fetch > ul > li.sessionInfo-session-handle");
    return await page.evaluate(
        () =>
            document.querySelector("#root > div > div.fill > div > div.fetch > ul > li.sessionInfo-session-handle")
                .innerText
    );
}

export async function getInvalidClaimsJSON(page) {
    return JSON.parse(
        await page.evaluate(() => document.querySelector("#root > div > div.fill > div > pre.invalidClaims").innerText)
    );
}

export async function getUserIdFromSessionContext(page) {
    await page.waitForSelector("#root > div > div.fill > div > div.session-context-userId");
    return await page.evaluate(
        () => document.querySelector("#root > div > div.fill > div > div.session-context-userId").innerText
    );
}

export async function getTextInDashboardNoAuth(page) {
    await page.waitForSelector("#root > div > div.fill > div.not-logged-in");
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

            let title = ctx.currentTest
                .fullTitle()
                .split(/\W/)
                .filter((a) => a.length !== 0)
                .join("_");
            title = title.substring(title.length - 30);

            const screenshotPath = path.join(screenshotRoot, testFileName, `${title}-tab_${i}-${Date.now()}.png`);
            await pages[i].screenshot({ path: screenshotPath });
            addContext(ctx, { title: "Screenshot", value: screenshotPath });

            await new Promise((r) => setTimeout(r, 500));

            const delayedScreenshotPath = path.join(
                screenshotRoot,
                testFileName,
                `${title}-tab_${i}-delayed-${Date.now()}.png`
            );
            await pages[i].screenshot({ path: delayedScreenshotPath });
            addContext(ctx, { title: "Delayed Screenshot", value: delayedScreenshotPath });
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

export function setAccountLinkingConfig(enabled, shouldAutomaticallyLink, shouldRequireVerification) {
    return fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/test/setAccountLinkingConfig`, {
        method: "POST",
        headers: [["content-type", "application/json"]],
        body: JSON.stringify({
            enabled,
            shouldAutoLink: {
                shouldAutomaticallyLink,
                shouldRequireVerification,
            },
        }),
    });
}

export function changeEmail(rid, recipeUserId, email, phoneNumber) {
    return fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/changeEmail`, {
        method: "POST",
        headers: [["content-type", "application/json"]],
        body: JSON.stringify({
            rid,
            recipeUserId,
            email,
            phoneNumber,
        }),
    });
}

export function setEnabledRecipes(enabledRecipes, enabledProviders) {
    return fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/test/setEnabledRecipes`, {
        method: "POST",
        headers: [["content-type", "application/json"]],
        body: JSON.stringify({
            enabledRecipes,
            enabledProviders,
        }),
    });
}

export function isReact16() {
    return process.env.IS_REACT_16 === "true";
}

export async function getTitleBackButton(page) {
    const backButtonSelector = "[data-supertokens~='headerTitle'] > [data-supertokens~='backButton']";

    return await waitForSTElement(page, backButtonSelector);
}

export async function getResetPasswordSuccessBackToSignInButton(page) {
    const backToSignInSelector =
        "[data-supertokens~='container'] > [data-supertokens~='row'] > [data-supertokens~='secondaryLinkWithLeftArrow']";

    return await waitForSTElement(page, backToSignInSelector);
}

export async function isGeneralErrorSupported() {
    const features = await getFeatureFlags();
    if (!features.includes("generalerror") || isReact16()) {
        return false;
    }

    return true;
}

export async function isPasswordlessSupported() {
    const features = await getFeatureFlags();
    if (features.includes("passwordless")) {
        return true;
    }

    return false;
}

export async function isThirdPartyPasswordlessSupported() {
    const features = await getFeatureFlags();
    if (features.includes("thirdpartypasswordless")) {
        return true;
    }

    return false;
}

export async function isUserRolesSupported() {
    const features = await getFeatureFlags();
    if (!features.includes("userroles")) {
        return false;
    }

    return true;
}

export async function isMultitenancySupported() {
    const features = await getFeatureFlags();
    if (!features.includes("multitenancy")) {
        return false;
    }

    return true;
}

export async function isMultitenancyManagementEndpointsSupported() {
    const features = await getFeatureFlags();
    if (!features.includes("multitenancyManagementEndpoints")) {
        return false;
    }

    return true;
}

export async function isAccountLinkingSupported() {
    const features = await getFeatureFlags();
    if (!features.includes("accountlinking")) {
        return false;
    }

    return true;
}

export async function isMFASupported() {
    const features = await getFeatureFlags();
    if (!features.includes("mfa")) {
        return false;
    }

    return true;
}

/**
 * For example setGeneralErrorToLocalStorage("EMAIL_PASSWORD", "EMAIL_PASSWORD_SIGN_UP", page) to
 * set for signUp in email password
 */
export async function setGeneralErrorToLocalStorage(recipeName, action, page) {
    return page.evaluate((data) => localStorage.setItem("SHOW_GENERAL_ERROR", `${data.recipeName} ${data.action}`), {
        recipeName,
        action,
    });
}

export async function getTestEmail(post) {
    return `john.doe+${Date.now()}-${post ?? "0"}@supertokens.io`;
}

export async function setupTenant(tenantId, loginMethods) {
    const body = {
        tenantId,
        loginMethods,
    };
    if (loginMethods.thirdParty?.providers) {
        body.loginMethods.thirdParty.providers = loginMethods.thirdParty.providers.map((provider) => ({
            ...testProviderConfigs[provider.id.split("-")[0]],
            thirdPartyId: provider.id,
            name: provider.name,
        }));
    }
    let coreResp = await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/setupTenant`, {
        method: "POST",
        headers: new Headers([["content-type", "application/json"]]),
        body: JSON.stringify(body),
    });
    assert.strictEqual(coreResp.status, 200);
}

export async function addUserToTenant(tenantId, recipeUserId) {
    let coreResp = await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/addUserToTenant`, {
        method: "POST",
        headers: new Headers([["content-type", "application/json"]]),
        body: JSON.stringify({
            tenantId,
            recipeUserId,
        }),
    });
    assert.strictEqual(coreResp.status, 200);
}

export async function removeUserFromTenant(tenantId, recipeUserId) {
    let coreResp = await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/removeUserFromTenant`, {
        method: "POST",
        headers: new Headers([["content-type", "application/json"]]),
        body: JSON.stringify({
            tenantId,
            recipeUserId,
        }),
    });
    assert.strictEqual(coreResp.status, 200);
}

export async function removeTenant(tenantId) {
    let coreResp = await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/removeTenant`, {
        method: "POST",
        headers: new Headers([["content-type", "application/json"]]),
        body: JSON.stringify({
            tenantId,
        }),
    });
    assert.strictEqual(coreResp.status, 200);
}

const testProviderConfigs = {
    apple: {
        clients: [
            {
                clientId: "4398792-io.supertokens.example.service",
                additionalConfig: {
                    keyId: "7M48Y4RYDL",
                    privateKey:
                        "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                    teamId: "YWQCXGJRJL",
                },
            },
        ],
    },
    github: {
        clients: [
            {
                clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
                clientId: "467101b197249757c71f",
            },
        ],
    },
    google: {
        clients: [
            {
                clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                clientSecret: "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",
            },
        ],
    },
    auth0: {
        // this contains info about forming the authorisation redirect URL without the state params and without the redirect_uri param
        authorizationEndpoint: `https://${process.env.AUTH0_DOMAIN}/authorize`,
        authorizationEndpointQueryParams: {
            scope: "openid profile email email_verified",
        },
        jwksURI: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
        tokenEndpoint: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
        clients: [
            {
                clientId: process.env.AUTH0_CLIENT_ID,
                clientSecret: process.env.AUTH0_CLIENT_SECRET,
            },
        ],
        userInfoMap: {
            fromIdTokenPayload: {
                userId: "sub",
                email: "email",
                emailVerified: "email_verified",
            },
        },
    },
    test: {
        // We add a client since it's required
        clients: [
            {
                clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                clientSecret: "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",
            },
        ],
    },
};

export async function backendHook(hookType) {
    const serverUrls = Array.from(new Set([TEST_SERVER_BASE_URL, TEST_APPLICATION_SERVER_BASE_URL]));

    await Promise.all(
        serverUrls.map((url) => fetch(`${url}/test/${hookType}`, { method: "POST" }).catch(console.error))
    );
}

export async function createCoreApp({
    appId,
    coreConfig,
    accountLinkingConfig = {},
    enabledRecipes,
    enabledProviders,
    passwordlessFlowType,
    passwordlessContactMethod,
    mfaInfo = {},
} = {}) {
    await fetch(`${TEST_SERVER_BASE_URL}/test/setup`, {
        method: "POST",
        headers: new Headers([["content-type", "application/json"]]),
        body: JSON.stringify({
            appId,
            coreConfig,
            accountLinkingConfig,
            enabledRecipes,
            enabledProviders,
            passwordlessFlowType,
            passwordlessContactMethod,
            mfaInfo,
        }),
    });
}

export async function backendBeforeEach() {
    await fetch(`${TEST_SERVER_BASE_URL}/beforeeach`, {
        method: "POST",
    }).catch(console.error);
    if (TEST_SERVER_BASE_URL !== TEST_APPLICATION_SERVER_BASE_URL) {
        await fetch(`${TEST_APPLICATION_SERVER_BASE_URL}/beforeeach`, {
            method: "POST",
        }).catch(console.error);
    }
}

export async function expectErrorThrown(page, cb) {
    let onErrorBoundaryHit;
    let hitErrorBoundary = new Promise((res) => {
        onErrorBoundaryHit = res;
    });
    page.on("console", (ev) => {
        // console.log(ev.text());
        if (ev.text() === "ST_THROWN_ERROR") {
            onErrorBoundaryHit(true);
        }
    });
    await Promise.all([hitErrorBoundary, cb()]);
    assert(hitErrorBoundary);
}
