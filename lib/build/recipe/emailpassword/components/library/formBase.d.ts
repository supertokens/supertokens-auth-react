import { FormEvent, PureComponent } from "react";
import { APIFormField } from "../../../../types";
import { FormBaseProps, FormBaseState } from "../../types";
export default class FormBase<T> extends PureComponent<FormBaseProps<T>, FormBaseState> {
    constructor(props: FormBaseProps<T>);
    componentDidUpdate(prevProps: FormBaseProps<T>): void;
    handleInputFocus: (field: APIFormField) => Promise<void>;
    handleInputChange: () => Promise<void>;
    handleInputBlur: (field: APIFormField) => Promise<void>;
    getNewState(
        oldState: FormBaseState,
        field: APIFormField,
        event: "blur" | "focus",
        error: string | undefined
    ): FormBaseState;
    componentWillUnmount: () => void;
    onFormSubmit: (e: FormEvent<Element>) => Promise<void>;
    render(): JSX.Element;
}
