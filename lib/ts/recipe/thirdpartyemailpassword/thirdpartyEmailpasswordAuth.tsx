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
import SessionAuthWrapper from "../session/sessionAuth";
import EmailVerificationAuth from "../emailverification/emailVerificationAuth";
import SuperTokens from "../../superTokens";
import Recipe from "./recipe";
import UserContextWrapper from "../../usercontext/userContextWrapper";

type Props = FeatureBaseProps & {
    recipe: Recipe;
    requireAuth?: boolean;
    onSessionExpired?: () => void;
};

function ThirdPartyEmailPasswordAuth(props: Props) {
    const emailVerification = (
        <EmailVerificationAuth recipe={props.recipe.emailVerification} history={props.history}>
            {props.children}
        </EmailVerificationAuth>
    );

    if (props.requireAuth === false) {
        return <SessionAuthWrapper onSessionExpired={props.onSessionExpired}>{emailVerification}</SessionAuthWrapper>;
    }

    return (
        <SessionAuthWrapper
            redirectToLogin={() => {
                void ThirdPartyEmailPassword.getInstanceOrThrow().redirectToAuthWithRedirectToPath(
                    undefined,
                    props.history
                );
            }}
            requireAuth={true}
            onSessionExpired={props.onSessionExpired}>
            {emailVerification}
        </SessionAuthWrapper>
    );
}

const ThirdPartyEmailPasswordAuthMemo = memo(ThirdPartyEmailPasswordAuth);

export default function ThirdPartyAuthWrapper({
    children,
    requireAuth,
    onSessionExpired,
    userContext,
}: {
    children: React.ReactNode;
    requireAuth?: boolean;
    onSessionExpired?: () => void;
    userContext?: any;
}) {
    const routerInfo = SuperTokens.getInstanceOrThrow().getReactRouterDomWithCustomHistory();
    const history = routerInfo === undefined ? undefined : routerInfo.useHistoryCustom();
    return (
        <UserContextWrapper userContext={userContext}>
            <ThirdPartyEmailPasswordAuthMemo
                history={history}
                onSessionExpired={onSessionExpired}
                requireAuth={requireAuth}
                recipe={ThirdPartyEmailPassword.getInstanceOrThrow()}>
                {children}
            </ThirdPartyEmailPasswordAuthMemo>
        </UserContextWrapper>
    );
}
