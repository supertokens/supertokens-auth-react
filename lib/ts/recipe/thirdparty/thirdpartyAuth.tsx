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

import ThirdParty from "./recipe";
import { FeatureBaseProps } from "../../types";
import SessionAuthWrapper from "../session/sessionAuth";
import EmailVerificationAuthWrapper from "../emailverification/emailVerificationAuth";
import SuperTokens from "../../superTokens";
import Recipe from "./recipe";
import UserContextWrapper from "../../usercontext/userContextWrapper";

type Props = FeatureBaseProps & {
    recipe: Recipe;
    requireAuth?: boolean;
    onSessionExpired?: () => void;
};

function ThirdPartyAuth(props: Props) {
    /**
     * Refer to comment in ts/recipe/emailpassword/emailPasswordAuth.tsx:EmailPasswordAuth
     * to know why userContext is explicitly set to undefined
     */
    const emailVerification = (
        <EmailVerificationAuthWrapper
            recipe={props.recipe.emailVerification}
            history={props.history}
            userContext={undefined}>
            {props.children}
        </EmailVerificationAuthWrapper>
    );

    if (props.requireAuth === false) {
        /**
         * Refer to comment in ts/recipe/emailpassword/emailPasswordAuth.tsx:EmailPasswordAuth
         * to know why userContext is explicitly set to undefined
         */
        return (
            <SessionAuthWrapper onSessionExpired={props.onSessionExpired} userContext={undefined}>
                {emailVerification}
            </SessionAuthWrapper>
        );
    }

    /**
     * Refer to comment in ts/recipe/emailpassword/emailPasswordAuth.tsx:EmailPasswordAuth
     * to know why userContext is explicitly set to undefined
     */
    return (
        <SessionAuthWrapper
            redirectToLogin={() => {
                void ThirdParty.getInstanceOrThrow().redirectToAuthWithRedirectToPath(undefined, props.history);
            }}
            requireAuth={true}
            onSessionExpired={props.onSessionExpired}
            userContext={undefined}>
            {emailVerification}
        </SessionAuthWrapper>
    );
}

const ThirdPartyAuthMemo = memo(ThirdPartyAuth);

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
            <ThirdPartyAuthMemo
                history={history}
                onSessionExpired={onSessionExpired}
                requireAuth={requireAuth}
                recipe={ThirdParty.getInstanceOrThrow()}>
                {children}
            </ThirdPartyAuthMemo>
        </UserContextWrapper>
    );
}
