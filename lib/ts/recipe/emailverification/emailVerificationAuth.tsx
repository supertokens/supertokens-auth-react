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

import React, { useEffect, useState, useContext } from "react";

import { FeatureBaseProps } from "../../types";
import Recipe from "./recipe";
import { SessionContext } from "../session";

type Props = FeatureBaseProps & { recipe: Recipe };

const EmailVerificationAuth: React.FC<Props> = ({ children, ...props }) => {
    const sessionContext = useContext(SessionContext);

    const [isEmailVerified, setIsEmailVerified] = useState(false);

    // we extract these three this way so that the useEffect below
    // doesn't rerun just because the sessionContext or props objects
    // have changed, even though the doesSessionExist & emailVerificationMode
    // have not.
    const doesSessionExist = sessionContext.doesSessionExist;
    const emailVerificationMode = props.recipe.config.mode;
    const propsRef = React.useRef(props);

    useEffect(() => {
        let thisUseEffectMustReturnImmediately = false;
        async function doTask() {
            if (doesSessionExist && emailVerificationMode === "REQUIRED") {
                let isEmailVerified;
                try {
                    isEmailVerified = await propsRef.current.recipe.isEmailVerified();
                } catch (_) {
                    /* if there is an error, we assume that the email is verified
                     * so that the user can see the content on the page...
                     *
                     * This is not a security issue since the backend should check
                     * for email verification on each request anyway (via sessions...)
                     */
                    isEmailVerified = true;
                }

                if (thisUseEffectMustReturnImmediately) {
                    return;
                }

                if (isEmailVerified === false) {
                    await propsRef.current.recipe.redirect({ action: "VERIFY_EMAIL" }, propsRef.current.history);
                } else {
                    setIsEmailVerified(true);
                }
            }
        }
        doTask();
        return () => {
            // this means that the sessionContext or props have changed..
            // so we should not update state or do anything anymore in this useEffect.
            // We need this cause we are doing an async task in this.
            thisUseEffectMustReturnImmediately = true;
        };
    }, [doesSessionExist, emailVerificationMode]);

    if (sessionContext.doesSessionExist === false) {
        return <>{children}</>;
    }

    if (props.recipe.config.mode !== "REQUIRED") {
        return <>{children}</>;
    }

    return isEmailVerified ? <>{children}</> : null;
};

export default EmailVerificationAuth;
