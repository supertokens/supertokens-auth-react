import type { ApiRequestMiddleware, SuperTokensNextjsConfig } from "./types";
export declare function superTokensMiddleware(config: SuperTokensNextjsConfig, apiRequestMiddleware?: ApiRequestMiddleware): (request: Request) => Promise<Response | void>;
export declare function refreshSession(config: SuperTokensNextjsConfig, request: Request): Promise<Response>;
export declare function revokeSession(config: SuperTokensNextjsConfig, request: Request): Promise<Response | void>;
