import React from "react";
import {useState, useRef} from "react";
import EmailPassword from "supertokens-auth-react/lib/build/recipe/emailpassword/emailPassword";
/*
 * SignInAndUpTheme
 * props given from SignInAndUp feature component:
 * https://github.com/supertokens/supertokens-auth-react/blob/b24e2c885ba11c46d868e4564da555deb9fbab71/lib/ts/recipe/emailpassword/types.ts#L353
 * SignInForm: https://github.com/supertokens/supertokens-auth-react/blob/b24e2c885ba11c46d868e4564da555deb9fbab71/lib/ts/recipe/emailpassword/types.ts#L309
 * SignUpForm: https://github.com/supertokens/supertokens-auth-react/blob/b24e2c885ba11c46d868e4564da555deb9fbab71/lib/ts/recipe/emailpassword/types.ts#L331
 */

export default function SignInAndUp(props){
    const {signInForm, signUpForm} = props;
    /*
     * State.
     */
    const [isSignIn, setSignIn] = useState(false);

    const palette = EmailPassword.getInstanceOrThrow().config.palette;
    /*
     * Render.
     */
     return (
         /*
          * For a more complete integration, we encourage you to use emotion.sh to define your styling
          * if you would like to create a generic SuperTokens theme.
          */
        <div className="root" style={{height: "600px", margin: "26px"}} >
            <div className="container-shadow"></div>
            <div className="container">
                <div className="wrap">
                    <div className="headingTitle">
                        <span id="sign-up" style={{color: palette.textPrimary}} className={!isSignIn ? 'active' : ''} onClick={() => setSignIn(false)}>SIGN UP</span>
                        <span id="sign-in" style={{color: palette.textPrimary}} className={isSignIn ? 'active' : ''} onClick={() => setSignIn(true)}>SIGN IN</span>
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
        styleFromInit,
        onSuccess,
        resetPasswordURL,
        forgotPasswordClick,
        formFields,
        callAPI
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
        alert(`General Error ${result.message}`);
    }

    const onResetPassword = async () => {
        if (forgotPasswordClick) {
            forgotPasswordClick();
        } else {
            window.location.href = resetPasswordURL;
        }
    }


    /*
     * Render.
     */

    const palette = EmailPassword.getInstanceOrThrow().config.palette;
    return (
        <div>
            <form onSubmit={signIn}>
                <label>{formFields[0].label}</label>
                <input 
                    /*
                    * Allow the user to overwrite default styles for input.
                    * If you are going to provide a generic SuperTokens theme,
                    * you should use this pattern everywhere.
                    */
                    style={{
                        color: palette.colors.textPrimary,
                        ...styleFromInit.input}
                    }
                    ref={emailRef}  type="text" name="email" placeholder={formFields[0].placeholder}
                />
                <label>{formFields[1].label}</label>
                <input ref={passwordRef} id="password" type="password" name="password"  placeholder={formFields[1].placeholder}
                />
                <input type="submit" className="button" name="submit" value="Log In"/>
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
        termsOfServiceLink,
        onSuccess,
        formFields,
        callAPI
    } = props;
    /*
    * Inputs ref
    */
   const [password, setPassword] = useState("");
   const [email, setEmail] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();
    
    const signUp = async (e) => {
        e.preventDefault();
        formFields[0].value = email;
        formFields[1].value = password;
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
        alert("General Error", result.message);
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
                <input ref={emailRef}  onChange={() => {setEmail(emailRef.current.value)}}  type="text" name="email" placeholder={formFields[0].placeholder}/>
                <label>{formFields[1].label}</label>
                <input ref={passwordRef} onChange={() => {setPassword(passwordRef.current.value)}} id="password" type="password" name="password"  placeholder={formFields[1].placeholder} />

                {/*
                 * Adding custom behaviour to your Sign Up widget.
                */}
                <PasswordStrengthMeter password={password} />
                <input type="submit" className="button" name="submit" value="Create account"/>
            </form>
            <div className="terms">By signing up, you agree to our <a target="_blank" rel="noopener noreferrer" href={termsOfServiceLink}>terms and conditions</a> and <a target="_blank" rel="noopener noreferrer" href={privacyPolicyLink}>privacy policies</a></div>
        </div>
    )
}

function PasswordStrengthMeter ({password}) {
    let progressBar;
    if (password === undefined) {
        progressBar = <div/>;
    } else {
        const passwordStrength = checkPassStrength(password);
        if (passwordStrength === undefined) {
            progressBar = <div/>;
        } else {
            progressBar = <div className="progress-bar" style={{
                width: passwordStrength.width,
                backgroundColor: passwordStrength.backgroundColor
                }}
            >
                {passwordStrength.value}
            </div>
        }
    }


    return (
        <div className="progress">
            {progressBar}
        </div>
    );
}


/*
* https://stackoverflow.com/questions/948172/password-strength-meter
*/

function checkPassStrength(pass) {
    var score = scorePassword(pass);
    if (score > 80)
        return {
            width: "100%",
            backgroundColor: "green",
            value:"strong"
        };
    if (score > 60)
        return {
            width: "60%",
            backgroundColor: "orange",
            value: "good"
        }
    if (score >= 10) {
        return {
            width: "30%",
            backgroundColor: "red",
            value: "weak"
        }
    }

    return undefined;
}

function scorePassword(pass) {
    let score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    let letters = {};
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    var variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] === true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}