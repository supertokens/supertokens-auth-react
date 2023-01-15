const HeliumTheme = `
    [data-supertokens~=container] {
        --palette-background: 26, 25, 37;
        --palette-inputBackground: 230, 230, 230;
        --palette-inputBorder: 230, 230, 230;
        --palette-success: 65, 167, 0;
        --palette-primary: 99, 51, 255;
        --palette-primaryBorder: 99, 51, 255;
        --palette-error: 255, 23, 23;
        --palette-textTitle: 255, 255, 255;
        --palette-textLabel: 1, 13, 71;
        --palette-textPrimary: 174, 174, 174;
        --palette-textInput: 255, 255, 255;
        --palette-textLink: 73, 73, 228;
        
        margin-top: 0px;
        margin-bottom: 0px;
        border-radius: none;
        margin: 0 auto;
        border: none;
        box-shadow: none;
        width: 100vw;
        height: 95vh;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    @media (max-width: 440px) {
        [data-supertokens~=container] {
            margin: 0px;
            min-width: 100%;
        }

        [data-supertokens~=row] {
            margin: 0px auto;
            width: 90%;
        }

        [data-supertokens~=headerSubtitle] {
            margin: 0px auto;
            width: 90%;
            right: none;
        }
    }

    [data-supertokens~=divider] {
        display: none;
    }

    [data-supertokens~=inputWrapper] {
        flex: 1,
        color: #e9e9e9;
        border: 1px solid rgba(255, 255, 255, 0.15);
        outline: none;
        font-size 1.25rem;
        text-align center;
        transition: border 200ms ease 0ms,box-shadow 200ms ease 0ms;
        border-radius 5px;
        line-height normal;
        height: 45px;
    }

    [data-supertokens~=input] {
        box-shadow none;
        border-radius 5px;
        height: 45px;
    }

    [data-supertokens~=label] {
        display: none;
    }

    [data-supertokens~=row] {
        margin-top 0px;
        border-radius none;
        margin: 0 auto;
        border: none;
        box-shadow none;
        width: 380px;
        text-align center;
    }

    [data-supertokens~=headerTitle] {
        margin-bottom 2rem;
    }

    [data-supertokens~=headerSubtitle] {
        position: absolute;
        top: 2rem;
        right: 1rem;
    }

    [data-supertokens~=button] {
        margin-top 15px;
        font-weight 800,
        height: 42px;
        text-transform uppercase;
        letter-spacing .08rem;
        border-radius 4px;
        padding: .7rem 1.4rem;
        border: none;
    }

    [data-supertokens~=privacyPolicyAndTermsAndConditions] {
        max-width 100%;
        margin-top 25px;
    }
`;

export default HeliumTheme;
