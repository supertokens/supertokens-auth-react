import * as React from "react";
import { PureComponent } from "react";
import { APIFormField } from "../../../../types";
import { FormBaseProps, FormBaseState } from "../../types";
export default class FormBase extends PureComponent<FormBaseProps, FormBaseState> {
    constructor(props: FormBaseProps);
    handleInputChange: (field: APIFormField) => Promise<void>;
    onFormSubmit: (e: React.FormEvent<Element>) => Promise<void>;
    render(): JSX.Element;
}
