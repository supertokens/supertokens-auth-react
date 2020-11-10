import React from "react";
import {useState, useRef} from "react";

/*
 * SignInAndUpTheme
 * props given from SignInAndUp feature component:
   SignInForm: https://github.com/supertokens/supertokens-auth-react/blob/0.0/lib/ts/recipe/emailpassword/types.ts#L319
   SignUpForm: https://github.com/supertokens/supertokens-auth-react/blob/0.0/lib/ts/recipe/emailpassword/types.ts#L341
 */

export default function SignInAndUp(props){
    const {signInForm, signUpForm} = props;
    /*
     * State.
     */
    const [isSignIn, setSignIn] = useState(false);

    /*
     * Render.
     */
     return (
        <div className="root">
            <div className="container-shadow"></div>
            <div className="container">
                <div className="wrap">
                    <div className="headings">
                        <span id="sign-up" className={!isSignIn ? 'active' : ''} onClick={() => setSignIn(false)}>SIGN UP</span>
                        <span id="sign-in" className={isSignIn ? 'active' : ''} onClick={() => setSignIn(true)}>SIGN IN</span>
                    </div>

                    {isSignIn && <SignIn {...signInForm} />}
                    {!isSignIn && <SignUp {...signUpForm}  />}
                </div>
            </div>

            {
            /* Because this component is rendered in a Shadow DOM
             * https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
             * you must use the <link> html tag to include your styling in encapsulation.
             */
            }
            <link
                href="./index.css"
                rel="stylesheet"
                type="text/css"
            />
        </div>
    )
}


function SignIn (props) {
    const {
        // styleFromInit,
        onSuccess,
        resetPasswordURL,
        forgotPasswordClick,
        formFields,
        callAPI,
        // defaultStyles,
        // palette
    } = props;

    /*
    * Inputs ref
    */
    const emailRef = useRef();
    const passwordRef = useRef();
    
    /*
     * Methods
     */

    const signIn = async (e) => {
        e.preventDefault();
        formFields[0].value = emailRef.current.value;
        formFields[1].value = passwordRef.current.value;
        const result = await callAPI(formFields);

        if (result.status === "OK") {
            if (onSuccess !== undefined) {
                onSuccess();
            }
        }

        if (result.status === "FIELD_ERROR") {
            result.formFields.forEach(field => {
                // Alert field errors one by one. 
                alert(`${field.id} : ${field.error}`);
            });
        }

        // Otherwise, alert the general message error.
        alert(result.message);
    }

    const onResetPassword = async () => {
        if (forgotPasswordClick) {
            forgotPasswordClick();
        } else {
            console.log(resetPasswordURL);
            window.location.href = resetPasswordURL;
        }
    }

    return (
        <div>
            <form onSubmit={signIn}>
                <label>{formFields[0].label}</label>
                <input ref={emailRef}  type="text" name="email" placeholder={formFields[0].placeholder}/>
                <label>{formFields[1].label}</label>
                <input ref={passwordRef} id="password" type="password" name="password"  placeholder={formFields[1].placeholder} />
                <input type="submit" className="button" name="submit" value="Create account"/>
            </form>
    
            <footer>
                <div className="hr"></div>
                <div className="fp"><span className="link" onClick={onResetPassword}>Forgot Password?</span></div>
            </footer>
        </div>
    )
}

function SignUp (props) {

    const {
        // styleFromInit,
        privacyPolicyLink,
        termsAndConditionsLink,
        onSuccess,
        formFields,
        callAPI,
        // defaultStyles,
        // palette
    } = props;
    /*
    * Inputs ref
    */
    const emailRef = useRef();
    const passwordRef = useRef();
    
    const signUp = async (e) => {
        e.preventDefault();
        formFields[0].value = emailRef.current.value;
        formFields[1].value = passwordRef.current.value;
        const result = await callAPI(formFields);

        if (result.status === "OK") {
            if (onSuccess !== undefined) {
                onSuccess();
            }
        }

        if (result.status === "FIELD_ERROR") {
            result.formFields.forEach(field => {
                // Alert field errors one by one. 
                alert(`${field.id} : ${field.error}`);
            });
        }

        // Otherwise, alert the general message error.
        alert(result.message);
    }


    return (
        <div>
            <form onSubmit={signUp}>
                {
                    /* 
                    * TODO 
                    * If you would like to implement a generic SuperTokens theme,
                    * you should make sure to support custom fields and not only email/password.
                    */
                }
                <label>{formFields[0].label}</label>
                <input ref={emailRef}  type="text" name="email" placeholder={formFields[0].placeholder}/>
                <label>{formFields[1].label}</label>
                <input ref={passwordRef} id="password" type="password" name="password"  placeholder={formFields[1].placeholder} />
                <input type="submit" className="button" name="submit" value="Create account"/>
            </form>
            <div className="terms">By signing up, you agree to our <a target="_blank" rel="noopener noreferrer" href={termsAndConditionsLink}>terms and conditions</a> and <a target="_blank" rel="noopener noreferrer" href={privacyPolicyLink}>privacy policies</a></div>
        </div>
    )
}