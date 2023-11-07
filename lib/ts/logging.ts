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

import { package_version as version } from "./version";

const SUPERTOKENS_DEBUG_NAMESPACE = "com.supertokens.auth-react";

let doDebugLogs = false;

export function enableLogging() {
    doDebugLogs = true;
}
export function disableLogging() {
    doDebugLogs = false;
}

export function logDebugMessage(message: string) {
    if (doDebugLogs) {
        // eslint-disable-next-line no-console
        console.log(
            `${SUPERTOKENS_DEBUG_NAMESPACE} {t: "${new Date().toISOString()}", message: "${message}", supertokens-auth-react-ver: "${version}"}`
        );
    }
}
