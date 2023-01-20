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
import assert from "assert";
import { defaultEmailValidator, defaultPasswordValidator } from "../../../../lib/ts/recipe/emailpassword/validators";

describe("Email password validators tests", function () {
    it("checking email validator", async function () {
        assert.strictEqual(await defaultEmailValidator("test@supertokens.io"), undefined);
        assert.strictEqual(await defaultEmailValidator("nsdafa@gmail.com"), undefined);
        assert.strictEqual(await defaultEmailValidator("fewf3r_fdkj@gmaildsfa.co.uk"), undefined);
        assert.strictEqual(await defaultEmailValidator("dafk.adfa@gmail.com"), undefined);
        assert.strictEqual(await defaultEmailValidator("skjlblc3f3@fnldsks.co"), undefined);
        assert.strictEqual(await defaultEmailValidator("skjlbl+c3f3@fnldsks.co"), undefined);
        assert.strictEqual(await defaultEmailValidator("a@d.cp"), undefined);
        assert.strictEqual(await defaultEmailValidator("a@d.c"), "ERROR_EMAIL_INVALID");
        assert.strictEqual(await defaultEmailValidator("sdkjfnas34@gmail.com.c"), "ERROR_EMAIL_INVALID");
        assert.strictEqual(await defaultEmailValidator("d@c"), "ERROR_EMAIL_INVALID");
        assert.strictEqual(await defaultEmailValidator("fasd"), "ERROR_EMAIL_INVALID");
        assert.strictEqual(await defaultEmailValidator("dfa@@@abc.com"), "ERROR_EMAIL_INVALID");
        assert.strictEqual(await defaultEmailValidator(""), "ERROR_EMAIL_INVALID");
    });

    it("checking password validator", async function () {
        assert.strictEqual(await defaultPasswordValidator("dsknfkf38H"), undefined);
        assert.strictEqual(await defaultPasswordValidator("lasdkf*787~sdfskj"), undefined);
        assert.strictEqual(await defaultPasswordValidator("L0493434505"), undefined);
        assert.strictEqual(await defaultPasswordValidator("3453342422L"), undefined);
        assert.strictEqual(await defaultPasswordValidator("1sdfsdfsdfsd"), undefined);
        assert.strictEqual(await defaultPasswordValidator("dksjnlvsnl2"), undefined);
        assert.strictEqual(await defaultPasswordValidator("abcgftr8"), undefined);
        assert.strictEqual(await defaultPasswordValidator("abc!@#$%^&*()gftr8"), undefined);
        assert.strictEqual(await defaultPasswordValidator("    dskj3"), undefined);
        assert.strictEqual(await defaultPasswordValidator("    dsk  3"), undefined);
        assert.strictEqual(await defaultPasswordValidator("  d3    "), undefined);

        assert((await defaultPasswordValidator("asd")) === "ERROR_PASSWORD_TOO_SHORT");
        assert(
            (await defaultPasswordValidator(
                "asdfdefrg4asdfdefrg4asdfdefrg4asdfdefrg4asdfdefrg4asdfdefrg4asdfdefrg4asdfdefrg4asdfdefrg4asdfdefrg4"
            )) === "ERROR_PASSWORD_TOO_LONG"
        );
        assert.strictEqual(await defaultPasswordValidator("ascdvsdfvsIUOO"), "ERROR_PASSWORD_NO_NUM");
        assert.strictEqual(await defaultPasswordValidator("234235234523"), "ERROR_PASSWORD_NO_ALPHA");
    });
});
