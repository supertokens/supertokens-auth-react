import { RecipeInterface, SignInAndUpInput, SignInAndUpOutput, EPFunctionOptions, TPFunctionOptions } from "../types";
import { NormalisedAppInfo } from "../../../types";
import EmailPasswordRecipeImplementation from "../../emailpassword/recipeImplementation";
import ThirdPartyRecipeImplementation from "../../thirdparty/recipeImplementation";

export default class RecipeImplementation implements RecipeInterface {
    emailpasswordImpl: EmailPasswordRecipeImplementation;
    thirdPartyImpl: ThirdPartyRecipeImplementation;

    constructor(recipeId: string, appInfo: NormalisedAppInfo) {
        this.emailpasswordImpl = new EmailPasswordRecipeImplementation(recipeId, appInfo);
        this.thirdPartyImpl = new ThirdPartyRecipeImplementation(recipeId, appInfo);
    }

    submitNewPassword = async (
        formFields: {
            id: string;
            value: string;
        }[],
        token: string,
        options: EPFunctionOptions
    ) => {
        return this.emailpasswordImpl.submitNewPassword(formFields, token, options);
    };

    sendPasswordResetEmail = async (
        formFields: {
            id: string;
            value: string;
        }[],
        options: EPFunctionOptions
    ) => {
        return this.emailpasswordImpl.sendPasswordResetEmail(formFields, options);
    };

    doesEmailExist = async (email: string, options: EPFunctionOptions) => {
        return this.emailpasswordImpl.doesEmailExist(email, options);
    };

    getOAuthAuthorisationURL = async (thirdPartyId: string, options: TPFunctionOptions) => {
        return this.thirdPartyImpl.getOAuthAuthorisationURL(thirdPartyId, options);
    };

    signInAndUp = async (input: SignInAndUpInput): Promise<SignInAndUpOutput> => {
        if (input.type === "emailpassword") {
            if (input.isSignIn) {
                const response = await this.emailpasswordImpl.signIn(input.formFields, input.options);
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
                const response = await this.emailpasswordImpl.signUp(input.formFields, input.options);
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
            const response = await this.thirdPartyImpl.signInAndUp(
                input.thirdPartyId,
                input.code,
                input.redirectURI,
                input.options
            );
            return {
                ...response,
                type: "thirdparty",
            };
        }
    };
}
