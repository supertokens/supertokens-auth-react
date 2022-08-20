import { useState, useEffect } from "react";
import { redirectToAuth } from "supertokens-auth-react";
import Session from "supertokens-auth-react/recipe/session";
import { SignInUp, SignInUpTheme } from "supertokens-auth-react/recipe/passwordless";

const CustomSignInUpTheme: typeof SignInUpTheme = (props) => {
    let [showDefaultUI, setShowDefaultUI] = useState(false);
    useEffect(() => {
        let aborting = false;
        async function effect() {
            // We only show this inside a SessionAuth, so this should never throw
            const payload = await Session.getAccessTokenPayloadSecurely();

            if (aborting) {
                return;
            }

            let phoneNumber = payload.phoneNumber;
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
        return <SignInUpTheme {...props} />;
    }
    return <></>;
};

export default function PhoneVerification() {
    return (
        <SignInUp redirectOnSessionExists={false}>
            {
                // @ts-ignore We ignore the error about missing props, since they'll be set by the feature component
                <CustomSignInUpTheme />
            }
        </SignInUp>
    );
}
