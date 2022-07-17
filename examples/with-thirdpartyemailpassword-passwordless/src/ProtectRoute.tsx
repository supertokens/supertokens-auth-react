import React from "react";
import { SessionAuth, useSessionContext } from "supertokens-auth-react/recipe/session";
import { PasswordlessAuth } from "supertokens-auth-react/recipe/passwordless";
import { ThirdPartyEmailPasswordAuth } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

/**
 * This file chooses the correct auth wrapper depending on the recipe that the user used
 * to sign up / in from.
 *
 * We do this based on the accessTokenPayload.isPasswordless value which is set by the backend
 * during session creation.
 */

export default function ProtectRoute(props: any) {
    return (
        <SessionAuth>
            <AuthWrapperSelector {...props} />
        </SessionAuth>
    );
}

function AuthWrapperSelector(props: any) {
    let sessionInfo = useSessionContext();

    if (sessionInfo.loading) {
        return null;
    }

    if (sessionInfo.accessTokenPayload.isPasswordless === true) {
        return <PasswordlessAuth {...props}>{props.children}</PasswordlessAuth>;
    } else {
        return <ThirdPartyEmailPasswordAuth {...props}>{props.children}</ThirdPartyEmailPasswordAuth>;
    }
}
