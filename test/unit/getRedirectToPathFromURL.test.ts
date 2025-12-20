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
import { getRedirectToPathFromURL } from "../../lib/ts/utils";

const mockGetSearch = jest.fn();

jest.mock("supertokens-web-js/utils/windowHandler", () => ({
    WindowHandlerReference: {
        getReferenceOrThrow: jest.fn(() => ({
            windowHandler: {
                location: {
                    getSearch: () => mockGetSearch(),
                },
            },
        })),
    },
}));

function setRedirectToPath(value: string | null): void {
    if (value === null) {
        mockGetSearch.mockReturnValue("");
    } else {
        mockGetSearch.mockReturnValue(`?redirectToPath=${encodeURIComponent(value)}`);
    }
}

describe("getRedirectToPathFromURL", () => {
    beforeEach(() => {
        mockGetSearch.mockReset();
    });
    it("should return undefined when redirectToPath is not in query params", () => {
        mockGetSearch.mockReturnValue("");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, undefined);
    });

    it("should return undefined when there are other query params but not redirectToPath", () => {
        mockGetSearch.mockReturnValue("?other=value&another=param");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, undefined);
    });

    it("should return empty string when redirectToPath is not set", () => {
        mockGetSearch.mockReturnValue("?redirectToPath");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "");
    });

    it("should return a 1 level path", () => {
        setRedirectToPath("/dashboard");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "/dashboard");
    });

    it("should return nested paths", () => {
        setRedirectToPath("/dashboard/settings/profile");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "/dashboard/settings/profile");
    });

    it("should handle path without leading slash", () => {
        setRedirectToPath("dashboard");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "/dashboard");
    });

    it("should preserve query parameters", () => {
        setRedirectToPath("/dashboard?tab=settings");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "/dashboard?tab=settings");
    });

    it("should preserve multiple query parameters", () => {
        setRedirectToPath("/dashboard?tab=settings&view=grid");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "/dashboard?tab=settings&view=grid");
    });

    it("should add leading slash when path is empty but query params exist", () => {
        setRedirectToPath("?test=1");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "/?test=1");
    });

    it("should handle hashes", () => {
        setRedirectToPath("/dashboard#section");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "/dashboard#section");
    });

    it("should handle query params and hashes", () => {
        setRedirectToPath("/dashboard?tab=settings#section");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "/dashboard?tab=settings#section");
    });

    it("should add leading slash when path is empty but hash exists", () => {
        setRedirectToPath("#section");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "/#section");
    });

    it("should extract only the path from an absolute URL", () => {
        setRedirectToPath("https://domain.com/page");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "/page");
    });

    it("should extract path and query params from an absolute URL", () => {
        setRedirectToPath("https://domain.com/page?data=stolen");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "/page?data=stolen");
    });

    it("should handle absolute URLs with hash", () => {
        setRedirectToPath("https://domain.com/page#anchor");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "/page#anchor");
    });

    it("should skip over schemaless URLs", () => {
        setRedirectToPath("//evil.com");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, undefined);
    });

    it("should skip over schemalless URls with paths", () => {
        setRedirectToPath("//evil.com/path");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, undefined);
    });

    it("should handle empty string", () => {
        setRedirectToPath("");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "");
    });

    it("should handle root path (normalized to empty string)", () => {
        setRedirectToPath("/");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "");
    });

    it("should handle path with trailing slash", () => {
        setRedirectToPath("/dashboard/");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "/dashboard");
    });

    it("should handle encoded characters in path", () => {
        setRedirectToPath("/path%20with%20spaces");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "/path%20with%20spaces");
    });

    it("should handle special characters in query params", () => {
        setRedirectToPath("/dashboard?redirect=https%3A%2F%2Fexample.com");
        const result = getRedirectToPathFromURL();
        assert.strictEqual(result, "/dashboard?redirect=https%3A%2F%2Fexample.com");
    });
});
