import { useEffect } from "react";
import { redirectToAuthWithoutRedirectToPath } from "supertokens-auth-react";

export default function SessionExpiredPopup() {
    useEffect(() => {
        window.alert("Session Expired. Please login again");
        redirectToAuthWithoutRedirectToPath();
    }, []);

    return null;
}
