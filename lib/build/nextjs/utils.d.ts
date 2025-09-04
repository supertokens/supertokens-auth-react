interface JWKSCacheConfig {
    cacheDurationMs?: number;
}
export declare function jwtVerify<T extends {
    exp?: number;
    nbf?: number;
    iat?: number;
}>(token: string, jwksUrl: string, config?: JWKSCacheConfig): Promise<T>;
export declare function clearJWKSCache(): void;
export {};
