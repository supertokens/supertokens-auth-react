/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
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

import React, { useState } from "react";

import { getNormalisedUserContext } from "../utils";

export const UserContextContext = React.createContext<any>(undefined);

export const useUserContext = (): any => {
    return React.useContext(UserContextContext);
};

export const UserContextProvider: React.FC<{
    children: React.ReactNode;
    userContext?: any;
}> = ({ children, userContext }) => {
    const [currentUserContext] = useState(getNormalisedUserContext(userContext));

    return <UserContextContext.Provider value={currentUserContext}>{children}</UserContextContext.Provider>;
};
