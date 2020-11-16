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
 * Helpers.
 */
import assert from "assert";
import { ST_ROOT_CONTAINER } from "../lib/build/constants";

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

export async function assertShouldShowSignInAndUpWidget(page, isWidgetPresent) {
    const SignInButtonQuerySelector = `document.querySelector('#${ST_ROOT_CONTAINER}').shadowRoot.querySelector('button').innerText`;
    const signInButton = await page.evaluateHandle(SignInButtonQuerySelector);

    if (isWidgetPresent) {
        assert.notStrictEqual(signInButton, null);
        assert.strictEqual(signInButton._remoteObject.value, "SIGN IN");
    } else {
        assert.strictEqual(signInButton, null);
    }
}

export async function assertShouldShowResetPasswordWidget(page, isWidgetPresent, isEnterEmail) {
    const SignInButtonQuerySelector = `document.querySelector('#${ST_ROOT_CONTAINER}').shadowRoot.querySelector('button').innerText`;
    const signInButton = await page.evaluateHandle(SignInButtonQuerySelector);

    if (isWidgetPresent === true) {
        assert.notStrictEqual(signInButton, null);
        if (isEnterEmail === true) {
            assert.strictEqual(signInButton._remoteObject.value, "Email me");
        } else {
            assert.strictEqual(signInButton._remoteObject.value, "Change password");
        }
    } else {
        assert.strictEqual(signInButton, null);
    }
}