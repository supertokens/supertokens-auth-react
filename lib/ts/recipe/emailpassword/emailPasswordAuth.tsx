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

import EmailPassword from "./recipe";
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

function EmailPasswordAuth(props: Props) {
    /**
     * When we use EmailverificationAuthWrapper here we want it to rely on
     * the userContext provided by the UserContextWrapper used in EmailPasswordAuthWrapper.
     *
     * If userContext is explicitly passed as undefined, the UserContextWrapper inside
     * EmailVerificationAuthWrapper will defer to the userContext provided by the first
     * instance of UserContextProvider in its parent tree and will not add its own Provider.
     *
     * NOTE: If EmailVerificationAuthWrapper adds its own UserContextProvider, changes to the
     * userContext React context triggered by the EmailVerificationAuthWrapper will result in
     * updates to EmailVerificationAuthWrapper and its children and will not apply to any of its
     * parents. Read more here: https://reactjs.org/docs/context.html#contextprovider
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
        // Refer to comment above to know why userContext is undefined
        return (
            <SessionAuthWrapper onSessionExpired={props.onSessionExpired} userContext={undefined}>
                {emailVerification}
            </SessionAuthWrapper>
        );
    }

    // Refer to comment above to know why userContext is undefined
    return (
        <SessionAuthWrapper
            redirectToLogin={() =>
                EmailPassword.getInstanceOrThrow().redirectToAuthWithRedirectToPath(undefined, props.history)
            }
            requireAuth={true}
            onSessionExpired={props.onSessionExpired}
            userContext={undefined}>
            {emailVerification}
        </SessionAuthWrapper>
    );
}

const EmailPasswordAuthMemo = memo(EmailPasswordAuth);

export default function EmailPasswordAuthWrapper({
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
            <EmailPasswordAuthMemo
                history={history}
                onSessionExpired={onSessionExpired}
                requireAuth={requireAuth}
                recipe={EmailPassword.getInstanceOrThrow()}>
                {children}
            </EmailPasswordAuthMemo>
        </UserContextWrapper>
    );
}
