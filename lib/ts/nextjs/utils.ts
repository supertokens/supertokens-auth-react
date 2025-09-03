import { createPublicKey, verify } from "crypto";

import type { JWK, JWKS } from "./types";

interface JWKSCacheEntry {
    jwks: JWKS;
    timestamp: number;
    expiresAt: number;
}

export interface JWKSCacheConfig {
    cacheDurationMs?: number;
}

class JWKSCache {
    private cache: Map<string, JWKSCacheEntry> = new Map();
    private defaultCacheDurationMs: number = 10 * 60 * 1000; // 10 minutes default

    async getJWKS(jwksUrl: string, config?: JWKSCacheConfig): Promise<JWKS> {
        const now = Date.now();
        const cacheEntry = this.cache.get(jwksUrl);
        const cacheDurationMs = config?.cacheDurationMs ?? this.defaultCacheDurationMs;

        if (cacheEntry && now < cacheEntry.expiresAt) {
            return cacheEntry.jwks;
        }

        const jwksResponse = await fetch(jwksUrl);
        if (!jwksResponse.ok) {
            throw new Error(`Failed to fetch JWKS: ${jwksResponse.statusText}`);
        }

        const jwks: JWKS = await jwksResponse.json();

        this.cache.set(jwksUrl, {
            jwks,
            timestamp: now,
            expiresAt: now + cacheDurationMs,
        });

        return jwks;
    }

    clearCache(): void {
        this.cache.clear();
    }

    setCacheDuration(durationMs: number): void {
        this.defaultCacheDurationMs = durationMs;
    }
}

const jwksCache = new JWKSCache();

export async function jwtVerify<T extends { exp?: number; nbf?: number; iat?: number }>(
    token: string,
    jwksUrl: string,
    config?: JWKSCacheConfig
): Promise<T> {
    const parts = token.split(".");
    if (parts.length !== 3) {
        throw new Error("Invalid JWT token format");
    }

    const [headerB64, payloadB64, signatureB64] = parts;

    const headerStr = Buffer.from(headerB64 + "=".repeat((4 - (headerB64.length % 4)) % 4), "base64").toString();
    const header = JSON.parse(headerStr);

    const kid = header.kid;
    if (!kid) {
        throw new Error("JWT header missing kid (Key ID)");
    }

    const alg = header.alg as string;
    if (!alg) {
        throw new Error("JWT header missing alg (Algorithm)");
    }

    const jwks: JWKS = await jwksCache.getJWKS(jwksUrl, config);
    const matchingKey = jwks.keys.find((key) => key.kid === kid);
    if (!matchingKey) {
        throw new Error(`No matching key found for kid: ${kid}`);
    }

    const publicKey = generatePublicKey(matchingKey, alg);
    const signatureInput = `${headerB64}.${payloadB64}`;
    const signature = Buffer.from(signatureB64 + "=".repeat((4 - (signatureB64.length % 4)) % 4), "base64");
    const algorithmsRecord: Record<string, string> = {
        RS256: "RSA-SHA256",
        RS384: "RSA-SHA384",
        RS512: "RSA-SHA512",
        ES256: "SHA256",
        ES384: "SHA384",
        ES512: "SHA512",
    };
    const cryptoAlg = algorithmsRecord[alg];
    if (!cryptoAlg) {
        throw new Error(`Unsupported algorithm: ${alg}`);
    }

    const isValid = verify(cryptoAlg, Buffer.from(signatureInput), publicKey, signature);
    if (!isValid) {
        throw new Error("JWT signature verification failed");
    }

    const payloadStr = Buffer.from(payloadB64 + "=".repeat((4 - (payloadB64.length % 4)) % 4), "base64").toString();
    const payload = JSON.parse(payloadStr) as T;

    const now = Math.floor(Date.now() / 1000);

    if (payload.exp !== undefined && typeof payload.exp === "number") {
        if (now >= payload.exp) {
            throw new Error("JWT expired");
        }
    }

    if (payload.nbf !== undefined && typeof payload.nbf === "number") {
        if (now < payload.nbf) {
            throw new Error("JWT not valid yet (nbf)");
        }
    }

    if (payload.iat !== undefined && typeof payload.iat === "number") {
        if (now < payload.iat) {
            throw new Error("JWT issued in the future");
        }
    }

    return payload as T;
}

function generatePublicKey(jwk: JWK, _alg: string) {
    if (jwk.kty !== "RSA") {
        throw new Error("Unsupported key type");
    }
    if (!jwk.n || !jwk.e) {
        throw new Error("Missing RSA key parameters");
    }

    const modulus = base64urlToBase64(jwk.n);
    const exponent = base64urlToBase64(jwk.e);
    const keyInput = {
        key: {
            kty: "RSA",
            kid: jwk.kid,
            n: modulus,
            e: exponent,
        },
        format: "jwk",
    };
    // TODO: Update node types
    // The error originates from the fact that we are using an older version of types/node - 14
    // The API has changed in version 16 (the minimum version that we support)
    // @ts-expect-error TS(2345) - Types of property 'key' are incompatible.
    return createPublicKey(keyInput);
}

function base64urlToBase64(base64url: string): string {
    let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");

    while (base64.length % 4 !== 0) {
        base64 += "=";
    }

    return base64;
}

export function clearJWKSCache(): void {
    jwksCache.clearCache();
}

export function setJWKSCacheDuration(durationMs: number): void {
    jwksCache.setCacheDuration(durationMs);
}
