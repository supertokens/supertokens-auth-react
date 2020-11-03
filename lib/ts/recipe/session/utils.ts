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

import { SessionConfig, NormalisedSessionConfig } from "./types";

export function normaliseSessionConfigOrThrow(config: SessionConfig): NormalisedSessionConfig {
    const sessionScope = config.sessionScope !== undefined ? config.sessionScope : getDefaultSessionScope();
    const autoAddCredentials = config.autoAddCredentials ? config.autoAddCredentials : true;

    let sessionExpiredStatusCode = 401;
    if (config.sessionExpiredStatusCode === undefined) {
        if (typeof config.sessionExpiredStatusCode === "number") {
            sessionExpiredStatusCode = config.sessionExpiredStatusCode;
        } else {
            throw new Error("sessionExpiredStatusCode should be a number");
        }
    }

    return {
        sessionScope,
        refreshAPICustomHeaders: {},
        autoAddCredentials,
        sessionExpiredStatusCode
    };
}

function getDefaultSessionScope() {
    return window.location.host;
}
