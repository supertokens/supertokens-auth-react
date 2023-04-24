import Head from "next/head";
import React, { FC, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import SuperTokens from "supertokens-auth-react";
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";

const SuperTokensComponentNoSSR = dynamic<{}>(
    new Promise((res) =>
        res(() => getRoutingComponent([EmailVerificationPreBuiltUI, ThirdPartyEmailPasswordPreBuiltUI]))
    ),
    { ssr: false }
);

export default function Auth() {
    useEffect(() => {
        if (canHandleRoute([EmailVerificationPreBuiltUI, ThirdPartyEmailPasswordPreBuiltUI]) === false) {
            SuperTokens.redirectToAuth();
        }
    }, []);

    return <SuperTokensComponentNoSSR />;
}
