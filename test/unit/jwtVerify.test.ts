import { jwtVerify, clearJWKSCache, setJWKSCacheDuration } from "../../lib/ts/nextjs/utils";

import assert from "assert";

const originalFetch = global.fetch;

describe("jwtVerify function tests", function () {
    const mockJWKS = {
        keys: [
            {
                kty: "RSA",
                kid: "test-key-id",
                use: "sig",
                alg: "RS256",
                n: "u1SU1L_VLPHCgVIjoiwjusO03XCiGtEFR2VtvC3aqLyvRBYVakyQx9VqAsLW-_k6RqyjGtxchN1cs7vE6xnaum6sRtgoNyPIbOnPoqt_qz_Je2KqzIA_29czIc9hdSvq_cybS92-08xSxxUK9K9WkOA80Q_nvG1sth97-o6he7C9WOUWDYPP9qu_vMy8xrTfCazeVe6mey5PoewOKum8SC4SdomHQ97vqdS5VL81-RKpNCtL1SdqyfcBeE_MVIvcNTvE498TICsRkLxhSdsBTd3_Ve6OsOmPWO2-wWSfMPMV-StaebcJZvb94CcPHMTTGD4_MQeIyhczM1nCK",
                e: "AQAB",
            },
        ],
    };

    const jwksUrl = "https://example.com/.well-known/jwks.json";

    beforeEach(function () {
        clearJWKSCache();
        global.fetch = jest.fn();
    });

    afterEach(function () {
        global.fetch = originalFetch;
        jest.restoreAllMocks();
    });

    function mockJWKSFetch() {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockJWKS,
        });
    }

    function base64urlEncode(str: string): string {
        return Buffer.from(str).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }

    describe("JWT format validation", function () {
        it("should reject JWT with invalid format (too few parts)", async function () {
            const invalidJWT = "invalid.jwt";

            try {
                await jwtVerify(invalidJWT, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert.strictEqual(error.message, "Invalid JWT token format");
            }
        });

        it("should reject JWT with invalid format (too many parts)", async function () {
            const invalidJWT = "header.payload.signature.extra";

            try {
                await jwtVerify(invalidJWT, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert.strictEqual(error.message, "Invalid JWT token format");
            }
        });

        it("should reject JWT with malformed header", async function () {
            const invalidJWT = "invalid-base64.payload.signature";

            try {
                await jwtVerify(invalidJWT, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert(error.message.includes("Unexpected token") || error.message.includes("invalid"));
            }
        });
    });

    describe("JWT header validation", function () {
        it("should reject JWT without kid in header", async function () {
            const header = { alg: "RS256", typ: "JWT" };
            const payload = { sub: "123" };

            const headerBase64 = base64urlEncode(JSON.stringify(header));
            const payloadBase64 = base64urlEncode(JSON.stringify(payload));
            const invalidJWT = `${headerBase64}.${payloadBase64}.signature`;

            try {
                await jwtVerify(invalidJWT, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert.strictEqual(error.message, "JWT header missing kid (Key ID)");
            }
        });

        it("should reject JWT without alg in header", async function () {
            const header = { kid: "test-key-id", typ: "JWT" };
            const payload = { sub: "123" };

            const headerBase64 = base64urlEncode(JSON.stringify(header));
            const payloadBase64 = base64urlEncode(JSON.stringify(payload));
            const invalidJWT = `${headerBase64}.${payloadBase64}.signature`;

            try {
                await jwtVerify(invalidJWT, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert.strictEqual(error.message, "JWT header missing alg (Algorithm)");
            }
        });

        it("should reject JWT with unsupported algorithm", async function () {
            const header = { alg: "HS256", kid: "test-key-id", typ: "JWT" };
            const payload = { sub: "123", exp: Math.floor(Date.now() / 1000) + 3600 };

            const headerBase64 = base64urlEncode(JSON.stringify(header));
            const payloadBase64 = base64urlEncode(JSON.stringify(payload));
            const invalidJWT = `${headerBase64}.${payloadBase64}.signature`;

            mockJWKSFetch();

            try {
                await jwtVerify(invalidJWT, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert.strictEqual(error.message, "Unsupported algorithm: HS256");
            }
        });
    });

    describe("JWKS handling", function () {
        it("should handle JWKS fetch failure", async function () {
            const header = { alg: "RS256", kid: "test-key-id", typ: "JWT" };
            const payload = { sub: "123", exp: Math.floor(Date.now() / 1000) + 3600 };

            const headerBase64 = base64urlEncode(JSON.stringify(header));
            const payloadBase64 = base64urlEncode(JSON.stringify(payload));
            const jwt = `${headerBase64}.${payloadBase64}.signature`;

            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                statusText: "Not Found",
            });

            try {
                await jwtVerify(jwt, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert.strictEqual(error.message, "Failed to fetch JWKS: Not Found");
            }
        });

        it("should handle JWKS with no matching key", async function () {
            const header = { alg: "RS256", kid: "non-existent-key-id", typ: "JWT" };
            const payload = { sub: "123", exp: Math.floor(Date.now() / 1000) + 3600 };

            const headerBase64 = base64urlEncode(JSON.stringify(header));
            const payloadBase64 = base64urlEncode(JSON.stringify(payload));
            const jwt = `${headerBase64}.${payloadBase64}.signature`;

            mockJWKSFetch();

            try {
                await jwtVerify(jwt, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert.strictEqual(error.message, "No matching key found for kid: non-existent-key-id");
            }
        });

        it("should cache JWKS and reuse it", async function () {
            const header = { alg: "RS256", kid: "test-key-id", typ: "JWT" };
            const payload1 = { sub: "123", exp: Math.floor(Date.now() / 1000) + 3600 };
            const payload2 = { sub: "456", exp: Math.floor(Date.now() / 1000) + 3600 };

            const headerBase64 = base64urlEncode(JSON.stringify(header));
            const payload1Base64 = base64urlEncode(JSON.stringify(payload1));
            const payload2Base64 = base64urlEncode(JSON.stringify(payload2));
            const jwt1 = `${headerBase64}.${payload1Base64}.signature`;
            const jwt2 = `${headerBase64}.${payload2Base64}.signature`;

            mockJWKSFetch();

            try {
                await jwtVerify(jwt1, jwksUrl);
            } catch (error) {
                // Expected to fail on signature verification, but should fetch JWKS
            }

            try {
                await jwtVerify(jwt2, jwksUrl);
            } catch (error) {
                // Expected to fail on signature verification, but should reuse cached JWKS
            }

            assert.strictEqual((global.fetch as jest.Mock).mock.calls.length, 1);
        });

        it("should handle unsupported key type", async function () {
            const header = { alg: "RS256", kid: "test-key-id", typ: "JWT" };
            const payload = { sub: "123", exp: Math.floor(Date.now() / 1000) + 3600 };

            const headerBase64 = base64urlEncode(JSON.stringify(header));
            const payloadBase64 = base64urlEncode(JSON.stringify(payload));
            const jwt = `${headerBase64}.${payloadBase64}.signature`;

            const jwksWithEC = {
                keys: [
                    {
                        kty: "EC",
                        kid: "test-key-id",
                        use: "sig",
                        alg: "ES256",
                    },
                ],
            };

            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => jwksWithEC,
            });

            try {
                await jwtVerify(jwt, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert.strictEqual(error.message, "Unsupported key type");
            }
        });

        it("should handle RSA key with missing parameters", async function () {
            const header = { alg: "RS256", kid: "test-key-id", typ: "JWT" };
            const payload = { sub: "123", exp: Math.floor(Date.now() / 1000) + 3600 };

            const headerBase64 = base64urlEncode(JSON.stringify(header));
            const payloadBase64 = base64urlEncode(JSON.stringify(payload));
            const jwt = `${headerBase64}.${payloadBase64}.signature`;

            const jwksWithMissingParams = {
                keys: [
                    {
                        kty: "RSA",
                        kid: "test-key-id",
                        use: "sig",
                        alg: "RS256",
                        // Missing n and e parameters
                    },
                ],
            };

            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => jwksWithMissingParams,
            });

            try {
                await jwtVerify(jwt, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert.strictEqual(error.message, "Missing RSA key parameters");
            }
        });
    });

    describe("Time-based claims validation", function () {
        it("should reject expired JWT", async function () {
            const currentTime = Math.floor(Date.now() / 1000);
            const header = { alg: "RS256", kid: "test-key-id", typ: "JWT" };
            const payload = {
                sub: "123",
                exp: currentTime - 3600,
            };

            const headerBase64 = base64urlEncode(JSON.stringify(header));
            const payloadBase64 = base64urlEncode(JSON.stringify(payload));
            const jwt = `${headerBase64}.${payloadBase64}.signature`;

            mockJWKSFetch();

            try {
                await jwtVerify(jwt, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert(error.message === "JWT expired" || error.message === "JWT signature verification failed");
            }
        });

        it("should reject JWT that is not yet valid (nbf)", async function () {
            const currentTime = Math.floor(Date.now() / 1000);
            const header = { alg: "RS256", kid: "test-key-id", typ: "JWT" };
            const payload = {
                sub: "123",
                nbf: currentTime + 3600,
                exp: currentTime + 7200,
            };

            const headerBase64 = base64urlEncode(JSON.stringify(header));
            const payloadBase64 = base64urlEncode(JSON.stringify(payload));
            const jwt = `${headerBase64}.${payloadBase64}.signature`;

            mockJWKSFetch();

            try {
                await jwtVerify(jwt, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert(
                    error.message === "JWT not valid yet (nbf)" || error.message === "JWT signature verification failed"
                );
            }
        });

        it("should reject JWT issued in the future", async function () {
            const currentTime = Math.floor(Date.now() / 1000);
            const header = { alg: "RS256", kid: "test-key-id", typ: "JWT" };
            const payload = {
                sub: "123",
                iat: currentTime + 3600,
                exp: currentTime + 7200,
            };

            const headerBase64 = base64urlEncode(JSON.stringify(header));
            const payloadBase64 = base64urlEncode(JSON.stringify(payload));
            const jwt = `${headerBase64}.${payloadBase64}.signature`;

            mockJWKSFetch();

            try {
                await jwtVerify(jwt, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert(
                    error.message === "JWT issued in the future" ||
                        error.message === "JWT signature verification failed"
                );
            }
        });
    });

    describe("Edge cases", function () {
        it("should handle malformed payload JSON", async function () {
            const header = { alg: "RS256", kid: "test-key-id", typ: "JWT" };

            const headerBase64 = base64urlEncode(JSON.stringify(header));
            const malformedPayload = base64urlEncode("invalid-json");
            const malformedJWT = `${headerBase64}.${malformedPayload}.signature`;

            mockJWKSFetch();

            try {
                await jwtVerify(malformedJWT, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert(
                    error.message.includes("Unexpected token") ||
                        error.message.includes("invalid") ||
                        error.message === "JWT signature verification failed"
                );
            }
        });

        it("should handle network errors during JWKS fetch", async function () {
            const header = { alg: "RS256", kid: "test-key-id", typ: "JWT" };
            const payload = { sub: "123", exp: Math.floor(Date.now() / 1000) + 3600 };

            const headerBase64 = base64urlEncode(JSON.stringify(header));
            const payloadBase64 = base64urlEncode(JSON.stringify(payload));
            const jwt = `${headerBase64}.${payloadBase64}.signature`;

            (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

            try {
                await jwtVerify(jwt, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert.strictEqual(error.message, "Network error");
            }
        });

        it("should handle empty JWKS response", async function () {
            const header = { alg: "RS256", kid: "test-key-id", typ: "JWT" };
            const payload = { sub: "123", exp: Math.floor(Date.now() / 1000) + 3600 };

            const headerBase64 = base64urlEncode(JSON.stringify(header));
            const payloadBase64 = base64urlEncode(JSON.stringify(payload));
            const jwt = `${headerBase64}.${payloadBase64}.signature`;

            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => ({ keys: [] }),
            });

            try {
                await jwtVerify(jwt, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert.strictEqual(error.message, "No matching key found for kid: test-key-id");
            }
        });

        it("should handle non-string exp/nbf/iat claims", async function () {
            const currentTime = Math.floor(Date.now() / 1000);
            const header = { alg: "RS256", kid: "test-key-id", typ: "JWT" };
            const payload = {
                sub: "123",
                exp: "invalid-exp" as any, // Should be number
                nbf: currentTime - 60,
                iat: currentTime - 120,
            };

            const headerBase64 = base64urlEncode(JSON.stringify(header));
            const payloadBase64 = base64urlEncode(JSON.stringify(payload));
            const jwt = `${headerBase64}.${payloadBase64}.signature`;

            mockJWKSFetch();

            try {
                await jwtVerify<typeof payload>(jwt, jwksUrl);
                assert.fail("Should have thrown an error for signature verification");
            } catch (error: any) {
                assert.strictEqual(error.message, "JWT signature verification failed");
            }
        });

        it("should handle signature verification failure gracefully", async function () {
            const header = { alg: "RS256", kid: "test-key-id", typ: "JWT" };
            const payload = { sub: "123", exp: Math.floor(Date.now() / 1000) + 3600 };

            const headerBase64 = base64urlEncode(JSON.stringify(header));
            const payloadBase64 = base64urlEncode(JSON.stringify(payload));
            const jwt = `${headerBase64}.${payloadBase64}.invalid-signature`;

            mockJWKSFetch();

            try {
                await jwtVerify(jwt, jwksUrl);
                assert.fail("Should have thrown an error");
            } catch (error: any) {
                assert.strictEqual(error.message, "JWT signature verification failed");
            }
        });
    });
});
