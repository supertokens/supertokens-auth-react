import React, { PureComponent } from "react";
import { APIFormField } from "../../../../types";
import { FormBaseProps, FormBaseState, FormFieldState } from "../../types";
export default class FormBase extends PureComponent<FormBaseProps, FormBaseState> {
    static contextType: React.Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../styles/types").NormalisedPalette;
    }>;
    constructor(props: FormBaseProps);
    handleInputFocus: (field: APIFormField) => Promise<void>;
    handleInputBlur: (field: APIFormField) => Promise<void>;
    getNewState(formFields: FormFieldState[], field: APIFormField, event: "blur" | "focus", error: string | undefined): FormBaseState;
    onFormSubmit: (e: React.FormEvent<Element>) => Promise<void>;
    render(): JSX.Element;
}
