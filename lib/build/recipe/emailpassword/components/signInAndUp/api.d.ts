import { APIFormField } from "../../../../types";
import { SignInThemeResponse, SignUpAPI, SignInAPI, SignUpThemeResponse } from "../../types";
export declare function handleSignUpAPI(formFields: APIFormField[], rid: string, signUpAPI: SignUpAPI): Promise<SignUpThemeResponse>;
export declare function handleSignInAPI(formFields: APIFormField[], rid: string, signInAPI: SignInAPI): Promise<SignInThemeResponse>;
