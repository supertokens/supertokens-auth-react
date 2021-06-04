import { RecipeInterface, Config } from "./types";
export default class RecipeImplementation implements RecipeInterface {
    constructor(config: Config);
    getUserId: () => Promise<string>;
    getJWTPayloadSecurely: () => Promise<any>;
    doesSessionExist: () => Promise<boolean>;
    signOut: () => Promise<void>;
    attachSessionToRequest: (context: { requestInit: RequestInit; url: string }) => Promise<{
        url: string;
        requestInit: RequestInit;
    }>;
    saveSessionFromResponse: (_: { requestInit: RequestInit; url: string; response: Response }) => Promise<void>;
}
