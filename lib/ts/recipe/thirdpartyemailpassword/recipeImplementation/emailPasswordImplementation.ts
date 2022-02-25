import { RecipeInterface } from "../../emailpassword/types";
import { RecipeInterface as TPEPRecipeInterface } from "../";

export default function getImpl(oI: TPEPRecipeInterface): RecipeInterface {
    return {
        doesEmailExist: oI.doesEmailExist.bind(oI),
        sendPasswordResetEmail: oI.sendPasswordResetEmail.bind(oI),
        getSubmitPasswordTokenFromURL: oI.getSubmitPasswordTokenFromURL.bind(oI),
        signIn: async function (input) {
            const response = await oI.signInAndUp({
                type: "emailpassword",
                isSignIn: true,
                ...input,
            });
            if (response.type === "emailpassword") {
                if (response.status === "OK") {
                    return {
                        status: "OK",
                        user: response.user,
                        // TODO NEMI: This is temporary and will be fied when TPEP is implemented
                        fetchResponse: {} as any,
                    };
                } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
                    return {
                        status: "WRONG_CREDENTIALS_ERROR",
                        // TODO NEMI: This is temporary and will be fied when TPEP is implemented
                        fetchResponse: {} as any,
                    };
                } else {
                    return {
                        status: "FIELD_ERROR",
                        formFields: response.formFields,
                        // TODO NEMI: This is temporary and will be fied when TPEP is implemented
                        fetchResponse: {} as any,
                    };
                }
            } else {
                throw Error("Should never come here");
            }
        },
        signUp: async function (input) {
            const response = await oI.signInAndUp({
                type: "emailpassword",
                isSignIn: false,
                ...input,
            });
            if (response.type === "emailpassword") {
                if (response.status === "OK") {
                    return {
                        status: "OK",
                        user: response.user,
                        // TODO NEMI: This is temporary and will be fied when TPEP is implemented
                        fetchResponse: {} as any,
                    };
                } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
                    throw Error("Should never come here");
                } else {
                    return {
                        status: "FIELD_ERROR",
                        formFields: response.formFields,
                        // TODO NEMI: This is temporary and will be fied when TPEP is implemented
                        fetchResponse: {} as any,
                    };
                }
            } else {
                throw Error("Should never come here");
            }
        },
        submitNewPassword: oI.submitNewPassword.bind(oI),
    };
}
