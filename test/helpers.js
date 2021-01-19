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
 * Imports.
 */
import { ST_ROOT_SELECTOR, TEST_SERVER_BASE_URL } from "./constants";
import assert from "assert";

/*
 * General Helpers.
 */

export function mockWindowLocation(url) {
    try {
        const location = new URL(url);
        global.window = Object.create(window);
        Object.defineProperty(window, "location", {
            value: location
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
   return  await page.evaluate(
       (ST_ROOT_SELECTOR) => document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("form > div > button").innerText,
       ST_ROOT_SELECTOR
    )
}

export async function getSubmitFormButton(page) {
    return await page.evaluateHandle(`document.querySelector("${ST_ROOT_SELECTOR}").shadowRoot.querySelector("button")`);
}

export async function getInputField(page, name) {
    return await page.evaluateHandle(`document.querySelector("${ST_ROOT_SELECTOR}").shadowRoot.querySelector("input[name='${name}'")`);
}

export async function submitForm(page) {
    const submitButton = await getSubmitFormButton(page);
    await submitButton.click();
}

export async function getLogoutButton(page) {
    return await page.evaluateHandle("document.querySelector('button.logout')");
}


export async function getSignInOrSignUpSwitchLink(page) {
    return await page.evaluateHandle(`document.querySelector("${ST_ROOT_SELECTOR}").shadowRoot.querySelector("div > div > [data-supertokens~='headerSubtitle'] > div > [data-supertokens~='link']")`);
}

export async function getForgotPasswordLink(page) {
    return await page.evaluateHandle(`document.querySelector("${ST_ROOT_SELECTOR}").shadowRoot.querySelector("form > div > [data-supertokens~='forgotPasswordLink']")`);
}

export async function getResendResetPasswordEmailLink (page) {
    return await page.evaluateHandle(`document.querySelector("${ST_ROOT_SELECTOR}").shadowRoot.querySelector("div > div > [data-supertokens~='enterEmailSuccessMessage'] > span")`);
}

export async function getTextByDataSupertokens (page, value) {
    return await page.evaluate(
        (value) =>
            document
                .querySelector("#supertokens-root")
                .shadowRoot.querySelector(`[data-supertokens~='${value}']`).innerText
    , value);
}

export async function sendEmailResetPasswordSuccessMessage (page) {
    return await page.evaluate(
        () =>
            document
                .querySelector("#supertokens-root")
                .shadowRoot.querySelector("div > div > [data-supertokens~='enterEmailSuccessMessage']").innerText
    );
}

export async function assertNoSTComponents (page) {
    const superTokensComponent = await page.$(ST_ROOT_SELECTOR);
    assert.strictEqual(superTokensComponent, null);
}

export async function getInputNames(page) {
    return await page.evaluate(({ST_ROOT_SELECTOR}) => 
        Array.from(
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelectorAll("[data-supertokens~='input']"),
            i => i.name
        )
    , {ST_ROOT_SELECTOR})
}

export async function getSuccessInputAdornments(page) {
    return await page.evaluate(({ST_ROOT_SELECTOR}) => 
        Array.from(
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelectorAll("[data-supertokens~='inputAdornment']"),
            i => i.name
        )
    , {ST_ROOT_SELECTOR})
}

export async function getInputTypes(page) {
    return await page.evaluate(({ST_ROOT_SELECTOR}) => 
        Array.from(
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelectorAll("[data-supertokens~='input']"),
            i => i.type
        )
    , {ST_ROOT_SELECTOR})
}

export async function getLabelsText(page) {
    return await page.evaluate(({ST_ROOT_SELECTOR}) => 
        Array.from(
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelectorAll("[data-supertokens~='label']"),
            i => i.innerText
        )
    , {ST_ROOT_SELECTOR})
}

export async function getPlaceholders(page) {
    return await page.evaluate(({ST_ROOT_SELECTOR}) => 
        Array.from(
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelectorAll("[data-supertokens~='input']"),
            i => i.placeholder
        )
    , {ST_ROOT_SELECTOR})
}

export async function getShowPasswordIcon(page) {
    return await page.evaluate(({ST_ROOT_SELECTOR}) => 
        document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("[data-supertokens~='showPassword']")
    , {ST_ROOT_SELECTOR});
}

export async function toggleShowPasswordIcon(page) {
    return await page.evaluate(({ST_ROOT_SELECTOR}) => 
        document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("[data-supertokens~='showPassword']").click()
    , {ST_ROOT_SELECTOR});
}

export async function sendVerifyEmail(page) {
    return await page.evaluate(({ST_ROOT_SELECTOR}) => 
        document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("[data-supertokens~='sendVerifyEmailResend']").click()
    , {ST_ROOT_SELECTOR});
}

export async function clickLinkWithRightArrow(page) {
    return await page.evaluate(({ST_ROOT_SELECTOR}) => 
        document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("[data-supertokens~='secondaryLinkWithArrow']").click()
    , {ST_ROOT_SELECTOR});
}


export async function getFieldErrors(page) {
    return await page.evaluate(({ST_ROOT_SELECTOR}) => 
        Array.from(
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelectorAll("[data-supertokens~='formRow'] [data-supertokens~='inputErrorMessage']"),
            i => i.innerText
        )
    , {ST_ROOT_SELECTOR})
}

export async function getGeneralError(page) {
    return  await page.evaluate(
        ({ST_ROOT_SELECTOR}) => document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("[data-supertokens~='generalError']").innerText,
        {ST_ROOT_SELECTOR}
     )
 }

 export async function getGeneralSuccess(page) {
    return  await page.evaluate(
        ({ST_ROOT_SELECTOR}) => document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("[data-supertokens~='generalSuccess']").innerText,
        {ST_ROOT_SELECTOR}
     )
 }

 export async function getVerificationEmailTitle(page) {
    return  await page.evaluate(
        ({ST_ROOT_SELECTOR}) => document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("[data-supertokens~='headerTinyTitle']").innerText,
        {ST_ROOT_SELECTOR}
     )
 }

 export async function getVerificationEmailErrorTitle(page) {
    return  await page.evaluate(
        ({ST_ROOT_SELECTOR}) => document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("[data-supertokens~='error']").innerText,
        {ST_ROOT_SELECTOR}
     )
 }

 export async function setInputValues(page, fields) {
    for(const field of fields) {

        // Reset input value.
        await page.evaluate(({field, ST_ROOT_SELECTOR}) => {
            const inputNode = document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector(`input[name=${field.name}]`);
            inputNode.value = "";
        }, {field, ST_ROOT_SELECTOR});

        // Type new value.
        const passwordInput = await getInputField(page, field.name);
        await passwordInput.type(field.value);

        // Blur.
        await page.evaluate(({field, ST_ROOT_SELECTOR}) => {
            const inputNode = document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector(`input[name=${field.name}]`);
            inputNode.blur();
        }, {field, ST_ROOT_SELECTOR});

    }

    // Make sure to wait for success feedbacks.
    return await new Promise(r => setTimeout(r, 300)); 
}

export async function clearBrowserCookies (page) {
    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
    await client.send('Network.clearBrowserCache');
}

export async function clickForgotPasswordLink (page) {
    // Click on Forgot Password Link.
    const forgotPasswordLink = await getForgotPasswordLink(page);
    await Promise.all([
        page.waitForNavigation(),
        forgotPasswordLink.click()
    ]);
}

export async function toggleSignInSignUp(page) {
    // Click on Sign Up.
    const signUpLink = await getSignInOrSignUpSwitchLink(page);
    await signUpLink.click();
}

export async function submitFormReturnRequestAndResponse(page, URL) {
    let [, request, response] = await Promise.all([
        submitForm(page),
        page.waitForRequest(request => request.url() === URL && request.method() === "POST"),
        page.waitForResponse(response => response.url() === URL && response.status() === 200)
    ]);
    response = await response.json();
    return {
        request,
        response
    }
}

export async function hasMethodBeenCalled(page, URL, method = "GET", timeout = 1000) {
    let methodCalled = false;

    const onRequestVerifyMatch = request => {
        // If method called before hasMethodBeenCalled timeouts, update methodCalled.
        if (request.url() === URL && request.method() === method) {
            methodCalled = true;
        };
        request.continue();
    };

    await page.setRequestInterception(true);
    page.on("request", onRequestVerifyMatch);
    await new Promise(r => setTimeout(r, timeout));
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
    const {latestURLWithToken} = await response.json();
    return latestURLWithToken;
}