import type { APIFormField } from "../../../../../types";
import type { FormBaseAPIResponse, FormFieldThemeProps } from "../../../types";
import type { FieldState } from "../formBase";
import type { FormEvent } from "react";

export type FormOnSubmitParameters<T> = {
    event?: FormEvent;
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    setFieldStates?: React.Dispatch<React.SetStateAction<FieldState[]>>;
    fieldStates?: FieldState[];
    unmounting?: React.MutableRefObject<AbortController>;
    updateFieldState?: (id: string, update: (os: FieldState) => FieldState) => void;

    formFields?: FormFieldThemeProps[];
    clearError: () => void;
    onError: (error: string) => void;
    onFetchError?: (err: Response) => void;
    onSuccess?: (result: T & { status: "OK" }) => void;

    callAPI: (fields: APIFormField[], setValue: (id: string, value: string) => void) => Promise<FormBaseAPIResponse<T>>;
};
