/*
 * Imports.
 */
import * as React from "react";
import {Fragment} from "react";

import { useCallback, useRef, useState } from "react";

/*
 * Component.
 */
export default function SignInTheme(props) {
    /*
     * Props.
     */
    const {signInForm} = props;
    const {callAPI, onSuccess, signUpClicked, forgotPasswordClick} = signInForm;
    let styleFromInit = signInForm.styleFromInit || {};
    /*
     * States.
     */
    let fieldsRef = useRef([]);

    const _formFieldsWithRef = signInForm.formFields.map(field => {
      return {
          ...field,
          ref: fieldsRef.current[field.id]
      }
  })
    const [formFields, setFormFields] = useState(_formFieldsWithRef);

    const [isLoading, setIsLoading] = useState(false);

    /*
     * Methods.
     */
    const onSignIn = async () => {

        // Set isLoading to true.
        setIsLoading(true);

        // Get the fields values from form.
        const fields = formFields.map(field => {
            return {
                id: field.id,
                value: (field.ref.current !== null) ? field.ref.current.value : ""
            }
        });

        // Do nothing. login directly.
        await callAPI(fields);
        // Call onSuccess if exist.
        if (onSuccess !== undefined) {
            onSuccess();
        }

    }

    const handleInputChange = useCallback(
        async (field) => {
            for (let i = 0; i < formFields.length; i++) {
                if (field.id === formFields[i].id) {
                    // remove error on input change.
                    formFields[i].error = undefined;
                }
            }

            // Delay the error update to prevent UI glitches.
            setTimeout(
                () => setFormFields([...formFields])
            , 300);
        },
        [formFields, setFormFields]
    );

    /*
     * Event Handlers.
     */
    const onFormSubmit = (e) => {
        e.preventDefault();
        onSignIn();
    };

    /*
     * Render.
     */
    return (
        <div >
            <div >
                
                <div>Se connecter</div>
                <div >
                    <div >
                        Pas enregistré? 
                        <span 
                            onClick={signUpClicked}
                        >
                            Créez un compte
                        </span>
                    </div>
                </div>

                <form noValidate onSubmit={onFormSubmit}>
                    {
                        formFields.map(field => {
                            let type = "text";
                            return (
                                <div key={field.id}>
                                    <Fragment>
                                     {field.id === 'password' && "Yes, the french theme has cleartext password input."}
                                        <label  >
                                            {field.label}
                                        </label>
                                        <input 
                                            type={type} 
                                            name={field.id}  
                                            placeholder={field.placeholder} 
                                            ref={field.ref}
                                            onChange={handleInputChange}
                                        /> 
                                        {field.error && <div style={styleFromInit.inputErrorMessage} />}
                                    </Fragment>
                                </div>
                            )
                        })
                    }
                    <div style={styleFromInit.formRow} key="signin-button">
                        <button disabled={isLoading} type="submit" >
                            Login
                        </button>
                    </div> 
                    <div 
                        onClick={forgotPasswordClick}
                    >
                        Mot de passe oublié?
                    </div>
                </form>


            </div>

        </div>
    );
}
