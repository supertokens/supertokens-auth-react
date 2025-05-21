import type { CookiesObject, CookiesStore, GetServerSidePropsReturnValue, SuperTokensNextjsConfig } from "./types";
import type { LoadedSessionContext } from "../recipe/session/types";
export default class SuperTokensNextjsSSRAPIWrapper {
    static config: SuperTokensNextjsConfig;
    static init(config: SuperTokensNextjsConfig): void;
    static getConfigOrThrow(): SuperTokensNextjsConfig;
    static getJWKSUrl(): string;
    /**
     * Get the session state inside a server componet or redirect
     * The function is meant to be used inside Next.js server components
     * @param cookies - The cookies store exposed by next/headers (await cookies())
     * @returns The session context value or directly redirects the user to either the login page or the refresh API
     **/
    static getServerComponentSession(cookies: CookiesStore): Promise<LoadedSessionContext>;
    /**
     * Get the session state inside a server action
     * The function is meant to be used inside Next.js server actions
     * @param cookies - The cookies store exposed by next/headers (await cookies())
     * @returns An object that includes session context value and the status of the session ('valid' | 'expired' | 'invalid')
     * If the status is 'invalid' or 'expired' then the users should be considered as unauthenticated
     **/
    static getServerActionSession(cookies: CookiesStore): Promise<{
        session: LoadedSessionContext;
        status: "valid";
    } | {
        status: "expired" | "invalid";
        session: undefined;
    }>;
    /**
     * Ensures that a server action is called by an authenticated user
     * If the session does not exist/user is not authenticated, it will automatically redirect to the login page
     * The function is meant to run on the client, before calling the actual server action
     * @param action - A server action that will get called after the authentication state is confirmed
     * @returns The server action return value
     **/
    static confirmAuthenticationAndCallServerAction<T extends () => Promise<K>, K>(action: T): Promise<void | K>;
    /**
     * Get the session state or redirect
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
export declare const confirmAuthenticationAndCallServerAction: typeof SuperTokensNextjsSSRAPIWrapper.confirmAuthenticationAndCallServerAction;
