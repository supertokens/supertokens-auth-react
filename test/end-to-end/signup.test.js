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
import {
    clearBrowserCookiesWithoutAffectingConsole,
    getLabelsText,
    getInputNames,
    getPlaceholders,
    getInputAdornmentsSuccess,
    getFieldErrors,
    hasMethodBeenCalled,
    setInputValues,
    submitForm,
    toggleSignInSignUp,
    defaultSignUp,
    getLoginWithRedirectToSignIn,
    getAuthPageHeaderText,
    getLoginWithRedirectToSignUp,
    screenshotOnFailure,
    getGeneralError,
    waitForSTElement,
    setSelectDropdownValue,
    getInputField,
    isReact16,
    getDefaultSignUpFieldValues,
    waitForUrl,
    setupBrowser,
    backendHook,
    setupCoreApp,
    setupST,
} from "../helpers";
import {
    EMAIL_EXISTS_API,
    SIGN_UP_API,
    SOMETHING_WENT_WRONG_ERROR,
    TEST_CLIENT_BASE_URL,
} from "../constants";

/*
 * Tests.
 */
describe("SuperTokens SignUp", function () {
    let browser;
    let page;
    let consoleLogs;

    before(async function () {
        await backendHook("before");
        const coreUrl = await setupCoreApp();
        await setupST({ coreUrl });

        browser = await setupBrowser();
        page = await browser.newPage();
        page.on("console", (consoleObj) => {
            const log = consoleObj.text();
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
        });
    });

    beforeEach(async function () {
        await backendHook("beforeEach");
        consoleLogs = [];
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
        await toggleSignInSignUp(page);
    });

    afterEach(async function () {
        await screenshotOnFailure(this, browser);
        await backendHook("afterEach");
    });

    after(async function () {
        await page?.close();
        await browser?.close();
        await backendHook("after");
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

        it("should redirect to sign in w/ first auth recipe and set redirectToPath", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}?authRecipe=both`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.evaluate(() => window.SuperTokens.redirectToAuth({ redirectBack: true }));
            await page.waitForNavigation({ waitUntil: "networkidle0" });
            let text = await getAuthPageHeaderText(page);
            let { pathname: pathAfterRedirectToAuth, href: hrefAfterRedirectToAuth } = await page.evaluate(
                () => window.location
            );

            const url = new URL(hrefAfterRedirectToAuth);
            const redirectToPath = url.searchParams.get("redirectToPath");

            assert.strictEqual(pathAfterRedirectToAuth, "/auth/");
            // Only the EmailPassword recipe has this header on the sign in page
            assert.deepStrictEqual(text, "Sign In");
            // Test that redirecToPath contains query params
            assert.strictEqual(redirectToPath, "?authRecipe=both");
        });

        it("should redirect to sign in w/ first auth recipe without setting redirectToPath", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}?authRecipe=both`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.evaluate(() => window.SuperTokens.redirectToAuth({ redirectBack: false }));
            await page.waitForNavigation({ waitUntil: "networkidle0" });
            let text = await getAuthPageHeaderText(page);
            let { pathname: pathAfterRedirectToAuth, href: hrefAfterRedirectToAuth } = await page.evaluate(
                () => window.location
            );

            const url = new URL(hrefAfterRedirectToAuth);
            const redirectToPath = url.searchParams.get("redirectToPath");

            assert.strictEqual(pathAfterRedirectToAuth, "/auth/");
            // Only the EmailPassword recipe has this header on the sign in page
            assert.deepStrictEqual(text, "Sign In");
            // Test that redirecToPath is null
            assert.strictEqual(redirectToPath, null);
        });

        it("should redirect to sign in w/ first auth recipe and set redirectToPath (query params + fragment)", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}?authRecipe=both#cell=4,1-6,2`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.evaluate(() => window.SuperTokens.redirectToAuth({ redirectBack: true }));
            await page.waitForNavigation({ waitUntil: "networkidle0" });
            let text = await getAuthPageHeaderText(page);
            let { pathname: pathAfterRedirectToAuth, href: hrefAfterRedirectToAuth } = await page.evaluate(
                () => window.location
            );

            const url = new URL(hrefAfterRedirectToAuth);
            const redirectToPath = url.searchParams.get("redirectToPath");

            assert.strictEqual(pathAfterRedirectToAuth, "/auth/");
            // Only the EmailPassword recipe has this header on the sign in page
            assert.deepStrictEqual(text, "Sign In");
            // Test that redirecToPath contains query params and the fragment
            assert.strictEqual(redirectToPath, "?authRecipe=both#cell=4,1-6,2");
        });

        it("should redirect to sign in w/ first auth recipe and set redirectToPath (only fragment)", async function () {
            // Sets the authRecipe to both in localStorage
            await page.goto(`${TEST_CLIENT_BASE_URL}?authRecipe=both`);
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}#cell=4,1-6,2`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await page.evaluate(() => window.SuperTokens.redirectToAuth({ redirectBack: true }));
            await page.waitForNavigation({ waitUntil: "networkidle0" });
            let text = await getAuthPageHeaderText(page);
            let { pathname: pathAfterRedirectToAuth, href: hrefAfterRedirectToAuth } = await page.evaluate(
                () => window.location
            );

            const url = new URL(hrefAfterRedirectToAuth);
            const redirectToPath = url.searchParams.get("redirectToPath");

            assert.strictEqual(pathAfterRedirectToAuth, "/auth/");
            // Only the EmailPassword recipe has this header on the sign in page
            assert.deepStrictEqual(text, "Sign In");
            // Test that redirecToPath contains url fragment
            assert.strictEqual(redirectToPath, "#cell=4,1-6,2");
        });
    });

    describe("SignUp test ", function () {
        it("Should contain form fields as defined in SuperTokens.init call", async function () {
            const inputNames = await getInputNames(page);
            assert.deepStrictEqual(inputNames, ["email", "password", "name", "age", "country"]);

            const labelNames = await getLabelsText(page);
            assert.deepStrictEqual(labelNames, [
                "Your Email *",
                "Password *",
                "Full name *",
                "Your age *",
                "Your Country",
            ]);

            const placeholders = await getPlaceholders(page);
            assert.deepStrictEqual(placeholders, [
                "Your work email",
                "Password",
                "First name and last name",
                "How old are you?",
                "Where do you live?",
            ]);

            const adornments = await getInputAdornmentsSuccess(page);
            assert.strictEqual(adornments.length, 0);
            assert.deepStrictEqual(consoleLogs, []);
        });

        it("Should show error messages", async function () {
            await submitForm(page);
            // Assert.
            let formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, [
                "Field is not optional",
                "Field is not optional",
                "Field is not optional",
                "Field is not optional",
            ]);

            // Set values with errors.
            await setInputValues(page, [
                { name: "email", value: "john@doe" },
                { name: "password", value: "test123" },
                { name: "name", value: "" },
                { name: "age", value: "17" },
            ]);

            // Assert.
            formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, [
                "Email is invalid",
                "Password must contain at least 8 characters, including a number",
                "You must be over 18 to register",
            ]);

            await setInputValues(page, [
                { name: "password", value: "Str0ngP@ssw0rd" },
                { name: "name", value: "John Doe" },
            ]);

            await submitForm(page);

            // // Assert.
            formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, ["Email is invalid", "You must be over 18 to register"]);
            /**
             * This is because form validations now occur on the frontend side of things and not
             * in the recipe implementation. Which means that when you get a field error the recipe
             * implementation function does not actually get called
             */
            assert.deepStrictEqual(consoleLogs, []);
        });

        it("Successful signup", async function () {
            await defaultSignUp(page);
            const onSuccessFulRedirectUrl = "/dashboard";
            await waitForUrl(page, onSuccessFulRedirectUrl);

            const cookies = await page.cookies();

            let cookieNames = cookies.map((c) => c.name);
            assert(cookieNames.filter((i) => i === "st-last-access-token-update").length === 1);
            assert(cookieNames.filter((i) => i === "sFrontToken").length === 1);
            assert(cookieNames.filter((i) => i === "sAccessToken").length === 1);
            assert(cookieNames.length === 3);

            // doesSessionExist return true, hence, redirecting to success URL
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`, {
                waitUntil: "networkidle0",
            });

            await waitForUrl(page, onSuccessFulRedirectUrl);

            // Clear cookies, try to signup with same address.
            consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, consoleLogs);
            await page.goto(`${TEST_CLIENT_BASE_URL}/auth`, {
                waitUntil: "networkidle0",
            });
            await toggleSignInSignUp(page);

            // Set values.
            const [, hasEmailExistMethodBeenCalled] = await Promise.all([
                setInputValues(page, [{ name: "email", value: "john.doe@supertokens.io" }]),
                hasMethodBeenCalled(page, EMAIL_EXISTS_API),
            ]);

            // Assert.
            assert.strictEqual(hasEmailExistMethodBeenCalled, false);
            let formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, ["This email already exists. Please sign in instead"]);

            await setInputValues(page, [{ name: "email", value: "jane.doe@supertokens.io" }]);
            formFieldErrors = await getFieldErrors(page);
            assert.deepStrictEqual(formFieldErrors, []);
            assert.deepStrictEqual(consoleLogs, [
                "ST_LOGS EMAIL_PASSWORD OVERRIDE DOES_EMAIL_EXIST",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_EXISTS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE SIGN_UP",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_PASSWORD_SIGN_UP",
                "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_CREATED",
                "ST_LOGS SESSION OVERRIDE GET_USER_ID",

                "ST_LOGS EMAIL_PASSWORD ON_HANDLE_EVENT SUCCESS",

                "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS EMAIL_PASSWORD",

                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",

                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SESSION ON_HANDLE_EVENT SESSION_ALREADY_EXISTS",

                "ST_LOGS SUPERTOKENS GET_REDIRECTION_URL SUCCESS undefined",

                "ST_LOGS SESSION OVERRIDE GET_USER_ID",
                "ST_LOGS SESSION OVERRIDE ADD_FETCH_INTERCEPTORS_AND_RETURN_MODIFIED_FETCH",
                "ST_LOGS SESSION OVERRIDE ADD_AXIOS_INTERCEPTORS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE DOES_EMAIL_EXIST",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_EXISTS",
                "ST_LOGS EMAIL_PASSWORD OVERRIDE DOES_EMAIL_EXIST",
                "ST_LOGS EMAIL_PASSWORD PRE_API_HOOKS EMAIL_EXISTS",
            ]);
        });

        it("Successful signup with redirectToPath (w/ leading slash) keeping query params", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=%2Fredirect-here%3Ffoo%3Dbar`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await toggleSignInSignUp(page);
            const { fieldValues } = getDefaultSignUpFieldValues({ email: "jack.doe@supertokens.io" });
            await setInputValues(page, fieldValues);

            await submitForm(page);
            await page.waitForNavigation({ waitUntil: "networkidle0" });
            let { pathname, search } = await page.evaluate(() => window.location);
            assert.deepStrictEqual(pathname + search, "/redirect-here?foo=bar");
        });

        it("Successful signup with redirectToPath (w/ leading slash) keeping query params", async function () {
            await Promise.all([
                page.goto(`${TEST_CLIENT_BASE_URL}/auth?redirectToPath=%3Ffoo%3Dbar`),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            await toggleSignInSignUp(page);
            const { fieldValues } = getDefaultSignUpFieldValues({ email: "jack.doe2@supertokens.io" });
            await setInputValues(page, fieldValues);

            await submitForm(page);
            await page.waitForNavigation({ waitUntil: "networkidle0" });
            let { pathname, search } = await page.evaluate(() => window.location);
            assert.deepStrictEqual(pathname + search, "/?foo=bar");
        });

        it("should show error message on sign up with duplicate email", async function () {
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
    });

    describe("Custom fields tests", function () {
        before(function () {
            const isReact16App = isReact16();
            if (isReact16App) {
                this.skip();
            }
        });
        beforeEach(async function () {
            // set cookie and reload which loads the form with custom field
            await page.evaluate(() => window.localStorage.setItem("SIGNUP_SETTING_TYPE", "CUSTOM_FIELDS"));

            await page.reload({
                waitUntil: "domcontentloaded",
            });
        });

        it("Should load the custom fields", async function () {
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

        it("Should be part of the signup payload", async function () {
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
                            assert.ok(findFormData, "Field not found in req.data");
                            assert.strictEqual(
                                findFormData["value"],
                                customFields[key],
                                `Mismatch in payload for key: ${key}`
                            );
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

            assert.ok(!assertionError, assertionError?.message);
            assert.ok(interceptionPassed, "Test Failed");
        });

        it("Should display nonOptionalErrorMsg on blank form submit", async function () {
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
            }

            assert.ok(!apiCallMade, "Empty form making signup API request");
        });

        it("Should overwrite server error message for non-optional fields with nonOptionalErrorMsg", async function () {
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
    describe("Default fields tests", function () {
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
        });

        it("Should prefill the fields with default values", async function () {
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

        it("Should be able to overwrite the default values", async function () {
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

        it("Should ensure signup-payload contains default values", async function () {
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
                            assert.ok(findFormData, "Field not found in req.data");
                            assert.strictEqual(findFormData["value"], value, `Mismatch in payload for key: ${id}`);
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

            assert.ok(!assertionError, assertionError?.message);
            assert.ok(interceptionPassed, "Test Failed");
        });
    });

    describe("Incorrect field config test", function () {
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

        it("Should throw error for incorrect getDefaultValue func call", async function () {
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

            const expectedErrorMessage = "getDefaultValue for country must return a string";
            assert(
                (await pageErrorMessage).includes(expectedErrorMessage),
                `Expected "${expectedErrorMessage}" to be included in page-error`
            );
        });

        it("Should throw error for non-string params to onChange", async function () {
            await page.evaluate(() => window.localStorage.setItem("SIGNUP_SETTING_TYPE", "INCORRECT_ONCHANGE"));

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

            // check terms and condition checkbox since it emits non-string value => boolean
            let termsCheckbox = await waitForSTElement(page, '[name="terms"]');
            await page.evaluate((e) => e.click(), termsCheckbox);

            const expectedErrorMessage = "terms value must be a string";
            assert(
                (await pageErrorMessage).includes(expectedErrorMessage),
                `Expected "${expectedErrorMessage}" to be included in page-error`
            );
        });

        it("Should throw error for empty string for nonOptionalErrorMsg", async function () {
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

            assert.ok(pageErrorMessage !== "", "Empty nonOptionalErrorMsg should throw error");
            assert(
                (await pageErrorMessage).includes(expectedErrorMessage),
                `Expected "${expectedErrorMessage}" to be included in page-error`
            );
        });
    });
});

describe("SuperTokens SignUp => Server Error", function () {
    let browser;
    let page;
    let consoleLogs;

    before(async function () {
        await backendHook("before");
        const coreUrl = await setupCoreApp();
        await setupST({ coreUrl });
        browser = await setupBrowser();
    });

    beforeEach(async function () {
        await backendHook("beforeEach");
        page = await browser.newPage();
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, []);
        page.on("console", (consoleObj) => {
            const log = consoleObj.text();
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
        });
        await toggleSignInSignUp(page);
    });

    after(async function () {
        await browser.close();
        await backendHook("after");
    });

    afterEach(async function () {
        screenshotOnFailure(this, browser);
        await backendHook("afterEach");
    });

    it("Server Error shows Something went wrong general error", async function () {
        await setInputValues(page, [
            { name: "email", value: "john.doe@supertokens.io" },
            { name: "password", value: "Str0ngP@ssw0rd" },
            { name: "name", value: "John Doe" },
            { name: "age", value: "20" },
        ]);

        await page.setRequestInterception(true);
        page.on("request", (request) => {
            if (request.url() === SIGN_UP_API && request.method() === "POST") {
                request.respond({
                    // Previous behavior was a result of core being shut down
                    // Emulating the same here
                    status: 500,
                    // body: "Error: No SuperTokens core available to query",
                });
            } else {
                request.continue();
            }
        });

        await submitForm(page);

        await page.waitForResponse((response) => {
            return response.url() === SIGN_UP_API && response.status() === 500;
        });

        // Assert server Error
        const generalError = await getGeneralError(page);
        assert.strictEqual(generalError, SOMETHING_WENT_WRONG_ERROR);
    });

    it("should clear errors when switching to sign in", async function () {
        await setInputValues(page, [
            { name: "email", value: "john.doe@supertokens.io" },
            { name: "password", value: "Str0ngP@ssw0rd" },
            { name: "name", value: "John Doe" },
            { name: "age", value: "20" },
        ]);

        await page.setRequestInterception(true);
        page.on("request", (request) => {
            if (request.url() === SIGN_UP_API && request.method() === "POST") {
                request.respond({
                    // Previous behavior was a result of core being shut down
                    // Emulating the same here
                    status: 500,
                    // body: "Error: No SuperTokens core available to query",
                });
            } else {
                request.continue();
            }
        });

        await submitForm(page);

        await page.waitForResponse((response) => {
            return response.url() === SIGN_UP_API && response.status() === 500;
        });

        // Assert server Error
        const generalError = await getGeneralError(page);
        assert.strictEqual(generalError, SOMETHING_WENT_WRONG_ERROR);
        await toggleSignInSignUp(page);
        await waitForSTElement(page, "[data-supertokens~=generalError]", true);
    });
});
