/// <reference types="react" />
import type { SignInAndUpThemeProps } from "../../../types";
export declare const ThirdPartySignInAndUpProvidersForm: React.FC<SignInAndUpThemeProps>;
export declare const ProvidersForm: import("react").ComponentType<
    import("../../../../../types").AuthComponentProps & {
        providers: Pick<import("../../../providers").default, "id" | "getButton">[];
        recipeImplementation: import("../../../../../types").WebJSRecipeInterface<
            typeof import("supertokens-web-js/lib/build/recipe/thirdparty")
        >;
        config: import("../../../types").NormalisedConfig;
    } & {
        children?: import("react").ReactNode;
    }
>;
