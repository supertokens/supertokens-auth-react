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

import { jwtVerify } from "../../lib/ts/utils";
import * as crypto from "crypto";

// Mock the required functions
jest.mock("crypto", () => {
    const originalModule = jest.requireActual("crypto");

    return {
        ...originalModule,
        verify: jest.fn().mockReturnValue(true),
        createPublicKey: jest.fn().mockReturnValue("mocked-public-key"),
    };
});

// Mock the global fetch function
global.fetch = jest.fn();

describe("jwtVerify", () => {
    let mockFetch;
    let mockVerify;
    let mockCreatePublicKey;

    beforeEach(() => {
        jest.clearAllMocks();

        // Get mock references
        mockVerify = crypto.verify as jest.Mock;
        mockVerify.mockReturnValue(true);

        mockCreatePublicKey = crypto.createPublicKey as jest.Mock;
        mockCreatePublicKey.mockReturnValue("mocked-public-key");

        // Setup fetch mock
        mockFetch = global.fetch as jest.Mock;
        mockFetch.mockResolvedValue({
            ok: true,
            json: () =>
                Promise.resolve({
                    keys: [
                        {
                            kty: "RSA",
                            kid: "test-kid",
                            alg: "RS256",
                            n: "test-n",
                            e: "test-e",
                        },
                    ],
                }),
        });
    });

    // Helper function to create a JWT with specific claims
    function createTestJWT(header = {}, payload = {}) {
        const headerB64 = Buffer.from(
            JSON.stringify({
                alg: "RS256",
                kid: "test-kid",
                ...header,
            })
        )
            .toString("base64")
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");

        const payloadB64 = Buffer.from(
            JSON.stringify({
                sub: "user123",
                ...payload,
            })
        )
            .toString("base64")
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");

        // Use a fixed signature string for simplicity
        const signatureB64 = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";

        return `${headerB64}.${payloadB64}.${signatureB64}`;
    }

    it("Should throw an error for invalid JWT format", async () => {
        await expect(jwtVerify("invalid-token", "https://test-jwks-url.com")).rejects.toThrow(
            "Invalid JWT token format"
        );
    });

    it("Should throw an error if the JWT header is missing the kid field", async () => {
        const token = createTestJWT({ kid: undefined });
        await expect(jwtVerify(token, "https://test-jwks-url.com")).rejects.toThrow("JWT header missing kid");
    });

    it("Should throw an error if the JWT header is missing the alg field", async () => {
        const token = createTestJWT({ alg: undefined });
        await expect(jwtVerify(token, "https://test-jwks-url.com")).rejects.toThrow("JWT header missing alg");
    });

    it("Should throw an error if the JWT has an invalid algorithm", async () => {
        // For this test we need to mock createPublicKey to throw an error
        // since we're testing algorithm validation that happens before signature verification
        const token = createTestJWT({ alg: "HS256" }); // Not supported

        await expect(jwtVerify(token, "https://test-jwks-url.com")).rejects.toThrow("Unsupported algorithm: HS256");
    });

    it("Should throw an error if the JWT is expired", async () => {
        const pastTime = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
        const token = createTestJWT({}, { exp: pastTime });

        // For time-based tests, we need to ensure signature verification passes
        mockVerify.mockReturnValue(true);

        await expect(jwtVerify(token, "https://test-jwks-url.com")).rejects.toThrow("JWT expired");
    });

    it("Should throw an error if the JWKS key is not found", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () =>
                Promise.resolve({
                    keys: [{ kid: "different-kid" }],
                }),
        });

        const token = createTestJWT();
        await expect(jwtVerify(token, "https://test-jwks-url.com")).rejects.toThrow("No matching key found for kid");
    });

    it("Should throw an error if the JWT was issued for usage in the future (nbf)", async () => {
        const futureTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour in the future
        const token = createTestJWT({}, { nbf: futureTime });

        // Ensure signature validation passes so we reach nbf validation
        mockVerify.mockReturnValue(true);

        await expect(jwtVerify(token, "https://test-jwks-url.com")).rejects.toThrow("JWT not valid yet");
    });

    it("Should throw an error if the JWT was issued in the future (iat)", async () => {
        const futureTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour in the future
        const token = createTestJWT({}, { iat: futureTime });

        // Ensure signature validation passes so we reach iat validation
        mockVerify.mockReturnValue(true);

        await expect(jwtVerify(token, "https://test-jwks-url.com")).rejects.toThrow("JWT issued in the future");
    });

    it("Should throw an error if signature verification fails", async () => {
        mockVerify.mockReturnValue(false);

        const token = createTestJWT();
        await expect(jwtVerify(token, "https://test-jwks-url.com")).rejects.toThrow(
            "JWT signature verification failed"
        );
    });

    it("Should throw an error if JWKS fetch fails", async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            statusText: "Not Found",
        });

        const token = createTestJWT();
        await expect(jwtVerify(token, "https://test-jwks-url.com")).rejects.toThrow("Failed to fetch JWKS: Not Found");
    });

    it("Should successfully verify a valid JWT", async () => {
        // Create a token with valid claims
        const token = createTestJWT(
            {},
            {
                exp: Math.floor(Date.now() / 1000) + 3600, // Valid for 1 hour
            }
        );

        // Make sure verification passes
        mockVerify.mockReturnValue(true);

        const result = await jwtVerify(token, "https://test-jwks-url.com");

        // Check that fetch was called with the correct URL
        expect(mockFetch).toHaveBeenCalledWith("https://test-jwks-url.com");
        // Verify the result contains expected claims
        expect(result).toHaveProperty("sub", "user123");
    });

    it("Should support different key types and algorithms", async () => {
        // Test with RSA key (default)
        const tokenRS256 = createTestJWT({ alg: "RS256" });
        await expect(jwtVerify(tokenRS256, "https://test-jwks-url.com")).resolves.toHaveProperty("sub", "user123");

        // Test with EC key
        mockFetch.mockResolvedValue({
            ok: true,
            json: () =>
                Promise.resolve({
                    keys: [
                        {
                            kty: "EC",
                            kid: "test-kid",
                            alg: "ES256",
                            crv: "P-256",
                            x: "test-x",
                            y: "test-y",
                        },
                    ],
                }),
        });

        const tokenES256 = createTestJWT({ alg: "ES256" });
        await expect(jwtVerify(tokenES256, "https://test-jwks-url.com")).resolves.toHaveProperty("sub", "user123");
    });
});
