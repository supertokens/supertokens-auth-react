import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { redirectToAuth } from "supertokens-auth-react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import Session, { useSessionContext } from "supertokens-auth-react/recipe/session";
import { AuthPage, AuthPageTheme, AuthPageThemeProps } from "supertokens-auth-react/ui";

const CustomAuthPageTheme: React.FC<AuthPageThemeProps> = (props) => {
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
                const attemptInfo = await Passwordless.getLoginAttemptInfo();

                if (aborting) {
                    return;
                }
                if (attemptInfo === undefined) {
                    const additionalAttemptInfo = {
                        lastResend: Date.now(),
                        contactMethod: "PHONE",
                        contactInfo: phoneNumber,
                        redirectToPath: "/dashboard",
                    };

                    const res = await Passwordless.createCode({
                        phoneNumber,
                        userContext: { additionalAttemptInfo },
                    });

                    if (res.status === "OK") {
                        props.rebuildAuthPage();
                    } else {
                        props.onError(res.reason ?? res.status);
                    }
                }
                // if we have an OTP flow (or we just tried to start one) we show the default UI which should be the OTP input
                setShowDefaultUI(true);
            }
        }
        effect();
        return () => {
            aborting = true;
        };
    }, [session.loading]);

    if (showDefaultUI) {
        return (
            <>
                <AuthPageTheme {...props} />

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
                        margin: "auto",
                        width: "fit-content",
                    }}>
                    Login with another account
                </div>
            </>
        );
    }
    return <></>;
};

export default function SecondFactor() {
    return (
        <AuthPage preBuiltUIList={[PasswordlessPreBuiltUI]} factors={["otp-phone"]} redirectOnSessionExists={false}>
            {
                // @ts-ignore We ignore the error about missing props, since they'll be set by the feature component
                <CustomAuthPageTheme />
            }
        </AuthPage>
    );
}
