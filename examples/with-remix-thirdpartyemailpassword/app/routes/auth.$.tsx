import { useEffect, useState } from "react";
import { redirectToAuth } from "supertokens-auth-react";
import SuperTokens from "supertokens-auth-react/ui/index.js";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui.js";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui.js";

export const PreBuiltUIList = [ThirdPartyEmailPasswordPreBuiltUI, EmailVerificationPreBuiltUI];

export default function Auth() {
    // If the user visits a page that is not handled by us (like /auth/random), then we redirect them back to the auth page.
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (SuperTokens.canHandleRoute(PreBuiltUIList) === false) {
            redirectToAuth({ redirectBack: false });
        } else {
            setLoaded(true);
        }
    }, []);

    if (loaded) {
        return SuperTokens.getRoutingComponent(PreBuiltUIList);
    }

    return null;
}
