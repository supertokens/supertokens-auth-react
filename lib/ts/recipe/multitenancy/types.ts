import type { UserInput as RecipeModuleUserInput } from "../recipeModule/types";
import type OverrideableBuilder from "supertokens-js-override";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/recipeModule/types";

export type PreAndPostAPIHookAction = "GET_LOGIN_METHODS";

export type UserInput = {
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
    getTenantID?: (input?: { userContext: any }) => Promise<string>;
} & RecipeModuleUserInput<any, PreAndPostAPIHookAction, any>;

export type NormalisedConfig = UserInput & {
    override: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};

export type GetLoginMethodsResponse = {
    status: "OK";
    emailPassword: {
        enabled: boolean;
    };
    passwordless: {
        enabled: boolean;
    };
    thirdParty: {
        enabled: boolean;
        providers: {
            id: string;
            name: string;
        }[];
    };
    fetchResponse: Response;
};

export type GetLoginMethodsResponseNormalized = {
    passwordless: {
        enabled: boolean;
    };
    emailpassword: {
        enabled: boolean;
    };
    thirdparty: {
        enabled: boolean;
        providers: {
            id: string;
            name: string;
        }[];
    };
};

export type RecipeInterface = {
    /**
     * Gets enabled login methods and their configuration
     *
     * @param tenantId (OPTIONAL) The identifier for the tenant.
     *
     * @param userContext (OPTIONAL) Refer to {@link TODO the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     *
     * @returns `{status: OK, emailpassword, passwordless, thirdParty}` if successful
     */
    getLoginMethods: (input: {
        tenantId?: string;
        options?: RecipeFunctionOptions;
        userContext: any;
    }) => Promise<GetLoginMethodsResponse>;
};
