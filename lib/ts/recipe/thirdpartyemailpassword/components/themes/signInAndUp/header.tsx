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
import SignInHeader from "../../../../emailpassword/components/themes/signInAndUp/signInHeader";
import SignUpHeader from "../../../../emailpassword/components/themes/signInAndUp/signUpHeader";

/*
 * Component.
 */
export default function Header({
    isSignUp,
    setIsSignUp,
}: {
    isSignUp: boolean;
    setIsSignUp: (isSignUp: boolean) => void;
}): JSX.Element {
    /*
     * Render.
     */
    if (isSignUp === true) {
        return <SignUpHeader onClick={() => setIsSignUp(false)} />;
    } else {
        return <SignInHeader onClick={() => setIsSignUp(true)} />;
    }
}
