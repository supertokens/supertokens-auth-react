"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * isIpV4Address
 */
function isIpV4Address(ip) {
    var ipArray = ip.split(".");
    // Return false if IP does not contain 4 blocks exactly.
    if (ipArray.length !== 4) {
        return false;
    }
    // Otehrwise, make sure all blocks are integers and between IP ranges.
    return ipArray.every(function(b) {
        var block = Number(b);
        return Number.isInteger(block) === true && block >= 0 && block <= 255;
    });
}
exports.isIpV4Address = isIpV4Address;
/*
 * isIpV4Address
 */
function isLocalhost(url) {
    return url.startsWith("localhost:") || url === "localhost";
}
exports.isLocalhost = isLocalhost;
/*
 * isTest
 */
function isTest() {
    return process.env.TEST_MODE === "testing";
}
exports.isTest = isTest;
