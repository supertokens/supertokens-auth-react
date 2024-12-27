import type { FormBaseProps } from "../../../types";
import type { FieldState } from "../formBase";
import type { FormEvent } from "react";

export type FormOnSubmitParameters<T> = FormBaseProps<T> & {
    event: FormEvent;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setFieldStates: React.Dispatch<React.SetStateAction<FieldState[]>>;
    fieldStates: FieldState[];
    unmounting: React.MutableRefObject<AbortController>;
    updateFieldState: (id: string, update: (os: FieldState) => FieldState) => void;
};
