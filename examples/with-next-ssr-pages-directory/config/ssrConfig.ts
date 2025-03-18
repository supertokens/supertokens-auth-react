import { appInfo } from "./appInfo";
import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types";

export const ssrConfig = (): SuperTokensConfig => {
    return {
        appInfo,
        enableDebugLogs: true,
        recipeList: [],
    };
};
