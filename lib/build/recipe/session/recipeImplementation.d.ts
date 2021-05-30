import { RecipeInterface, Config } from "./types";
export default class RecipeImplementation implements RecipeInterface {
    constructor(config: Config);
    getUserId: () => Promise<string>;
    getJWTPayloadSecurely: () => Promise<any>;
    doesSessionExist: () => Promise<boolean>;
    signOut: () => Promise<void>;
}
