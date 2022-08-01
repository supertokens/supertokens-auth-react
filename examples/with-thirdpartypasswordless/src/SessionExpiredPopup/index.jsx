import { useEffect } from "react";
import { redirectToAuth } from "supertokens-auth-react";

export default function SessionExpiredPopup() {
    useEffect(() => {
        window.alert("Session Expired. Please login again");
        redirectToAuth();
    }, []);

    return null;
}
