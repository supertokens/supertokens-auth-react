import { useEffect } from "react";
import { redirectToAuth } from "supertokens-auth-react/recipe/thirdpartypasswordless";

export default function SessionExpiredPopup(): JSX.Element {
    useEffect(() => {
        window.alert("Session Expired. Please login again");
        redirectToAuth();
    }, []);

    return null;
}
