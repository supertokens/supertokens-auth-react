import * as jose from "jose";
import type { CookiesObject, CookiesStore, GetServerSidePropsReturnValue, SuperTokensNextjsConfig } from "./types";
import type { LoadedSessionContext } from "../recipe/session/types";
declare type JWKSet = ReturnType<typeof jose.createRemoteJWKSet>;
export default class SuperTokensNextjsSSRAPIWrapper {
    static config: SuperTokensNextjsConfig;
    static jwks: JWKSet;
    static init(config: SuperTokensNextjsConfig): void;
    static getConfigOrThrow(): SuperTokensNextjsConfig;
    static getJWKS(): JWKSet;
    /**
     * Get the session state during SSR or redirect
     * The function is meant to be used inside Next.js components that make use of SSR.
     * @param cookies - The cookies store exposed by next/headers (await cookies())
     * @param redirect - The redirect function exposed by next/navigation
     * @returns The session context value or directly redirects the user to either the login page or the refresh API
     **/
    static getServerComponentSession(cookies: CookiesStore): Promise<LoadedSessionContext>;
    static getServerActionSession(cookies: CookiesStore): Promise<LoadedSessionContext | undefined>;
    /**
     * Get the session state inside props or redirect
     * The function is meant to be used inside getServerSideProps.
     * @param request - The request object available inside getServerSideProps ctx (ctx.req)
     * @returns The session context value or a redirects path to send the user to the refresh API or the login page
     **/
    static getServerSidePropsSession(request: Request & {
        cookies: CookiesObject;
    }): Promise<GetServerSidePropsReturnValue>;
}
export declare const init: typeof SuperTokensNextjsSSRAPIWrapper.init;
export declare const getServerComponentSession: typeof SuperTokensNextjsSSRAPIWrapper.getServerComponentSession;
export declare const getServerActionSession: typeof SuperTokensNextjsSSRAPIWrapper.getServerActionSession;
export declare const getServerSidePropsSession: typeof SuperTokensNextjsSSRAPIWrapper.getServerSidePropsSession;
export {};
