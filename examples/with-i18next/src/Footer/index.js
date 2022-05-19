import i18next from "i18next";
import ReactCountryFlag from "react-country-flag";

export default function Footer() {
    return (
        <div
            style={{
                display: "flex",
                height: "80px",
                flexDirection: "row",
                width: "100%",
                backgroundColor: "#000000",
                color: "#ffffff",
                fontWeight: "bold",
                alignItems: "center",
            }}>
            <div
                style={{
                    textAlign: "center",
                    flexGrow: 1,
                }}>
                React Demo app. Made with ❤️ using supertokens.com
            </div>
            <ReactCountryFlag
                className="flagButton"
                countryCode="HU"
                svg={true}
                onClick={() => {
                    i18next.changeLanguage("hu");
                }}
            />
            <ReactCountryFlag
                className="flagButton"
                countryCode="US"
                svg={true}
                onClick={() => i18next.changeLanguage("en")}
            />
        </div>
    );
}
