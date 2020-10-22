/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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
import { CLASS_CONTAINER } from "../../constants";
import { RecipeModuleProps } from '../../types';
import EmailPassword from ".";
import {SignInAndUpTheme} from '.';
import root from 'react-shadow/emotion';

/*
 * Component.
 */
class SignInAndUp extends React.Component<RecipeModuleProps> {
    getRecipeInstanceOrThrow = () => {
		let instance;
		if (this.props.__internal !== undefined && this.props.__internal.instance !== undefined) {
			instance = this.props.__internal.instance;
		} else {
			instance = EmailPassword.getInstanceIfDefined();
		}
		return instance;
    }

    render () {
        return (
            <root.div id={CLASS_CONTAINER}>
                <SignInAndUpTheme
                    // TODO Get the form Fields from the recipe.
                    formFields={[
                        {
                            id: 'email',
                            label: 'Email',
                            placeholder: 'youremail@example.com',
                            validate: (email: string) => {
                                return new Promise(resolve => resolve(true));
                            },
                        },{
                            id: 'password',
                            label: 'Password',
                            placeholder: 'Enter your password',
                            validate: (password: string) => {
                                return new Promise(resolve => resolve(true));
                            }
                        }
                    ]}

                />
            </root.div>
        );
    }

}

export default SignInAndUp;