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
import {
    WindowUtilities as STWebsiteWindowUtils,
    // eslint-disable-next-line supertokens-auth-react/no-direct-getwindoworthrow-object
    getWindowOrThrow,
    isRunningInElectron,
} from "supertokens-website/utils/webUtils";

export const WindowUtilities = {
    ...STWebsiteWindowUtils,
    location: {
        ...STWebsiteWindowUtils.location,
        get search(): string {
            if (isRunningInElectron()) {
                /**
                 * In electron most users end up using HashRouter, in this case
                 * the URL is formed in this pattern "https://origin#/path?query"
                 *
                 * Because the path + query is prefixed with a "#" character, using
                 * window.location.search will return nothing because the query is now
                 * part of the location hash.
                 *
                 * To avoid this problem we manually extract the query string from the URL
                 * for electron apps
                 */
                // eslint-disable-next-line supertokens-auth-react/no-direct-getwindoworthrow-object
                const currentURL = getWindowOrThrow().location.href;
                const firstQuestionMarkIndex = currentURL.indexOf("?");

                if (firstQuestionMarkIndex !== -1) {
                    // Return the query string from the url
                    const queryString = currentURL.substring(firstQuestionMarkIndex);
                    return queryString;
                }

                return "";
            }

            // eslint-disable-next-line supertokens-auth-react/no-direct-getwindoworthrow-object
            return getWindowOrThrow().location.search;
        },
    },
};
