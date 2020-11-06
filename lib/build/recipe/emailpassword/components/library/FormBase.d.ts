import * as React from "react";
import { PureComponent } from "react";
import { FormBaseState, FormBaseProps } from "../../types";
import { APIFormField } from "../../../../types";
export default class FormBase extends PureComponent<FormBaseProps, FormBaseState> {
    constructor(props: FormBaseProps);
    handleInputChange: (field: APIFormField) => Promise<void>;
    onFormSubmit: (e: React.FormEvent<Element>) => Promise<void>;
    render(): JSX.Element;
}
