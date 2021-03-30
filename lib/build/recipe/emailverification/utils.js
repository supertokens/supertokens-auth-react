"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
function normaliseEmailVerificationFeature(config) {
    if (config === undefined) {
        config = {};
    }
    var disableDefaultImplementation = config.disableDefaultImplementation === true;
    var mode = config.mode === undefined ? "OFF" : config.mode;
    var sendVerifyEmailScreenStyle =
        config.sendVerifyEmailScreen !== undefined && config.sendVerifyEmailScreen.style !== undefined
            ? config.sendVerifyEmailScreen.style
            : {};
    var sendVerifyEmailScreen = {
        style: sendVerifyEmailScreenStyle,
    };
    var verifyEmailLinkClickedScreenStyle =
        config.verifyEmailLinkClickedScreen !== undefined && config.verifyEmailLinkClickedScreen.style !== undefined
            ? config.verifyEmailLinkClickedScreen.style
            : {};
    var verifyEmailLinkClickedScreen = {
        style: verifyEmailLinkClickedScreenStyle,
    };
    return {
        disableDefaultImplementation: disableDefaultImplementation,
        mode: mode,
        sendVerifyEmailScreen: sendVerifyEmailScreen,
        verifyEmailLinkClickedScreen: verifyEmailLinkClickedScreen,
    };
}
exports.normaliseEmailVerificationFeature = normaliseEmailVerificationFeature;
//# sourceMappingURL=utils.js.map
