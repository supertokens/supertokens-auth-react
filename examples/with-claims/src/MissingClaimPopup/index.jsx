import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MissingClaimPopup({ missingClaim }) {
    const nav = useNavigate();
    const loc = useLocation();
    useEffect(() => {
        window.alert("Missing claim. Please login again");
        if (loc.pathname === "/route2") {
            nav("/route1");
        } else {
            nav("/");
        }
    }, [missingClaim]);

    return null;
}
