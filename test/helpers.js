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
    TEST_SERVER_BASE_URL,
    SIGN_UP_API,
    EMAIL_EXISTS_API,
    TEST_CLIENT_BASE_URL,
} from "./constants";

import assert from "assert";
import { SESSION_STORAGE_STATE_KEY } from "../lib/build/recipe/thirdparty/constants";

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

/*
 * Selectors and actions helpers.
 * Using Puppeteer within shadowDom https://github.com/puppeteer/puppeteer/issues/858#issuecomment-438540596
 */

export async function getSubmitFormButtonLabel(page) {
    return await page.evaluate(
        (ST_ROOT_SELECTOR) =>
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("form > div > button").innerText,
        ST_ROOT_SELECTOR
    );
}

export async function getProvidersLabels(page) {
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
    return await page.evaluateHandle(
        `document.querySelector("${ST_ROOT_SELECTOR}").shadowRoot.querySelector("[data-supertokens='button']")`
    );
}

export async function getInputField(page, name) {
    return await page.evaluateHandle(
        `document.querySelector("${ST_ROOT_SELECTOR}").shadowRoot.querySelector("input[name='${name}'")`
    );
}

export async function submitForm(page) {
    const submitButton = await getSubmitFormButton(page);
    await submitButton.click();
}

export async function getLogoutButton(page) {
    return await page.evaluateHandle("document.querySelector('.logoutButton')");
}

export async function getSignInOrSignUpSwitchLink(page) {
    return await page.evaluateHandle(
        `document.querySelector("${ST_ROOT_SELECTOR}").shadowRoot.querySelector("div > div > [data-supertokens~='headerSubtitle'] > div > [data-supertokens~='link']")`
    );
}

export async function getForgotPasswordLink(page) {
    return await page.evaluateHandle(
        `document.querySelector("${ST_ROOT_SELECTOR}").shadowRoot.querySelector("form > div > [data-supertokens~='forgotPasswordLink']")`
    );
}

export async function getResendResetPasswordEmailLink(page) {
    return await page.evaluateHandle(
        `document.querySelector("${ST_ROOT_SELECTOR}").shadowRoot.querySelector("div > div > [data-supertokens~='enterEmailSuccessMessage'] > span")`
    );
}

export async function getTextByDataSupertokens(page, value) {
    return await page.evaluate(
        (value) =>
            document.querySelector("#supertokens-root").shadowRoot.querySelector(`[data-supertokens~='${value}']`)
                .innerText,
        value
    );
}

export async function sendEmailResetPasswordSuccessMessage(page) {
    return await page.evaluate(
        () =>
            document
                .querySelector("#supertokens-root")
                .shadowRoot.querySelector("div > div > [data-supertokens~='enterEmailSuccessMessage']").innerText
    );
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
    return await page.evaluate(() => {
        return document.querySelector("#supertokens-root").shadowRoot.querySelector("[data-supertokens~=headerTitle]")
            .innerText;
    });
}

export async function assertNoSTComponents(page) {
    const superTokensComponent = await page.$(ST_ROOT_SELECTOR);
    assert.strictEqual(superTokensComponent, null);
}

export async function getInputNames(page) {
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
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("[data-supertokens~='showPassword']"),
        { ST_ROOT_SELECTOR }
    );
}

export async function toggleShowPasswordIcon(page) {
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            document
                .querySelector(ST_ROOT_SELECTOR)
                .shadowRoot.querySelector("[data-supertokens~='showPassword']")
                .click(),
        { ST_ROOT_SELECTOR }
    );
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
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("[data-supertokens~='generalError']")
                .innerText,
        { ST_ROOT_SELECTOR }
    );
}

export async function getGeneralSuccess(page) {
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("[data-supertokens~='generalSuccess']")
                .innerText,
        { ST_ROOT_SELECTOR }
    );
}

export async function getVerificationEmailTitle(page) {
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("[data-supertokens~='headerTinyTitle']")
                .innerText,
        { ST_ROOT_SELECTOR }
    );
}

export async function getVerificationEmailErrorTitle(page) {
    return await page.evaluate(
        ({ ST_ROOT_SELECTOR }) =>
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("[data-supertokens~='error']").innerText,
        { ST_ROOT_SELECTOR }
    );
}

export async function setInputValues(page, fields) {
    for (const field of fields) {
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

export async function clearBrowserCookies(page) {
    const client = await page.target().createCDPSession();
    await client.send("Network.clearBrowserCookies");
    await client.send("Network.clearBrowserCache");
    await Promise.all([
        page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
}

export async function clickForgotPasswordLink(page) {
    // Click on Forgot Password Link.
    const forgotPasswordLink = await getForgotPasswordLink(page);
    await Promise.all([page.waitForNavigation(), forgotPasswordLink.click()]);
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
    const response = await fetch(`${TEST_SERVER_BASE_URL}/token`);
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
    ]);
}

export async function clickOnProviderButton(page, provider) {
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
    await Promise.all([page.click('input[name="signIn"]'), page.waitForNavigation()]);
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

export async function loginWithGithub(page) {
    await page.focus("input[type=text]");
    await page.keyboard.type(process.env.GITHUB_EMAIL);
    await page.focus("input[type=password]");
    await page.keyboard.type(process.env.GITHUB_PASSWORD);
    await Promise.all([page.keyboard.press("Enter"), page.waitForNavigation({ waitUntil: "networkidle0" })]);
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
