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
    toggleSignInSignUp,
    screenshotOnFailure,
    backendBeforeEach,
    waitForUrl,
    createOAuth2Client,
    setOAuth2ClientIdInStorage,
    removeOAuth2ClientIdFromStorage,
    getOAuth2LoginButton,
    getOAuth2LogoutButton,
    getOAuth2TokenData,
    isReact16,
    waitFor,
    signUp,
    getDefaultSignUpFieldValues,
    getTestEmail,
} from "../helpers";
import fetch from "isomorphic-fetch";

import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL, SIGN_OUT_API } from "../constants";

/*
 * Tests.
 */
describe("SuperTokens OAuth2Provider", function () {
    let browser;
    let page;
    let consoleLogs = [];
    let skipped = false;

    before(async function () {
        // Skip these tests if running in React 16
        if (isReact16()) {
            skipped = true;
            this.skip();
        }

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
        if (skipped) {
            return;
        }
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
        page = await browser.newPage();
        page.on("console", (consoleObj) => {
            const log = consoleObj.text();
            if (log.startsWith("ST_LOGS")) {
                consoleLogs.push(log);
            }
        });
        consoleLogs = await clearBrowserCookiesWithoutAffectingConsole(page, []);
    });

    describe("Generic OAuth2 Client Library", function () {
        afterEach(async function () {
            await removeOAuth2ClientIdFromStorage(page);
        });

        it("should successfully complete the OAuth2 flow", async function () {
            const { client } = await createOAuth2Client({
                scope: "offline_access profile openid email",
                redirectUris: [`${TEST_CLIENT_BASE_URL}/oauth2/callback`],
                accessTokenStrategy: "jwt",
                tokenEndpointAuthMethod: "none",
                grantTypes: ["authorization_code", "refresh_token"],
                responseTypes: ["code", "id_token"],
                skipConsent: true,
            });

            await setOAuth2ClientIdInStorage(page, client.clientId);

            await page.goto(`${TEST_CLIENT_BASE_URL}/oauth2/login`);

            let loginButton = await getOAuth2LoginButton(page);
            await loginButton.click();

            await waitForUrl(page, "/auth");

            await toggleSignInSignUp(page);
            const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email: getTestEmail() });
            await signUp(page, fieldValues, postValues, "emailpassword");

            await waitForUrl(page, "/oauth2/callback");

            // Validate token data
            const tokenData = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenData.aud, [client.clientId]);

            // Logout
            const logoutButton = await getOAuth2LogoutButton(page);
            await logoutButton.click();

            // Ensure the Login Button is visible after logout is clicked
            loginButton = await getOAuth2LoginButton(page);
            assert.ok(loginButton !== null);
        });

        it("should successfully refresh the tokens after expiry", async function () {
            const { client } = await createOAuth2Client({
                scope: "offline_access profile openid email",
                redirectUris: [`${TEST_CLIENT_BASE_URL}/oauth2/callback`],
                accessTokenStrategy: "jwt",
                tokenEndpointAuthMethod: "none",
                grantTypes: ["authorization_code", "refresh_token"],
                responseTypes: ["code", "id_token"],
                skipConsent: true,
                // The library refreshes the token 60 seconds before it expires.
                // We set the token lifespan to 63 seconds to force a refresh in 3 seconds.
                authorizationCodeGrantAccessTokenLifespan: "63s",
            });

            await setOAuth2ClientIdInStorage(page, client.clientId);

            await page.goto(`${TEST_CLIENT_BASE_URL}/oauth2/login`);

            let loginButton = await getOAuth2LoginButton(page);
            await loginButton.click();

            await waitForUrl(page, "/auth");

            await toggleSignInSignUp(page);
            const { fieldValues, postValues } = getDefaultSignUpFieldValues({ email: getTestEmail() });
            await signUp(page, fieldValues, postValues, "emailpassword");

            await waitForUrl(page, "/oauth2/callback");

            // Validate token data
            const tokenDataAfterLogin = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenDataAfterLogin.aud, [client.clientId]);

            // Although the react-oidc-context library automatically refreshes the
            // token, we wait for 4 seconds and reload the page to ensure a refresh.
            await waitFor(4000);
            await page.reload();
            await page.waitForNavigation({ waitUntil: "networkidle0" });

            const tokenDataAfterRefresh = await getOAuth2TokenData(page);
            assert.deepStrictEqual(tokenDataAfterRefresh.aud, [client.clientId]);

            // Validate the token was refreshed
            assert(tokenDataAfterLogin.iat !== tokenDataAfterRefresh.iat);
            assert(tokenDataAfterLogin.exp < tokenDataAfterRefresh.exp);
        });
    });
});
