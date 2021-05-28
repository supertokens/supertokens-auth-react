import { RecipeInterface } from "../../emailpassword/types";
import { RecipeInterface as TPEPRecipeInterface } from "../";

export default function getImpl(oI: TPEPRecipeInterface): RecipeInterface {
    return {
        doesEmailExist: oI.doesEmailExist,
        sendPasswordResetEmail: oI.sendPasswordResetEmail,
        signIn: async (formFields, options) => {
            const response = await oI.signInAndUp({
                type: "emailpassword",
                formFields,
                isSignIn: true,
                options,
            });
            if (response.type === "emailpassword") {
                if (response.status === "OK") {
                    return {
                        status: "OK",
                        user: response.user,
                    };
                } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
                    return {
                        status: "WRONG_CREDENTIALS_ERROR",
                    };
                } else {
                    return {
                        status: "FIELD_ERROR",
                        formFields: response.formFields,
                    };
                }
            } else {
                throw Error("Should never come here");
            }
        },
        signUp: async (formFields, options) => {
            const response = await oI.signInAndUp({
                type: "emailpassword",
                formFields,
                isSignIn: false,
                options,
            });
            if (response.type === "emailpassword") {
                if (response.status === "OK") {
                    return {
                        status: "OK",
                        user: response.user,
                    };
                } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
                    throw Error("Should never come here");
                } else {
                    return {
                        status: "FIELD_ERROR",
                        formFields: response.formFields,
                    };
                }
            } else {
                throw Error("Should never come here");
            }
        },
        submitNewPassword: oI.submitNewPassword,
    };
}
