"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
/*
 * Component
 */
function SignInHeader(_a) {
    /*
     * Render.
     */
    var onClick = _a.onClick;
    var styles = react_2.useContext(styleContext_1.default);
    return react_1.jsx(
        react_2.Fragment,
        null,
        react_1.jsx("div", { "data-supertokens": "headerTitle", css: styles.headerTitle }, "Sign In"),
        react_1.jsx(
            "div",
            { "data-supertokens": "headerSubtitle", css: styles.headerSubtitle },
            react_1.jsx(
                "div",
                { "data-supertokens": "secondaryText", css: styles.secondaryText },
                "Not registered yet?",
                react_1.jsx("span", { "data-supertokens": "link", onClick: onClick, css: styles.link }, "Sign Up")
            )
        ),
        react_1.jsx("div", { "data-supertokens": "divider", css: styles.divider })
    );
}
exports.default = SignInHeader;
