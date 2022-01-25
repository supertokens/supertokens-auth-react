let Session = require("supertokens-node/recipe/session");
let axios = require("axios");
let qs = require("qs");

/**
 *
 * This file is copied from https://github.com/supertokens/supertokens-node/blob/master/lib/ts/recipe/thirdparty/api/implementation.ts#L62
 *
 * After copying the contents, we modify the API logic to disallow sign ups
 * To see the custom logic, search for "CUSTOM LOGIC BELOW"
 */

async function signInUpPOST(input) {
    let { provider, code, options, redirectURI, authCodeResponse } = input;
    let userInfo;
    let accessTokenAPIResponse;

    {
        let providerInfo = provider.get(undefined, undefined);
        if (isUsingDevelopmentClientId(providerInfo.getClientId())) {
            redirectURI = DEV_OAUTH_REDIRECT_URL;
        } else if (providerInfo.getRedirectURI !== undefined) {
            // we overwrite the redirectURI provided by the frontend
            // since the backend wants to take charge of setting this.
            redirectURI = providerInfo.getRedirectURI();
        }
    }

    let providerInfo = provider.get(redirectURI, code);

    if (authCodeResponse !== undefined) {
        accessTokenAPIResponse = {
            data: authCodeResponse,
        };
    } else {
        // we should use code to get the authCodeResponse body
        if (isUsingDevelopmentClientId(providerInfo.getClientId())) {
            Object.keys(providerInfo.accessTokenAPI.params).forEach((key) => {
                if (providerInfo.accessTokenAPI.params[key] === providerInfo.getClientId()) {
                    providerInfo.accessTokenAPI.params[key] = getActualClientIdFromDevelopmentClientId(
                        providerInfo.getClientId()
                    );
                }
            });
        }

        accessTokenAPIResponse = await axios.default({
            method: "post",
            url: providerInfo.accessTokenAPI.url,
            data: qs.stringify(providerInfo.accessTokenAPI.params),
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                accept: "application/json", // few providers like github don't send back json response by default
            },
        });
    }

    try {
        userInfo = await providerInfo.getProfileInfo(accessTokenAPIResponse.data);
    } catch (err) {
        if (err.message !== undefined) {
            return {
                status: "FIELD_ERROR",
                error: err.message,
            };
        }
        throw err;
    }

    let emailInfo = userInfo.email;
    if (emailInfo === undefined) {
        return {
            status: "NO_EMAIL_GIVEN_BY_PROVIDER",
        };
    }

    // this is how we disable signing up.
    ///////// CUSTOM LOGIC BELOW ////////////////
    if (
        (await options.recipeImplementation.getUserByThirdPartyInfo({
            thirdPartyId: provider.id,
            thirdPartyUserId: userInfo.id,
        })) === undefined
    ) {
        // this third party user doesn't exist in the db. Therefore we reject the request
        return {
            status: "FIELD_ERROR",
            error: "Signing up is disabled. Please ask support to create an account for you instead",
        };
    }
    ///////// CUSTOM LOGIC ABOVE ////////////////

    let response = await options.recipeImplementation.signInUp({
        thirdPartyId: provider.id,
        thirdPartyUserId: userInfo.id,
        email: emailInfo,
    });

    if (response.status === "FIELD_ERROR") {
        return response;
    }

    // we set the email as verified if already verified by the OAuth provider.
    // This block was added because of https://github.com/supertokens/supertokens-core/issues/295
    if (emailInfo.isVerified) {
        const tokenResponse = await options.emailVerificationRecipeImplementation.createEmailVerificationToken({
            userId: response.user.id,
            email: response.user.email,
        });

        if (tokenResponse.status === "OK") {
            await options.emailVerificationRecipeImplementation.verifyEmailUsingToken({
                token: tokenResponse.token,
            });
        }
    }

    await Session.createNewSession(options.res, response.user.id, {}, {});
    return {
        status: "OK",
        createdNewUser: response.createdNewUser,
        user: response.user,
        authCodeResponse: accessTokenAPIResponse.data,
    };
}

module.exports = { signInUpPOST };

const DEV_OAUTH_REDIRECT_URL = "https://supertokens.io/dev/oauth/redirect-to-app";

const DEV_OAUTH_CLIENT_IDS = [
    "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com", // google
    "467101b197249757c71f", // github
];
const DEV_KEY_IDENTIFIER = "4398792-";

function isUsingDevelopmentClientId(client_id) {
    return client_id.startsWith(DEV_KEY_IDENTIFIER) || DEV_OAUTH_CLIENT_IDS.includes(client_id);
}

function getActualClientIdFromDevelopmentClientId(client_id) {
    if (client_id.startsWith(DEV_KEY_IDENTIFIER)) {
        return client_id.split(DEV_KEY_IDENTIFIER)[1];
    }
    return client_id;
}
