import SuperTokens from "../lib/ts/superTokens";
import SessionRecipe from "../lib/ts/recipe/session/recipe";
import Session from "../lib/ts/recipe/session";
import Passwordless, { getLoginAttemptInfo } from "../lib/ts/recipe/passwordless";
import PasswordlessRecipe from "../lib/ts/recipe/passwordless/recipe";
import EmailPassword from "../lib/ts/recipe/emailpassword";
import EmailPasswordRecipe from "../lib/ts/recipe/emailpassword/recipe";
import ThirdParty from "../lib/ts/recipe/thirdparty";
import ThirdPartyRecipe from "../lib/ts/recipe/thirdparty/recipe";
import ThirdPartyEmailPassword from "../lib/ts/recipe/thirdpartyemailpassword";
import ThirdPartyEmailPasswordRecipe from "../lib/ts/recipe/thirdpartyemailpassword/recipe";
import ThirdPartyPasswordless from "../lib/ts/recipe/thirdpartypasswordless";
import ThirdPartyPasswordlessRecipe from "../lib/ts/recipe/thirdpartypasswordless/recipe";
import MultiFactorAuth from "../lib/ts/recipe/multifactorauth";
import MultiFactorAuthRecipe from "../lib/ts/recipe/multifactorauth/recipe";
import MultiTenancy from "../lib/ts/recipe/multitenancy";
import MultiTenancyRecipe from "../lib/ts/recipe/multitenancy/recipe";
import SessionRecipeWebJS from "supertokens-web-js/lib/build/recipe/session/recipe";
import PasswordlessRecipeWebJS from "supertokens-web-js/lib/build/recipe/passwordless/recipe";
import EmailPasswordRecipeWebJS from "supertokens-web-js/lib/build/recipe/emailpassword/recipe";
import ThirdPartyRecipeWebJS from "supertokens-web-js/lib/build/recipe/thirdparty/recipe";
import ThirdPartyEmailPasswordRecipeWebJS from "supertokens-web-js/lib/build/recipe/thirdpartyemailpassword/recipe";
import ThirdPartyPasswordlessRecipeWebJS from "supertokens-web-js/lib/build/recipe/thirdpartypasswordless/recipe";
import MultiFactorAuthRecipeWebJS from "supertokens-web-js/lib/build/recipe/multifactorauth/recipe";
import MultiTenancyRecipeWebJS from "supertokens-web-js/lib/build/recipe/multitenancy/recipe";
import { RecipeInitResult } from "../lib/ts/types";
import Provider from "../lib/ts/recipe/thirdparty/providers";
import { ThirdPartyPasswordlessPreBuiltUI } from "../lib/ts/recipe/thirdpartypasswordless/prebuiltui";
import { ThirdPartyEmailPasswordPreBuiltUI } from "../lib/ts/recipe/thirdpartyemailpassword/prebuiltui";
import { ThirdPartyPreBuiltUI } from "../lib/ts/recipe/thirdparty/prebuiltui";
import { EmailPasswordPreBuiltUI } from "../lib/ts/recipe/emailpassword/prebuiltui";
import { PasswordlessPreBuiltUI } from "../lib/ts/recipe/passwordless/prebuiltui";
import { MultiFactorAuthPreBuiltUI } from "../lib/ts/recipe/multifactorauth/prebuiltui";
import SuperTokensWebJS from "supertokens-web-js/lib/build/supertokens";
import { AdditionalLoginAttemptInfoProperties, LoginAttemptInfo } from "../lib/ts/recipe/passwordless/types";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

export function withFetchResponse<T>(resp: T): T & { fetchResponse: Response } {
    return resp as any;
}

export function resetAndInitST(
    recipeList?: any[],
    usesDynamicLoginMethods?: boolean,
    { path, query, hash } = { path: "/auth", query: "", hash: "" }
) {
    (WindowHandlerReference as any).instance = undefined;
    SessionRecipe.reset();
    PasswordlessRecipe.reset();
    EmailPasswordRecipe.reset();
    ThirdPartyRecipe.reset();
    ThirdPartyEmailPasswordRecipe.reset();
    ThirdPartyPasswordlessRecipe.reset();
    MultiFactorAuthRecipe.reset();
    MultiTenancyRecipe.reset();
    SuperTokens.reset();

    SessionRecipeWebJS.reset();
    PasswordlessRecipeWebJS.reset();
    EmailPasswordRecipeWebJS.reset();
    ThirdPartyRecipeWebJS.reset();
    ThirdPartyEmailPasswordRecipeWebJS.reset();
    ThirdPartyPasswordlessRecipeWebJS.reset();
    MultiFactorAuthRecipeWebJS.reset();
    MultiTenancyRecipeWebJS.reset();
    SuperTokensWebJS.reset();

    SuperTokens.init({
        usesDynamicLoginMethods,
        appInfo: {
            apiDomain: "http://localhost:3000",
            appName: "Storybook test",
            websiteDomain: "http://localhost:6006",
        },
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

export type FirstFactor = "otp-phone" | "otp-email" | "link-phone" | "link-email" | "thirdparty" | "emailpassword";
export type ProviderId = "google" | "github";

export type AuthPageConf = {
    usesDynamicLoginMethods: boolean;
    emailpassword: {
        initialized: boolean;
        disableDefaultUISignInUp: boolean;
        defaultToSignUp: boolean;
    };
    thirdparty: {
        initialized: boolean;
        disableDefaultUISignInUp: boolean;
        providers: ProviderId[];
    };
    passwordless: {
        initialized: boolean;
        contactMethod: "PHONE" | "EMAIL" | "EMAIL_OR_PHONE";
        disableDefaultUISignInUp: boolean;
    };
    thirdpartyemailpassword: {
        initialized: boolean;
        disableDefaultUISignInUp: boolean;
        providers: ProviderId[] | undefined;
        disableEmailPassword: boolean;
    };
    thirdpartypasswordless: {
        initialized: boolean;
        disableDefaultUISignInUp: boolean;
        providers: ProviderId[] | undefined;
        contactMethod: "PHONE" | "EMAIL" | "EMAIL_OR_PHONE";
        disablePasswordless: boolean;
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
};

export function buildInit(args: AuthPageConf, funcOverrides: any) {
    const recipeList: RecipeInitResult<any, any, any, any>[] = [Session.init()];
    const prebuiltUIs: any[] = [];
    if (args.emailpassword.initialized) {
        recipeList.push(
            EmailPassword.init({
                useShadowDom: false,
                signInAndUpFeature: {
                    disableDefaultUI: args.emailpassword.disableDefaultUISignInUp,
                    defaultToSignUp: args.emailpassword.defaultToSignUp,
                },
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
                useShadowDom: false,
                signInAndUpFeature: {
                    providers: buildProviderArray(args.thirdparty.providers),
                    disableDefaultUI: args.thirdparty.disableDefaultUISignInUp,
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
                useShadowDom: false,
                contactMethod: args.passwordless.contactMethod,
                signInUpFeature: {
                    disableDefaultUI: args.passwordless.disableDefaultUISignInUp,
                },
                override: {
                    functions: funcOverrides?.passwordless || ((i) => i),
                },
            })
        );
        prebuiltUIs.push(PasswordlessPreBuiltUI);
    }
    if (args.thirdpartyemailpassword.initialized) {
        recipeList.push(
            ThirdPartyEmailPassword.init({
                useShadowDom: false,
                disableEmailPassword: args.thirdpartyemailpassword.disableEmailPassword,
                signInAndUpFeature: {
                    providers: buildProviderArray(args.thirdpartyemailpassword.providers),
                    disableDefaultUI: args.thirdpartyemailpassword.disableDefaultUISignInUp,
                },
                override: {
                    functions: funcOverrides?.thirdpartyemailpassword || ((i) => i),
                },
            })
        );
        prebuiltUIs.push(ThirdPartyEmailPasswordPreBuiltUI);
    }
    if (args.thirdpartypasswordless.initialized) {
        recipeList.push(
            ThirdPartyPasswordless.init({
                useShadowDom: false,
                contactMethod: args.thirdpartypasswordless.contactMethod,
                disablePasswordless: args.thirdpartypasswordless.disablePasswordless,
                signInUpFeature: {
                    providers: buildProviderArray(args.thirdpartypasswordless.providers),
                    disableDefaultUI: args.thirdpartypasswordless.disableDefaultUISignInUp,
                },
                override: {
                    functions: funcOverrides?.thirdpartypasswordless || ((i) => i),
                },
            })
        );
        prebuiltUIs.push(ThirdPartyPasswordlessPreBuiltUI);
    }
    if (args.multifactorauth.initialized) {
        recipeList.push(
            MultiFactorAuth.init({
                useShadowDom: false,
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
                useShadowDom: false,
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

    return {
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
    });
