import { RecipeInterface } from "supertokens-website";
import OverrideableBuilder from "supertokens-js-override";
export declare type RecipeEvent =
    | {
          action: "SIGN_OUT" | "REFRESH_SESSION" | "SESSION_CREATED";
      }
    | {
          action: "UNAUTHORISED";
          sessionExpiredOrRevoked: boolean;
      };
export declare type RecipeEventWithSessionContext = RecipeEvent & {
    sessionContext: SessionContextType;
};
export declare type InputType = {
    apiDomain?: string;
    apiBasePath?: string;
    sessionScope?: string;
    sessionExpiredStatusCode?: number;
    autoAddCredentials?: boolean;
    isInIframe?: boolean;
    cookieDomain?: string;
    preAPIHook?: (context: {
        action: "SIGN_OUT" | "REFRESH_SESSION";
        requestInit: RequestInit;
        url: string;
    }) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    onHandleEvent?: (event: RecipeEvent) => void;
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder?: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type SessionContextType = {
    doesSessionExist: boolean;
    userId: string;
    accessTokenPayload: any;
};
declare type Awaitable<T> = T | PromiseLike<T>;
export declare class BooleanGrant implements Grant {
    readonly checkAPI: (abortSignal: AbortSignal) => Awaitable<boolean>;
    readonly onFailedCheck: (
        context: {
            history: any;
        },
        abortSignal: AbortSignal
    ) => Awaitable<any>;
    key: string;
    constructor(
        name: string,
        checkAPI: (abortSignal: AbortSignal) => Awaitable<boolean>,
        onFailedCheck: (
            context: {
                history: any;
            },
            abortSignal: AbortSignal
        ) => Awaitable<any>
    );
    checkPayload(payload: any): boolean | undefined;
}
export declare type Grant = {
    checkAPI: (abortSignal: AbortSignal) => Awaitable<boolean>;
    checkPayload: (payload: any, abortSignal: AbortSignal) => Awaitable<boolean | undefined>;
    onFailedCheck: (
        context: {
            history: any;
        },
        abortSignal: AbortSignal
    ) => Awaitable<any>;
};
export {};
