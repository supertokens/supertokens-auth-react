import React from "react";
import { FAKE_PASSWORD } from "../App";

function setInputValue(input, val) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    nativeInputValueSetter.call(input, val);

    var ev2 = new Event("input", { bubbles: true });
    input.dispatchEvent(ev2);
}

export default function CustomSignUp({ DefaultComponent, ...props }) {
    // we use useLayoutEffect instead of useEffect because that prevent the UI glitch that
    // happens cause of the JS manipulation
    React.useLayoutEffect(() => {
        if (window.location.pathname.startsWith("/auth")) {
            // here we hide the password field..
            document
                .querySelector("#supertokens-root")
                .shadowRoot.querySelector("form > div:nth-child(2)").style.display = "none";

            // we set the fake password in the password field so that the UI will
            // call the sign up API
            setInputValue(
                document
                    .querySelector("#supertokens-root")
                    .shadowRoot.querySelector("form > div:nth-child(2) > div > div > input"),
                FAKE_PASSWORD
            );
        } else {
            // we are in the /set-password page..

            // we hide everything except the password input component,
            // and we set the email to some random email.

            /* This is not the recommended way to build the set password form.
            But I did it here just to show what's possible. Instead, you should build your
            own form. */
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
            setInputValue(
                document
                    .querySelector("#supertokens-root")
                    .shadowRoot.querySelector("form > div > div:nth-child(2) > div > input"),
                "a@b.com"
            );
        }
    }, []);
    return <DefaultComponent {...props} />;
}
