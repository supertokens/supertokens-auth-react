import { RecipeInterface, SignInAndUpInput, SignInAndUpOutput } from "../types";
import { NormalisedAppInfo } from "../../../types";
import EmailPasswordRecipeImplementation from "../../emailpassword/recipeImplementation";
import ThirdPartyRecipeImplementation from "../../thirdparty/recipeImplementation";
import { NormalisedConfig as EPConfig } from "../../emailpassword/types";
import { NormalisedConfig as TPConfig } from "../../thirdparty/types";

export default class RecipeImplementation implements RecipeInterface {
    emailpasswordImpl: EmailPasswordRecipeImplementation;
    thirdPartyImpl: ThirdPartyRecipeImplementation;

    constructor(recipeId: string, appInfo: NormalisedAppInfo) {
        this.emailpasswordImpl = new EmailPasswordRecipeImplementation(recipeId, appInfo);
        this.thirdPartyImpl = new ThirdPartyRecipeImplementation(recipeId, appInfo);
    }

    submitNewPassword = async (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        token: string;
        config: EPConfig;
    }) => {
        return this.emailpasswordImpl.submitNewPassword(input);
    };

    sendPasswordResetEmail = async (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: EPConfig;
    }) => {
        return this.emailpasswordImpl.sendPasswordResetEmail(input);
    };

    doesEmailExist = async (input: { email: string; config: EPConfig }) => {
        return this.emailpasswordImpl.doesEmailExist(input);
    };

    getOAuthAuthorisationURL = async (input: { thirdPartyId: string; config: TPConfig }) => {
        return this.thirdPartyImpl.getOAuthAuthorisationURL(input);
    };

    signInAndUp = async (input: SignInAndUpInput): Promise<SignInAndUpOutput> => {
        if (input.type === "emailpassword") {
            if (input.isSignIn) {
                const response = await this.emailpasswordImpl.signIn(input);
                if (response.status === "OK") {
                    return {
                        ...response,
                        createdNewUser: false,
                        type: "emailpassword",
                    };
                } else {
                    return {
                        ...response,
                        type: "emailpassword",
                    };
                }
            } else {
                const response = await this.emailpasswordImpl.signUp(input);
                if (response.status === "OK") {
                    return {
                        ...response,
                        createdNewUser: true,
                        type: "emailpassword",
                    };
                } else {
                    return {
                        ...response,
                        type: "emailpassword",
                    };
                }
            }
        } else {
            const response = await this.thirdPartyImpl.signInAndUp(input);
            return {
                ...response,
                type: "thirdparty",
            };
        }
    };
}
