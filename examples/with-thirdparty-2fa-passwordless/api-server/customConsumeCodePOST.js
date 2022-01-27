let Session = require("supertokens-node/recipe/session");
let { mapping } = require("./thirdPartyUserIdToPhoneNumberMapping");

/**
 *
 * This file is copied from https://github.com/supertokens/supertokens-node/blob/master/lib/ts/recipe/passwordless/api/implementation.ts#L6
 *
 * After copying the contents, we modify the API logic to modify the session contents instead
 * of creating a new session.
 */

async function consumeCodePOST(input) {
    let response = await input.options.recipeImplementation.consumeCode(
        "deviceId" in input
            ? {
                  preAuthSessionId: input.preAuthSessionId,
                  deviceId: input.deviceId,
                  userInputCode: input.userInputCode,
                  userContext: input.userContext,
              }
            : {
                  preAuthSessionId: input.preAuthSessionId,
                  linkCode: input.linkCode,
                  userContext: input.userContext,
              }
    );

    if (response.status !== "OK") {
        return response;
    }

    const session = await Session.getSession(input.options.req, input.options.res);
    let currPayload = session.getAccessTokenPayload();
    await session.updateAccessTokenPayload({
        ...currPayload,
        auth: [...currPayload["auth"], "pswdless"], // we add the second factor to the access token payload.
    });

    let phoneNumber = response.user.phoneNumber;
    if (mapping[session.getUserId()] === undefined) {
        // We associate the session's userId with the incoming mobile number for future logins
        mapping[session.getUserId()] = phoneNumber;
    }

    return {
        status: "OK",
        createdNewUser: response.createdNewUser,
        user: response.user,
        session,
    };
}

module.exports = { consumeCodePOST };
