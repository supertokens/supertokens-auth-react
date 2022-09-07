import React from "react";
import Session from "supertokens-auth-react/recipe/session";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";

export function MagicLinkScreen() {
    let sessionContext = Session.useSessionContext();

    React.useEffect(() => {
        if (sessionContext.loading) {
            return;
        }
        async function consumeCode(token: string, preAuthSessionId: string) {
            await fetch("http://localhost:3001/consumetoken", {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    preAuthSessionId,
                }),
            });

            window.location.href = "/";
        }

        let token = window.location.hash;
        const urlParams = new URLSearchParams(window.location.search);
        let preAuthSessionId = urlParams.get("preAuthSessionId");

        if (!sessionContext.doesSessionExist) {
            // we save the token from the URL to use it later on..
            if (token !== undefined && token !== null && token !== "" && preAuthSessionId !== null) {
                token = token.split("#")[1];
                localStorage.setItem("passwordless-token", token);
                localStorage.setItem("passwordless-preAuthSessionId", preAuthSessionId);
            }
            ThirdPartyEmailPassword.redirectToAuth({
                redirectBack: true,
            });
        } else {
            if (token !== undefined && token !== null && token !== "" && preAuthSessionId !== null) {
                token = token.split("#")[1];
            } else {
                if (localStorage.getItem("passwordless-token") === null) {
                    window.location.href = "/";
                    return;
                }
                token = localStorage.getItem("passwordless-token")!;
                preAuthSessionId = localStorage.getItem("passwordless-preAuthSessionId")!;
                localStorage.removeItem("passwordless-token");
                localStorage.removeItem("passwordless-preAuthSessionId");
            }
            consumeCode(token, preAuthSessionId);
        }
    }, [sessionContext]);

    return null;
}
