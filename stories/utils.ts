import SuperTokens from "../lib/ts/superTokens";
import SessionRecipe from "../lib/ts/recipe/session/recipe";
import Session from "../lib/ts/recipe/session";
import Passwordless from "../lib/ts/recipe/passwordless";
import Webauthn from "../lib/ts/recipe/webauthn";
import PasswordlessRecipe from "../lib/ts/recipe/passwordless/recipe";
import EmailPassword from "../lib/ts/recipe/emailpassword";
import EmailPasswordRecipe from "../lib/ts/recipe/emailpassword/recipe";
import ThirdParty from "../lib/ts/recipe/thirdparty";
import ThirdPartyRecipe from "../lib/ts/recipe/thirdparty/recipe";
import MultiFactorAuth from "../lib/ts/recipe/multifactorauth";
import MultiFactorAuthRecipe from "../lib/ts/recipe/multifactorauth/recipe";
import MultiTenancy from "../lib/ts/recipe/multitenancy";
import MultiTenancyRecipe from "../lib/ts/recipe/multitenancy/recipe";
import EmailVerificationRecipe from "../lib/ts/recipe/emailverification/recipe";
import SessionRecipeWebJS from "supertokens-web-js/lib/build/recipe/session/recipe";
import PasswordlessRecipeWebJS from "supertokens-web-js/lib/build/recipe/passwordless/recipe";
import EmailPasswordRecipeWebJS from "supertokens-web-js/lib/build/recipe/emailpassword/recipe";
import ThirdPartyRecipeWebJS from "supertokens-web-js/lib/build/recipe/thirdparty/recipe";
import MultiFactorAuthRecipeWebJS from "supertokens-web-js/lib/build/recipe/multifactorauth/recipe";
import MultiTenancyRecipeWebJS from "supertokens-web-js/lib/build/recipe/multitenancy/recipe";
import EmailVerificationRecipeWebJS from "supertokens-web-js/lib/build/recipe/emailverification/recipe";
import { RecipeInitResult } from "../lib/ts/types";
import Provider from "../lib/ts/recipe/thirdparty/providers";
import { ThirdPartyPreBuiltUI } from "../lib/ts/recipe/thirdparty/prebuiltui";
import { EmailPasswordPreBuiltUI } from "../lib/ts/recipe/emailpassword/prebuiltui";
import { PasswordlessPreBuiltUI } from "../lib/ts/recipe/passwordless/prebuiltui";
import { WebauthnPreBuiltUI } from "../lib/ts/recipe/webauthn/prebuiltui";
import { MultiFactorAuthPreBuiltUI } from "../lib/ts/recipe/multifactorauth/prebuiltui";
import SuperTokensWebJS from "supertokens-web-js/lib/build/supertokens";
import { AdditionalLoginAttemptInfoProperties, LoginAttemptInfo } from "../lib/ts/recipe/passwordless/types";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";
import { PostSuperTokensInitCallbacks } from "supertokens-web-js/utils/postSuperTokensInitCallbacks";
import OAuth2Provider from "../lib/ts/recipe/oauth2provider/recipe";

export function withFetchResponse<T>(resp: T): T & { fetchResponse: Response } {
    return resp as any;
}

export function resetAndInitST(
    recipeList?: any[],
    usesDynamicLoginMethods?: boolean,
    defaultToSignUp?: boolean,
    rootStyle?: string,
    { path, query, hash } = { path: "/auth", query: "", hash: "" }
) {
    (WindowHandlerReference as any).instance = undefined;
    SessionRecipe.reset();
    PasswordlessRecipe.reset();
    EmailPasswordRecipe.reset();
    ThirdPartyRecipe.reset();
    MultiFactorAuthRecipe.reset();
    MultiTenancyRecipe.reset();
    EmailVerificationRecipe.reset();
    SuperTokens.reset();
    PostSuperTokensInitCallbacks.postInitCallbacks = [];

    SessionRecipeWebJS.reset();
    PasswordlessRecipeWebJS.reset();
    EmailPasswordRecipeWebJS.reset();
    ThirdPartyRecipeWebJS.reset();
    MultiFactorAuthRecipeWebJS.reset();
    MultiTenancyRecipeWebJS.reset();
    EmailVerificationRecipeWebJS.reset();
    SuperTokensWebJS.reset();

    // This resets supertokens-website
    if ("__supertokensOriginalFetch" in window) {
        (window as any).fetch = window.__supertokensOriginalFetch;
        window.__supertokensOriginalFetch = undefined;
    }

    SuperTokens.init({
        usesDynamicLoginMethods,
        useShadowDom: false,
        defaultToSignUp,
        appInfo: {
            apiDomain: "http://localhost:3000",
            appName: "Storybook test",
            websiteDomain: "http://localhost:6006",
        },
        style: rootStyle,
        recipeList: recipeList ?? [Session.init()],
        windowHandler: (oI) => ({
            ...oI,
            history: {
                ...oI.history,
                replaceState: console.warn,
            },
            location: {
                ...oI.location,
                assign: console.warn,
                setHref: console.warn,
                getHash: () => hash,
                getSearch: () => query,
                getPathName: () => path,
            },
        }),
    });
}

export type FirstFactor =
    | "otp-phone"
    | "otp-email"
    | "link-phone"
    | "link-email"
    | "thirdparty"
    | "emailpassword"
    | "webauthn";
export type ProviderId = "google" | "github";

export type AuthPageConf = {
    usesDynamicLoginMethods: boolean;
    defaultToSignUp: boolean;
    rootStyle: string;
    emailpassword: {
        initialized: boolean;
    };
    thirdparty: {
        initialized: boolean;
        providers: ProviderId[];
    };
    passwordless: {
        initialized: boolean;
        contactMethod: "PHONE" | "EMAIL" | "EMAIL_OR_PHONE";
        defaultToEmail: boolean;
    };
    multifactorauth: {
        initialized: boolean;
        firstFactors: FirstFactor[] | undefined;
        disableDefaultUI: boolean;
    };
    multitenancy: {
        initialized: boolean;
        firstFactors: FirstFactor[];
        providers: ProviderId[];
    };
    oauth2: {
        initialized: boolean;
        clientName: string;
        logoUri: string;
        clientUri: string;
    };
    webauthn: {
        initialized: boolean;
    };
};

export function buildInit(args: AuthPageConf, funcOverrides: any) {
    const recipeList: RecipeInitResult<any, any, any, any>[] = [Session.init()];
    const prebuiltUIs: any[] = [];
    if (args.emailpassword.initialized) {
        recipeList.push(
            EmailPassword.init({
                override: {
                    functions: funcOverrides?.emailpassword || ((i) => i),
                },
            })
        );
        prebuiltUIs.push(EmailPasswordPreBuiltUI);
    }
    if (args.thirdparty.initialized) {
        recipeList.push(
            ThirdParty.init({
                signInAndUpFeature: {
                    providers: buildProviderArray(args.thirdparty.providers),
                },
                override: {
                    functions: funcOverrides?.thirdparty || ((i) => i),
                },
            })
        );
        prebuiltUIs.push(ThirdPartyPreBuiltUI);
    }
    if (args.passwordless.initialized) {
        recipeList.push(
            Passwordless.init({
                contactMethod: args.passwordless.contactMethod,
                signInUpFeature: {
                    defaultToEmail: args.passwordless.defaultToEmail,
                },
                override: {
                    functions: funcOverrides?.passwordless || ((i) => i),
                },
            } as any)
        );
        prebuiltUIs.push(PasswordlessPreBuiltUI);
    }
    if (args.multifactorauth.initialized) {
        recipeList.push(
            MultiFactorAuth.init({
                firstFactors: args.multifactorauth.firstFactors,
                disableDefaultUI: args.multifactorauth.disableDefaultUI,
                override: {
                    functions: funcOverrides?.multifactorauth || ((i) => i),
                },
            })
        );
        prebuiltUIs.push(MultiFactorAuthPreBuiltUI);
    }
    if (args.multitenancy.initialized) {
        recipeList.push(
            MultiTenancy.init({
                override: {
                    functions: (oI) => ({
                        ...oI,
                        getLoginMethods: async () => {
                            return {
                                status: "OK",
                                firstFactors: args.multitenancy.firstFactors,
                                // The enable settings below are ignored.
                                emailPassword: {
                                    enabled: true,
                                },
                                passwordless: {
                                    enabled: true,
                                },
                                thirdParty: {
                                    enabled: true,
                                    providers: args.multitenancy.providers.map((id) => ({
                                        id,
                                        name: id,
                                    })),
                                },
                                fetchResponse: undefined as any,
                            };
                        },
                        ...(funcOverrides?.multitenancy ? funcOverrides?.multitenancy(oI) : {}),
                    }),
                },
            })
        );
    }

    if (args.oauth2.initialized) {
        recipeList.push(
            OAuth2Provider.init({
                override: {
                    functions: (oI) => ({
                        ...oI,
                        getLoginChallengeInfo: async () => {
                            return {
                                status: "OK",
                                info: {
                                    clientName: args.oauth2.clientName,
                                    logoUri: args.oauth2.logoUri || undefined,
                                    clientUri: args.oauth2.clientUri || undefined,
                                },
                                fetchResponse: undefined as any,
                            };
                        },
                    }),
                },
            }) as any
        );
    }

    if (args.webauthn.initialized) {
        recipeList.push(
            Webauthn.init({
                override: {
                    functions: funcOverrides?.webauthn || ((i) => i),
                },
            } as any)
        );
        prebuiltUIs.push(WebauthnPreBuiltUI);
    }

    return {
        useShadowDom: false,
        defaultToSignUp: args.defaultToSignUp,
        recipeList,
        prebuiltUIs,
    };
}

function buildProviderArray(confProviders: string[] | undefined) {
    let providers: Provider[] | undefined = undefined;
    if (confProviders) {
        providers = [];
        for (const p of confProviders) {
            switch (p) {
                case "google":
                    providers.push(ThirdParty.Google.init());
                    break;
                case "github":
                    providers.push(ThirdParty.Github.init());
                    break;
                default:
                    throw new Error("Unknown provider id");
            }
        }
    }
    return providers;
}

export function unflattenArgs(args: Record<string, any>): any {
    const ret: any = {};
    for (const key of Object.keys(args)) {
        let curr = ret;
        const sections = key.split(".");
        const lastKey = sections.pop();
        for (const ck of sections) {
            if (curr[ck] === undefined) {
                curr[ck] = {};
            }
            curr = curr[ck];
        }
        curr[lastKey!] = args[key];
    }
    return ret;
}

export const overridePWlessWithLoginAttempt =
    (info: LoginAttemptInfo & AdditionalLoginAttemptInfoProperties) => (oI: any) => ({
        ...oI,
        getLoginAttemptInfo: () => info,
        getPasswordlessLoginAttemptInfo: () => info, // Technically it's not right to have them both... but it works
    });
