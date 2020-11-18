import { APIFormField } from "../../../../../types";
import { SubmitNewPasswordThemeResponse, EnterEmailThemeResponse, EnterEmailAPI, SubmitNewPasswordAPI } from "../../../types";
export declare function handleSubmitNewPasswordAPI(formFields: APIFormField[], rid: string, submitNewPasswordAPI: SubmitNewPasswordAPI, token: string): Promise<SubmitNewPasswordThemeResponse>;
export declare function handleEnterEmailAPI(formFields: APIFormField[], rid: string, enterEmailAPI: EnterEmailAPI): Promise<EnterEmailThemeResponse>;
