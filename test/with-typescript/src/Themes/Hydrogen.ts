const HydrogenTheme = {
    colors: {
        background: "#1a1925",
        inputBackground: "rgba(16, 80, 147, 1)",
        success: "#41a700",
        primary: "#166cc6",
        error: "#9a0000",
        textTitle: "#fff",
        textLabel: "#fafafa",
        textPrimary: "#fafafa",
        textInput: "#fff",
        textLink: "#fefefe",
    },

    style: {
        divider: {
            display: "none",
        },

        container: {
            backgroundColor: "none",
            background: 'rgba(16, 80, 147, 1) url("./background.svg") no-repeat fixed center;',
            marginTop: "0px",
            marginBottom: "0px",
            borderRadius: "none",
            margin: "0 auto",
            border: "none",
            boxShadow: "none",
            width: "100vw",
            minHeight: "95vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "@media (max-width: 440px)": {
                background: "rgba(16, 80, 147, 1)",
                margin: "0px",
                minWidth: "none",
                with: "100vw",
            },
        },

        inputWrapper: {
            flex: 1,
            color: "#e9e9e9",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            outline: "none",
            fontSize: "1.25rem",
            textAlign: "center",
            transition: "border 200ms ease 0ms,box-shadow 200ms ease 0ms",
            borderRadius: "5px",
            lineHeight: "normal",
            height: "45px",
        },

        input: {
            boxShadow: "none",
            borderRadius: "5px",
            height: "45px",
            "&::placeholder": {
                color: "white",
            },
        },

        row: {
            marginTop: "20px",
            marginBottom: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            background: "linear-gradient(to right bottom,rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))",
            backdropFilter: "blur(2rem)",
            paddingLeft: "3rem",
            paddingRight: "3rem",
            borderRadius: "6px",
            margin: "0px auto",
            border: "none",
            boxShadow: "none",
            width: "350px",
            maxWidth: "80%",
            textAlign: "center",
            "@media (max-width: 440px)": {
                boxShadow: "none",
                paddingLeft: "1rem",
                paddingRight: "1rem",
            },
        },

        headerTitle: {
            marginBottom: "2rem",
        },

        button: {
            marginTop: "15px",
            fontWeight: 800,
            height: "42px",
            textTransform: "uppercase",
            letterSpacing: ".08rem",
            borderRadius: "4px",
            padding: ".7rem 1.4rem",
            border: "none",
        },

        privacyPolicyAndTermsAndConditions: {
            maxWidth: "100%",
            marginTop: "25px",
        },
    },
};

export default HydrogenTheme;
