import * as React from "react";
import { Component } from "react";
import { FormBaseState, FormBaseProps } from "../../types";
import { APIFormField } from "../../../../types";
export default class FormBase extends Component<FormBaseProps, FormBaseState> {
    constructor(props: FormBaseProps);
    handleInputChange: (field: APIFormField) => Promise<void>;
    onFormSubmit: (e: React.FormEvent<Element>) => Promise<void>;
    render(): JSX.Element;
}
