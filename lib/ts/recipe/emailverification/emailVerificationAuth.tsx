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

type Props = FeatureBaseProps & { getRecipe: () => Recipe };

const EmailVerificationAuth: React.FC<Props> = ({ children, ...props }) => {
    const sessionContext = useContext(SessionContext);

    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const recipe = React.useRef<Recipe>();
    const propsRef = React.useRef(props);
    const userContext = useUserContext();

    if (recipe.current === undefined) {
        try {
            recipe.current = propsRef.current.getRecipe();
        } catch {
            // We are in either an SSR environment or the user forgot to initialize the recipe
            // We are ignoring this exception here, because in SSR we don't want to throw and the callback below will throw in a browser
        }
    }

    const checkIsEmailVerified = useCallback(async () => {
        if (sessionContext.loading === true) {
            // This callback should only be called if the session is already loaded
            throw new Error("Should never come here");
        }
        if (!recipe.current) {
            // If the recipe.current isn't initialized here, this will likely throw and produce a user friendly error
            recipe.current = propsRef.current.getRecipe();
        }

        if (sessionContext.doesSessionExist && recipe.current!.config.mode === "REQUIRED") {
            return (await recipe.current!.isEmailVerified(userContext)).isVerified;
        }
        return undefined;
    }, [sessionContext]);
    const useIsEmailVerified = useCallback(
        async (isEmailVerified: boolean | undefined) => {
            if (sessionContext.loading === true) {
                // This callback should only be called if the session is already loaded
                throw new Error("Should never come here");
            }
            if (sessionContext.doesSessionExist && recipe.current!.config.mode === "REQUIRED") {
                if (isEmailVerified === false) {
                    await recipe.current!.redirect({ action: "VERIFY_EMAIL" }, propsRef.current.history);
                } else {
                    setIsEmailVerified(true);
                }
            }
        },
        [sessionContext.loading]
    );

    useOnMountAPICall(checkIsEmailVerified, useIsEmailVerified, undefined, sessionContext.loading === false);

    const isNotRequired = recipe.current !== undefined && recipe.current.config.mode !== "REQUIRED";
    if (
        // We only render after loading has finished to eliminate flicker
        sessionContext.loading === false &&
        (isNotRequired || sessionContext.doesSessionExist === false || isEmailVerified)
    ) {
        return <>{children}</>;
    }

    return null;
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
