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
/** @jsx jsx */
import { jsx } from "@emotion/react";
import SignInAndUpBase from ".";
import ThirdParty from "../../../thirdparty";

/*
 * Component.
 */

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function SignInAndUp(props: any): JSX.Element {
    return <SignInAndUpBase recipeId={ThirdParty.getInstanceOrThrow().recipeId} {...props} />;
}

export default SignInAndUp;
