/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

/*
 * Imports.
 */
import * as React from "react";
import { memo } from "react";

import ThirdPartyEmailPassword from "./recipe";
import { FeatureBaseProps } from "../../types";
import SessionAuth from "../session/sessionAuth";
import EmailVerificationAuth from "../emailverification/emailVerificationAuth";
import SuperTokens from "../../superTokens";
import Recipe from "./recipe";
import { SessionClaim } from "../session/types";

type Props = FeatureBaseProps & {
    recipe: Recipe;
    requireAuth?: boolean;
    onSessionExpired?: () => void;
    onMissingClaim?: (claimId: string) => void;
    requiredClaims?: SessionClaim<any>[];
};

function ThirdPartyEmailPasswordAuth(props: Props) {
    const emailVerification = (
        <EmailVerificationAuth recipe={props.recipe.emailVerification} history={props.history}>
            {props.children}
        </EmailVerificationAuth>
    );

    if (props.requireAuth === false) {
        return (
            <SessionAuth
                onSessionExpired={props.onSessionExpired}
                onMissingClaim={props.onMissingClaim}
                requiredClaims={props.requiredClaims}>
                {emailVerification}
            </SessionAuth>
        );
    }

    return (
        <SessionAuth
            redirectToLogin={() => {
                void ThirdPartyEmailPassword.getInstanceOrThrow().redirectToAuthWithRedirectToPath(
                    undefined,
                    props.history
                );
            }}
            requireAuth={true}
            onSessionExpired={props.onSessionExpired}
            onMissingClaim={props.onMissingClaim}
            requiredClaims={props.requiredClaims}>
            {emailVerification}
        </SessionAuth>
    );
}

const ThirdPartyEmailPasswordAuthMemo = memo(ThirdPartyEmailPasswordAuth);

export default function ThirdPartyAuthWrapper({
    children,
    requireAuth,
    onSessionExpired,
    onMissingClaim,
    requiredClaims,
}: {
    children: React.ReactNode;
    requireAuth?: boolean;
    onSessionExpired?: () => void;
    onMissingClaim?: (claimId: string) => void;
    requiredClaims?: SessionClaim<any>[];
}) {
    const routerInfo = SuperTokens.getInstanceOrThrow().getReactRouterDomWithCustomHistory();
    const history = routerInfo === undefined ? undefined : routerInfo.useHistoryCustom();
    return (
        <ThirdPartyEmailPasswordAuthMemo
            history={history}
            onSessionExpired={onSessionExpired}
            onMissingClaim={onMissingClaim}
            requiredClaims={requiredClaims}
            requireAuth={requireAuth}
            recipe={ThirdPartyEmailPassword.getInstanceOrThrow()}>
            {children}
        </ThirdPartyEmailPasswordAuthMemo>
    );
}
