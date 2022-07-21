import { useEffect } from "react";
import { redirectToAuthWithoutRedirectToPath } from "supertokens-auth-react";
import Session from "supertokens-auth-react/recipe/session";
import { SignInUp } from "supertokens-auth-react/recipe/passwordless";

export default function PhoneVerification() {
    useEffect(() => {
        async function doCheck() {
            if (
                !(await Session.doesSessionExist({
                    userContext: {
                        forceOriginalCheck: true,
                    },
                }))
            ) {
                redirectToAuthWithoutRedirectToPath();
            }
        }
        doCheck();
    }, []);

    return <SignInUp />;
}
