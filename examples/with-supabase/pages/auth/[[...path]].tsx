import Head from "next/head";
import React, { FC, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import SuperTokens from "supertokens-auth-react";
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react/ui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";

const SuperTokensComponentNoSSR = dynamic<{}>(
    new Promise((res) =>
        res(() => getRoutingComponent([EmailVerificationPreBuiltUI, ThirdPartyPreBuiltUI, EmailPasswordPreBuiltUI]))
    ),
    { ssr: false }
);

export default function Auth() {
    useEffect(() => {
        if (canHandleRoute([EmailVerificationPreBuiltUI, ThirdPartyPreBuiltUI, EmailPasswordPreBuiltUI]) === false) {
            SuperTokens.redirectToAuth();
        }
    }, []);

    return <SuperTokensComponentNoSSR />;
}
