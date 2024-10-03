import Provider from "./providers";
import type Recipe from "./recipe";
import type {
    NormalisedSignInAndUpFeatureConfig,
    NormalisedConfig,
    SignInAndUpFeatureUserInput,
    Config,
} from "./types";
import type { UserContext, WebJSRecipeInterface } from "../../types";
import type ThirdPartyWebJS from "supertokens-web-js/recipe/thirdparty";
export declare function normaliseThirdPartyConfig(config: Config | undefined): NormalisedConfig;
export declare function normaliseSignInAndUpFeature(
    config: SignInAndUpFeatureUserInput | undefined
): NormalisedSignInAndUpFeatureConfig;
export declare function matchRecipeIdUsingState(recipe: Recipe, userContext: UserContext): boolean;
export declare function redirectToThirdPartyLogin(input: {
    thirdPartyId: string;
    config: NormalisedConfig;
    userContext: UserContext;
    shouldTryLinkingWithSessionUser: boolean | undefined;
    recipeImplementation: WebJSRecipeInterface<typeof ThirdPartyWebJS>;
}): Promise<{
    status: "OK" | "ERROR";
}>;
export declare const mergeProviders: ({
    tenantProviders,
    clientProviders,
}: {
    tenantProviders?:
        | {
              id: string;
              name: string;
          }[]
        | undefined;
    clientProviders: Provider[];
}) => Pick<Provider, "id" | "getButton" | "getRedirectURL" | "getRedirectURIOnProviderDashboard" | "name">[];
