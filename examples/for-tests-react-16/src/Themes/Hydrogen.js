const HydrogenTheme = `
    [data-supertokens~=container] {
        --palette-background: 26, 25, 37;
        --palette-inputBackground: 16, 80, 147;
        --palette-inputBorder: 16, 80, 147;
        --palette-success: 65, 167, 0;
        --palette-primary: 22, 108, 198;
        --palette-primaryBorder: 4, 104, 193;
        --palette-error: 154, 0, 0;
        --palette-textTitle: 255, 255, 255;
        --palette-textLabel: 250, 250, 250;
        --palette-textPrimary: 250, 250, 250;
        --palette-textInput: 255, 255, 255;
        --palette-textLink: 254, 254, 254;
    };

    
    @media (max-width: 440px) {
        [data-supertokens~=container] {
            background: rgba(16, 80, 147, 1);
            margin: 0px;
            min-width: none;
            with: 100vw;
        }

        [data-supertokens~=row] {
            box-shadow: none;
            padding-left: 1rem;
            padding-right: 1rem;
        }
    },


    [data-supertokens~=divider] {
        display: none;
    },

    [data-supertokens~=container] {
        background-color: none;
        background: rgba(16, 80, 147, 1) url("./background.svg") no-repeat fixed center;
        margin-top: 0px;
        margin-bottom: 0px;
        border-radius: none;
        margin: 0 auto;
        border: none;
        box-shadow: none;
        width: 100vw;
        min-height: 95vh;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    },

    [data-supertokens~=inputWrapper] {
        flex: 1,
        color: #e9e9e9;
        border: 1px solid rgba(255, 255, 255, 0.15);
        outline: none;
        font-size: 1.25rem;
        text-align: center;
        transition: border 200ms ease 0ms,box-shadow 200ms ease 0ms;
        border-radius: 5px;
        line-height: normal;
        height: 45px;
    },

    [data-supertokens~=input] {
        box-shadow: none;
        border-radius: 5px;
        height: 45px;
    },

    [data-supertokens~=input]::placeholder {
        color: white;
    },

    [data-supertokens~=row] {
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: rgba(255, 255, 255, 0.5);
        background: linear-gradient(to right bottom,rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2));
        backdrop-filter: blur(2rem);
        padding-left: 3rem;
        padding-right: 3rem;
        border-radius: 6px;
        margin: 0px auto;
        border: none;
        box-shadow: none;
        width: 350px;
        max-width: 80%;
        text-align: center;
    },

    [data-supertokens~=headerTitle] {
        margin-bottom: 2rem;
    },

    [data-supertokens~=button] {
        margin-top: 15px;
        font-weight: 800,
        height: 42px;
        text-transform: uppercase;
        letter-spacing: .08rem;
        border-radius: 4px;
        padding: .7rem 1.4rem;
        border: none;
    },

    [data-supertokens~=privacyPolicyAndTermsAndConditions] {
        max-width: 100%;
        margin-top: 25px;
    },
`;

export default HydrogenTheme;
