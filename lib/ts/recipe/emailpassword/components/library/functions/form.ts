import STGeneralError from "supertokens-web-js/lib/build/error";

import type { FormOnSubmitParameters } from "./types";
import type { FieldState } from "../formBase";

export const handleFormSubmit = async ({
    event: e,
    setIsLoading,
    setFieldStates,
    formFields,
    fieldStates,
    callAPI,
    onError,
    onFetchError,
    clearError,
    onSuccess,
    unmounting,
    updateFieldState,
}: FormOnSubmitParameters<any>): Promise<void> => {
    // Prevent default event propagation.
    e?.preventDefault();

    // Set loading state.
    if (setIsLoading) {
        setIsLoading(true);
    }

    if (setFieldStates) {
        setFieldStates((os) => os.map((fs) => ({ ...fs, error: undefined })));
    }

    // Get the fields values from form.
    const apiFields = formFields?.map((field) => {
        const fieldState = fieldStates?.find((fs) => fs.id === field.id);
        return {
            id: field.id,
            value: fieldState === undefined ? "" : fieldState.value,
        };
    });

    const fieldUpdates: FieldState[] = [];
    // Call API.
    try {
        let result;
        let generalError: STGeneralError | undefined;
        let fetchError: Response | undefined;
        try {
            result = await callAPI(apiFields || [], (id, value) => fieldUpdates.push({ id, value }));
        } catch (e) {
            if (STGeneralError.isThisError(e)) {
                generalError = e;
            } else if (e instanceof Response) {
                fetchError = e;
            } else {
                throw e;
            }
        }
        if (unmounting?.current.signal.aborted) {
            return;
        }

        if (generalError !== undefined || (result !== undefined && result.status !== "OK")) {
            for (const field of formFields || []) {
                const update = fieldUpdates.find((f) => f.id === field.id);
                if ((update || field.clearOnSubmit === true) && updateFieldState) {
                    // We can do these one by one, it's almost never more than one field
                    updateFieldState(field.id, (os) => ({ ...os, value: update ? update.value : "" }));
                }
            }
        }

        if (generalError !== undefined) {
            onError(generalError.message);
        } else if (fetchError !== undefined) {
            if (onFetchError) {
                onFetchError(fetchError);
            } else {
                throw fetchError;
            }
        } else {
            // If successful
            if (result.status === "OK") {
                if (setIsLoading) {
                    setIsLoading(false);
                }
                clearError();
                if (onSuccess !== undefined) {
                    onSuccess(result);
                }
            }

            if (unmounting?.current.signal.aborted) {
                return;
            }

            // If field error.
            if (result.status === "FIELD_ERROR") {
                const errorFields = result.formFields;
                const getErrorMessage = (fs: FieldState) => {
                    const errorMessage = errorFields.find((ef: any) => ef.id === fs.id)?.error;
                    if (errorMessage === "Field is not optional") {
                        const fieldConfigData = formFields?.find((f) => f.id === fs.id);
                        // replace non-optional server error message from nonOptionalErrorMsg
                        if (fieldConfigData?.nonOptionalErrorMsg !== undefined) {
                            return fieldConfigData?.nonOptionalErrorMsg;
                        }
                    }
                    return errorMessage;
                };
                if (setFieldStates) {
                    setFieldStates((os) => os.map((fs) => ({ ...fs, error: getErrorMessage(fs) })));
                }
            }
        }
    } catch (e) {
        onError("SOMETHING_WENT_WRONG_ERROR");
    } finally {
        if (setIsLoading) {
            setIsLoading(false);
        }
    }
};
