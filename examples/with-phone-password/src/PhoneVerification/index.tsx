import { useEffect } from "react";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
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
                redirectToAuth({
                    redirectBack: false,
                });
            }
        }
        doCheck();
    }, []);

    return <SignInUp />;
}
