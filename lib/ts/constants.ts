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
 * Consts.
 */
export const RECIPE_ID_QUERY_PARAM = "rid";

export const DEFAULT_API_BASE_PATH = "/auth";

export const DEFAULT_WEBSITE_BASE_PATH = "/auth";

export const ST_ROOT_ID = "supertokens-root";

export const SSR_ERROR =
    "\nIf you are trying to use this method doing server-side-rendering, please make sure you move this method inside a componentDidMount method or useEffect hook.";

export const WINDOW_UNDEFINED_ERROR =
    "If you are using this package with server-side rendering, please make sure that you are checking if the window object is defined.";
