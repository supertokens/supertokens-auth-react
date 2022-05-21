import { useEffect } from "react";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { SignInUp } from "supertokens-auth-react/recipe/passwordless";

export default function PhoneVerification() {
    useEffect(() => {
        async function doCheck() {
            // TODO: a better way of doing this would be to
            // call doesSessionExist with a context that tells
            // it to just run the original implementation only.
            // But until we have that feature, we use this.
            try {
                await Session.getAccessTokenPayloadSecurely();
            } catch (err: any) {
                if (err.message === "No session exists") {
                    redirectToAuth({
                        redirectBack: false,
                    });
                }
            }
        }
        doCheck();
    }, []);

    return <SignInUp />;
}
