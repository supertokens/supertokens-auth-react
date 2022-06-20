import React from "react";
import PasswordlessRecipeRaw from "supertokens-auth-react/lib/build//recipe/passwordless/recipe";

export default function Footer() {
    let [showSMSMessage, setShowSMSMessage] = React.useState(false);
    React.useEffect(() => {
        function checkLoginAttemptInfo() {
            // TODO: change this to not use the build folder
            PasswordlessRecipeRaw.getInstanceOrThrow()
                .recipeImpl.getLoginAttemptInfo({})
                .then((info) => {
                    if (info !== undefined && info.contactMethod === "PHONE") {
                        setShowSMSMessage(true);
                    } else {
                        setShowSMSMessage(false);
                    }
                });
        }
        const intervalId = setInterval(checkLoginAttemptInfo, 500);
        return () => {
            clearInterval(intervalId);
        };
    }, []);
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "flex-end",
                flexDirection: "column",
            }}>
            {showSMSMessage ? (
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        backgroundColor: "#ff2d54",
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "flex-end",
                        color: "#ffffff",
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: "5px",
                    }}>
                    If you did not get a SMS OTP, it means that the daily quota of free SMS for this demo app has been
                    reached. Please try again tomorrow.
                </div>
            ) : null}
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    height: "80px",
                    backgroundColor: "#000000",
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "flex-end",
                    color: "#ffffff",
                    fontWeight: "bold",
                    textAlign: "center",
                }}>
                React Demo app. Made with ❤️ using supertokens.com
            </div>
        </div>
    );
}
