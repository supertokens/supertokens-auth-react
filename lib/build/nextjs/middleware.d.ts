import type { ApiRequestMiddleware, SuperTokensNextjsConfig } from "./types";
declare type SuperTokensNextjsMiddlewareConfig = SuperTokensNextjsConfig & {
    apiRequestMiddleware?: ApiRequestMiddleware;
    isApiRequest?: (request: Request) => boolean;
};
export default function superTokensMiddleware(
    config: SuperTokensNextjsMiddlewareConfig
): (request: Request) => Promise<Response | void>;
export {};
