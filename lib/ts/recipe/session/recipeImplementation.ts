import { RecipeInterface, Config } from "./types";
import sessionSdk from "supertokens-website";

export default class RecipeImplementation implements RecipeInterface {
    constructor(config: Config) {
        // TODO: We should initialise the above SDK only if the user
        // is using our session implementation - since it adds fetch interceptors on init.

        let usersHeadersForRefreshAPI = {};
        if (config.refreshAPICustomHeaders !== undefined) {
            usersHeadersForRefreshAPI = config.refreshAPICustomHeaders;
        }
        let usersHeadersForSignoutAPI = {};
        if (config.signoutAPICustomHeaders !== undefined) {
            usersHeadersForSignoutAPI = config.signoutAPICustomHeaders;
        }
        sessionSdk.init({
            sessionScope:
                config.sessionScope === undefined
                    ? undefined
                    : {
                          scope: config.sessionScope,
                          authDomain: config.appInfo.websiteDomain.getAsStringDangerous(),
                      },
            refreshAPICustomHeaders: {
                rid: config.recipeId,
                ...usersHeadersForRefreshAPI,
            },
            signoutAPICustomHeaders: {
                rid: config.recipeId,
                ...usersHeadersForSignoutAPI,
            },
            autoAddCredentials: config.autoAddCredentials,
            sessionExpiredStatusCode: config.sessionExpiredStatusCode,
            apiDomain: config.appInfo.apiDomain.getAsStringDangerous(),
            apiBasePath: config.appInfo.apiBasePath.getAsStringDangerous(),
            isInIframe: config.isInIframe,
        });
    }

    getUserId = (): Promise<string> => {
        return sessionSdk.getUserId();
    };

    getJWTPayloadSecurely = (): Promise<any> => {
        return sessionSdk.getJWTPayloadSecurely();
    };

    doesSessionExist = (): Promise<boolean> => {
        return sessionSdk.doesSessionExist();
    };

    signOut = (): Promise<void> => {
        return sessionSdk.signOut();
    };
}
