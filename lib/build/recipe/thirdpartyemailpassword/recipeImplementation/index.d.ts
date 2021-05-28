import { RecipeInterface, SignInAndUpInput, SignInAndUpOutput, EPFunctionOptions, TPFunctionOptions } from "../types";
import { NormalisedAppInfo } from "../../../types";
import EmailPasswordRecipeImplementation from "../../emailpassword/recipeImplementation";
import ThirdPartyRecipeImplementation from "../../thirdparty/recipeImplementation";
export default class RecipeImplementation implements RecipeInterface {
    emailpasswordImpl: EmailPasswordRecipeImplementation;
    thirdPartyImpl: ThirdPartyRecipeImplementation;
    constructor(recipeId: string, appInfo: NormalisedAppInfo);
    submitNewPassword: (
        formFields: {
            id: string;
            value: string;
        }[],
        token: string,
        options: EPFunctionOptions
    ) => Promise<
        | {
              status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
          }
    >;
    sendPasswordResetEmail: (
        formFields: {
            id: string;
            value: string;
        }[],
        options: EPFunctionOptions
    ) => Promise<
        | {
              status: "OK";
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
          }
    >;
    doesEmailExist: (email: string, options: EPFunctionOptions) => Promise<boolean>;
    getOAuthAuthorisationURL: (thirdPartyId: string, options: TPFunctionOptions) => Promise<string>;
    signInAndUp: (input: SignInAndUpInput) => Promise<SignInAndUpOutput>;
}
