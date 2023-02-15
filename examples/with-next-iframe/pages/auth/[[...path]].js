import Head from "next/head";
import React, { useEffect } from "react";
import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import SuperTokens from "supertokens-auth-react";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/preBuiltUI";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/preBuiltUI";
import { redirectToAuth } from "supertokens-auth-react";

const EmailVerificationComponentNoSSR = dynamic(
    new Promise((res) => res(EmailVerificationPreBuiltUI.getRoutingComponent)),
    {
        ssr: false,
    }
);
const EmailPasswordComponentNoSSR = dynamic(new Promise((res) => res(EmailPasswordPreBuiltUI.getRoutingComponent)), {
    ssr: false,
});

export default function Auth() {
    useEffect(() => {
        if (
            EmailPasswordPreBuiltUI.canHandleRoute() === false &&
            EmailVerificationPreBuiltUI.canHandleRoute() === false
        ) {
            redirectToAuth();
        }
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>SuperTokens 💫</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <EmailVerificationComponentNoSSR />
                <EmailPasswordComponentNoSSR />
            </main>
        </div>
    );
}
