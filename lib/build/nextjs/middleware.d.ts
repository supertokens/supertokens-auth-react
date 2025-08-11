import type { ApiRequestMiddleware, SuperTokensNextjsConfig } from "./types";
declare type SuperTokensNextjsMiddlewareConfig = SuperTokensNextjsConfig & {
    apiRequestMiddleware?: ApiRequestMiddleware;
    isApiRequest?: (request: Request) => boolean;
};
export declare function superTokensMiddleware(config: SuperTokensNextjsMiddlewareConfig): (request: Request) => Promise<Response | void>;
export declare function refreshSession(request: Request): Promise<Response>;
export declare function revokeSession(request: Request): Promise<Response | void>;
export {};
