import type { LoadedSessionContext } from "../recipe/session/types";
import type { AppInfoUserInput } from "../types";
export declare type CookiesStore = {
    get: (name: string) => {
        value: string;
    };
    set: (name: string, value: string) => void;
};
export declare type CookiesObject = Record<string, string>;
export declare type GetServerSidePropsRedirect = {
    redirect: {
        destination: string;
        permanent: boolean;
    };
};
export declare type SSRSessionContext = Omit<LoadedSessionContext, "invalidClaims">;
export declare type GetServerSidePropsReturnValue =
    | {
          props: {
              session: SSRSessionContext;
          };
      }
    | GetServerSidePropsRedirect;
export declare function isCookiesStore(obj: unknown): obj is CookiesStore;
export declare type SuperTokensNextjsConfig = {
    appInfo: AppInfoUserInput;
    enableDebugLogs?: boolean;
};
export declare type FrontTokenPayload = {
    uid: string;
    ate: number;
    up: Record<string, unknown> & {
        iat: number;
        exp: number;
        sub: string;
        tId: string;
        rsub: string;
        sessionHandle: string;
        refrehTokenHash1: string;
        parentRefereshTokenHash1: string | null;
        antiCsrfToken: string | null;
        iss: string;
    };
};
export interface ParsableRequest {
    url: string;
    method: string;
    headers: Headers;
    formData: () => Promise<FormData>;
    json: () => Promise<any>;
}
export declare type ApiRequestMiddleware<Req extends ParsableRequest = Request, Res extends Response = Response> = (
    req: Req
) => Promise<Res>;
export interface JWK {
    kty: string;
    use?: string;
    key_ops?: string[];
    alg?: string;
    kid?: string;
    x5u?: string;
    x5c?: string[];
    x5t?: string;
    "x5t#S256"?: string;
    n?: string;
    e?: string;
    crv?: string;
    x?: string;
    y?: string;
}
export interface JWKS {
    keys: JWK[];
}
