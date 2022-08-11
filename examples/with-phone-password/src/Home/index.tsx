import React, { useEffect } from "react";
import Logout from "./Logout";
import SuccessView from "./SuccessView";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { PhoneVerifiedClaim } from "../phoneVerifiedClaim";

export default function Home() {
    const session = useSessionContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!session.loading && session.invalidClaims.find((err) => err.validatorId === PhoneVerifiedClaim.id)) {
            navigate("/auth/verify-phone");
        }
    }, [session]);

    async function logoutClicked() {
        await signOut();
        navigate("/auth");
    }

    if (session.loading || session.invalidClaims.length > 0) {
        return null;
    }

    return (
        <div className="fill">
            <Logout logoutClicked={logoutClicked} />
            <SuccessView userId={session.userId} />
        </div>
    );
}
