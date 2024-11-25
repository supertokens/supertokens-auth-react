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
    clickOnProviderButton,
    getUserIdWithFetch,
    getLogoutButton,
    loginWithMockProvider,
    setInputValues,
    submitForm,
    waitForSTElement,
    getPasswordlessDevice,
    setPasswordlessFlowType,
    getFeatureFlags,
    isReact16,
    assertProviders,
    setEnabledRecipes,
    clickOnProviderButtonWithoutWaiting,
    getGeneralError,
    backendBeforeEach,
} from "../helpers";
import { TEST_CLIENT_BASE_URL, TEST_SERVER_BASE_URL, SIGN_IN_UP_API, GET_AUTH_URL_API } from "../constants";
import { getThirdPartyTestCases } from "./thirdparty.test";

/*
 * Tests.
 */
describe("SuperTokens Third Party Passwordless", function () {
    const signInUpPageLoadLogs = [
        "ST_LOGS PASSWORDLESS OVERRIDE GET_LOGIN_ATTEMPT_INFO",
        "ST_LOGS PASSWORDLESS OVERRIDE GET_LOGIN_ATTEMPT_INFO",
    ];

    before(async function () {
        const features = await getFeatureFlags();
        if (!features.includes("thirdpartypasswordless")) {
            this.skip();
        }
    });

    describe("Third Party specific", function () {
        getThirdPartyTestCases({
            authRecipe: "thirdpartypasswordless",
            rid: "thirdpartypasswordless",
            logId: "THIRDPARTY",
            signInUpPageLoadLogs,
            thirdPartySignInUpLog: "SIGN_IN_AND_UP",
        });
    });
});
