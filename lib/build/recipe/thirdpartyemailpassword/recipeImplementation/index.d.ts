import { RecipeInterface, SignInAndUpInput, SignInAndUpOutput } from "../types";
import { NormalisedAppInfo } from "../../../types";
import EmailPasswordRecipeImplementation from "../../emailpassword/recipeImplementation";
import ThirdPartyRecipeImplementation from "../../thirdparty/recipeImplementation";
import { NormalisedConfig as EPConfig } from "../../emailpassword/types";
import { NormalisedConfig as TPConfig } from "../../thirdparty/types";
export default class RecipeImplementation implements RecipeInterface {
    emailpasswordImpl: EmailPasswordRecipeImplementation;
    thirdPartyImpl: ThirdPartyRecipeImplementation;
    constructor(recipeId: string, appInfo: NormalisedAppInfo);
    submitNewPassword: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        token: string;
        config: EPConfig;
    }) => Promise<
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
    sendPasswordResetEmail: (input: {
        formFields: {
            id: string;
            value: string;
        }[];
        config: EPConfig;
    }) => Promise<
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
    doesEmailExist: (input: { email: string; config: EPConfig }) => Promise<boolean>;
    getOAuthAuthorisationURL: (input: { thirdPartyId: string; config: TPConfig }) => Promise<string>;
    signInAndUp: (input: SignInAndUpInput) => Promise<SignInAndUpOutput>;
}
