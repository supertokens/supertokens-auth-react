import { APIFormField } from "../../../../../types";
import { SignUpAPI, SignUpThemeResponse, SignInAPI, SignInThemeResponse, VerifyEmailAPI } from "../../../types";
export declare function handleSignUpAPI(formFields: APIFormField[], rid: string, signUpAPI: SignUpAPI): Promise<SignUpThemeResponse>;
export declare function handleSignInAPI(formFields: APIFormField[], rid: string, signInAPI: SignInAPI): Promise<SignInThemeResponse>;
export declare function handleEmailExistsAPICall(value: string, rid: string, onCallEmailExistsAPI: VerifyEmailAPI): Promise<string | undefined>;
