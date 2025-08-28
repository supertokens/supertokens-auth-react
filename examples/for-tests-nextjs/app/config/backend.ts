import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import SessionNode from "supertokens-node/recipe/session";
import Dashboard from "supertokens-node/recipe/dashboard";
import { appInfo } from "./appInfo";
import { TypeInput } from "supertokens-node/types";
import SuperTokens from "supertokens-node";

export function getCoreUrl() {
    const host = process.env?.SUPERTOKENS_CORE_HOST ?? "localhost";
    const port = process.env?.SUPERTOKENS_CORE_PORT ?? "3567";

    const coreUrl = `http://${host}:${port}`;

    return coreUrl;
}

export let backendConfig = (): TypeInput => {
    return {
        debug: true,
        supertokens: {
            connectionURI: getCoreUrl(),
        },
        appInfo,
        recipeList: [
            EmailPasswordNode.init(),
            SessionNode.init({
                // getTokenTransferMethod: () => "header",
            }),
            Dashboard.init(),
        ],
        isInServerlessEnv: true,
        framework: "custom",
    };
};

let initialized = false;
export function ensureSuperTokensInit() {
    if (!initialized) {
        SuperTokens.init(backendConfig());
        initialized = true;
    }
}
