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
    toggleSignInSignUp,
    screenshotOnFailure,
    waitForUrl,
    createOAuth2Client,
    setOAuth2ClientInfo,
    removeOAuth2ClientInfo,
    getOAuth2LoginButton,
    getOAuth2LogoutButton,
    getOAuth2TokenData,
    isReact16,
    waitFor,
    signUp,
    getDefaultSignUpFieldValues,
    getTestEmail,
    getOAuth2Error,
    waitForSTElement,
    isOauth2Supported,
    setupBrowser,
    getGeneralError,
    backendHook,
    setupCoreApp,
    setupST,
} from "../helpers";
import {
    TEST_CLIENT_BASE_URL,
    TEST_APPLICATION_SERVER_BASE_URL,
    SOMETHING_WENT_WRONG_ERROR,
} from "../constants";

// We do no thave to use a separate domain for the oauth2 client, since the way we are testing
// the lib doesn't interact with the supertokens session handling.
// Using a redirection uri that has the same domain as the auth portal shouldn't affect the test.

/*
 * Tests.
 */
describe("SuperTokens OAuth2Provider", function () {
    let browser;
    let page;
    let consoleLogs = [];

    before(async function () {
        await backendHook("before");
        // Skip these tests if running in React 16
        if (isReact16() || !(await isOauth2Supported())) {
            this.skip();
        }

        const coreUrl = await setupCoreApp({
            coreConfig: {
                access_token_validity: 5, // 5 seconds
            },
        });
        await setupST({ coreUrl });

        browser = await setupBrowser();
    });

    beforeEach(async function () {
        await backendHook("beforeEach");

        page = await browser.newPage();
        page.on("console", (consoleObj) => {
            const log = consoleObj.text();
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
        });
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, []);
    });

    afterEach(async function () {
        await screenshotOnFailure(this, browser);
        await page?.close();
        await backendHook("afterEach");
    });

    after(async function () {
        await browser?.close();
        await backendHook("after");
    });

    describe("Generic OAuth2 Client Library", function () {
        afterEach(async function () {
            await removeOAuth2ClientInfo(page);
        });

        it("should clear invalid/expired loginChallenge from the url and show an error", async function () {
            const { client } = await createOAuth2Client({
                scope: "offline_access profile openid email",
                redirectUris: [`${TEST_CLIENT_BASE_URL}/oauth/callback`],
                tokenEndpointAuthMethod: "none",
                grantTypes: ["authorization_code", "refresh_token"],
                responseTypes: ["code", "id_token"],
            });

            await setOAuth2ClientInfo(page, client.clientId);

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/oauth/login`),
            ]);

            let loginButton = await getOAuth2LoginButton(page);
            await loginButton.click();

            await waitForUrl(page, "/auth");

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(page.url().replace("loginChallenge=", "loginChallenge=nooope")),
            ]);

            const error = await getGeneralError(page);
            assert.strictEqual(error, SOMETHING_WENT_WRONG_ERROR);
        });

        it("should successfully complete the OAuth2 flow", async function () {
            const { client } = await createOAuth2Client({
                scope: "offline_access profile openid email",
                redirectUris: [`${TEST_CLIENT_BASE_URL}/oauth/callback`],
                tokenEndpointAuthMethod: "none",
                grantTypes: ["authorization_code", "refresh_token"],
                responseTypes: ["code", "id_token"],
            });

            await setOAuth2ClientInfo(page, client.clientId);

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/oauth/login`),
            ]);

            let loginButton = await getOAuth2LoginButton(page);
            await loginButton.click();

            await waitForUrl(page, "/auth");

            await toggleSignInSignUp(page);
            const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email: getTestEmail() });
            await signUp(page, fieldValues, postValues, "emailpassword");

            await waitForUrl(page, "/oauth/callback");

            // Validate token data
            const tokenData = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenData.aud, client.clientId);

            // Logout
            const logoutButton = await getOAuth2LogoutButton(page);
            await logoutButton.click();

            await waitFor(1000);

            await page.waitForSelector("#oauth2-token-data", { hidden: true });

            // Ensure the Login Button is visible after logout is clicked
            loginButton = await getOAuth2LoginButton(page);
            await loginButton.click();
            await waitForUrl(page, "/oauth/callback");
        });

        it("should handle invalid logoutChallenge in the OAuth2 Logout flow", async function () {
            const postLogoutRedirectUri = `${TEST_CLIENT_BASE_URL}/oauth/login?logout=true`;

            const { client } = await createOAuth2Client({
                scope: "offline_access profile openid email",
                redirectUris: [`${TEST_CLIENT_BASE_URL}/oauth/callback`],
                postLogoutRedirectUris: [postLogoutRedirectUri],
                accessTokenStrategy: "jwt",
                tokenEndpointAuthMethod: "none",
                grantTypes: ["authorization_code", "refresh_token"],
                responseTypes: ["code", "id_token"],
                skipConsent: true,
            });

            await setOAuth2ClientInfo(
                page,
                client.clientId,
                undefined,
                undefined,
                undefined,
                JSON.stringify({
                    post_logout_redirect_uri: postLogoutRedirectUri,
                })
            );

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/oauth/login`),
            ]);

            let loginButton = await getOAuth2LoginButton(page);
            await loginButton.click();

            await waitForUrl(page, "/auth");

            await toggleSignInSignUp(page);
            const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email: getTestEmail() });
            await signUp(page, fieldValues, postValues, "emailpassword");

            await waitForUrl(page, "/oauth/callback");

            // Logout
            const logoutButton = await getOAuth2LogoutButton(page, "redirect");
            await logoutButton.click();

            await waitForUrl(page, "/auth/oauth/logout");

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(page.url().replace("logoutChallenge=", "logoutChallenge=nooope")),
            ]);

            // Click the Logout button on the provider website
            const stLogoutButton = await waitForSTElement(page, "[data-supertokens~=button]");
            await stLogoutButton.click();

            // Ensure the we get redirected to the auth page
            await waitForUrl(page, "/auth/");
            await waitForSTElement(page);
        });

        it("should successfully complete the OAuth2 Logout flow", async function () {
            const postLogoutRedirectUri = `${TEST_CLIENT_BASE_URL}/oauth/login?logout=true`;

            const { client } = await createOAuth2Client({
                scope: "offline_access profile openid email",
                redirectUris: [`${TEST_CLIENT_BASE_URL}/oauth/callback`],
                postLogoutRedirectUris: [postLogoutRedirectUri],
                accessTokenStrategy: "jwt",
                tokenEndpointAuthMethod: "none",
                grantTypes: ["authorization_code", "refresh_token"],
                responseTypes: ["code", "id_token"],
                skipConsent: true,
            });

            await setOAuth2ClientInfo(
                page,
                client.clientId,
                undefined,
                undefined,
                undefined,
                JSON.stringify({
                    post_logout_redirect_uri: postLogoutRedirectUri,
                })
            );

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/oauth/login`),
            ]);

            let loginButton = await getOAuth2LoginButton(page);
            await loginButton.click();

            await waitForUrl(page, "/auth");

            await toggleSignInSignUp(page);
            const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email: getTestEmail() });
            await signUp(page, fieldValues, postValues, "emailpassword");

            await waitForUrl(page, "/oauth/callback");

            // Logout
            const logoutButton = await getOAuth2LogoutButton(page, "redirect");
            await logoutButton.click();

            await waitForUrl(page, "/auth/oauth/logout");

            // Click the Logout button on the provider website
            const stLogoutButton = await waitForSTElement(page, "[data-supertokens~=button]");
            await stLogoutButton.click();

            // Ensure the final url matches the post_logout_redirect uri
            await waitForUrl(page, "/oauth/login?logout=true", false);

            await page.waitForSelector("#oauth2-token-data", { hidden: true });

            // Ensure that the SuperTokens session was cleared by checking for a redirect to the provider's auth page during the login flow.
            loginButton = await getOAuth2LoginButton(page);
            await loginButton.click();
            await waitForUrl(page, "/auth");
        });

        it("should login without interaction if the user already has a session", async function () {
            const { client } = await createOAuth2Client({
                scope: "offline_access profile openid email",
                redirectUris: [`${TEST_CLIENT_BASE_URL}/oauth/callback`],
                accessTokenStrategy: "jwt",
                tokenEndpointAuthMethod: "none",
                grantTypes: ["authorization_code", "refresh_token"],
                responseTypes: ["code", "id_token"],
                skipConsent: true,
            });

            await setOAuth2ClientInfo(page, client.clientId);
            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/auth`),
            ]);
            await toggleSignInSignUp(page);
            const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email: getTestEmail() });
            await signUp(page, fieldValues, postValues, "emailpassword");

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/oauth/login`),
            ]);

            let loginButton = await getOAuth2LoginButton(page);
            await loginButton.click();

            await waitForUrl(page, "/oauth/callback");

            // Validate token data
            const tokenData = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenData.aud, client.clientId);
        });

        it("should require logging in again with prompt=login", async function () {
            const { client } = await createOAuth2Client({
                scope: "offline_access profile openid email",
                redirectUris: [`${TEST_CLIENT_BASE_URL}/oauth/callback`],
                accessTokenStrategy: "jwt",
                tokenEndpointAuthMethod: "none",
                grantTypes: ["authorization_code", "refresh_token"],
                responseTypes: ["code", "id_token"],
                skipConsent: true,
            });

            await setOAuth2ClientInfo(page, client.clientId);

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/oauth/login`),
            ]);

            let loginButton = await getOAuth2LoginButton(page, "prompt-login");
            await loginButton.click();

            await waitForUrl(page, "/auth");

            await toggleSignInSignUp(page);
            const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email: getTestEmail() });
            await signUp(page, fieldValues, postValues, "emailpassword");

            await waitForUrl(page, "/oauth/callback");

            // Validate token data
            const tokenData = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenData.aud, client.clientId);

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/oauth/login`),
            ]);

            loginButton = await getOAuth2LoginButton(page, "prompt-login");
            await loginButton.click();
            await waitForUrl(page, "/auth");
        });

        // TODO: Fix flakyness and re-enable this test
        it.skip("should require logging in again with max_age=3 after 3 seconds", async function () {
            const { client } = await createOAuth2Client({
                scope: "offline_access profile openid email",
                redirectUris: [`${TEST_CLIENT_BASE_URL}/oauth/callback`],
                accessTokenStrategy: "jwt",
                tokenEndpointAuthMethod: "none",
                grantTypes: ["authorization_code", "refresh_token"],
                responseTypes: ["code", "id_token"],
                skipConsent: true,
            });

            await setOAuth2ClientInfo(page, client.clientId);

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/oauth/login`),
            ]);

            let loginButton = await getOAuth2LoginButton(page, "max-age-3");
            await loginButton.click();

            await waitForUrl(page, "/auth");

            await toggleSignInSignUp(page);
            const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email: getTestEmail() });
            await signUp(page, fieldValues, postValues, "emailpassword");

            await waitForUrl(page, "/oauth/callback");

            // Validate token data
            const tokenData = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenData.aud, client.clientId);

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/oauth/login`),
            ]);

            loginButton = await getOAuth2LoginButton(page, "max-age-3");
            await loginButton.click();
            await waitForUrl(page, "/oauth/callback");

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/oauth/login`),
            ]);

            await waitFor(3000);
            loginButton = await getOAuth2LoginButton(page, "max-age-3");
            await loginButton.click();
            await waitForUrl(page, "/auth");
        });

        it("should successfully refresh the tokens after expiry", async function () {
            const { client } = await createOAuth2Client({
                scope: "offline_access profile openid email",
                redirectUris: [`${TEST_CLIENT_BASE_URL}/oauth/callback`],
                accessTokenStrategy: "jwt",
                tokenEndpointAuthMethod: "none",
                grantTypes: ["authorization_code", "refresh_token"],
                responseTypes: ["code", "id_token"],
                skipConsent: true,
                // The library refreshes the token 60 seconds before it expires.
                // We set the token lifespan to 63 seconds to force a refresh in 3 seconds.
                authorizationCodeGrantAccessTokenLifespan: "63s",
            });

            await setOAuth2ClientInfo(page, client.clientId);

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/oauth/login`),
            ]);

            let loginButton = await getOAuth2LoginButton(page);
            await loginButton.click();

            await waitForUrl(page, "/auth");

            await toggleSignInSignUp(page);
            const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email: getTestEmail() });
            await signUp(page, fieldValues, postValues, "emailpassword");

            await waitForUrl(page, "/oauth/callback");

            // Validate token data
            const tokenDataAfterLogin = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenDataAfterLogin.aud, client.clientId);

            // Although the react-oidc-context library automatically refreshes the
            // token, we wait for 4 seconds and reload the page to ensure a refresh.
            await waitFor(4000);
            await Promise.all([page.reload(), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            const tokenDataAfterRefresh = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenDataAfterRefresh.aud, client.clientId);

            // Validate the token was refreshed
            assert(tokenDataAfterLogin.iat !== tokenDataAfterRefresh.iat);
            assert(tokenDataAfterLogin.exp < tokenDataAfterRefresh.exp);
        });

        it("should have roles in the id_token if the scopes is requested", async function () {
            const { client } = await createOAuth2Client({
                scope: "offline_access profile openid email roles permissions",
                redirectUris: [`${TEST_CLIENT_BASE_URL}/oauth/callback`],
                accessTokenStrategy: "jwt",
                tokenEndpointAuthMethod: "none",
                grantTypes: ["authorization_code", "refresh_token"],
                responseTypes: ["code", "id_token"],
                skipConsent: true,
            });

            await setOAuth2ClientInfo(page, client.clientId, "offline_access profile openid email roles permissions");

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/oauth/login`),
            ]);

            let loginButton = await getOAuth2LoginButton(page);
            await loginButton.click();

            await waitForUrl(page, "/auth");

            await toggleSignInSignUp(page);
            const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email: getTestEmail() });
            await signUp(page, fieldValues, postValues, "emailpassword");

            await waitForUrl(page, "/oauth/callback");

            // Validate token data
            const tokenDataAfterLogin = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenDataAfterLogin.aud, client.clientId);

            await page.evaluate(
                (url) =>
                    window.fetch(url, {
                        method: "POST",
                        headers: [["content-type", "application/json"]],
                        body: JSON.stringify({
                            role: "testRole",
                            permissions: ["testPerm"],
                        }),
                    }),
                `${TEST_APPLICATION_SERVER_BASE_URL}/setRole`
            );

            await waitFor(2000);
            loginButton = await getOAuth2LoginButton(page, "silent");
            await loginButton.click();

            await waitFor(1000);

            const tokenDataAfterRefresh = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenDataAfterRefresh.aud, client.clientId);

            // Validate the token was refreshed
            assert(tokenDataAfterLogin.iat !== tokenDataAfterRefresh.iat);
            assert(tokenDataAfterLogin.exp < tokenDataAfterRefresh.exp);

            assert.deepStrictEqual(tokenDataAfterLogin.roles, []);
            assert.deepStrictEqual(tokenDataAfterLogin.permissions, []);

            assert.deepStrictEqual(tokenDataAfterRefresh.roles, ["testRole"]);
            assert.deepStrictEqual(tokenDataAfterRefresh.permissions, ["testPerm"]);
        });

        it("should not include email info if the scope is not requested", async function () {
            const { client } = await createOAuth2Client({
                scope: "offline_access profile openid roles permissions",
                redirectUris: [`${TEST_CLIENT_BASE_URL}/oauth/callback`],
                accessTokenStrategy: "jwt",
                tokenEndpointAuthMethod: "none",
                grantTypes: ["authorization_code", "refresh_token"],
                responseTypes: ["code", "id_token"],
                skipConsent: true,
                // The library refreshes the token 60 seconds before it expires.
                // We set the token lifespan to 63 seconds to force a refresh in 3 seconds.
                authorizationCodeGrantAccessTokenLifespan: "63s",
            });

            await setOAuth2ClientInfo(page, client.clientId, "offline_access profile openid roles permissions");

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/oauth/login`),
            ]);

            let loginButton = await getOAuth2LoginButton(page);
            await loginButton.click();

            await waitForUrl(page, "/auth");

            await toggleSignInSignUp(page);
            const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email: getTestEmail() });
            await signUp(page, fieldValues, postValues, "emailpassword");

            await waitForUrl(page, "/oauth/callback");

            // Validate token data
            const tokenDataAfterLogin = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenDataAfterLogin.aud, client.clientId);

            // Although the react-oidc-context library automatically refreshes the
            // token, we wait for 4 seconds and reload the page to ensure a refresh.
            await waitFor(4000);
            await Promise.all([page.reload(), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            const tokenDataAfterRefresh = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenDataAfterRefresh.aud, client.clientId);

            // Validate the token was refreshed
            assert(tokenDataAfterLogin.iat !== tokenDataAfterRefresh.iat);
            assert(tokenDataAfterLogin.exp < tokenDataAfterRefresh.exp);

            assert.strictEqual(tokenDataAfterLogin.email, undefined);
            assert.strictEqual(tokenDataAfterLogin.email_verified, undefined);
            assert.strictEqual(tokenDataAfterRefresh.email, undefined);
            assert.strictEqual(tokenDataAfterRefresh.email_verified, undefined);
        });

        it("should work if the scope phoneNumber is requested for emailpassword user", async function () {
            const { client } = await createOAuth2Client({
                scope: "offline_access profile openid phoneNumber",
                redirectUris: [`${TEST_CLIENT_BASE_URL}/oauth/callback`],
                accessTokenStrategy: "jwt",
                tokenEndpointAuthMethod: "none",
                grantTypes: ["authorization_code", "refresh_token"],
                responseTypes: ["code", "id_token"],
                skipConsent: true,
                // The library refreshes the token 60 seconds before it expires.
                // We set the token lifespan to 63 seconds to force a refresh in 3 seconds.
                authorizationCodeGrantAccessTokenLifespan: "63s",
            });

            await setOAuth2ClientInfo(page, client.clientId, "offline_access profile openid phoneNumber");

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/oauth/login`),
            ]);

            let loginButton = await getOAuth2LoginButton(page);
            await loginButton.click();

            await waitForUrl(page, "/auth");

            await toggleSignInSignUp(page);
            const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email: getTestEmail() });
            await signUp(page, fieldValues, postValues, "emailpassword");

            await waitForUrl(page, "/oauth/callback");

            // Validate token data
            const tokenDataAfterLogin = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenDataAfterLogin.aud, client.clientId);

            // Although the react-oidc-context library automatically refreshes the
            // token, we wait for 4 seconds and reload the page to ensure a refresh.
            await waitFor(4000);
            await Promise.all([page.reload(), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            const tokenDataAfterRefresh = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenDataAfterRefresh.aud, client.clientId);

            // Validate the token was refreshed
            assert(tokenDataAfterLogin.iat !== tokenDataAfterRefresh.iat);
            assert(tokenDataAfterLogin.exp < tokenDataAfterRefresh.exp);

            assert.strictEqual(tokenDataAfterLogin.email, undefined);
            assert.strictEqual(tokenDataAfterLogin.email_verified, undefined);
            assert.strictEqual(tokenDataAfterRefresh.email, undefined);
            assert.strictEqual(tokenDataAfterRefresh.email_verified, undefined);
            assert.strictEqual(tokenDataAfterLogin.phoneNumber, undefined);
            assert.notStrictEqual(tokenDataAfterLogin.phoneNumber_verified, undefined);
            assert.strictEqual(tokenDataAfterRefresh.phoneNumber, undefined);
            assert.notStrictEqual(tokenDataAfterRefresh.phoneNumber_verified, undefined);
        });

        it("should reject the login if the wrong scope is requested", async function () {
            const { client } = await createOAuth2Client({
                scope: "offline_access profile openid",
                redirectUris: [`${TEST_CLIENT_BASE_URL}/oauth/callback`],
                accessTokenStrategy: "jwt",
                tokenEndpointAuthMethod: "none",
                grantTypes: ["authorization_code", "refresh_token"],
                responseTypes: ["code", "id_token"],
                skipConsent: true,
                // The library refreshes the token 60 seconds before it expires.
                // We set the token lifespan to 63 seconds to force a refresh in 3 seconds.
                authorizationCodeGrantAccessTokenLifespan: "63s",
            });

            await setOAuth2ClientInfo(page, client.clientId, "offline_access profile openid roles permissions");

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/oauth/login`),
            ]);

            let loginButton = await getOAuth2LoginButton(page);
            await loginButton.click();

            assert.strictEqual(
                await getOAuth2Error(page),
                `Error: The requested scope is invalid, unknown, or malformed. The OAuth 2.0 Client is not allowed to request scope 'roles'.`
            );
        });

        it("should work even if the supertokens session is expired", async function () {
            const { client } = await createOAuth2Client({
                scope: "offline_access profile openid email",
                redirectUris: [`${TEST_CLIENT_BASE_URL}/oauth/callback`],
                accessTokenStrategy: "jwt",
                tokenEndpointAuthMethod: "none",
                grantTypes: ["authorization_code", "refresh_token"],
                responseTypes: ["code", "id_token"],
                skipConsent: true,
                // The library refreshes the token 60 seconds before it expires.
                // We set the token lifespan to 63 seconds to force a refresh in 3 seconds.
                authorizationCodeGrantAccessTokenLifespan: "63s",
            });

            await setOAuth2ClientInfo(page, client.clientId);

            await toggleSignInSignUp(page);
            const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email: getTestEmail() });
            await signUp(page, fieldValues, postValues, "emailpassword");

            await waitFor(6000);

            await Promise.all([
                page.waitForNavigation({ waitUntil: "networkidle0" }),
                page.goto(`${TEST_CLIENT_BASE_URL}/oauth/login`),
            ]);

            let loginButton = await getOAuth2LoginButton(page);
            await loginButton.click();

            await waitForUrl(page, "/oauth/callback");

            // Validate token data
            const tokenDataAfterLogin = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenDataAfterLogin.aud, client.clientId);

            // Although the react-oidc-context library automatically refreshes the
            // token, we wait for 6 seconds and reload the page to ensure a refresh.
            await waitFor(6000);
            await Promise.all([page.reload(), page.waitForNavigation({ waitUntil: "networkidle0" })]);

            const tokenDataAfterRefresh = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenDataAfterRefresh.aud, client.clientId);

            // Validate the token was refreshed
            assert(tokenDataAfterLogin.iat !== tokenDataAfterRefresh.iat);
            assert(tokenDataAfterLogin.exp < tokenDataAfterRefresh.exp);
        });
    });
});
