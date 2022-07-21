import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { redirectToAuthWithoutRedirectToPath } from "supertokens-auth-react";

export default function SessionExpiredPopup() {
    const history = useNavigate();
    useEffect(() => {
        window.alert("Session Expired. Please login again");
        redirectToAuthWithoutRedirectToPath("signin", history);
    }, []);

    return null;
}
