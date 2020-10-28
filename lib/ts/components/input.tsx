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

/** @jsx jsx */
import { jsx } from "@emotion/core";


import * as React from "react";
import { CSSInterpolation } from "@emotion/serialize/types/index";
import { forwardRef, RefObject} from "react";
import { defaultStyles } from "../styles/styles";
import { APIFormField } from "../types";

type InputProps = {
	style: CSSInterpolation;
	type: string;
	name: string;
	placeholder: string;
	ref: RefObject<any>;
	handleChange?: (field: APIFormField) => void
}
function Input(props: InputProps, ref: RefObject<any>): JSX.Element {
	const {style, handleChange, type, name, placeholder} = props;

	function onChange () {
		if (handleChange) {
			handleChange({
				id: ref.current.name,
				value: ref.current.value
			});
		}
	}

	return (
		<input 
			onBlur={onChange} 
			// onChange={onChange} 
			// onKeyDown={onChange} 
			onPaste={onChange} 
			onCut={onChange}
			css={[defaultStyles.input, style]} 
			type={type} name={name}  
			placeholder={placeholder} 
			ref={ref} 
		/>
	)

}

export default forwardRef(Input);