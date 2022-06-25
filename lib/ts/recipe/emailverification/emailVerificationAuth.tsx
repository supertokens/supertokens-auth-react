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

import React, { useState, useContext, useCallback } from "react";

import { FeatureBaseProps } from "../../types";
import Recipe from "./recipe";
import { SessionContext } from "../session";
import { useUserContext } from "../../usercontext";
import UserContextWrapper from "../../usercontext/userContextWrapper";
import { useOnMountAPICall } from "../../utils";

type Props = FeatureBaseProps & { recipe: Recipe };

const EmailVerificationAuth: React.FC<Props> = ({ children, ...props }) => {
    const sessionContext = useContext(SessionContext);

    const [isEmailVerified, setIsEmailVerified] = useState(false);

    // we extract these three this way so that the useEffect below
    // doesn't rerun just because the sessionContext or props objects
    // have changed, even though the doesSessionExist & emailVerificationMode
    // have not.
    const doesSessionExist = sessionContext.loading === false && sessionContext.doesSessionExist;
    const emailVerificationMode = props.recipe.config.mode;
    const propsRef = React.useRef(props);
    const userContext = useUserContext();

    const checkIsEmailVerified = useCallback(async () => {
        if (doesSessionExist && emailVerificationMode === "REQUIRED") {
            return (await propsRef.current.recipe.isEmailVerified(userContext)).isVerified;
        }
        return undefined;
    }, [doesSessionExist, emailVerificationMode]);
    const useIsEmailVerified = useCallback(
        async (isEmailVerified: boolean | undefined) => {
            if (doesSessionExist && emailVerificationMode === "REQUIRED") {
                if (isEmailVerified === false) {
                    await propsRef.current.recipe.redirect({ action: "VERIFY_EMAIL" }, propsRef.current.history);
                } else {
                    setIsEmailVerified(true);
                }
            }
        },
        [doesSessionExist, emailVerificationMode]
    );

    useOnMountAPICall(checkIsEmailVerified, useIsEmailVerified);

    if (doesSessionExist === false) {
        return <>{children}</>;
    }

    if (props.recipe.config.mode !== "REQUIRED") {
        return <>{children}</>;
    }

    return isEmailVerified ? <>{children}</> : null;
};

const EmailVerificationAuthWrapper: React.FC<
    Props & {
        userContext?: any;
    }
> = (props) => {
    return (
        <UserContextWrapper userContext={props.userContext}>
            <EmailVerificationAuth {...props} />
        </UserContextWrapper>
    );
};

export default EmailVerificationAuthWrapper;
