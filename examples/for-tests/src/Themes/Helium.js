const HeliumTheme = {
    colors: {
        background: "#1a1925",
        inputBackground: "rgba(0, 0, 0, 0.10)",
        success: "#41a700",
        primary: "#6333FF",
        error: "#ff1717",
        textTitle: "#fff",
        textLabel: "#010d47",
        textPrimary: "#aeaeae",
        textInput: "#fff",
        textLink: "#4949e4",
    },

    style: {
        divider: {
            display: "none",
        },

        container: {
            marginTop: "0px",
            marginBottom: "0px",
            borderRadius: "none",
            margin: "0 auto",
            border: "none",
            boxShadow: "none",
            width: "100vw",
            height: "95vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "@media (max-width: 440px)": {
                margin: "0px",
                minWidth: "100%",
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
        },

        label: {
            display: "none",
        },

        row: {
            marginTop: "0px",
            borderRadius: "none",
            margin: "0 auto",
            border: "none",
            boxShadow: "none",
            width: "380px",
            textAlign: "center",
            "@media (max-width: 440px)": {
                margin: "0px auto",
                width: "90%",
            },
        },

        headerTitle: {
            marginBottom: "2rem",
        },

        headerSubtitle: {
            position: "absolute",
            top: "2rem",
            right: "1rem",
            "@media (max-width: 440px)": {
                margin: "0px auto",
                width: "90%",
                right: "none",
            },
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

export default HeliumTheme;
