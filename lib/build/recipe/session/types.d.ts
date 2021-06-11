import { RecipeInterface } from "supertokens-website";
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
    onHandleEvent?: (context: { action: "SIGN_OUT" | "REFRESH_SESSION" | "UNAUTHORISED" }) => void;
    override?: {
        functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
    };
};
export declare type SessionContextType = {
    doesSessionExist: boolean;
    userId: string;
    jwtPayload: any;
};
