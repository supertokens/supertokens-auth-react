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
import fetch from "isomorphic-fetch";
import puppeteer from "puppeteer";
import {
    clearBrowserCookiesWithoutAffectingConsole,
    assertProviders,
    clickOnProviderButton,
    defaultSignUp,
    getUserIdWithFetch,
    getLogoutButton,
    signUp,
    toggleSignInSignUp,
    loginWithMockProvider,
    getLoginWithRedirectToSignIn,
    getLoginWithRedirectToSignUp,
    getAuthPageHeaderText,
    screenshotOnFailure,
    setInputValues,
    submitForm,
    getGeneralError,
    waitForSTElement,
    waitFor,
    getFieldErrors,
    clickOnProviderButtonWithoutWaiting,
    getFeatureFlags,
    setEnabledRecipes,
    backendBeforeEach,
    setSelectDropdownValue,
    getInputField,
    getLabelsText,
    isReact16,
    waitForUrl,
    setupBrowser,
} from "../helpers";
import {
    TEST_CLIENT_BASE_URL,
    TEST_SERVER_BASE_URL,
    SIGN_IN_UP_API,
    SIGN_UP_API,
    SOMETHING_WENT_WRONG_ERROR,
    EMAIL_EXISTS_API,
    GET_AUTH_URL_API,
    TEST_APPLICATION_SERVER_BASE_URL,
    SIGN_IN_API,
} from "../constants";

/*
 * Tests.
 */
describe("SuperTokens Third Party Email Password", function () {
    let browser;
    let page;
    let consoleLogs;

    before(async function () {
        await backendBeforeEach();

        await fetch(`${TEST_SERVER_BASE_URL}/startst`, {
            method: "POST",
        }).catch(console.error);

        browser = await setupBrowser();
        page = await browser.newPage();
        page.on("console", (consoleObj) => {
            const log = consoleObj.text();
            // console.log(log);
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
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

    afterEach(function () {
        return screenshotOnFailure(this, browser);
    });

    beforeEach(async function () {
        consoleLogs = [];
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
        await Promise.all([
            page.goto(`${TEST_CLIENT_BASE_URL}/auth?authRecipe=thirdpartyemailpassword`),
            page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
    });

    describe("redirectToAuth test", function () {
        it("Show signin first", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            let elem = await getLoginWithRedirectToSignIn(page);
            await page.evaluate((e) => e.click(), elem);
            await page.waitForNavigation({ waitUntil: "networkidle0" });
            let text = await getAuthPageHeaderText(page);
            assert.deepStrictEqual(text, "Sign In");
        });

        it("Show signup first", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            let elem = await getLoginWithRedirectToSignUp(page);
            await page.evaluate((e) => e.click(), elem);
            await page.waitForNavigation({ waitUntil: "networkidle0" });
            let text = await getAuthPageHeaderText(page);
            assert.deepStrictEqual(text, "Sign Up");
        });
    });

    describe("Third Party Email Password test", function () {
        afterEach(async function () {
            await page.evaluate(() => window.localStorage.removeItem("clientType"));
        });

        it("Successful signup with credentials", async function () {
            await toggleSignInSignUp(page);
            await defaultSignUp(page, "thirdpartyemailpassword");
            await waitForUrl(page, "/dashboard");
        });

        it("should show error message on sign up with duplicate email on sign up click", async function () {
            await toggleSignInSignUp(page);

            const requestHandler = (request) => {
                if (request.url().includes(EMAIL_EXISTS_API) && request.method() === "GET") {
                    return request.respond({
                        status: 200,
                        headers: {
                            "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                            "access-control-allow-credentials": "true",
                        },
                        body: JSON.stringify({
                            status: "OK",
                            exists: false,
                        }),
                    });
                }

                return request.continue();
            };

            try {
                await page.setRequestInterception(true);
                page.on("request", requestHandler);
                await setInputValues(page, [
                    { name: "email", value: "john.doe@supertokens.io" },
                    { name: "password", value: "Str0ngP@assw0rd" },
                    { name: "name", value: "Supertokens" },
                    { name: "age", value: "20" },
                ]);
                const btn = await waitForSTElement(page, "[data-supertokens='button']");
                await btn.click();
                await waitForSTElement(page, "[data-supertokens='inputErrorMessage']");
            } finally {
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            }

            let [emailError] = await getFieldErrors(page);
            assert.deepStrictEqual(emailError, "This email already exists. Please sign in instead.");
        });

        it("should show error message when duplicate email is typed", async function () {
            await toggleSignInSignUp(page);

            const requestHandler = (request) => {
                if (request.url().includes(EMAIL_EXISTS_API) && request.method() === "GET") {
                    return request.respond({
                        status: 200,
                        headers: {
                            "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                            "access-control-allow-credentials": "true",
                        },
                        body: JSON.stringify({
                            status: "OK",
                            exists: true,
                        }),
                    });
                }

                return request.continue();
            };

            try {
                await page.setRequestInterception(true);
                page.on("request", requestHandler);
                await setInputValues(page, [{ name: "email", value: "john.doe@supertokens.io" }]);
            } finally {
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            }

            let [emailError] = await getFieldErrors(page);
            assert.deepStrictEqual(emailError, "This email already exists. Please sign in instead");
        });

        it("should clear errors when switching to signup", async function () {
            await setInputValues(page, [
                { name: "email", value: `john.doe+${Date.now()}@supertokens.io` },
                { name: "password", value: "********" },
            ]);

            await submitForm(page);

            const generalError = await getGeneralError(page);
            assert.strictEqual(generalError, "Incorrect email and password combination");
            await toggleSignInSignUp(page);
            await waitForSTElement(page, "[data-supertokens~=generalError]", true);
        });

        it("should clear errors when switching to sign in", async function () {
            await toggleSignInSignUp(page);
            await setInputValues(page, [
                { name: "email", value: `john.doe+${Date.now()}@supertokens.io` },
                { name: "password", value: "Str0ngP@ssw0rd" },
                { name: "name", value: "John Doe" },
                { name: "age", value: "20" },
            ]);

            const requestHandler = (request) => {
                if (request.url() === SIGN_UP_API && request.method() === "POST") {
                    return request.respond({
                        status: 500,
                        headers: {
                            "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                            "access-control-allow-credentials": "true",
                        },
                        body: JSON.stringify({
                            status: "BAD_INPUT",
                        }),
                    });
                }

                return request.continue();
            };

            try {
                await page.setRequestInterception(true);
                page.on("request", requestHandler);
                await submitForm(page);

                await page.waitForResponse((response) => response.url() === SIGN_UP_API && response.status() === 500);
            } finally {
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            }

            // Assert server Error
            const generalError = await getGeneralError(page);
            assert.strictEqual(generalError, SOMETHING_WENT_WRONG_ERROR);
            await toggleSignInSignUp(page);
            await waitForSTElement(page, "[data-supertokens~=generalError]", true);
        });

        it("Successful signin/up", async function () {
            await assertProviders(page);
            await clickOnProviderButton(page, "Mock Provider");
            await Promise.all([
                loginWithMockProvider(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);
            await page.waitForSelector(".sessionInfo-user-id");
            await waitForUrl(page, "/dashboard");
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS THIRD_PARTY OVERRIDE GET_AUTH_URL_WITH_QUERY_PARAMS_AND_SET_STATE",
                "ST_LOGS THIRD_PARTY OVERRIDE GET_OAUTH_AUTHORISATION_URL",
                "ST_LOGS THIRD_PARTY PRE_API_HOOKS GET_AUTHORISATION_URL",
                "ST_LOGS THIRD_PARTY OVERRIDE SET_OAUTH_STATE",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS THIRD_PARTY OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS THIRD_PARTY OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS THIRD_PARTY OVERRIDE SIGN_IN_AND_UP",
                "ST_LOGS THIRD_PARTY OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS THIRD_PARTY PRE_API_HOOKS THIRD_PARTY_SIGN_IN_UP",
                "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",

                "ST_LOGS THIRD_PARTY ON_HANDLE_EVENT SUCCESS",
                "ST_LOGS THIRD_PARTY OVERRIDE GET_OAUTH_STATE",

                "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS THIRD_PARTY",

                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
            ]);
        });

        it("No account consolidation", async function () {
            // 1. Sign up with credentials
            await toggleSignInSignUp(page);
            await signUp(
                page,
                [
                    { name: "email", value: "bradparishdoh@gmail.com" },
                    { name: "password", value: "Str0ngP@ssw0rd" },
                    { name: "name", value: "John Doe" },
                    { name: "age", value: "20" },
                ],
                '{"formFields":[{"id":"email","value":"bradparishdoh@gmail.com"},{"id":"password","value":"Str0ngP@ssw0rd"},{"id":"name","value":"John Doe"},{"id":"age","value":"20"},{"id":"country","value":""}],"shouldTryLinkingWithSessionUser":false}',
                "thirdpartyemailpassword"
            );
            await waitForUrl(page, "/dashboard");
            const emailPasswordUserId = await getUserIdWithFetch(page);
            const logoutButton = await getLogoutButton(page);
            await Promise.all([await logoutButton.click(), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            await waitForUrl(page, "/auth");
            // 2. Sign in with SSO with same address.
            await clickOnProviderButton(page, "Mock Provider");
            await Promise.all([
                loginWithMockProvider(page),
                page.waitForResponse((response) => response.url() === SIGN_IN_UP_API && response.status() === 200),
            ]);
            await waitForUrl(page, "/dashboard");
            const thirdPartyUserId = await getUserIdWithFetch(page);

            // 3. Compare userIds
            assert.notDeepStrictEqual(thirdPartyUserId, emailPasswordUserId);
        });

        it("clientType should be included when getting the auth url", async function () {
            await page.evaluate(() => {
                localStorage.setItem("clientType", `test-web`);
            });

            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);

            const res = await Promise.all([
                page.waitForRequest((request) => request.url().startsWith(GET_AUTH_URL_API)),
                clickOnProviderButtonWithoutWaiting(page, "Auth0"),
            ]);

            const url = new URL(res[0].url());
            assert.strictEqual(url.searchParams.get("clientType"), "test-web");
        });

        it("should handle no providers enabled on the backend", async function () {
            if (!(await getFeatureFlags()).includes("recipeConfig")) {
                this.skip();
            }
            await assertProviders(page);
            await setEnabledRecipes(["thirdparty"], []);

            await Promise.all([
                page.waitForResponse(
                    (response) => response.url().startsWith(GET_AUTH_URL_API) && response.status() === 400
                ),
                clickOnProviderButtonWithoutWaiting(page, "Auth0"),
            ]);
            assert.strictEqual(await getGeneralError(page), "Something went wrong. Please try again.");
        });
    });

    describe("Third Party callback error tests", function () {
        it("No state (Duplicate from third party)", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth/callback/github`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS THIRD_PARTY OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS THIRD_PARTY OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS THIRD_PARTY OVERRIDE SIGN_IN_AND_UP",
                "ST_LOGS THIRD_PARTY OVERRIDE GET_OAUTH_STATE",
                "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL TO_AUTH",
            ]);
            await waitForUrl(page, "/auth/");
            const search = await page.evaluate(() => window.location.search);
            assert.deepStrictEqual(search, "?error=signin");
        });
    });

    describe("Test pre api hooks", function () {
        beforeEach(async function () {
            await page.evaluate(() => window.localStorage.removeItem("getAuthorisationURLFromBackend-pre-api-hook"));
            await page.evaluate(() =>
                window.localStorage.removeItem("getAuthorisationURLWithQueryParamsAndSetState-pre-api-hook")
            );
        });

        afterEach(async function () {
            await page.evaluate(() => window.localStorage.removeItem("getAuthorisationURLFromBackend-pre-api-hook"));
            await page.evaluate(() =>
                window.localStorage.removeItem("getAuthorisationURLWithQueryParamsAndSetState-pre-api-hook")
            );
        });

        it("Test that pre api hook is called when using it in overrides", async function () {
            // This will trigger a function call to getAuthorisationURLWithQueryParamsAndSetState
            await page.evaluate(() =>
                window.dispatchEvent(new Event("TP.getAuthorisationURLWithQueryParamsAndSetState"))
            );
            await waitFor(2000); // Adding delay to let network call finish

            // getAuthorisationURLWithQueryParamsAndSetState calls getAuthorisationURLFromBackend internally
            const getAuthFromBackendInStorage = await page.evaluate(() =>
                window.localStorage.getItem("getAuthorisationURLFromBackend-pre-api-hook")
            );

            assert.strictEqual(getAuthFromBackendInStorage, "true");
        });
    });

    describe("SignIn default field tests", function () {
        before(function () {
            const isReact16App = isReact16();
            if (isReact16App) {
                this.skip();
            }
        });

        it("Should contain email and password fields prefilled", async function () {
            await page.evaluate(() => window.localStorage.setItem("SIGNIN_SETTING_TYPE", "DEFAULT_FIELDS"));

            await page.reload({
                waitUntil: "domcontentloaded",
            });

            const expectedDefaultValues = {
                email: "abc@xyz.com",
                password: "fakepassword123",
            };

            const emailInput = await getInputField(page, "email");
            const defaultEmail = await emailInput.evaluate((f) => f.value);
            assert.strictEqual(defaultEmail, expectedDefaultValues["email"]);

            const passwordInput = await getInputField(page, "password");
            const defaultPassword = await passwordInput.evaluate((f) => f.value);
            assert.strictEqual(defaultPassword, expectedDefaultValues["password"]);
        });

        it("Check on blank form submit nonOptionalErrorMsg gets displayed as expected", async function () {
            // set cookie and reload which loads the form with custom field
            await page.evaluate(() =>
                window.localStorage.setItem("SIGNIN_SETTING_TYPE", "FIELDS_WITH_NON_OPTIONAL_ERROR_MESSAGE")
            );
            await page.reload({
                waitUntil: "domcontentloaded",
            });

            await waitForSTElement(page);
            let apiCallMade = false;

            await page.setRequestInterception(true);

            const requestHandler = (request) => {
                const url = request.url();
                if (url === SIGN_IN_API) {
                    apiCallMade = true;
                    request.continue();
                } else {
                    request.continue();
                }
            };

            page.on("request", requestHandler);

            try {
                await submitForm(page);
                let formFieldErrors = await getFieldErrors(page);

                // Also standard non-optional-error is displayed if nonOptionalErrorMsg is not provided
                assert.deepStrictEqual(formFieldErrors, ["Please add email", "Field is not optional"]);
            } finally {
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            }

            if (apiCallMade) {
                throw new Error("Empty form making API request to signin");
            }
        });
    });

    describe("Third Party signup config supports custom fields tests", function () {
        before(function () {
            const isReact16App = isReact16();
            if (isReact16App) {
                this.skip();
            }
        });

        beforeEach(async function () {
            await page.evaluate(() => window.localStorage.setItem("SIGNUP_SETTING_TYPE", "CUSTOM_FIELDS"));

            await page.reload({
                waitUntil: "domcontentloaded",
            });
            await toggleSignInSignUp(page);
        });

        it("Check if the custom fields are loaded", async function () {
            let text = await getAuthPageHeaderText(page);
            assert.deepStrictEqual(text, "Sign Up");

            // check if select dropdown is loaded
            const selectDropdownExists = await waitForSTElement(page, "select");
            assert.ok(selectDropdownExists, "Select dropdown exists");

            // check if checbox is loaded
            const checkboxExists = await waitForSTElement(page, 'input[type="checkbox"]');
            assert.ok(checkboxExists, "Checkbox exists");

            // check if labels are loaded correctly
            // non-optional field with empty labels should'nt show * sign
            const expectedLabels = ["Email *", "Password *", "Select Dropdown", ""];
            const labelNames = await getLabelsText(page);
            assert.deepStrictEqual(labelNames, expectedLabels);
        });

        it("Should show error messages, based on optional flag", async function () {
            await submitForm(page);
            let formFieldErrors = await getFieldErrors(page);

            // 2 regular form field errors +
            // 1 required custom field => terms checkbox
            assert.deepStrictEqual(formFieldErrors, [
                "Field is not optional",
                "Field is not optional",
                "You must accept the terms and conditions",
            ]);

            // supply values for regular-required fields only
            await setInputValues(page, [
                { name: "email", value: "jack.doe@supertokens.io" },
                { name: "password", value: "Str0ngP@ssw0rd" },
            ]);

            await submitForm(page);
            formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, ["You must accept the terms and conditions"]);

            // check terms and condition checkbox
            let termsCheckbox = await waitForSTElement(page, '[name="terms"]');
            await page.evaluate((e) => e.click(), termsCheckbox);

            //un-checking the required checkbox should throw custom error message
            await page.evaluate((e) => e.click(), termsCheckbox);

            await submitForm(page);
            formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, ["Please check Terms and conditions"]);
        });

        it("Check if custom values are part of the signup payload", async function () {
            const customFields = {
                terms: "true",
                "select-dropdown": "option 3",
            };
            let assertionError = null;
            let interceptionPassed = false;

            const requestHandler = async (request) => {
                if (request.url().includes(SIGN_UP_API) && request.method() === "POST") {
                    try {
                        const postData = JSON.parse(request.postData());
                        Object.keys(customFields).forEach((key) => {
                            let findFormData = postData.formFields.find((inputData) => inputData.id === key);
                            if (findFormData) {
                                assert.strictEqual(
                                    findFormData["value"],
                                    customFields[key],
                                    `Mismatch in payload for key: ${key}`
                                );
                            } else {
                                throw new Error("Field not found in req.data");
                            }
                        });
                        interceptionPassed = true;
                        return request.respond({
                            status: 200,
                            headers: {
                                "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                                "access-control-allow-credentials": "true",
                            },
                            body: JSON.stringify({
                                status: "OK",
                            }),
                        });
                    } catch (error) {
                        assertionError = error; // Store the error
                    }
                }
                return request.continue();
            };

            await page.setRequestInterception(true);
            page.on("request", requestHandler);

            try {
                // Fill and submit the form with custom fields
                await setInputValues(page, [
                    { name: "email", value: "john.doe@supertokens.io" },
                    { name: "password", value: "Str0ngP@assw0rd" },
                ]);

                await setSelectDropdownValue(page, "select", customFields["select-dropdown"]);

                // Check terms and condition checkbox
                let termsCheckbox = await waitForSTElement(page, '[name="terms"]');
                await page.evaluate((e) => e.click(), termsCheckbox);

                // Perform the button click and wait for all network activity to finish
                await Promise.all([page.waitForNetworkIdle(), submitForm(page)]);
            } finally {
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            }

            if (assertionError) {
                throw assertionError;
            }

            if (!interceptionPassed) {
                throw new Error("test failed");
            }
        });

        it("Check on blank form submit nonOptionalErrorMsg gets displayed as expected", async function () {
            let apiCallMade = false;

            const requestHandler = (request) => {
                const url = request.url();
                if (url === SIGN_UP_API) {
                    apiCallMade = true;
                    request.continue();
                } else {
                    request.continue();
                }
            };

            await page.setRequestInterception(true);
            page.on("request", requestHandler);

            try {
                // Fill and submit the form with custom fields
                await submitForm(page);
                let formFieldErrors = await getFieldErrors(page);
                // Also standard non-optional-error is displayed if nonOptionalErrorMsg is not provided
                assert.deepStrictEqual(formFieldErrors, [
                    "Field is not optional",
                    "Field is not optional",
                    "You must accept the terms and conditions",
                ]);
            } finally {
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            }

            if (apiCallMade) {
                throw new Error("Empty form making API request to sign-up");
            }
        });

        it("Check if nonOptionalErrorMsg overwrites server error message for non-optional fields", async function () {
            const requestHandler = (request) => {
                if (request.method() === "POST" && request.url() === SIGN_UP_API) {
                    request.respond({
                        status: 200,
                        contentType: "application/json",
                        headers: {
                            "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                            "access-control-allow-credentials": "true",
                        },
                        body: JSON.stringify({
                            status: "FIELD_ERROR",
                            formFields: [
                                {
                                    id: "select-dropdown",
                                    error: "Field is not optional",
                                },
                                {
                                    id: "email",
                                    error: "Field is not optional",
                                },
                            ],
                        }),
                    });
                } else {
                    request.continue();
                }
            };

            try {
                await page.setRequestInterception(true);
                page.on("request", requestHandler);

                // Fill and submit the form with custom fields
                await setInputValues(page, [
                    { name: "email", value: "john.doe@supertokens.io" },
                    { name: "password", value: "Str0ngP@assw0rd" },
                ]);
                // Check terms and condition checkbox
                let termsCheckbox = await waitForSTElement(page, '[name="terms"]');
                await page.evaluate((e) => e.click(), termsCheckbox);

                // Perform the button click and wait for all network activity to finish
                await Promise.all([page.waitForNetworkIdle(), submitForm(page)]);

                await waitForSTElement(page, "[data-supertokens~='inputErrorMessage']");
                // should also show the server error message if nonOptionalErrorMsg is not provided
                let formFieldsErrors = await getFieldErrors(page);
                assert.deepStrictEqual(formFieldsErrors, [
                    "Field is not optional",
                    "Select dropdown is not an optional",
                ]);
            } finally {
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            }
        });
    });

    // Default values test
    describe("Third Party signup default value for fields test", function () {
        before(function () {
            const isReact16App = isReact16();
            if (isReact16App) {
                this.skip();
            }
        });

        beforeEach(async function () {
            // set cookie and reload which loads the form fields with default values
            await page.evaluate(() =>
                window.localStorage.setItem("SIGNUP_SETTING_TYPE", "CUSTOM_FIELDS_WITH_DEFAULT_VALUES")
            );

            await page.reload({
                waitUntil: "domcontentloaded",
            });
            await toggleSignInSignUp(page);
        });

        it("Check if default values are set already", async function () {
            const fieldsWithDefault = {
                country: "India",
                "select-dropdown": "option 2",
                terms: true,
            };

            // regular input field default value
            const countryInput = await getInputField(page, "country");
            const defaultCountry = await countryInput.evaluate((f) => f.value);
            assert.strictEqual(defaultCountry, fieldsWithDefault["country"]);

            // custom dropdown default value is also getting set correctly
            const selectDropdown = await waitForSTElement(page, "select");
            const defaultOption = await selectDropdown.evaluate((f) => f.value);
            assert.strictEqual(defaultOption, fieldsWithDefault["select-dropdown"]);

            // custom dropdown default value is also getting set correctly
            const termsCheckbox = await waitForSTElement(page, '[name="terms"]');
            // checkbox is checked
            const defaultChecked = await termsCheckbox.evaluate((f) => f.checked);
            assert.strictEqual(defaultChecked, fieldsWithDefault["terms"]);
            // also the value = string
            const defaultValue = await termsCheckbox.evaluate((f) => f.value);
            assert.strictEqual(defaultValue, fieldsWithDefault["terms"].toString());
        });

        it("Check if changing the field value actually overwrites the default value", async function () {
            const updatedFields = {
                country: "USA",
                "select-dropdown": "option 3",
            };

            await setInputValues(page, [{ name: "country", value: updatedFields["country"] }]);
            await setSelectDropdownValue(page, "select", updatedFields["select-dropdown"]);

            // input field default value
            const countryInput = await getInputField(page, "country");
            const updatedCountry = await countryInput.evaluate((f) => f.value);
            assert.strictEqual(updatedCountry, updatedFields["country"]);

            // dropdown default value is also getting set correctly
            const selectDropdown = await waitForSTElement(page, "select");
            const updatedOption = await selectDropdown.evaluate((f) => f.value);
            assert.strictEqual(updatedOption, updatedFields["select-dropdown"]);
        });

        it("Check if default values are getting sent in signup-payload", async function () {
            // directly submit the form and test the payload
            const expectedDefautlValues = [
                { id: "email", value: "test@one.com" },
                { id: "password", value: "fakepassword123" },
                { id: "terms", value: "true" },
                { id: "select-dropdown", value: "option 2" },
                { id: "country", value: "India" },
            ];

            let assertionError = null;
            let interceptionPassed = false;

            const requestHandler = async (request) => {
                if (request.url().includes(SIGN_UP_API) && request.method() === "POST") {
                    try {
                        const postData = JSON.parse(request.postData());
                        expectedDefautlValues.forEach(({ id, value }) => {
                            let findFormData = postData.formFields.find((inputData) => inputData.id === id);
                            if (findFormData) {
                                assert.strictEqual(findFormData["value"], value, `Mismatch in payload for key: ${id}`);
                            } else {
                                throw new Error("Field not found in req.data");
                            }
                        });
                        interceptionPassed = true;
                        return request.respond({
                            status: 200,
                            headers: {
                                "access-control-allow-origin": TEST_CLIENT_BASE_URL,
                                "access-control-allow-credentials": "true",
                            },
                            body: JSON.stringify({
                                status: "OK",
                            }),
                        });
                    } catch (error) {
                        assertionError = error; // Store the error
                    }
                }
                return request.continue();
            };

            await page.setRequestInterception(true);
            page.on("request", requestHandler);

            try {
                // Perform the button click and wait for all network activity to finish
                await Promise.all([page.waitForNetworkIdle(), submitForm(page)]);
            } finally {
                page.off("request", requestHandler);
                await page.setRequestInterception(false);
            }

            if (assertionError) {
                throw assertionError;
            }

            if (!interceptionPassed) {
                throw new Error("test failed");
            }
        });
    });

    describe("Third Party signup config Incorrect field message test", function () {
        before(function () {
            const isReact16App = isReact16();
            if (isReact16App) {
                this.skip();
            }
        });

        beforeEach(async function () {
            // set cookie and reload which loads the form fields with default values
            await page.evaluate(() => window.localStorage.setItem("SIGNUP_SETTING_TYPE", "INCORRECT_FIELDS"));

            await page.reload({
                waitUntil: "domcontentloaded",
            });
        });

        it("Check if incorrect getDefaultValue throws error", async function () {
            await page.evaluate(() => window.localStorage.setItem("SIGNUP_SETTING_TYPE", "INCORRECT_GETDEFAULT"));
            let setPageError;
            let pageErrorMessage = new Promise((res) => {
                setPageError = res;
            });
            page.on("pageerror", (err) => {
                setPageError(err.message);
            });

            await page.reload({
                waitUntil: "domcontentloaded",
            });
            await toggleSignInSignUp(page);

            const expectedErrorMessage = "getDefaultValue for country must return a string";
            assert(
                (await pageErrorMessage).includes(expectedErrorMessage),
                `Expected "${expectedErrorMessage}" to be included in page-error`
            );
        });

        it("Check if non-string params to onChange throws error", async function () {
            await page.evaluate(() => window.localStorage.setItem("SIGNUP_SETTING_TYPE", "INCORRECT_ONCHANGE"));
            await page.reload({
                waitUntil: "domcontentloaded",
            });
            await toggleSignInSignUp(page);

            let setPageError;
            let pageErrorMessage = new Promise((res) => {
                setPageError = res;
            });
            page.on("pageerror", (err) => {
                setPageError(err.message);
            });

            // check terms and condition checkbox since it emits non-string value => boolean
            let termsCheckbox = await waitForSTElement(page, '[name="terms"]');
            await page.evaluate((e) => e.click(), termsCheckbox);

            const expectedErrorMessage = "terms value must be a string";
            assert(
                (await pageErrorMessage).includes(expectedErrorMessage),
                `Expected "${expectedErrorMessage}" to be included in page-error`
            );
        });

        it("Check if empty string for nonOptionalErrorMsg throws error", async function () {
            const expectedErrorMessage = "nonOptionalErrorMsg for field city cannot be an empty string";
            let setPageError;
            let pageErrorMessage = new Promise((res) => {
                setPageError = res;
            });
            page.on("pageerror", (err) => {
                setPageError(err.message);
            });

            await page.evaluate(() =>
                window.localStorage.setItem("SIGNUP_SETTING_TYPE", "INCORRECT_NON_OPTIONAL_ERROR_MSG")
            );
            await page.reload({
                waitUntil: "domcontentloaded",
            });

            assert(
                (await pageErrorMessage).includes(expectedErrorMessage),
                `Expected "${expectedErrorMessage}" to be included in page-error`
            );
        });
    });
});
