import React from "react";
import { FAKE_PASSWORD } from "../App";

export default function CustomSignUp({ DefaultComponent, ...props }) {
    React.useEffect(() => {
        if (window.location.pathname === "/auth") {
            // here we hide the password field..
            document
                .querySelector("#supertokens-root")
                .shadowRoot.querySelector("form > div:nth-child(2)").style.display = "none";

            // we set the fake password in the password field so that the UI will
            // call the sign up API
            document
                .querySelector("#supertokens-root")
                .shadowRoot.querySelector("form > div:nth-child(2) > div > div > input").value = FAKE_PASSWORD;
        } else {
            // we are in the /set-password page..

            // we hide everything except the password input component,
            // and we set the email to some random email.
            document.querySelector("#supertokens-root").shadowRoot.querySelector("form > div").style.display = "none";

            // we hide all the unnecessary UI components
            document
                .querySelector("#supertokens-root")
                .shadowRoot.querySelector("div > div > div:nth-child(2)").style.display = "none";
            document
                .querySelector("#supertokens-root")
                .shadowRoot.querySelector("div > div > div:nth-child(3)").style.display = "none";
            document
                .querySelector("#supertokens-root")
                .shadowRoot.querySelector("div > div > div:nth-child(4)").style.display = "none";
            document
                .querySelector("#supertokens-root")
                .shadowRoot.querySelector("form > div:nth-child(2) > div").style.display = "none";
            document.querySelector("#supertokens-root").shadowRoot.querySelector("div > div > div").innerText =
                "Set Password";
            document
                .querySelector("#supertokens-root")
                .shadowRoot.querySelector("form > div:nth-child(3) > button").innerText = "CONTINUE";

            // we put a fake email so that the sign up button can work
            document
                .querySelector("#supertokens-root")
                .shadowRoot.querySelector("form > div > div:nth-child(2) > div > input").value = "a@b.com";
        }
    }, []);
    return <DefaultComponent {...props} />;
}
