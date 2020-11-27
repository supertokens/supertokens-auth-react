import React, { PureComponent } from "react";
import { APIFormField } from "../../../../types";
import { FormBaseProps, FormBaseState, FormBaseStatus, FormFieldState } from "../../types";
export default class FormBase extends PureComponent<FormBaseProps, FormBaseState> {
    static contextType: React.Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../themes/default/types").NormalisedPalette;
    }>;
    constructor(props: FormBaseProps);
    handleInputFocus: (field: APIFormField) => Promise<void>;
    handleInputBlur: (field: APIFormField) => Promise<void>;
    getNewStatus(formFields: FormFieldState[], type: "focus" | "blur"): FormBaseStatus;
    onFormSubmit: (e: React.FormEvent<Element>) => Promise<void>;
    render(): JSX.Element;
}
