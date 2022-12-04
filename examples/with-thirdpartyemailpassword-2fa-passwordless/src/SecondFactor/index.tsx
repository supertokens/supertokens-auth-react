import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { redirectToAuth } from "supertokens-auth-react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session, { useSessionContext } from "supertokens-auth-react/recipe/session";
import { SecondFactorClaim } from "../secondFactorClaim";

const CustomSignInUpTheme: typeof Passwordless.SignInUpTheme = (props) => {
    let [showDefaultUI, setShowDefaultUI] = useState(false);
    const session = useSessionContext();

    useEffect(() => {
        let aborting = false;
        async function effect() {
            if (session.loading === true) {
                return;
            }

            const phoneNumber = session.accessTokenPayload.phoneNumber;
            // If don't have a phone number we show the default UI (which should be the phone form)
            if (phoneNumber === undefined) {
                setShowDefaultUI(true);
            } else {
                // we start the OTP flow if it's not started already
                if (props.featureState.loginAttemptInfo === undefined) {
                    await props.recipeImplementation.createCode({ phoneNumber, userContext: props.userContext });
                }

                if (aborting) {
                    return;
                }
                // if we have an OTP flow (or we just started one) we show the default UI which should be the OTP input
                setShowDefaultUI(true);
            }
        }
        effect();
        return () => {
            aborting = true;
        };
    }, []);

    // If this was active, we'd not show the OTP screen because it'd detect an active session.
    props.featureState.successInAnotherTab = false;

    if (showDefaultUI) {
        return <Passwordless.SignInUpTheme {...props} />;
    }
    return <></>;
};

export default function SecondFactor() {
    const session = useSessionContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!session.loading) {
            if (!session.invalidClaims.find((a) => a.validatorId === SecondFactorClaim.id)) {
                navigate("/");
            }
        }

        // We intentionally skip session.invalidClaims from the dependency array since that would mean we may navigate to / twice
    }, [session.loading]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
            <Passwordless.SignInUp redirectOnSessionExists={false}>
                {
                    // @ts-ignore We ignore the error about missing props, since they'll be set by the feature component
                    <CustomSignInUpTheme />
                }
            </Passwordless.SignInUp>

            <div
                onClick={async () => {
                    await Passwordless.clearLoginAttemptInfo();
                    await Session.signOut();
                    redirectToAuth({ redirectBack: false });
                }}
                style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline",
                }}>
                Login with another account
            </div>
        </div>
    );
}
