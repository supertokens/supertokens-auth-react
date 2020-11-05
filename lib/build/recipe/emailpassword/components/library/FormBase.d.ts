import { FormEvent, PureComponent } from "react";
import { FormBaseState, FormBaseProps } from "../../types";
import { APIFormField } from "../../../../types";
export default class FormBase extends PureComponent<FormBaseProps, FormBaseState> {
    constructor(props: FormBaseProps);
    handleInputChange: (field: APIFormField) => Promise<void>;
    onFormSubmit: (e: FormEvent) => Promise<void>;
    render(): JSX.Element;
}
