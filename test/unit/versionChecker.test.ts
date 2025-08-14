/* Copyright (c) 2025, VRAI Labs and/or its affiliates. All rights reserved.
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

const assert = require("assert");
import { isVersionCompatible } from "../../lib/ts/versionChecker";

// Test cases
const testCases = [
    { version: "0.49.1", constraint: "0.49.1", expected: true },
    { version: "0.49.1", constraint: ">=0.49.0", expected: true },
    { version: "0.49.1", constraint: ">0.49.0", expected: true },
    { version: "0.49.1", constraint: "<=0.49.1", expected: true },
    { version: "0.49.1", constraint: "<0.50.0", expected: true },
    { version: "0.49.1", constraint: "=0.49.1", expected: true },
    { version: "0.49.2", constraint: "~0.49.0", expected: true },
    { version: "0.49.5", constraint: "~0.49.0", expected: true },
    { version: "0.50.0", constraint: "~0.49.0", expected: false },
    { version: "0.49.5", constraint: "^0.49.0", expected: true },
    { version: "0.50.0", constraint: "^0.49.0", expected: false },
    { version: "0.49.1", constraint: "0.49.x", expected: true },
    { version: "0.49.5", constraint: "0.49.x", expected: true },
    { version: "0.50.0", constraint: "0.49.x", expected: false },
    { version: "0.49.1", constraint: "0.x", expected: true },
    { version: "0.50.0", constraint: "0.x", expected: true },
    { version: "1.0.0", constraint: "0.x", expected: false },
    { version: "0.49.1", constraint: ["0.49.0", "0.49.1", "0.49.2"], expected: true },
    { version: "0.49.1", constraint: ["0.48.0", "0.50.0"], expected: false },
];

describe("versionChecker tests", function () {
    it("check version compatibility", function () {
        for (const testCase of testCases) {
            const result = isVersionCompatible(testCase.version, testCase.constraint);
            assert.strictEqual(result, testCase.expected);
        }
    });
});
