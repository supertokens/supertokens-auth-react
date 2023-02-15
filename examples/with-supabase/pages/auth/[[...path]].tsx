import Head from "next/head";
import React, { useEffect } from "react";
import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import SuperTokens from "supertokens-auth-react";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/preBuiltUI";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/preBuiltUI";

const EmailVerificationComponentNoSSR = dynamic(
    new Promise((res) => res(EmailVerificationPreBuiltUI.getRoutingComponent)),
    { ssr: false }
);
const ThirdPartyEmailPasswordComponentNoSSR = dynamic(
    new Promise((res) => res(ThirdPartyEmailPasswordPreBuiltUI.getRoutingComponent)),
    { ssr: false }
);

export default function Auth() {
    useEffect(() => {
        if (
            EmailVerificationPreBuiltUI.canHandleRoute() === false &&
            ThirdPartyEmailPasswordPreBuiltUI.canHandleRoute() === false
        ) {
            SuperTokens.redirectToAuth();
        }
    }, []);

    return (
        <>
            <EmailVerificationComponentNoSSR />
            <ThirdPartyEmailPasswordComponentNoSSR />
        </>
    );
}
