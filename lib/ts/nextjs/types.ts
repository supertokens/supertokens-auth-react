import type { LoadedSessionContext } from "../recipe/session/types";
import type { AppInfoUserInput } from "../types";

export type CookiesStore = {
    get: (name: string) => { value: string };
    set: (name: string, value: string) => void;
};

export type HeadersStore = {
    get: (name: string) => string | null;
    set: (name: string, value: string) => void;
    getSetCookie: () => string[];
};

export type CookiesObject = Record<string, string>;
export type HeadersObject = Record<string, string>;

export type GetServerSidePropsRedirect = {
    redirect: { destination: string; permanent: boolean };
};

export type GetServerSidePropsReturnValue =
    | {
          props: { session: LoadedSessionContext };
      }
    | GetServerSidePropsRedirect;

export function isCookiesStore(obj: unknown): obj is CookiesStore {
    return typeof obj === "object" && obj !== null && "get" in obj && typeof (obj as CookiesStore).get === "function";
}

export type SuperTokensNextjsConfig = {
    appInfo: AppInfoUserInput;
    enableDebugLogs?: boolean;
};

export type SuperTokensRequestToken = {
    header: string | null;
    cookie: string | null;
};

export type FrontTokenPayload = {
    uid: string;
    ate: number;
    up: {
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
        "st-role": {
            v: string;
            t: number[];
        };
        "st-perm": {
            v: string[];
            t: number;
        };
    };
};

export interface ParsableRequest {
    url: string;
    method: string;
    headers: Headers;
    formData: () => Promise<FormData>;
    json: () => Promise<any>;
}

export type ApiRequestMiddleware<Req extends ParsableRequest = Request, Res extends Response = Response> = (
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
