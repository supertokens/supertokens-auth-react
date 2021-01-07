import { APIFormField } from "../../../../../types";
import { SignUpAPI, SignUpThemeResponse, SignInAPI, SignInThemeResponse, EmailExistsAPI } from "../../../types";
export declare function handleSignUpAPI(formFields: APIFormField[], rid: string, signUpAPI: SignUpAPI): Promise<SignUpThemeResponse>;
export declare function handleSignInAPI(formFields: APIFormField[], rid: string, signInAPI: SignInAPI): Promise<SignInThemeResponse>;
export declare function handleEmailExistsAPICall(value: string, rid: string, onCallEmailExistsAPI: EmailExistsAPI): Promise<string | undefined>;
