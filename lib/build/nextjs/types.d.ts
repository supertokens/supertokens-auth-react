import type { LoadedSessionContext } from "../recipe/session/types";
import type { AppInfoUserInput } from "../types";
export declare type CookiesStore = {
    get: (name: string) => {
        value: string;
    };
    set: (name: string, value: string) => void;
};
export declare type HeadersStore = {
    get: (name: string) => string | null;
    set: (name: string, value: string) => void;
    getSetCookie: () => string[];
};
export declare type CookiesObject = Record<string, string>;
export declare type HeadersObject = Record<string, string>;
export declare type GetServerSidePropsRedirect = {
    redirect: {
        destination: string;
        permanent: boolean;
    };
};
export declare type GetServerSidePropsReturnValue = {
    props: {
        session: LoadedSessionContext;
    };
} | GetServerSidePropsRedirect;
export declare function isCookiesStore(obj: unknown): obj is CookiesStore;
export declare type SuperTokensNextjsConfig = {
    appInfo: AppInfoUserInput;
    enableDebugLogs?: boolean;
};
export declare type SuperTokensRequestToken = {
    header: string | null;
    cookie: string | null;
};
export declare type AccessTokenPayload = {
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
export declare type WithSession = (req: Request, handler: (error: Error | undefined, session: (Record<string, unknown> & {
    getUserId: () => string;
}) | undefined) => Promise<Response>, options?: unknown, userContext?: Record<string, any>) => Promise<Response>;
