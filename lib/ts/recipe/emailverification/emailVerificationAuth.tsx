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

    useEffect(() => {
        async function doTask() {
            if (sessionContext.doesSessionExist && props.recipe.config.mode === "REQUIRED") {
                const isEmailVerified = await props.recipe.isEmailVerified();
                if (isEmailVerified === false) {
                    await props.recipe.redirect({ action: "VERIFY_EMAIL" }, props.history);
                } else {
                    setIsEmailVerified(true);
                }
            }
        }
        doTask();
    }, [sessionContext, props]);

    if (sessionContext.doesSessionExist) {
        if (props.recipe.config.mode !== "REQUIRED") {
            return <>{children}</>;
        } else {
            if (isEmailVerified) {
                return <>{children}</>;
            } else {
                return null;
            }
        }
    } else {
        return <>{children}</>;
    }
};

export default EmailVerificationAuth;
