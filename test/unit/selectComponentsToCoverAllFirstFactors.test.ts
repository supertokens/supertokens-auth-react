/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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
import { selectComponentsToCoverAllFirstFactors } from "../../lib/ts/recipe/authRecipe/utils";

describe("selectComponentsToCoverAllFirstFactors", function () {
    function mockCompWithFactorIds(factorIds) {
        return {
            factorIds,
        } as any;
    }
    it("should return undefined if the factors cannot be covered", async function () {
        assert.strictEqual(selectComponentsToCoverAllFirstFactors([], ["unknown"]), undefined);
        assert.strictEqual(
            selectComponentsToCoverAllFirstFactors([mockCompWithFactorIds(["emailpassword"])], ["unknown"]),
            undefined
        );
    });
    it("should select components that cover all factors", async function () {
        assert.deepStrictEqual(
            selectComponentsToCoverAllFirstFactors(
                [
                    mockCompWithFactorIds(["emailpassword", "otp-phone"]),
                    mockCompWithFactorIds(["emailpassword"]),
                    mockCompWithFactorIds(["otp-phone"]),
                    mockCompWithFactorIds(["thirdparty"]),
                ],
                ["emailpassword", "otp-phone", "thirdparty"]
            ),
            [mockCompWithFactorIds(["emailpassword", "otp-phone"]), mockCompWithFactorIds(["thirdparty"])]
        );
    });

    it("should not select components that make covering all factors impossible", async function () {
        assert.deepStrictEqual(
            selectComponentsToCoverAllFirstFactors(
                [
                    mockCompWithFactorIds(["emailpassword", "otp-phone"]),
                    mockCompWithFactorIds(["emailpassword"]),
                    mockCompWithFactorIds(["otp-phone", "test"]),
                    mockCompWithFactorIds(["thirdparty"]),
                ],
                ["emailpassword", "otp-phone", "test", "thirdparty"]
            ),
            [
                mockCompWithFactorIds(["emailpassword"]),
                mockCompWithFactorIds(["otp-phone", "test"]),
                mockCompWithFactorIds(["thirdparty"]),
            ]
        );
    });
});
