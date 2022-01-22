let Session = require("supertokens-node/recipe/session");

/**
 *
 * This affects email password sign ups only
 *
 * This file is copied from https://github.com/supertokens/supertokens-node/blob/master/lib/ts/recipe/emailpassword/api/implementation.ts#L129
 *
 * After copying the contents, we modify the API logic to disallow session creation.
 */

async function signUpPOST(input) {
    let { formFields, options } = input;
    let email = formFields.filter((f) => f.id === "email")[0].value;
    let password = formFields.filter((f) => f.id === "password")[0].value;

    let response = await options.recipeImplementation.signUp({ email, password });
    if (response.status === "EMAIL_ALREADY_EXISTS_ERROR") {
        return response;
    }
    let user = response.user;

    // we comment out creating a new session in this API...
    // await Session.createNewSession(options.res, user.id, {}, {});

    return {
        status: "OK",
        user,
    };
}

module.exports = { signUpPOST };
