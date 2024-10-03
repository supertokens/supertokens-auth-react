"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var ThirdpartyWebJS = require("supertokens-web-js/recipe/thirdparty");
var index = require("./authRecipe-shared2.js");
var types = require("./multifactorauth-shared.js");
var utils = require("./authRecipe-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
var React = require("react");
var translationContext = require("./translationContext.js");
var NormalisedURLPath$1 = require("supertokens-web-js/lib/build/normalisedURLPath");

function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
}

var ThirdpartyWebJS__default = /*#__PURE__*/ _interopDefault(ThirdpartyWebJS);
var NormalisedURLPath__default = /*#__PURE__*/ _interopDefault(NormalisedURLPath);
var NormalisedURLPath__default$1 = /*#__PURE__*/ _interopDefault(NormalisedURLPath$1);

var _a = genericComponentOverrideContext.createGenericComponentsOverrideContext(),
    useContext = _a[0],
    Provider$1 = _a[1];

var isTextOverflowing = function (element) {
    return element.scrollWidth > element.clientWidth;
};
function ProviderButton(_a) {
    var logo = _a.logo,
        providerName = _a.providerName,
        displayName = _a.displayName;
    var t = translationContext.useTranslation();
    var providerStyleName = "provider".concat(providerName);
    var buttonTextContainerRef = React.useRef(null);
    var SCROLL_ANIMATION_CLASS = "scroll-text-animation";
    React.useLayoutEffect(function () {
        var buttonTextContainer = buttonTextContainerRef.current;
        if (buttonTextContainer && isTextOverflowing(buttonTextContainer)) {
            buttonTextContainer.classList.add(SCROLL_ANIMATION_CLASS);
        }
        var handleResize = function () {
            if (buttonTextContainer) {
                if (isTextOverflowing(buttonTextContainer)) {
                    buttonTextContainer.classList.add(SCROLL_ANIMATION_CLASS);
                } else {
                    buttonTextContainer.classList.remove(SCROLL_ANIMATION_CLASS);
                }
            }
        };
        addEventListener("resize", handleResize);
        return function () {
            removeEventListener("resize", handleResize);
        };
    }, []);
    return jsxRuntime.jsxs(
        "button",
        genericComponentOverrideContext.__assign(
            { "data-supertokens": "button providerButton ".concat(providerStyleName) },
            {
                children: [
                    logo !== undefined &&
                        jsxRuntime.jsx(
                            "div",
                            genericComponentOverrideContext.__assign(
                                { "data-supertokens": "providerButtonLeft" },
                                {
                                    children: jsxRuntime.jsx(
                                        "div",
                                        genericComponentOverrideContext.__assign(
                                            { "data-supertokens": "providerButtonLogo" },
                                            {
                                                children: jsxRuntime.jsx(
                                                    "div",
                                                    genericComponentOverrideContext.__assign(
                                                        { "data-supertokens": "providerButtonLogoCenter" },
                                                        { children: logo }
                                                    )
                                                ),
                                            }
                                        )
                                    ),
                                }
                            )
                        ),
                    jsxRuntime.jsx(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "providerButtonText", ref: buttonTextContainerRef },
                            {
                                children: jsxRuntime.jsxs("span", {
                                    children: [
                                        t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_START"),
                                        displayName,
                                        t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_END"),
                                    ],
                                }),
                            }
                        )
                    ),
                ],
            }
        )
    );
}

var Provider = /** @class */ (function () {
    function Provider(config) {
        var _this = this;
        this.config = config;
        this.getButton = function (name) {
            if (_this.config.buttonComponent !== undefined) {
                if (typeof _this.config.buttonComponent === "function") {
                    return jsxRuntime.jsx(_this.config.buttonComponent, {
                        name: name !== null && name !== void 0 ? name : _this.name,
                    });
                }
                return _this.config.buttonComponent;
            }
            var providerName = name !== undefined ? name : _this.name;
            return jsxRuntime.jsx(ProviderButton, {
                logo: _this.getLogo(),
                providerName: providerName,
                displayName: providerName,
            });
        };
    }
    Object.defineProperty(Provider.prototype, "id", {
        get: function () {
            return this.config.id;
        },
        enumerable: false,
        configurable: true,
    });
    Object.defineProperty(Provider.prototype, "name", {
        get: function () {
            if (this.config.name === undefined) {
                throw new Error("Name not defined for provider ".concat(this.config.id));
            }
            return this.config.name;
        },
        enumerable: false,
        configurable: true,
    });
    Provider.prototype.getRedirectURL = function () {
        if (this.config.getRedirectURL) {
            return this.config.getRedirectURL(this.config.id);
        }
        var domain =
            genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().appInfo.websiteDomain.getAsStringDangerous();
        var callbackPath = new NormalisedURLPath__default.default("/callback/".concat(this.config.id));
        var path = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow()
            .appInfo.websiteBasePath.appendPath(callbackPath)
            .getAsStringDangerous();
        return "".concat(domain).concat(path);
    };
    Provider.prototype.getRedirectURIOnProviderDashboard = function () {
        return undefined;
    };
    return Provider;
})();

/*
 * Class.
 */
var ActiveDirectory = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(ActiveDirectory, _super);
    /*
     * Constructor.
     */
    function ActiveDirectory(config) {
        var _this =
            _super.call(
                this,
                genericComponentOverrideContext.__assign({ id: "active-directory", name: "Active Directory" }, config)
            ) || this;
        _this.getLogo = function () {
            return jsxRuntime.jsxs(
                "svg",
                genericComponentOverrideContext.__assign(
                    {
                        width: "18",
                        height: "16",
                        viewBox: "0 0 416 415",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                    },
                    {
                        children: [
                            jsxRuntime.jsxs(
                                "g",
                                genericComponentOverrideContext.__assign(
                                    { clipPath: "url(#clip0_402_84)" },
                                    {
                                        children: [
                                            jsxRuntime.jsx("path", {
                                                d: "M415.575 316.343V403.598C415.575 413.817 412.431 415.914 402.736 414.341C337.753 404.646 271.984 395.737 206.477 386.566C194.686 384.994 190.494 380.802 190.494 367.963C191.542 321.584 191.018 274.943 190.494 228.04C190.494 217.821 193.638 214.677 203.857 214.677C270.936 215.201 336.967 215.201 402.736 215.201C413.479 215.201 416.099 219.393 416.099 229.088C415.051 258.435 415.575 287.258 415.575 316.343Z",
                                                fill: "#00AAF2",
                                            }),
                                            jsxRuntime.jsx("path", {
                                                d: "M304.214 198.431C271.198 198.431 238.183 197.907 205.167 198.431C194.948 198.431 190.756 196.335 190.756 184.544C191.28 137.117 191.28 90.4763 190.756 43.5734C190.756 34.4025 193.9 31.2582 202.547 29.686C270.15 19.991 337.753 10.558 405.356 0.338969C417.147 -1.23319 415.051 6.62762 415.051 13.1783C415.051 55.1026 415.575 97.813 415.051 139.737C415.051 155.197 414.527 170.657 415.051 186.116C415.575 195.811 411.907 198.431 402.736 198.431C370.244 197.907 337.229 198.431 304.214 198.431Z",
                                                fill: "#00AAF2",
                                            }),
                                            jsxRuntime.jsx("path", {
                                                d: "M85.6828 215.987H159.574C167.435 215.987 170.842 218.608 170.842 226.73V372.417C170.842 380.802 167.173 381.588 159.574 380.802C110.575 373.466 61.5764 366.391 12.8393 359.578C3.14432 358.006 0 354.862 0 344.643C0.524054 305.863 0.524054 267.083 0 227.516C0 217.821 2.62027 215.201 12.3153 215.201C37.2078 215.987 61.0523 215.987 85.6828 215.987Z",
                                                fill: "#00AAF2",
                                            }),
                                            jsxRuntime.jsx("path", {
                                                d: "M85.6827 198.431H12.8392C3.66825 198.431 0.523926 195.287 0.523926 185.592C1.04798 147.336 1.04798 109.08 0.523926 70.5621C0.523926 61.3912 3.1442 58.2469 12.8392 56.6747C61.8383 50.3861 110.837 43.3113 159.574 35.4505C170.842 33.8784 171.89 37.5467 171.89 46.7177V186.116C171.89 196.335 167.697 197.907 158.526 197.907C134.158 197.907 109.527 198.431 85.6827 198.431Z",
                                                fill: "#00AAF2",
                                            }),
                                        ],
                                    }
                                )
                            ),
                            jsxRuntime.jsx("defs", {
                                children: jsxRuntime.jsx(
                                    "clipPath",
                                    genericComponentOverrideContext.__assign(
                                        { id: "clip0_402_84" },
                                        {
                                            children: jsxRuntime.jsx("rect", {
                                                width: "416",
                                                height: "415",
                                                fill: "white",
                                            }),
                                        }
                                    )
                                ),
                            }),
                        ],
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    ActiveDirectory.init = function (config) {
        if (ActiveDirectory.instance !== undefined) {
            console.warn("ActiveDirectory Provider was already initialized");
            return ActiveDirectory.instance;
        }
        ActiveDirectory.instance = new ActiveDirectory(config);
        return ActiveDirectory.instance;
    };
    /*
     * Tests methods.
     */
    ActiveDirectory.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        ActiveDirectory.instance = undefined;
        return;
    };
    return ActiveDirectory;
})(Provider);

/*
 * Class.
 */
var Apple = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(Apple, _super);
    /*
     * Constructor.
     */
    function Apple(config) {
        var _this =
            _super.call(this, genericComponentOverrideContext.__assign({ id: "apple", name: "Apple" }, config)) || this;
        _this.getLogo = function () {
            return jsxRuntime.jsx(
                "svg",
                genericComponentOverrideContext.__assign(
                    {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "15.614",
                        height: "18",
                        viewBox: "0 0 15.614 18.737",
                    },
                    {
                        children: jsxRuntime.jsxs(
                            "g",
                            genericComponentOverrideContext.__assign(
                                {
                                    id: "iconfinder_logo_brand_brands_logos_apple_ios_2993701",
                                    transform: "translate(-2)",
                                },
                                {
                                    children: [
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91415",
                                            d: "M14.494 11.075a4.29 4.29 0 0 1 2.372-3.836A4.888 4.888 0 0 0 13.713 6a4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375A4.783 4.783 0 0 0 6.685 6C6.206 6 2 6.153 2 11.465c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.194-.464 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826a4.209 4.209 0 0 1-3.119-4.151z",
                                            style: { fill: "#000" },
                                            transform: "translate(0 -1.316)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "XMLID_1339_",
                                            d: "M12 4.684A4.734 4.734 0 0 0 15.906 0 4.734 4.734 0 0 0 12 4.684z",
                                            style: { fill: "#000" },
                                            transform: "translate(-2.193)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91416",
                                            d: "M6.685 6.2a4.783 4.783 0 0 1 1.83.406 4.357 4.357 0 0 0 1.684.375 4.357 4.357 0 0 0 1.684-.381 4.783 4.783 0 0 1 1.83-.406 4.953 4.953 0 0 1 3.014 1.126c.047-.026.091-.058.14-.082A4.888 4.888 0 0 0 13.713 6a4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375A4.783 4.783 0 0 0 6.685 6C6.206 6 2 6.153 2 11.465v.107C2.053 6.352 6.208 6.2 6.685 6.2z",
                                            style: { fill: "#000", opacity: 0.1 },
                                            transform: "translate(0 -1.316)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91417",
                                            d: "M13.713 21.368a5.187 5.187 0 0 1-2.194-.463 3.2 3.2 0 0 0-1.32-.317 3.2 3.2 0 0 0-1.32.316 5.18 5.18 0 0 1-2.194.464c-1.707 0-4.633-4.174-4.681-8.48v.088c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.19-.463 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826-.023-.006-.043-.017-.066-.023-.991 2.654-2.655 4.653-3.834 4.653z",
                                            style: { fill: "#000", opacity: 0.2 },
                                            transform: "translate(0 -2.826)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91418",
                                            d: "M15.888.4A4.621 4.621 0 0 1 12 4.544v.2A4.745 4.745 0 0 0 15.9.261c0 .039 0 .098-.012.139z",
                                            style: { fill: "#000", opacity: 0.2 },
                                            transform: "translate(-2.193 -.057)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91419",
                                            d: "M12.005 4.477c.009-.051.02-.192.032-.278q.012-.161.035-.317A4.491 4.491 0 0 1 15.9.2V0a4.738 4.738 0 0 0-3.895 4.477z",
                                            style: { fill: "#000", opacity: 0.1 },
                                            transform: "translate(-2.194)",
                                        }),
                                        jsxRuntime.jsx("path", {
                                            id: "Path_91420",
                                            d: "M14.494 9.759a4.29 4.29 0 0 1 2.372-3.836 4.888 4.888 0 0 0-3.153-1.239 4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375 4.783 4.783 0 0 0-1.83-.406C6.206 4.684 2 4.838 2 10.15c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.194-.464 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826a4.209 4.209 0 0 1-3.119-4.152zM13.713 0a4.734 4.734 0 0 0-3.9 4.684A4.734 4.734 0 0 0 13.713 0z",
                                            style: { fill: "#000" },
                                        }),
                                    ],
                                }
                            )
                        ),
                    }
                )
            );
        };
        return _this;
    }
    Apple.prototype.getRedirectURIOnProviderDashboard = function () {
        var domain =
            genericComponentOverrideContext.SuperTokens.getInstanceOrThrow().appInfo.apiDomain.getAsStringDangerous();
        var callbackPath = new NormalisedURLPath__default$1.default("/callback/".concat(this.id));
        var path = genericComponentOverrideContext.SuperTokens.getInstanceOrThrow()
            .appInfo.apiBasePath.appendPath(callbackPath)
            .getAsStringDangerous();
        return "".concat(domain).concat(path);
    };
    /*
     * Static Methods
     */
    Apple.init = function (config) {
        if (Apple.instance !== undefined) {
            console.warn("Apple Provider was already initialized");
            return Apple.instance;
        }
        Apple.instance = new Apple(config);
        return Apple.instance;
    };
    /*
     * Tests methods.
     */
    Apple.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        Apple.instance = undefined;
        return;
    };
    return Apple;
})(Provider);

/*
 * Class.
 */
var Bitbucket = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(Bitbucket, _super);
    /*
     * Constructor.
     */
    function Bitbucket(config) {
        var _this =
            _super.call(
                this,
                genericComponentOverrideContext.__assign({ id: "bitbucket", name: "Bitbucket" }, config)
            ) || this;
        _this.getLogo = function () {
            return jsxRuntime.jsxs(
                "svg",
                genericComponentOverrideContext.__assign(
                    {
                        width: "19",
                        height: "17",
                        viewBox: "0 0 19 17",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                    },
                    {
                        children: [
                            jsxRuntime.jsx("path", {
                                d: "M0.59534 0.0522702C0.229457 0.0522702 -0.0841565 0.365883 0.0203815 0.73174L2.58156 16.2556C2.63383 16.6738 2.99971 16.9351 3.3656 16.9351H15.6488C15.9624 16.9351 16.1715 16.726 16.2238 16.4124L18.7849 0.679471C18.8372 0.313614 18.5759 0 18.21 0L0.59534 0.0522702ZM11.3628 11.2901H7.44258L6.3972 5.74956H12.3036L11.3628 11.2901Z",
                                fill: "#2684FF",
                            }),
                            jsxRuntime.jsx("path", {
                                d: "M17.9502 5.76172H12.3052L11.3643 11.3022H7.44415L2.84448 16.7905C2.84448 16.7905 3.05356 16.9996 3.36717 16.9996H15.6504C15.964 16.9996 16.1731 16.7905 16.2253 16.4769L17.9502 5.76172Z",
                                fill: "url(#paint0_linear_4108_67124)",
                            }),
                            jsxRuntime.jsx("defs", {
                                children: jsxRuntime.jsxs(
                                    "linearGradient",
                                    genericComponentOverrideContext.__assign(
                                        {
                                            id: "paint0_linear_4108_67124",
                                            x1: "19.2748",
                                            y1: "7.29202",
                                            x2: "9.92001",
                                            y2: "14.5943",
                                            gradientUnits: "userSpaceOnUse",
                                        },
                                        {
                                            children: [
                                                jsxRuntime.jsx("stop", { offset: "0.176", stopColor: "#0052CC" }),
                                                jsxRuntime.jsx("stop", { offset: "1", stopColor: "#2684FF" }),
                                            ],
                                        }
                                    )
                                ),
                            }),
                        ],
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Bitbucket.init = function (config) {
        if (Bitbucket.instance !== undefined) {
            console.warn("Bitbucket Provider was already initialized");
            return Bitbucket.instance;
        }
        Bitbucket.instance = new Bitbucket(config);
        return Bitbucket.instance;
    };
    /*
     * Tests methods.
     */
    Bitbucket.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        Bitbucket.instance = undefined;
        return;
    };
    return Bitbucket;
})(Provider);

var oktaLogo = jsxRuntime.jsx(
    "svg",
    genericComponentOverrideContext.__assign(
        { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", fill: "none", viewBox: "0 0 1593 1594" },
        {
            children: jsxRuntime.jsx("path", {
                fill: "#000",
                d: "M755.371.823c-1.784.423-3.873 1.292-4.642 1.93-4.011 3.329-4.03 2.828 3.816 102.179 4.144 52.479 7.783 97.553 8.087 100.166l.552 4.75h-18.458c-18.345 0-18.476.016-21.5 2.56-1.812 1.525-3.249 3.851-3.552 5.75-.28 1.755 3.667 47.065 8.77 100.69l9.279 97.5 2.946-.199c1.62-.109 9.021-.896 16.446-1.749 15.874-1.822 56.698-2.089 73.85-.482 6.243.585 11.507.906 11.699.714.192-.192 7.859-91.831 17.038-203.643L876.391 7.694l-1.982-2.673c-3.68-4.965-4.904-5.063-62.294-5.014-29.425.025-54.96.392-56.744.816ZM565.615 32.419c-12.65 4.653-35.6 13.05-51 18.66-30.467 11.1-34.5 13.387-34.5 19.555 0 1.643 3.88 11.475 8.621 21.85a251369.25 251369.25 0 0 0 41.5 90.672c18.084 39.495 32.879 72.149 32.879 72.566 0 .416-3.038 1.81-6.75 3.098-17.271 5.992-27.33 10.304-28.743 12.322-3.57 5.097-2.998 6.522 33.113 82.431 19.042 40.026 38.002 79.975 42.135 88.775 4.133 8.8 7.679 16.188 7.88 16.417.201.229 7.903-3.218 17.115-7.661 25.215-12.16 47.01-20.242 71.123-26.373 5.155-1.311 9.56-2.866 9.789-3.456.229-.591-10.43-40.641-23.686-89-13.257-48.36-29.283-106.827-35.613-129.927-33.881-123.636-46.505-169.275-47.514-171.784-1.635-4.064-5.524-6.725-9.734-6.661-1.988.03-13.965 3.863-26.615 8.516Zm456.555 4.179c-2.77 2.562-4.79 9.34-29.551 99.205-14.619 53.05-26.705 96.58-26.858 96.732-.152.153-6.548-2.005-14.212-4.795-20.053-7.3-20.548-7.406-24.866-5.357-2 .949-4.039 2.477-4.531 3.395-.491.918-11.073 40.572-23.515 88.12-12.442 47.547-23.705 90.482-25.029 95.409-1.325 4.928-2.224 9.143-2 9.367.224.225 8.868 2.567 19.207 5.205 25.239 6.441 45.896 13.772 68.675 24.373 5.431 2.528 10.212 4.596 10.623 4.596.412 0 6.615-12.712 13.785-28.25s35.852-77.75 63.742-138.25c27.88-60.5 60.15-130.475 71.71-155.5 11.55-25.025 21.22-47.097 21.49-49.05.38-2.811-.07-4.201-2.16-6.695-1.46-1.732-3.65-3.448-4.86-3.813-1.21-.366-13.01-4.628-26.21-9.472-60.69-22.27-76.91-27.97-79.59-27.97-1.75 0-4.04 1.077-5.85 2.75ZM329.005 148.532c-83.376 69.681-80.229 66.73-78.275 73.406.605 2.068 23.023 25.494 70.885 74.076 38.5 39.079 70.135 71.407 70.299 71.84.164.433-5.744 5.767-13.129 11.854-7.385 6.086-13.707 11.794-14.049 12.685-.341.89-.621 3.468-.621 5.728 0 4.102.084 4.192 52.25 55.619 28.738 28.331 60.827 59.982 71.31 70.337l19.061 18.826 17.439-17.345c18.573-18.472 31.688-29.664 49.44-42.192 6.05-4.269 11.396-8.126 11.879-8.569.484-.444-4.65-8.601-11.409-18.128-29.995-42.278-103.55-146.201-158.772-224.321-33.046-46.75-61.613-86.687-63.482-88.75-2.97-3.279-3.964-3.75-7.916-3.75-4.214 0-5.22.586-14.91 8.684Zm937.855 12.071c-1.52.96-18.62 24.057-38 51.328-19.39 27.271-45.37 63.826-57.75 81.234-12.37 17.407-22.79 31.545-23.15 31.416-.36-.128-5.91-4.733-12.33-10.233-14.82-12.707-17.39-14.154-22.44-12.64-3.48 1.042-5.38 3.441-23.63 29.887-47.61 69-58.8 85.209-75.62 109.504-9.8 14.162-17.8 26.087-17.77 26.5.03.412 4.58 3.645 10.12 7.184 20.37 13.023 38.83 27.846 58.22 46.761l12.89 12.579 35.15-35.388c19.33-19.463 57.86-58.337 85.62-86.387 27.76-28.05 76.28-77.051 107.82-108.891 32.09-32.395 57.92-59.261 58.64-61.001 2.35-5.613.99-8.068-9.39-16.957-23.16-19.83-76.82-64.419-78.81-65.483-3.08-1.646-6.36-1.444-9.57.587ZM145.518 334.381c-2.55 1.291-7.978 10.007-30.687 49.268-15.174 26.234-28.086 49.015-28.694 50.623-1.41 3.729-.522 7.763 2.28 10.37 2.027 1.886 30.964 16.076 68.698 33.686 22.946 10.709 83.41 39.326 99.678 47.178l14.177 6.842-8.912 15c-9.876 16.622-10.854 20.262-6.693 24.892 2.053 2.284 14.494 8.234 69.25 33.115 8.8 3.999 24.55 11.198 35 15.998 10.45 4.8 26.875 12.312 36.5 16.695 9.625 4.382 22.822 10.46 29.326 13.508 6.666 3.123 12.194 5.159 12.67 4.666.464-.481 2.539-5.149 4.61-10.374 7.806-19.692 25.512-51.411 39.869-71.421 3.08-4.293 5.696-8.167 5.813-8.608.117-.441-4.513-4.065-10.288-8.054s-26.475-18.272-46-31.74-39.775-27.506-45-31.196c-5.225-3.691-20.525-14.286-34-23.546a33783.27 33783.27 0 0 1-75.5-52.037c-7.15-4.943-32.8-22.645-57-39.337-24.2-16.692-49.015-33.886-55.144-38.209-12.147-8.567-15.244-9.703-19.953-7.319Zm1308.622 25.652c-2.23.828-6.61 3.808-80.53 54.809-86.05 59.378-85.34 58.904-86.3 57.675-.5-.643-4.62-7.59-9.14-15.438-8.38-14.54-10.93-17.231-16.28-17.231-2.73 0-.52-1.454-32.78 21.499-14.02 9.978-42.82 30.456-64 45.506-58.82 41.808-69 49.116-69 49.557 0 .223 2.86 4.126 6.35 8.672 14.23 18.555 27.97 41.04 39.71 65.011l8.11 16.57 5.17-2.291c2.84-1.26 19.34-9.028 36.66-17.263 17.33-8.236 38.93-18.474 48-22.752 17.19-8.103 83.71-39.62 114-54.017 9.63-4.573 43.83-20.787 76-36.03 88.25-41.81 88.53-41.945 90.34-44.533 3.72-5.311 3.08-6.747-24.19-53.806-14.22-24.543-26.55-45.982-27.41-47.644-3.54-6.895-9.46-10.234-14.71-8.294ZM31.37 581.891c-4.372.946-5.716 2.231-7.554 7.221-2.31 6.267-20.023 108.318-19.301 111.193.338 1.346 1.633 3.633 2.879 5.081 2.552 2.967 2.076 2.891 39.72 6.381 11.826 1.096 48.05 4.493 80.501 7.547 32.45 3.055 64.4 6.045 71 6.646 6.6.6 12.193 1.276 12.429 1.502.236.226-.787 7.492-2.272 16.148-3.339 19.455-3.369 22.178-.278 25.512 2.64 2.85 3.824 3.08 24.121 4.685 21.47 1.698 122.644 9.938 142.5 11.606 36.435 3.061 35.603 3.054 36.334.323.351-1.313.649-5.538.662-9.388.058-17.491 5.433-52.057 12.024-77.331 2.103-8.063 3.658-14.824 3.457-15.025-.361-.362-58.534-15.664-102.977-27.089-12.65-3.251-42.125-10.933-65.5-17.069a47473.272 47473.272 0 0 0-63-16.499 22538.853 22538.853 0 0 1-32-8.362c-6.325-1.662-37.6-9.81-69.5-18.107-31.9-8.297-58.45-15.219-59-15.382-.55-.162-2.46.02-4.244.407Zm1514.74 33.924c-7.97 2.088-28.67 7.474-46 11.968a55769.76 55769.76 0 0 0-81.33 21.205c-27.4 7.169-50.04 12.824-50.29 12.567-.26-.257-1.78-7.942-3.38-17.078-1.6-9.137-3.39-17.492-3.96-18.569-1.51-2.811-5.08-5.06-8.03-5.06-2.23 0-33.9 8.49-97.01 26.001-37.74 10.475-91.57 25.245-93.8 25.742-1.64.363-2.13.985-1.68 2.135.35.892 2.41 7.689 4.58 15.105 6.72 22.919 11.75 50.1 13.88 74.907.53 6.264 1.12 11.54 1.31 11.725.18.184 4.35-.09 9.27-.609 4.92-.52 16.82-1.651 26.44-2.514 9.63-.863 21.55-2.003 26.5-2.533 4.95-.53 16.65-1.632 26-2.448 9.35-.817 29.15-2.62 44-4.007 14.85-1.387 39.15-3.649 54-5.028 14.85-1.378 31.95-2.971 38-3.541 6.05-.569 20.23-1.894 31.5-2.945 44-4.098 87.87-8.19 117.99-11.006 33.82-3.161 34.93-3.434 37.8-9.274 1.11-2.276.11-9.376-7.79-55.41-4.99-29.04-9.78-54.751-10.65-57.135-1.73-4.763-6.15-8.212-10.35-8.077-1.37.045-9.02 1.79-17 3.879Zm-366 195.283c-.01 18.555-5.17 54.118-11.53 79.429-2.45 9.755-4.12 18.066-3.71 18.469.41.404 18.29 5.304 39.74 10.889 61.13 15.918 138.64 36.127 178 46.413 52.36 13.678 138.35 36.102 157.87 41.172 9.28 2.41 17.74 4.38 18.8 4.38 3.32 0 7.51-2.79 8.59-5.71 1.51-4.09 19.3-107.109 19.27-111.619-.03-4.746-4.13-9.271-9.13-10.07-1.87-.299-16.22-1.696-31.9-3.104-15.67-1.408-47.62-4.372-71-6.586-23.37-2.214-54.14-5.11-68.38-6.435-14.23-1.326-26.04-2.565-26.23-2.754-.18-.19 1.07-8.208 2.79-17.82 2.81-15.646 2.99-17.777 1.73-20.35-3.31-6.765-2.55-6.626-60.41-11.061-11-.843-36.2-2.872-56-4.509-19.8-1.638-41.85-3.453-49-4.035-7.15-.582-17.95-1.482-24-2-16.99-1.455-15.49-1.967-15.5 5.301Zm-782.995 7.814c-4.675.432-21.1 1.967-36.5 3.411-15.4 1.444-32.5 3.034-38 3.532-46.038 4.177-125.826 11.487-152.071 13.933-30.166 2.811-74.861 6.927-136.86 12.602-29.276 2.68-30.668 3.058-33.15 8.997-1.316 3.15-.754 7.115 8.172 57.665 5.272 29.856 10.205 55.765 10.96 57.576.926 2.213 2.575 3.793 5.03 4.819 3.586 1.498 4.46 1.316 46.287-9.619 90.806-23.741 149.992-38.98 151.388-38.98 1.09 0 2.023 3.34 3.701 13.25 3.94 23.264 4.524 24.764 10.402 26.703 3.055 1.009 5.877.461 25.785-5.005a52307.598 52307.598 0 0 0 110.356-30.462c13.018-3.616 34.768-9.537 50.25-13.68 9.362-2.505 9.314-2.416 6.207-11.399-7.354-21.262-14.494-58.062-16.522-85.157l-.693-9.25-3.121.139c-1.717.077-6.946.493-11.621.925Zm755.925 120.631c-9.79 25.743-30.43 63.057-46.59 84.227-2.73 3.58-3.15 4.68-2.12 5.65.71.67 7.13 5.22 14.28 10.12 7.15 4.9 25.38 17.48 40.5 27.95 15.13 10.48 36.95 25.55 48.5 33.5 11.55 7.95 37.2 25.64 57 39.33 19.8 13.68 51.98 35.9 71.5 49.37 19.53 13.47 40.45 27.94 46.5 32.16 38.09 26.57 54.08 37.3 56.68 38.05 1.89.54 4.3.41 6.63-.35 3.37-1.11 4.55-2.74 15.26-21.2 6.38-11 19.18-33.05 28.45-49 21.88-37.65 21.87-37.56 3.98-45.99-4.95-2.33-21.6-10.2-37-17.48l-45-21.27c-9.35-4.41-30.27-14.32-46.5-22.02-16.22-7.69-32.8-15.53-36.83-17.41-7.12-3.31-7.3-3.48-5.91-5.62.79-1.22 4.88-8.1 9.09-15.29 10.53-17.98 10.31-21.17-1.85-27.2-5.28-2.62-19.61-9.21-94.5-43.45-9.62-4.402-31.59-14.476-48.81-22.387-17.23-7.912-31.53-14.385-31.78-14.385s-.92 1.213-1.48 2.695Zm-761.925 31.904c-27.225 12.945-59.4 28.181-71.5 33.853a9396.97 9396.97 0 0 0-45.5 21.54c-12.925 6.17-40.15 19.1-60.5 28.73-20.35 9.63-49.6 23.49-65 30.78-15.4 7.3-38.125 18.05-50.5 23.89-22.428 10.58-26.352 13.18-27.632 18.28-.881 3.51-.228 4.75 29.988 57.23 27.044 46.97 28.543 49.09 34.644 49.09 1.58 0 10.048-5.21 23-14.14 11.275-7.77 28.375-19.57 38-26.2 9.625-6.64 24.048-16.59 32.052-22.11 8.004-5.53 24.342-16.79 36.306-25.04 11.965-8.25 25.66-17.78 30.435-21.17 4.774-3.38 8.99-5.97 9.368-5.73.378.23 4.383 6.96 8.9 14.94 4.516 7.99 9.336 15.41 10.71 16.49 1.472 1.16 4.035 1.97 6.239 1.97 3.169 0 6.237-1.78 20.115-11.66 9.006-6.41 29.425-20.95 45.375-32.32 15.95-11.36 44.75-31.83 64-45.5 19.25-13.66 35.374-25.16 35.832-25.56.457-.4-3.105-6.02-7.916-12.49-13.915-18.71-24.763-36.442-35.622-58.222-5.553-11.138-10.366-20.235-10.695-20.218-.33.018-22.874 10.623-50.099 23.567Zm678.495 94.723c-16.66 16.92-35.04 32.67-52.63 45.1l-11.63 8.22 10.19 14.43c5.6 7.93 18.97 26.8 29.7 41.93 10.73 15.12 31.58 44.6 46.35 65.5 14.76 20.9 30.07 42.5 34.03 48 3.95 5.5 30.7 43.3 59.44 84s53.78 75.46 55.64 77.25c2.65 2.54 4.24 3.25 7.32 3.25 3.62 0 5.45-1.27 22.76-15.78 10.36-8.68 29.75-24.93 43.1-36.11 13.35-11.17 24.93-21.27 25.75-22.44.82-1.16 1.48-3.86 1.48-6 0-3.76-1.25-5.15-43.13-47.8-23.72-24.16-43.45-44.12-43.84-44.36-.39-.24-12.92-12.99-27.84-28.32l-27.13-27.89 12.57-10.37c6.91-5.7 13.43-11.45 14.47-12.78 2.15-2.74 2.43-7.62.62-10.75-1.16-2-140.29-139.68-141.59-140.11-.34-.12-7.38 6.65-15.63 15.03Zm-584.07 22.93c-42.041 42.45-204.9 207.13-232.398 234.99-12.91 13.08-24.032 24.79-24.715 26.02-.682 1.23-1.257 3.56-1.277 5.18-.048 4.02 2.855 6.69 50.328 46.31 41.907 34.97 41.845 34.93 48.013 32.12 1.456-.66 9.367-10.82 19.27-24.75 9.24-12.99 25.619-36 36.398-51.12 10.78-15.13 29.181-41 40.892-57.5 11.711-16.5 21.63-30.37 22.042-30.82.413-.44 6.924 4.39 14.47 10.76 7.546 6.36 14.808 11.83 16.136 12.17 3.382.85 7.197-.3 9.651-2.9 1.907-2.02 112.765-162.5 112.765-163.24 0-.18-4.573-3.32-10.162-6.98-20.44-13.39-41.488-30.3-59.443-47.74-6.657-6.46-12.306-11.75-12.553-11.75-.247 0-13.484 13.16-29.417 29.25Zm485.075 50.44c-23.871 12.16-51.967 22.89-76.5 29.21-9.77 2.51-11.447 3.23-11.15 4.78.192 1 7.31 27.24 15.819 58.32 8.508 31.07 28.458 103.97 44.333 162 15.875 58.02 32.725 119.6 37.444 136.84 4.719 17.23 9.021 32.16 9.561 33.17 1.618 3.02 6.083 5.99 9.022 5.99 1.516 0 17.096-5.21 34.616-11.57s41.08-14.93 52.35-19.03c22.11-8.04 26-10.48 26-16.28 0-1.58-8.74-21.98-19.61-45.74-10.79-23.58-28.27-61.78-38.85-84.88-24.64-53.79-24.92-54.45-24.31-55.07.29-.28 7.28-2.93 15.55-5.88 17.49-6.26 19.73-7.53 21.25-12.14 1.33-4.03 4.74 3.65-39.98-90.37-16.88-35.5-33.813-71.17-37.621-79.27-3.808-8.1-7.374-14.72-7.924-14.7-.55.02-5.05 2.09-10 4.62Zm-353.692 10.57c-2.58 5.63-11.417 24.86-19.638 42.74-8.221 17.87-22.594 49.15-31.94 69.5-17.798 38.75-52.599 114.5-90.257 196.47-13.386 29.13-22.451 50.09-22.727 52.54-.379 3.36.013 4.64 2.236 7.28 1.483 1.77 3.223 3.21 3.867 3.21.644 0 20.291 7.01 43.661 15.57 54.596 20.02 58.716 21.43 62.622 21.43 7.456 0 5.922 4.43 34.964-101 14.621-53.08 26.88-96.79 27.243-97.14.364-.35 7.636 1.99 16.161 5.2 25.358 9.53 25.84 9.29 32.388-16.06 2.486-9.63 13.766-52.8 25.066-95.94 11.3-43.14 20.546-78.79 20.546-79.23 0-.44-1.237-1.06-2.75-1.38-31.023-6.62-64.501-17.99-88.441-30.05-3.717-1.87-7.108-3.4-7.534-3.39-.426 0-2.886 4.61-5.467 10.25Zm226.192 28.79c-21.446 3.14-68.689 3.66-86.4.97-3.794-.58-7.003-.94-7.131-.79-.127.15-3.92 45.27-8.428 100.27-4.508 55-11.936 145.57-16.506 201.28-5.688 69.32-8.047 102.45-7.475 105 .459 2.04 2.009 4.73 3.443 5.97l2.609 2.25h116.042l2.923-2.93c2.802-2.8 3.282-4.16 3.031-8.57-.063-1.1-3.488-44.53-7.611-96.5-4.124-51.98-7.498-95.94-7.497-97.69v-3.19l18.584-.31 18.584-.31 2.916-3.27c2.015-2.26 2.916-4.32 2.916-6.68 0-1.88-4.05-46.25-9-98.61-4.95-52.35-9-95.81-9-96.56 0-1.54-3.12-1.63-12-.33Z",
            }),
        }
    )
);
var googleLogo = jsxRuntime.jsxs(
    "svg",
    genericComponentOverrideContext.__assign(
        { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 48 48" },
        {
            children: [
                jsxRuntime.jsx("path", {
                    fill: "#FFC107",
                    d: "M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z",
                }),
                jsxRuntime.jsx("path", {
                    fill: "#FF3D00",
                    d: "m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z",
                }),
                jsxRuntime.jsx("path", {
                    fill: "#4CAF50",
                    d: "M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z",
                }),
                jsxRuntime.jsx("path", {
                    fill: "#1976D2",
                    d: "M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z",
                }),
            ],
        }
    )
);
var genericSAMLLogo = jsxRuntime.jsxs(
    "svg",
    genericComponentOverrideContext.__assign(
        { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", fill: "none" },
        {
            children: [
                jsxRuntime.jsx("path", {
                    fill: "#C12E33",
                    "fill-rule": "evenodd",
                    d: "M14.85 11.25c-2.366-6.187-5.516-6.787-9.45-1.8.056-3.007 1.106-5.707 3.15-8.1 3.694 2.493 6.394 5.793 8.1 9.9-.423.867-1.023.867-1.8 0Z",
                    "clip-rule": "evenodd",
                    opacity: ".788",
                }),
                jsxRuntime.jsx("path", {
                    fill: "#C32E31",
                    "fill-rule": "evenodd",
                    d: "M4.95 2.25c.489.054.789.354.9.9-2.11 2.701-2.86 5.701-2.25 9 1.92.826 3.87.976 5.85.45-2.7 1.803-5.7 2.553-9 2.25.502-4.594 2.002-8.794 4.5-12.6Z",
                    "clip-rule": "evenodd",
                    opacity: ".728",
                }),
                jsxRuntime.jsx("path", {
                    fill: "#BF2E32",
                    "fill-rule": "evenodd",
                    d: "M14.85 11.25c.822 1.428.822 2.777 0 4.05a28.183 28.183 0 0 1-12.6.9 29.114 29.114 0 0 0 9-2.25c.362-1.92.362-3.72 0-5.4a442.65 442.65 0 0 0 3.6 2.7Z",
                    "clip-rule": "evenodd",
                    opacity: ".808",
                }),
            ],
        }
    )
);
var microsoftEntraIdLogo = jsxRuntime.jsxs(
    "svg",
    genericComponentOverrideContext.__assign(
        { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", fill: "none" },
        {
            children: [
                jsxRuntime.jsxs(
                    "g",
                    genericComponentOverrideContext.__assign(
                        { "fill-rule": "evenodd", "clip-path": "url(#a)", "clip-rule": "evenodd" },
                        {
                            children: [
                                jsxRuntime.jsx("path", {
                                    fill: "#66DCFE",
                                    d: "M8.996.989v4.289a873.854 873.854 0 0 0-4.36 4.913c1.45.913 2.9 1.824 4.35 2.733-.643.41-1.29.816-1.942 1.218-.894.476-1.811.523-2.75.14a8.494 8.494 0 0 1-.335-.154 257.53 257.53 0 0 1-3.445-2.157 1.464 1.464 0 0 1-.518-.936v-.308c.037-.276.144-.522.32-.738l7.55-8.517a1.57 1.57 0 0 1 1.13-.483Z",
                                    opacity: ".999",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#0293E3",
                                    d: "M8.996.989a1.58 1.58 0 0 1 1.063.417c.89 1 1.777 2 2.663 3.002a3.204 3.204 0 0 0-2.276-.137 2.96 2.96 0 0 0-1.442 1.007h-.008V.988Z",
                                    opacity: ".997",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#074793",
                                    d: "M12.722 4.408c1.652 1.858 3.303 3.719 4.953 5.58.177.217.284.463.32.739v.308a1.422 1.422 0 0 1-.667 1.041l-7.524 4.702c-.25.146-.519.22-.808.224v-4.078a816.044 816.044 0 0 0 4.359-2.733c-1.447-1.64-2.897-3.278-4.35-4.913a2.96 2.96 0 0 1 1.44-1.007 3.203 3.203 0 0 1 2.277.137Z",
                                    opacity: ".999",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#CAF7FF",
                                    d: "M8.996 5.278v7.646h-.01c-1.45-.909-2.9-1.82-4.35-2.733 1.447-1.643 2.9-3.281 4.36-4.913Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#95BBC1",
                                    d: "M8.996 5.278h.008a1557.36 1557.36 0 0 1 4.351 4.913c-1.45.915-2.903 1.826-4.36 2.733V5.278Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#225086",
                                    d: "M8.987 12.924h.009v4.078a1.649 1.649 0 0 1-.765-.197c-1.426-.89-2.85-1.782-4.272-2.677.11.054.222.105.334.154.94.383 1.857.336 2.751-.14.651-.402 1.299-.808 1.943-1.218Z",
                                    opacity: ".998",
                                }),
                            ],
                        }
                    )
                ),
                jsxRuntime.jsx("defs", {
                    children: jsxRuntime.jsx(
                        "clipPath",
                        genericComponentOverrideContext.__assign(
                            { id: "a" },
                            { children: jsxRuntime.jsx("path", { fill: "#fff", d: "M0 0h18v18H0z" }) }
                        )
                    ),
                }),
            ],
        }
    )
);
var microsoftADFSLogo = jsxRuntime.jsxs(
    "svg",
    genericComponentOverrideContext.__assign(
        { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", fill: "none" },
        {
            children: [
                jsxRuntime.jsxs(
                    "g",
                    genericComponentOverrideContext.__assign(
                        { "fill-rule": "evenodd", "clip-path": "url(#a)", "clip-rule": "evenodd" },
                        {
                            children: [
                                jsxRuntime.jsx("path", {
                                    fill: "#FEFBF9",
                                    d: "M.767.575v.037A.427.427 0 0 0 .43.687V.76C.344.81.282.787.243.687A.758.758 0 0 0 .355.482C.427.466.471.497.486.575a.386.386 0 0 1 .281 0Z",
                                    opacity: ".58",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#EDD8D8",
                                    d: "M.767.576C.782.537.807.531.842.557a.09.09 0 0 1-.075.02Z",
                                    opacity: ".047",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#DD8267",
                                    d: "M8.626 8.74c.012-2.703 0-5.4-.038-8.09-2.713-.013-5.42 0-8.12.037H.43A.427.427 0 0 1 .767.612c2.629.013 5.254 0 7.878-.037.03 2.728.024 5.45-.02 8.165Z",
                                    opacity: ".998",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#E6562C",
                                    d: "M.468.687c2.7-.038 5.407-.05 8.12-.038.013 2.691 0 5.376-.037 8.054V.687H.468Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#84B321",
                                    d: "M9.412.65c2.713-.013 5.42 0 8.12.037H9.45c.012.168 0 .329-.037.482v-.52Z",
                                }),
                                jsxRuntime.jsx("path", { fill: "#F35123", d: "M.468.687H8.55v8.016H.468V.687Z" }),
                                jsxRuntime.jsx("path", {
                                    fill: "#D5602F",
                                    d: "M8.588.65c.038 2.69.05 5.387.038 8.09H.58v-.037h7.971c.037-2.678.05-5.363.037-8.054Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#80BB05",
                                    d: "M17.532.687v8.016h-8.12V1.17c.036-.153.049-.314.037-.482h8.083Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#8BB743",
                                    d: "M9.374.65V.611h8.196V8.74h-.038V.687a448 448 0 0 0-8.12-.038h-.038Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#84A91F",
                                    d: "M9.374.65h.038v8.053h8.12v.037H9.374V.65Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#D85A3F",
                                    d: "M.43.687h.038v8.016H.58v.037H.43V.687Z",
                                    opacity: ".997",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#F6CCB3",
                                    d: "M.43 8.74h8.196l-2.264.074a107.18 107.18 0 0 0-5.613 0A1.739 1.739 0 0 1 .43 8.74Z",
                                    opacity: ".337",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#D1DDA0",
                                    d: "M9.374.612V8.74h8.196c-2.717.037-5.461.05-8.233.037-.013-2.728 0-5.45.037-8.165Z",
                                    opacity: ".384",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#399FD9",
                                    d: "M.43 9.482c2.726-.012 5.445 0 8.158.038H.468v8.053H.43a1520.77 1520.77 0 0 1 0-8.09Z",
                                }),
                                jsxRuntime.jsx("path", { fill: "#03A5F1", d: "M8.55 9.52v8.016H.469V9.52H8.55Z" }),
                                jsxRuntime.jsx("path", {
                                    fill: "#F0D194",
                                    d: "M17.57 9.482H9.374c-.012 2.712 0 5.422.038 8.128-.075-2.709-.1-5.43-.075-8.165 2.75-.012 5.495 0 8.233.037Z",
                                    opacity: ".443",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#F1C360",
                                    d: "M17.57 9.482c.043 2.71.043 5.419 0 8.128-2.72.042-5.44.042-8.158 0a443.23 443.23 0 0 1-.038-8.128h8.196Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#FEB909",
                                    d: "M9.412 9.52h8.12v8.053c-2.694.006-5.389 0-8.083-.018-.037-2.676-.05-5.354-.037-8.035Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#20A1E6",
                                    d: "M8.55 9.52h.038v8.053H.468v-.037H8.55V9.52Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#8DC3E4",
                                    d: "M.43 9.482a460.62 460.62 0 0 1 8.233-.037v8.165c-2.538-.001-5.077.011-7.615.037a3.13 3.13 0 0 1-.618-.074h8.158V9.52C5.875 9.483 3.156 9.47.43 9.482Z",
                                }),
                            ],
                        }
                    )
                ),
                jsxRuntime.jsx("defs", {
                    children: jsxRuntime.jsx(
                        "clipPath",
                        genericComponentOverrideContext.__assign(
                            { id: "a" },
                            { children: jsxRuntime.jsx("path", { fill: "#fff", d: "M0 0h18v18H0z" }) }
                        )
                    ),
                }),
            ],
        }
    )
);
var auth0Logo = jsxRuntime.jsx(
    "svg",
    genericComponentOverrideContext.__assign(
        { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "19", fill: "none" },
        {
            children: jsxRuntime.jsx("path", {
                fill: "#000",
                d: "M15.624.25h-6.5l2.01 6.257h6.497l-5.257 3.729 2.008 6.293c3.386-2.465 4.49-6.193 3.249-10.022L15.625.25h-.001ZM.618 6.507h6.5L9.124.25H2.625L.618 6.507c-1.24 3.829-.134 7.557 3.25 10.022l2.007-6.293L.618 6.504v.003Zm3.25 10.022 5.257 3.721 5.257-3.721-5.257-3.786-5.257 3.786Z",
            }),
        }
    )
);
var oneLoginLogo = jsxRuntime.jsxs(
    "svg",
    genericComponentOverrideContext.__assign(
        { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", fill: "none" },
        {
            children: [
                jsxRuntime.jsxs(
                    "g",
                    genericComponentOverrideContext.__assign(
                        { "fill-rule": "evenodd", "clip-path": "url(#a)", "clip-rule": "evenodd" },
                        {
                            children: [
                                jsxRuntime.jsx("path", {
                                    fill: "#1C1F2A",
                                    d: "M13.13 1.986c.179.131.366.248.563.352a.82.82 0 0 0 .317.246c.092.082.186.164.281.246.305.281.598.574.879.879l.21.246a.82.82 0 0 0 .247.316c.103.198.22.385.351.563 1.065 1.876 1.375 3.88.932 6.012-.128.491-.293.972-.492 1.441a37.47 37.47 0 0 1-.475.914 6.853 6.853 0 0 0-.527.774 6.347 6.347 0 0 0-.527.597c-.024 0-.035.012-.035.035l-.247.247c-.023 0-.035.011-.035.035a9.416 9.416 0 0 0-.597.527c-1.77 1.31-3.762 1.855-5.977 1.635-.307-.034-.611-.08-.914-.14a16.286 16.286 0 0 1-1.23-.405 5.375 5.375 0 0 1-.528-.246 23.81 23.81 0 0 1-1.02-.598l-.808-.65-.545-.545-.65-.809a22.47 22.47 0 0 1-.598-1.02 5.336 5.336 0 0 1-.246-.527C.724 10.19.671 8.245 1.301 6.275A8.998 8.998 0 0 1 2.549 3.99c.433-.527.914-1.008 1.441-1.441a6.86 6.86 0 0 0 .774-.528C6.988.766 9.32.538 11.76 1.336c.21.101.427.19.65.264.244.125.484.254.72.386Z",
                                    opacity: ".997",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#000",
                                    d: "M13.13 1.951c.048.024.048.024 0 0Zm-8.366.07c-.024-.046-.024-.046 0 0Zm8.929.282c.047.023.047.023 0 0Zm-9.703.246c-.023-.047-.023-.047 0 0Zm10.02 0c.047.023.047.023 0 0Zm.281.246c.047.023.047.023 0 0Zm.879.879c.047.023.047.023 0 0Zm.21.246c.048.023.048.023 0 0Zm-12.831.07c-.024-.047-.024-.047 0 0Zm13.078.246c.047.024.047.024 0 0Zm.352.563c.046.023.046.023 0 0Z",
                                    opacity: ".01",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#FEFEFE",
                                    d: "M10.143 12.006a.08.08 0 0 1-.036.053c-.586.023-1.171.023-1.757 0a.248.248 0 0 1-.07-.088V8.35H7.048a.244.244 0 0 1-.123-.141 13.73 13.73 0 0 1 .017-1.688 36.284 36.284 0 0 1 3.182 0c.018 1.829.024 3.657.018 5.485Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#DADADC",
                                    d: "M10.143 12.006c.005-1.828 0-3.656-.018-5.485a36.292 36.292 0 0 0-3.182 0 .15.15 0 0 1 .106-.087 64.98 64.98 0 0 1 3.023 0 .31.31 0 0 1 .088.052c.03 1.846.024 3.686-.017 5.52Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#060B19",
                                    d: "M7.049 8.385c.405-.012.803 0 1.195.035-.03 1.142-.047 2.29-.053 3.445-.017-1.148-.023-2.297-.017-3.445-.381.011-.756 0-1.125-.035Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#97989C",
                                    d: "M7.049 8.385V8.35h1.23v3.62a89.672 89.672 0 0 1-.035-3.55c-.392-.035-.79-.047-1.195-.035Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#000",
                                    d: "M1.459 12.111c-.023.024-.023.024 0 0Zm.246.528c-.023.023-.023.023 0 0Zm14.238.562c.047.024.047.024 0 0Zm-13.64.457c-.024.024-.024.024 0 0Zm13.113.317c.047.023.047.023 0 0Zm-.527.597c.046.024.046.024 0 0Zm-.035.035h.035c-.007.024-.019.024-.035 0Zm-.247.247c.047.023.047.023 0 0Zm-.035.035h.035c-.006.023-.018.023-.035 0Zm-.597.527c.046.024.046.024 0 0Zm-9.668.246c-.024.024-.024.024 0 0Zm1.019.598c-.023.023-.023.023 0 0Zm.528.246c-.024.023-.024.023 0 0Z",
                                    opacity: ".01",
                                }),
                            ],
                        }
                    )
                ),
                jsxRuntime.jsx("defs", {
                    children: jsxRuntime.jsx(
                        "clipPath",
                        genericComponentOverrideContext.__assign(
                            { id: "a" },
                            { children: jsxRuntime.jsx("path", { fill: "#fff", d: "M0 0h18v18H0z" }) }
                        )
                    ),
                }),
            ],
        }
    )
);
var pingOneLogo = jsxRuntime.jsxs(
    "svg",
    genericComponentOverrideContext.__assign(
        { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", fill: "none" },
        {
            children: [
                jsxRuntime.jsxs(
                    "g",
                    genericComponentOverrideContext.__assign(
                        { "fill-rule": "evenodd", "clip-path": "url(#a)", "clip-rule": "evenodd" },
                        {
                            children: [
                                jsxRuntime.jsx("path", { fill: "#BD1B25", d: "M-.01-.01h18v18h-18v-18Z" }),
                                jsxRuntime.jsx("path", {
                                    fill: "#FEFDFD",
                                    d: "M6.723 6.723c.38-.023.636.143.769.499a.78.78 0 0 1-.25.81c-.333.202-.636.165-.909-.11a.849.849 0 0 1-.14-.68.823.823 0 0 1 .53-.52Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#FEFEFE",
                                    d: "M1.968 7.082c.646-.003 1.292 0 1.938.01.601-.02 1.11.184 1.528.61a2.02 2.02 0 0 1 .38 1.618c-.147.805-.616 1.308-1.409 1.508-.432.027-.865.038-1.298.03v2.217h-1.14V7.082Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#BD1B25",
                                    d: "M3.107 8.061c.286-.003.572 0 .859.01.344.071.547.281.609.63.06.343 0 .663-.18.958a.579.579 0 0 1-.45.21c-.279.01-.559.013-.838.01V8.061Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#FEFDFD",
                                    d: "M16.012 8.4c.156.24.31.483.46.73a.976.976 0 0 1-.6.34c-.14.006-.28.006-.42 0 .293.476.29.952-.01 1.428-.234.279-.53.459-.888.54-.205.03-.412.046-.62.05a3.363 3.363 0 0 0-.3.179c-.073.056-.1.126-.08.21.024.021.05.038.08.05.36.005.72.018 1.08.04.769.1 1.175.535 1.218 1.308-.028.654-.348 1.096-.959 1.329a3.518 3.518 0 0 1-1.938.06 1.428 1.428 0 0 1-.928-.73 1.05 1.05 0 0 1 .01-.868c.34-.014.679-.014 1.018 0-.139.446.021.713.48.799.286.031.566.005.839-.08.335-.168.432-.425.29-.77a.69.69 0 0 0-.47-.23 32.673 32.673 0 0 0-1.039-.04 1.865 1.865 0 0 1-.759-.179.605.605 0 0 1-.2-.54.527.527 0 0 1 .28-.539 3.05 3.05 0 0 1 .42-.19c-.501-.157-.778-.497-.83-1.019-.057-.886.346-1.436 1.21-1.648a3.06 3.06 0 0 1 .778-.04c.278.038.551.098.82.18.416.053.77-.07 1.058-.37Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#FEFAFA",
                                    d: "M7.242 8.56h.16v4.515H6.283c-.003-1.445 0-2.89.01-4.335l.949-.18Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#FEFBFB",
                                    d: "M9.06 8.54a.057.057 0 0 1 .05.02c.078.166.131.34.16.52a2.29 2.29 0 0 1 .889-.47 1.344 1.344 0 0 1 1.038.2c.255.232.379.521.37.87.01 1.131.013 2.263.01 3.395h-1.099c.004-1.078 0-2.157-.01-3.236-.036-.193-.153-.286-.35-.28a1.255 1.255 0 0 0-.728.38c-.01 1.045-.014 2.09-.01 3.136H8.26c.004-1.218 0-2.437-.01-3.655a6.78 6.78 0 0 0-.11-.6c.313-.081.619-.174.92-.28Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#BD1D26",
                                    d: "M13.715 9.44c.65-.04.913.26.789.899a.518.518 0 0 1-.43.35c-.14.012-.28.012-.42 0-.295-.098-.435-.304-.419-.62.008-.33.168-.54.48-.63Z",
                                }),
                                jsxRuntime.jsx("path", { fill: "#FEFFFE", d: "M1.968 13.635h.26v2.437h-.26v-2.437Z" }),
                                jsxRuntime.jsx("path", {
                                    fill: "#EEC5C7",
                                    d: "M3.686 13.635c.007.28 0 .56-.02.839-.012-.003-.019-.01-.02-.02l.04-.82Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#FEFCFC",
                                    d: "M3.686 13.635h.24c-.004.726 0 1.452.01 2.177.011.086.028.169.05.25a.661.661 0 0 1-.28-.01 1.634 1.634 0 0 0-.04-.14.579.579 0 0 1-.58.17.63.63 0 0 1-.429-.39 1.832 1.832 0 0 1-.02-.918c.159-.438.455-.58.89-.43a.658.658 0 0 1 .119.11c.001.01.008.017.02.02.02-.28.027-.56.02-.84Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#FCF4F4",
                                    d: "M9.3 13.635h.28v.66h.399a2.064 2.064 0 0 0-.06.219h-.34c-.003.433 0 .866.01 1.298a.15.15 0 0 0 .09.09.304.304 0 0 0 .18-.01.19.19 0 0 1 .02.19.415.415 0 0 1-.51-.09.459.459 0 0 1-.04-.1 16.741 16.741 0 0 1-.03-1.378h-.2v-.22h.2v-.66Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#FEFBFB",
                                    d: "M7.362 14.514v-.2c.07.006.137 0 .2-.02v-.66h.26v.66h.419a2.073 2.073 0 0 1-.06.22h-.36c-.003.426 0 .852.01 1.278.064.119.16.152.29.1.016.05.03.1.04.15a.22.22 0 0 1-.23.09c-.2.007-.319-.086-.36-.28a44.84 44.84 0 0 1-.01-1.338h-.2Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#FEFAFA",
                                    d: "M11.258 14.314a.514.514 0 0 1 .28.04c-.21.71-.433 1.416-.67 2.118a.644.644 0 0 1-.38.32.303.303 0 0 1-.09-.17c.067-.036.13-.08.19-.13a.852.852 0 0 0 .11-.22 17.097 17.097 0 0 0-.54-1.898.41.41 0 0 1 .26-.12c.142.514.285 1.027.43 1.538.131-.495.268-.987.41-1.478Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#FEFBFB",
                                    d: "M4.825 14.254c.356-.03.593.123.709.46.025.172.035.345.03.52h-1c-.052.304.06.513.34.628.203.04.38-.01.53-.15a.691.691 0 0 1 .09.17.698.698 0 0 1-.44.22c-.475.018-.744-.212-.809-.69a2.114 2.114 0 0 1 .04-.678.795.795 0 0 1 .51-.48Zm1.218.02a.097.097 0 0 1 .08.02c.026.072.046.145.06.22a.697.697 0 0 1 .48-.24c.23-.006.38.1.45.32.01.492.012.985.01 1.478h-.26c.003-.466 0-.932-.01-1.398-.038-.117-.118-.17-.24-.16a.802.802 0 0 0-.42.22c-.01.446-.013.892-.01 1.338h-.26c.004-.52 0-1.039-.01-1.558a.742.742 0 0 0-.05-.16.415.415 0 0 1 .18-.08Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#FEFAFB",
                                    d: "M8.68 14.274h.12v1.798h-.28v-1.778c.058.006.111 0 .16-.02Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#DE8E93",
                                    d: "M11.258 14.314a1.14 1.14 0 0 1 .3-.02c.004.026-.003.046-.02.06a.514.514 0 0 0-.28-.04Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#E9B2B4",
                                    d: "M7.562 14.294a.51.51 0 0 1-.2.02v.2a.616.616 0 0 1-.02-.22h.22Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#BE1F27",
                                    d: "M5.284 14.893v.12h-.72a.588.588 0 0 1 .16-.47c.227-.127.404-.077.53.15a.977.977 0 0 1 .03.2Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#BD1D26",
                                    d: "M3.146 14.514a.517.517 0 0 1 .51.16c.013.32.013.639 0 .959-.168.227-.377.277-.63.15a.579.579 0 0 1-.15-.33 2.62 2.62 0 0 1 .02-.6.593.593 0 0 1 .25-.34Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#DD8B90",
                                    d: "M5.284 14.893c.02.042.026.09.02.14-.25.007-.496 0-.74-.02h.72v-.12Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#FAE9EA",
                                    d: "M11.577 15.553c.232-.018.342.089.33.32-.076.192-.206.242-.39.15-.15-.181-.13-.338.06-.47Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#FBEEEE",
                                    d: "M11.577 15.653a.343.343 0 0 1 .19.04c.02.062.004.112-.05.15a.889.889 0 0 1 .06.11.1.1 0 0 1-.06-.01c-.058-.147-.098-.143-.12.01-.02-.1-.026-.2-.02-.3Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#C0292F",
                                    d: "M11.777 15.952a.889.889 0 0 0-.06-.11c.054-.037.07-.087.05-.15a.342.342 0 0 0-.19-.04h-.02c.218-.079.308.001.27.24a.085.085 0 0 1-.05.06Z",
                                }),
                                jsxRuntime.jsx("path", { fill: "#C12B31", d: "M11.617 15.713h.1v.06h-.1v-.06Z" }),
                                jsxRuntime.jsx("path", {
                                    fill: "#C74042",
                                    d: "M11.557 15.653h.02c-.006.1 0 .2.02.3.022-.153.062-.157.12-.01a.1.1 0 0 0 .06.01c-.162.101-.262.055-.3-.14a.233.233 0 0 1 .08-.16Z",
                                }),
                            ],
                        }
                    )
                ),
                jsxRuntime.jsx("defs", {
                    children: jsxRuntime.jsx(
                        "clipPath",
                        genericComponentOverrideContext.__assign(
                            { id: "a" },
                            { children: jsxRuntime.jsx("path", { fill: "#fff", d: "M0 0h18v18H0z" }) }
                        )
                    ),
                }),
            ],
        }
    )
);
var jumpCloudLogo = jsxRuntime.jsx(
    "svg",
    genericComponentOverrideContext.__assign(
        { xmlns: "http://www.w3.org/2000/svg", width: "19", height: "10", fill: "none" },
        {
            children: jsxRuntime.jsx("path", {
                fill: "#B2E8E6",
                "fill-rule": "evenodd",
                d: "M15.573 9.352a1.596 1.596 0 0 0-.37-.881A3.167 3.167 0 0 0 14 7.637l-.506-.187c.62-.708.768-1.51.443-2.409-.285-.645-.758-1.06-1.419-1.246-.908-.2-1.652.071-2.232.815-.454.68-.532 1.405-.235 2.174.105.253.253.475.443.666a3.927 3.927 0 0 0-1.518.815 5.38 5.38 0 0 0-.868-.384c.564-.665.663-1.399.298-2.203-.362-.62-.895-.945-1.599-.974-.978.08-1.572.618-1.78 1.612a1.974 1.974 0 0 0 .515 1.574 3.402 3.402 0 0 0-1.23.628c-.263.22-.438.497-.523.834-.277.003-.554 0-.832-.01-1.055-.12-1.775-.692-2.16-1.714-.302-1.159-.003-2.112.895-2.859.724-.499 1.495-.596 2.314-.29.511-1.003 1.318-1.496 2.421-1.48C6.716 1.697 7.475.85 8.706.458c1.255-.297 2.33.03 3.226.984.122.16.24.322.352.487 1.053-.272 1.954-.003 2.702.806.381.477.595 1.026.642 1.65.978-.224 1.807.045 2.485.805.602.798.729 1.673.38 2.624-.416.917-1.112 1.426-2.088 1.527-.277.01-.554.013-.832.01Z",
                "clip-rule": "evenodd",
                opacity: ".999",
            }),
        }
    )
);
var ripplingLogo = jsxRuntime.jsxs(
    "svg",
    genericComponentOverrideContext.__assign(
        { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", fill: "none" },
        {
            children: [
                jsxRuntime.jsxs(
                    "g",
                    genericComponentOverrideContext.__assign(
                        { "fill-rule": "evenodd", "clip-path": "url(#a)", "clip-rule": "evenodd" },
                        {
                            children: [
                                jsxRuntime.jsx("path", { fill: "#FCB61C", d: "M-.04-.04h18v18h-18v-18Z" }),
                                jsxRuntime.jsx("path", {
                                    fill: "#4F2B3C",
                                    d: "M4.6 5.72c1.348-.493 2.161-.04 2.44 1.36.137.913-.143 1.673-.84 2.28.404.218.658.551.76 1 .04.666.053 1.333.04 2H5.56c.013-.614 0-1.227-.04-1.84a1.826 1.826 0 0 0-.92-1.16c1.173-.928 1.346-2.008.52-3.24a1.248 1.248 0 0 0-.52-.4Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#4F2C3C",
                                    d: "M7.8 5.72c1.482-.442 2.308.118 2.48 1.68 0 .788-.294 1.441-.88 1.96.4.254.654.614.76 1.08.04.64.053 1.28.04 1.92H8.76a10.32 10.32 0 0 0-.12-2.08 2.325 2.325 0 0 0-.84-.92c1.056-.82 1.283-1.82.68-3a1.574 1.574 0 0 0-.68-.64Z",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#512E3B",
                                    d: "M11 5.72a5.412 5.412 0 0 1 1.6-.04c1.167 1.225 1.167 2.452 0 3.68.4.251.653.611.76 1.08.04.64.053 1.28.04 1.92h-1.52c.013-.667 0-1.334-.04-2a1.93 1.93 0 0 0-.84-1c1.042-.866 1.242-1.892.6-3.08-.19-.203-.39-.39-.6-.56Z",
                                }),
                            ],
                        }
                    )
                ),
                jsxRuntime.jsx("defs", {
                    children: jsxRuntime.jsx(
                        "clipPath",
                        genericComponentOverrideContext.__assign(
                            { id: "a" },
                            { children: jsxRuntime.jsx("path", { fill: "#fff", d: "M0 0h18v18H0z" }) }
                        )
                    ),
                }),
            ],
        }
    )
);
var openIdLogo = jsxRuntime.jsxs(
    "svg",
    genericComponentOverrideContext.__assign(
        { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", fill: "none" },
        {
            children: [
                jsxRuntime.jsxs(
                    "g",
                    genericComponentOverrideContext.__assign(
                        { "fill-rule": "evenodd", "clip-path": "url(#a)", "clip-rule": "evenodd" },
                        {
                            children: [
                                jsxRuntime.jsx("path", {
                                    fill: "#F6931E",
                                    d: "M8.181 17.253c.006-.571 0-1.141-.018-1.71-.003-4.5 0-9 .009-13.5L10.89.711c.012 5.094.012 10.188 0 15.282-.9.428-1.803.847-2.709 1.26Z",
                                    opacity: ".992",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#B2B1B1",
                                    d: "M8.163 15.543c.018.569.024 1.139.018 1.71a12.64 12.64 0 0 1-4.986-1.413 7.326 7.326 0 0 1-2.277-1.881c-1.04-1.39-1.166-2.86-.378-4.41a6.512 6.512 0 0 1 1.845-1.953 11.234 11.234 0 0 1 3.744-1.602 14.655 14.655 0 0 1 1.584-.279v1.746a8.006 8.006 0 0 0-3.366 1.323 4.29 4.29 0 0 0-1.305 1.485c-.424.938-.364 1.844.18 2.718a4.964 4.964 0 0 0 1.773 1.575c.994.524 2.05.852 3.168.981Z",
                                    opacity: ".991",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "#B1B2B1",
                                    d: "M11.35 5.715a12.7 12.7 0 0 1 4.481 1.359l.351.207a51.2 51.2 0 0 1 1.377-.774.123.123 0 0 1 .027.054c.125 1.278.248 2.556.37 3.834a414.518 414.518 0 0 1-5.257-1.152c.477-.278.957-.55 1.44-.819a7.956 7.956 0 0 0-2.79-.963V5.715Z",
                                    opacity: ".989",
                                }),
                            ],
                        }
                    )
                ),
                jsxRuntime.jsx("defs", {
                    children: jsxRuntime.jsx(
                        "clipPath",
                        genericComponentOverrideContext.__assign(
                            { id: "a" },
                            { children: jsxRuntime.jsx("path", { fill: "#fff", d: "M0 0h18v18H0z" }) }
                        )
                    ),
                }),
            ],
        }
    )
);

/*
 * Class.
 */
var BoxySAML = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(BoxySAML, _super);
    /*
     * Constructor.
     */
    function BoxySAML(config) {
        var _this =
            _super.call(
                this,
                genericComponentOverrideContext.__assign({ id: "boxy-saml", name: "BoxySAML" }, config)
            ) || this;
        _this.getLogo = function () {
            switch (_this.name.toLowerCase()) {
                case "microsoft entra id": {
                    return microsoftEntraIdLogo;
                }
                case "microsoft ad fs": {
                    return microsoftADFSLogo;
                }
                case "okta": {
                    return oktaLogo;
                }
                case "auth0": {
                    return auth0Logo;
                }
                case "google": {
                    return googleLogo;
                }
                case "onelogin": {
                    return oneLoginLogo;
                }
                case "pingone": {
                    return pingOneLogo;
                }
                case "jumpcloud": {
                    return jumpCloudLogo;
                }
                case "rippling": {
                    return ripplingLogo;
                }
                case "openid": {
                    return openIdLogo;
                }
                default: {
                    return genericSAMLLogo;
                }
            }
        };
        return _this;
    }
    /*
     * Static Methods
     */
    BoxySAML.init = function (config) {
        if (BoxySAML.instance !== undefined) {
            console.warn("BoxySAML Provider was already initialized");
            return BoxySAML.instance;
        }
        BoxySAML.instance = new BoxySAML(config);
        return BoxySAML.instance;
    };
    /*
     * Tests methods.
     */
    BoxySAML.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        BoxySAML.instance = undefined;
        return;
    };
    return BoxySAML;
})(Provider);

/*
 * Class.
 */
var Discord = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(Discord, _super);
    /*
     * Constructor.
     */
    function Discord(config) {
        var _this =
            _super.call(this, genericComponentOverrideContext.__assign({ id: "discord", name: "Discord" }, config)) ||
            this;
        _this.getLogo = function () {
            return jsxRuntime.jsxs(
                "svg",
                genericComponentOverrideContext.__assign(
                    {
                        width: "18",
                        height: "14",
                        viewBox: "0 0 18 14",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                    },
                    {
                        children: [
                            jsxRuntime.jsx(
                                "g",
                                genericComponentOverrideContext.__assign(
                                    { clipPath: "url(#clip0_4108_67056)" },
                                    {
                                        children: jsxRuntime.jsx("path", {
                                            d: "M15.2477 1.17248C14.0651 0.616848 12.8166 0.222666 11.5342 0C11.3587 0.321942 11.1999 0.653178 11.0585 0.99232C9.69245 0.781074 8.30327 0.781074 6.93722 0.99232C6.79573 0.653213 6.63694 0.321981 6.46152 0C5.17826 0.224546 3.92896 0.619664 2.74515 1.17538C0.394984 4.74367 -0.242109 8.22333 0.0764376 11.6536C1.45275 12.6971 2.99324 13.4908 4.63094 14C4.99971 13.491 5.32601 12.9511 5.6064 12.3858C5.07384 12.1817 4.55982 11.9299 4.0703 11.6332C4.19914 11.5374 4.32514 11.4386 4.4469 11.3427C5.87129 12.0301 7.42594 12.3865 8.99999 12.3865C10.574 12.3865 12.1287 12.0301 13.5531 11.3427C13.6762 11.4458 13.8023 11.5446 13.9297 11.6332C13.4392 11.9304 12.9242 12.1827 12.3907 12.3873C12.6708 12.9523 12.9971 13.4918 13.3662 14C15.0053 13.4928 16.547 12.6996 17.9235 11.655C18.2973 7.67704 17.285 4.22935 15.2477 1.17248ZM6.0099 9.544C5.12221 9.544 4.38885 8.71731 4.38885 7.70029C4.38885 6.68327 5.09673 5.84931 6.00707 5.84931C6.9174 5.84931 7.6451 6.68327 7.62953 7.70029C7.61396 8.71731 6.91457 9.544 6.0099 9.544ZM11.9901 9.544C11.101 9.544 10.3704 8.71731 10.3704 7.70029C10.3704 6.68327 11.0783 5.84931 11.9901 5.84931C12.9018 5.84931 13.6239 6.68327 13.6083 7.70029C13.5927 8.71731 12.8947 9.544 11.9901 9.544Z",
                                            fill: "#5865F2",
                                        }),
                                    }
                                )
                            ),
                            jsxRuntime.jsx("defs", {
                                children: jsxRuntime.jsx(
                                    "clipPath",
                                    genericComponentOverrideContext.__assign(
                                        { id: "clip0_4108_67056" },
                                        {
                                            children: jsxRuntime.jsx("rect", {
                                                width: "18",
                                                height: "14",
                                                fill: "white",
                                            }),
                                        }
                                    )
                                ),
                            }),
                        ],
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Discord.init = function (config) {
        if (Discord.instance !== undefined) {
            console.warn("Discord Provider was already initialized");
            return Discord.instance;
        }
        Discord.instance = new Discord(config);
        return Discord.instance;
    };
    /*
     * Tests methods.
     */
    Discord.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        Discord.instance = undefined;
        return;
    };
    return Discord;
})(Provider);

/*
 * Class.
 */
var Facebook = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(Facebook, _super);
    /*
     * Constructor.
     */
    function Facebook(config) {
        var _this =
            _super.call(this, genericComponentOverrideContext.__assign({ id: "facebook", name: "Facebook" }, config)) ||
            this;
        _this.getLogo = function () {
            return jsxRuntime.jsx(
                "svg",
                genericComponentOverrideContext.__assign(
                    {
                        fill: "#1777F2",
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 30 30",
                        width: "24px",
                        height: "24px",
                    },
                    {
                        children: jsxRuntime.jsx("path", {
                            d: "M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z",
                        }),
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Facebook.init = function (config) {
        if (Facebook.instance !== undefined) {
            console.warn("Facebook Provider was already initialized");
            return Facebook.instance;
        }
        Facebook.instance = new Facebook(config);
        return Facebook.instance;
    };
    /*
     * Tests methods.
     */
    Facebook.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        Facebook.instance = undefined;
        return;
    };
    return Facebook;
})(Provider);

/*
 * Class.
 */
var Github = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(Github, _super);
    /*
     * Constructor.
     */
    function Github(config) {
        var _this =
            _super.call(this, genericComponentOverrideContext.__assign({ id: "github", name: "GitHub" }, config)) ||
            this;
        _this.getLogo = function () {
            return jsxRuntime.jsx(
                "svg",
                genericComponentOverrideContext.__assign(
                    { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "17.556", viewBox: "0 0 18 17.556" },
                    {
                        children: jsxRuntime.jsx("path", {
                            fill: "#000",
                            fillRule: "evenodd",
                            d: "M145.319 107.44a9 9 0 0 0-2.844 17.54c.45.082.614-.2.614-.434 0-.214-.008-.78-.012-1.531-2.5.544-3.032-1.206-3.032-1.206a2.384 2.384 0 0 0-1-1.317c-.817-.559.062-.547.062-.547a1.89 1.89 0 0 1 1.378.927 1.916 1.916 0 0 0 2.619.748 1.924 1.924 0 0 1 .571-1.2c-2-.227-4.1-1-4.1-4.448a3.479 3.479 0 0 1 .927-2.415 3.233 3.233 0 0 1 .088-2.382s.755-.242 2.475.923a8.535 8.535 0 0 1 4.506 0c1.718-1.165 2.472-.923 2.472-.923a3.234 3.234 0 0 1 .09 2.382 3.473 3.473 0 0 1 .925 2.415c0 3.458-2.1 4.218-4.11 4.441a2.149 2.149 0 0 1 .611 1.667c0 1.2-.011 2.174-.011 2.469 0 .24.162.52.619.433a9 9 0 0 0-2.851-17.539z",
                            transform: "translate(-136.32 -107.44)",
                        }),
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Github.init = function (config) {
        if (Github.instance !== undefined) {
            console.warn("Github Provider was already initialized");
            return Github.instance;
        }
        Github.instance = new Github(config);
        return Github.instance;
    };
    /*
     * Tests methods.
     */
    Github.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        Github.instance = undefined;
        return;
    };
    return Github;
})(Provider);

/*
 * Class.
 */
var Gitlab = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(Gitlab, _super);
    /*
     * Constructor.
     */
    function Gitlab(config) {
        var _this =
            _super.call(this, genericComponentOverrideContext.__assign({ id: "gitlab", name: "Gitlab" }, config)) ||
            this;
        _this.getLogo = function () {
            return jsxRuntime.jsxs(
                "svg",
                genericComponentOverrideContext.__assign(
                    {
                        width: "18",
                        height: "18",
                        viewBox: "0 0 18 18",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                    },
                    {
                        children: [
                            jsxRuntime.jsx("path", {
                                d: "M17.7004 6.86178L17.6751 6.79711L15.2251 0.403269C15.1753 0.277953 15.087 0.171648 14.973 0.0996044C14.8589 0.0287852 14.7259 -0.00532357 14.5918 0.00188338C14.4577 0.00909034 14.3291 0.057266 14.2232 0.139906C14.1186 0.224918 14.0426 0.340113 14.0058 0.469813L12.3516 5.5309H5.65312L3.99889 0.469813C3.96302 0.339406 3.88693 0.223634 3.78145 0.138968C3.67562 0.0563286 3.54698 0.0081529 3.41289 0.000945942C3.27881 -0.00626101 3.14574 0.0278478 3.03166 0.0986669C2.91791 0.171001 2.82972 0.277214 2.77954 0.402332L0.324918 6.79336L0.30055 6.85803C-0.0521303 7.77953 -0.0956629 8.79071 0.176516 9.73911C0.448694 10.6875 1.02183 11.5217 1.8095 12.1159L1.81794 12.1225L1.84043 12.1384L5.57251 14.9333L7.41888 16.3307L8.54356 17.1798C8.67512 17.2797 8.83575 17.3338 9.00093 17.3338C9.16611 17.3338 9.32675 17.2797 9.45831 17.1798L10.583 16.3307L12.4293 14.9333L16.1839 12.1216L16.1933 12.1141C16.9792 11.5197 17.551 10.6864 17.8228 9.73926C18.0945 8.79214 18.0516 7.7824 17.7004 6.86178Z",
                                fill: "#E24329",
                            }),
                            jsxRuntime.jsx("path", {
                                d: "M17.7004 6.86154L17.6751 6.79688C16.4813 7.04191 15.3564 7.54756 14.3807 8.27771L9 12.3463C10.8323 13.7324 12.4275 14.9368 12.4275 14.9368L16.1821 12.1251L16.1914 12.1176C16.9785 11.5233 17.5511 10.6894 17.8233 9.74145C18.0954 8.79352 18.0523 7.78284 17.7004 6.86154Z",
                                fill: "#FC6D26",
                            }),
                            jsxRuntime.jsx("path", {
                                d: "M5.57251 14.9362L7.41887 16.3337L8.54356 17.1828C8.67511 17.2827 8.83575 17.3367 9.00093 17.3367C9.16611 17.3367 9.32674 17.2827 9.4583 17.1828L10.583 16.3337L12.4293 14.9362C12.4293 14.9362 10.8323 13.7281 8.99999 12.3457C7.16769 13.7281 5.57251 14.9362 5.57251 14.9362Z",
                                fill: "#FCA326",
                            }),
                            jsxRuntime.jsx("path", {
                                d: "M3.61837 8.27755C2.64345 7.5459 1.51877 7.03893 0.324918 6.79297L0.30055 6.85764C-0.0521303 7.77914 -0.0956629 8.79031 0.176516 9.73871C0.448694 10.6871 1.02183 11.5213 1.8095 12.1155L1.81794 12.1221L1.84043 12.138L5.57251 14.9329C5.57251 14.9329 7.16582 13.7285 9 12.3424L3.61837 8.27755Z",
                                fill: "#FC6D26",
                            }),
                        ],
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Gitlab.init = function (config) {
        if (Gitlab.instance !== undefined) {
            console.warn("Gitlab Provider was already initialized");
            return Gitlab.instance;
        }
        Gitlab.instance = new Gitlab(config);
        return Gitlab.instance;
    };
    /*
     * Tests methods.
     */
    Gitlab.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        Gitlab.instance = undefined;
        return;
    };
    return Gitlab;
})(Provider);

/*
 * Class.
 */
var Google = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(Google, _super);
    /*
     * Constructor.
     */
    function Google(config) {
        var _this =
            _super.call(this, genericComponentOverrideContext.__assign({ id: "google", name: "Google" }, config)) ||
            this;
        _this.getLogo = function () {
            return googleLogo;
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Google.init = function (config) {
        if (Google.instance !== undefined) {
            console.warn("Google Provider was already initialized");
            return Google.instance;
        }
        Google.instance = new Google(config);
        return Google.instance;
    };
    /*
     * Tests methods.
     */
    Google.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        Google.instance = undefined;
        return;
    };
    return Google;
})(Provider);

var GoogleWorkspaces = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(GoogleWorkspaces, _super);
    function GoogleWorkspaces(config) {
        var _this =
            _super.call(
                this,
                genericComponentOverrideContext.__assign({ id: "google-workspaces", name: "Google Workspaces" }, config)
            ) || this;
        _this.getLogo = function () {
            return jsxRuntime.jsxs(
                "svg",
                genericComponentOverrideContext.__assign(
                    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", width: "18px", height: "18px" },
                    {
                        children: [
                            jsxRuntime.jsx("path", {
                                fill: "#FFC107",
                                d: "M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z",
                            }),
                            jsxRuntime.jsx("path", {
                                fill: "#FF3D00",
                                d: "M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z",
                            }),
                            jsxRuntime.jsx("path", {
                                fill: "#4CAF50",
                                d: "M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z",
                            }),
                            jsxRuntime.jsx("path", {
                                fill: "#1976D2",
                                d: "M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z",
                            }),
                        ],
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    GoogleWorkspaces.init = function (config) {
        if (GoogleWorkspaces.instance !== undefined) {
            console.warn("GoogleWorkspaces Provider was already initialized");
            return GoogleWorkspaces.instance;
        }
        GoogleWorkspaces.instance = new GoogleWorkspaces(config);
        return GoogleWorkspaces.instance;
    };
    /*
     * Tests methods.
     */
    GoogleWorkspaces.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        GoogleWorkspaces.instance = undefined;
        return;
    };
    return GoogleWorkspaces;
})(Provider);

/*
 * Class.
 */
var LinkedIn = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(LinkedIn, _super);
    /*
     * Constructor.
     */
    function LinkedIn(config) {
        var _this =
            _super.call(this, genericComponentOverrideContext.__assign({ id: "linkedin", name: "LinkedIn" }, config)) ||
            this;
        _this.getLogo = function () {
            return jsxRuntime.jsxs(
                "svg",
                genericComponentOverrideContext.__assign(
                    { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 48 48", width: "20", height: "20" },
                    {
                        children: [
                            jsxRuntime.jsx("path", {
                                fill: "#0288D1",
                                d: "M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z",
                            }),
                            jsxRuntime.jsx("path", {
                                fill: "#FFF",
                                d: "M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z",
                            }),
                        ],
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    LinkedIn.init = function (config) {
        if (LinkedIn.instance !== undefined) {
            console.warn("LinkedIn Provider was already initialized");
            return LinkedIn.instance;
        }
        LinkedIn.instance = new LinkedIn(config);
        return LinkedIn.instance;
    };
    /*
     * Tests methods.
     */
    LinkedIn.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        LinkedIn.instance = undefined;
        return;
    };
    return LinkedIn;
})(Provider);

/*
 * Class.
 */
var Okta = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(Okta, _super);
    /*
     * Constructor.
     */
    function Okta(config) {
        var _this =
            _super.call(this, genericComponentOverrideContext.__assign({ id: "okta", name: "Okta" }, config)) || this;
        _this.getLogo = function () {
            return oktaLogo;
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Okta.init = function (config) {
        if (Okta.instance !== undefined) {
            console.warn("Okta Provider was already initialized");
            return Okta.instance;
        }
        Okta.instance = new Okta(config);
        return Okta.instance;
    };
    /*
     * Tests methods.
     */
    Okta.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        Okta.instance = undefined;
        return;
    };
    return Okta;
})(Provider);

/*
 * Class.
 */
var Twitter = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(Twitter, _super);
    /*
     * Constructor.
     */
    function Twitter(config) {
        var _this = this;
        var name = "X";
        var normalisedUseLegacyTwitterLogo =
            (config === null || config === void 0 ? void 0 : config.useLegacyTwitterLogo) === true;
        if (normalisedUseLegacyTwitterLogo) {
            name = "Twitter";
        }
        _this =
            _super.call(this, genericComponentOverrideContext.__assign({ id: "twitter", name: name }, config)) || this;
        _this.useLegacyTwitterLogo = false;
        _this.getLogo = function () {
            if (_this.useLegacyTwitterLogo === true) {
                return jsxRuntime.jsx(
                    "svg",
                    genericComponentOverrideContext.__assign(
                        {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "20.129",
                            height: "16.356",
                            viewBox: "0 0 20.129 16.356",
                        },
                        {
                            children: jsxRuntime.jsx("g", {
                                children: jsxRuntime.jsx("g", {
                                    children: jsxRuntime.jsx("path", {
                                        fill: "#04ABEE",
                                        d: "M45.232 35.964a8.242 8.242 0 0 1-2.372.649 4.141 4.141 0 0 0 1.816-2.284 8.268 8.268 0 0 1-2.623 1 4.133 4.133 0 0 0-7.037 3.771 11.724 11.724 0 0 1-8.516-4.317 4.133 4.133 0 0 0 1.282 5.517 4.1 4.1 0 0 1-1.87-.517v.052a4.132 4.132 0 0 0 3.313 4.049 4.147 4.147 0 0 1-1.865.071 4.134 4.134 0 0 0 3.858 2.868 8.338 8.338 0 0 1-6.114 1.71 11.745 11.745 0 0 0 18.08-9.894q0-.268-.012-.534a8.374 8.374 0 0 0 2.061-2.137z",
                                        transform:
                                            "translate(34.799 -7.41) translate(2.201 4.266) translate(-62.103 -30.883)",
                                    }),
                                }),
                            }),
                        }
                    )
                );
            }
            return jsxRuntime.jsx(
                "svg",
                genericComponentOverrideContext.__assign(
                    { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 1200 1227" },
                    {
                        children: jsxRuntime.jsx("path", {
                            d: "M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z",
                            fill: "#000",
                        }),
                    }
                )
            );
        };
        _this.useLegacyTwitterLogo = normalisedUseLegacyTwitterLogo;
        return _this;
    }
    /*
     * Static Methods
     */
    Twitter.init = function (config) {
        if (Twitter.instance !== undefined) {
            console.warn("Twitter Provider was already initialized");
            return Twitter.instance;
        }
        Twitter.instance = new Twitter(config);
        return Twitter.instance;
    };
    /*
     * Tests methods.
     */
    Twitter.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        Twitter.instance = undefined;
        return;
    };
    return Twitter;
})(Provider);

var getFunctionOverrides = function (recipeId, onHandleEvent) {
    return function (originalImp) {
        return genericComponentOverrideContext.__assign(genericComponentOverrideContext.__assign({}, originalImp), {
            signInAndUp: function (input) {
                return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
                    var payloadBeforeCall, response, payloadAfterCall;
                    return genericComponentOverrideContext.__generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 2, , 3]);
                                return [
                                    4 /*yield*/,
                                    types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                        userContext: input.userContext,
                                    }),
                                ];
                            case 1:
                                payloadBeforeCall = _c.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                _c.sent();
                                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                                payloadBeforeCall = undefined;
                                return [3 /*break*/, 3];
                            case 3:
                                return [4 /*yield*/, originalImp.signInAndUp(input)];
                            case 4:
                                response = _c.sent();
                                if (!(response.status === "OK")) return [3 /*break*/, 9];
                                payloadAfterCall = void 0;
                                _c.label = 5;
                            case 5:
                                _c.trys.push([5, 7, , 8]);
                                return [
                                    4 /*yield*/,
                                    types.Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                        userContext: input.userContext,
                                    }),
                                ];
                            case 6:
                                payloadAfterCall = _c.sent();
                                return [3 /*break*/, 8];
                            case 7:
                                _c.sent();
                                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                                payloadAfterCall = undefined;
                                return [3 /*break*/, 8];
                            case 8:
                                onHandleEvent({
                                    action: "SUCCESS",
                                    isNewRecipeUser: response.createdNewRecipeUser,
                                    user: response.user,
                                    createdNewSession:
                                        payloadAfterCall !== undefined &&
                                        (payloadBeforeCall === undefined ||
                                            payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                                    userContext: input.userContext,
                                });
                                _c.label = 9;
                            case 9:
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            setStateAndOtherInfoToStorage: function (input) {
                var _a;
                var loginChallenge =
                    (_a = genericComponentOverrideContext.getQueryParams("loginChallenge")) !== null && _a !== void 0
                        ? _a
                        : undefined;
                return originalImp.setStateAndOtherInfoToStorage({
                    state: genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, input.state),
                        {
                            rid: recipeId,
                            oauth2LoginChallenge: loginChallenge,
                            redirectToPath: genericComponentOverrideContext.getRedirectToPathFromURL(),
                        }
                    ),
                    userContext: input.userContext,
                });
            },
        });
    };
};

/*
 * Class.
 */
var Custom = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(Custom, _super);
    /*
     * Constructor.
     */
    function Custom(config) {
        var _this = _super.call(this, config) || this;
        _this.getLogo = function () {
            return _this.logo;
        };
        _this.logo = config.logo;
        return _this;
    }
    /*
     * Static Methods
     */
    Custom.init = function (config) {
        if (config === undefined || config.id === undefined) {
            throw new Error("Custom provider config should contain an id attribute");
        }
        return new Custom(config);
    };
    return Custom;
})(Provider);

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/*
 * Methods.
 */
function normaliseThirdPartyConfig(config) {
    if (config === undefined) {
        config = {};
    }
    var signInAndUpFeature = normaliseSignInAndUpFeature(config.signInAndUpFeature);
    var oAuthCallbackScreen =
        config.oAuthCallbackScreen === undefined ? {} : { style: config.oAuthCallbackScreen.style };
    var override = genericComponentOverrideContext.__assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return genericComponentOverrideContext.__assign(
        genericComponentOverrideContext.__assign({}, utils.normaliseAuthRecipe(config)),
        { signInAndUpFeature: signInAndUpFeature, oAuthCallbackScreen: oAuthCallbackScreen, override: override }
    );
}
function normaliseSignInAndUpFeature(config) {
    if (config === undefined) {
        config = {};
    }
    if (config.providers === undefined) {
        config.providers = [];
    }
    var style = config.style !== undefined ? config.style : "";
    /*
     * Convert custom configs to custom providers.
     */
    var providersWithCustom = config.providers.map(function (provider) {
        if (provider instanceof Provider) {
            return provider;
        }
        return Custom.init(provider);
    });
    /*
     * Make sure providers array is unique, filter duplicate values.
     * First, create a new set with unique ids from the configs.
     * Then map over those ids to find the first provider that matches from the configs.
     */
    var providers = Array.from(
        new Set(
            providersWithCustom.map(function (provider) {
                return provider.id;
            })
        )
    ).map(function (id) {
        return providersWithCustom.find(function (provider) {
            return provider.id === id;
        });
    });
    return {
        style: style,
        providers: providers,
    };
}
function matchRecipeIdUsingState(recipe, userContext) {
    var stateResponse = recipe.webJSRecipe.getStateAndOtherInfoFromStorage({
        userContext: userContext,
    });
    if (stateResponse === undefined) {
        return false;
    }
    if (stateResponse.rid === recipe.config.recipeId) {
        return true;
    }
    return false;
}
function redirectToThirdPartyLogin(input) {
    return genericComponentOverrideContext.__awaiter(this, void 0, void 0, function () {
        var loginMethods, tenantProviders, providers, provider, response;
        return genericComponentOverrideContext.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [
                        4 /*yield*/,
                        genericComponentOverrideContext.Multitenancy.getInstanceOrThrow().getCurrentDynamicLoginMethods(
                            {
                                userContext: input.userContext,
                            }
                        ),
                    ];
                case 1:
                    loginMethods = _a.sent();
                    tenantProviders = (
                        loginMethods === null || loginMethods === void 0
                            ? void 0
                            : loginMethods.firstFactors.includes(types.FactorIds.THIRDPARTY)
                    )
                        ? loginMethods.thirdparty.providers
                        : [];
                    providers = mergeProviders({
                        tenantProviders: tenantProviders,
                        clientProviders: input.config.signInAndUpFeature.providers,
                    });
                    provider = providers.find(function (p) {
                        return p.id === input.thirdPartyId;
                    });
                    if (provider === undefined) {
                        return [2 /*return*/, { status: "ERROR" }];
                    }
                    return [
                        4 /*yield*/,
                        input.recipeImplementation.getAuthorisationURLWithQueryParamsAndSetState({
                            thirdPartyId: input.thirdPartyId,
                            frontendRedirectURI: provider.getRedirectURL(),
                            redirectURIOnProviderDashboard: provider.getRedirectURIOnProviderDashboard(),
                            shouldTryLinkingWithSessionUser: input.shouldTryLinkingWithSessionUser,
                            userContext: input.userContext,
                        }),
                    ];
                case 2:
                    response = _a.sent();
                    genericComponentOverrideContext.redirectWithFullPageReload(response);
                    return [2 /*return*/, { status: "OK" }];
            }
        });
    });
}
var mergeProviders = function (_a) {
    var _b = _a.tenantProviders,
        tenantProviders = _b === void 0 ? [] : _b,
        _c = _a.clientProviders,
        clientProviders = _c === void 0 ? [] : _c;
    var builtInProvidersMap = {
        apple: Apple,
        google: Google,
        "google-workspaces": GoogleWorkspaces,
        github: Github,
        "active-directory": ActiveDirectory,
        bitbucket: Bitbucket,
        "boxy-saml": BoxySAML,
        discord: Discord,
        gitlab: Gitlab,
        linkedin: LinkedIn,
        okta: Okta,
        twitter: Twitter,
        facebook: Facebook,
    };
    var usesDynamicLoginMethods = genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods === true;
    if (
        usesDynamicLoginMethods === false &&
        (clientProviders === null || clientProviders === void 0 ? void 0 : clientProviders.length) === 0
    ) {
        throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
    }
    // If we are not using dynamic login methods or if there is no providers
    // from the core we use frontend initialized providers
    if (usesDynamicLoginMethods === false || tenantProviders.length === 0) {
        return clientProviders;
    }
    var providers = [];
    var _loop_1 = function (tenantProvider) {
        // try finding exact match
        var provider = clientProviders.find(function (provider) {
            var id = tenantProvider.id;
            return provider.id === id;
        });
        // if none found try finding by tenantProvider id prefix match only
        if (provider === undefined) {
            provider = clientProviders.find(function (provider) {
                var id = tenantProvider.id;
                return id.startsWith(provider.id);
            });
        }
        // means provider is initialized on the frontend and found
        if (provider !== undefined) {
            providers.push(
                Custom.init(
                    genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, provider.config),
                        {
                            id: tenantProvider.id,
                            name: tenantProvider.name,
                            buttonComponent: provider.getButton(tenantProvider.name),
                        }
                    )
                )
            );
        } else {
            // try to find and initialize provider from all prebuilt providers list
            var providerID = Object.keys(builtInProvidersMap).find(function (id) {
                return tenantProvider.id === id || tenantProvider.id.startsWith(id);
            });
            if (builtInProvidersMap[providerID]) {
                var provider_1 = new builtInProvidersMap[providerID]({
                    id: tenantProvider.id,
                    name: tenantProvider.name,
                });
                providers.push(provider_1);
            } else {
                providers.push(Custom.init(tenantProvider));
            }
        }
    };
    for (var _i = 0, tenantProviders_1 = tenantProviders; _i < tenantProviders_1.length; _i++) {
        var tenantProvider = tenantProviders_1[_i];
        _loop_1(tenantProvider);
    }
    return providers;
};

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/*
 * Class.
 */
var ThirdParty = /** @class */ (function (_super) {
    genericComponentOverrideContext.__extends(ThirdParty, _super);
    function ThirdParty(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = ThirdpartyWebJS__default.default;
        }
        var _this = this;
        if (
            genericComponentOverrideContext.SuperTokens.usesDynamicLoginMethods === false &&
            config.signInAndUpFeature.providers.length === 0
        ) {
            throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
        }
        _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = ThirdParty.RECIPE_ID;
        _this.firstFactorIds = [types.FactorIds.THIRDPARTY];
        /*
         * Instance methods.
         */
        _this.getDefaultRedirectionURL = function (context) {
            return genericComponentOverrideContext.__awaiter(_this, void 0, void 0, function () {
                return genericComponentOverrideContext.__generator(this, function (_a) {
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        _this.recipeID = config.recipeId;
        return _this;
    }
    ThirdParty.prototype.getFirstFactorsForAuthPage = function () {
        return this.firstFactorIds;
    };
    ThirdParty.init = function (config) {
        var normalisedConfig = normaliseThirdPartyConfig(config);
        return {
            recipeID: ThirdParty.RECIPE_ID,
            authReact: function (appInfo) {
                ThirdParty.instance = new ThirdParty(
                    genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, normalisedConfig),
                        { appInfo: appInfo, recipeId: ThirdParty.RECIPE_ID }
                    )
                );
                return ThirdParty.instance;
            },
            webJS: ThirdpartyWebJS__default.default.init(
                genericComponentOverrideContext.__assign(
                    genericComponentOverrideContext.__assign({}, normalisedConfig),
                    {
                        override: {
                            functions: function (originalImpl, builder) {
                                var functions = getFunctionOverrides(
                                    ThirdParty.RECIPE_ID,
                                    normalisedConfig.onHandleEvent
                                );
                                builder.override(functions);
                                builder.override(normalisedConfig.override.functions);
                                return originalImpl;
                            },
                        },
                    }
                )
            ),
        };
    };
    ThirdParty.getInstanceOrThrow = function () {
        if (ThirdParty.instance === undefined) {
            var error =
                "No instance of ThirdParty found. Make sure to call the ThirdParty.init method." +
                "See https://supertokens.io/docs/thirdparty/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + genericComponentOverrideContext.SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdParty.instance;
    };
    /*
     * Tests methods.
     */
    ThirdParty.reset = function () {
        if (!genericComponentOverrideContext.isTest()) {
            return;
        }
        ThirdParty.instance = undefined;
        return;
    };
    ThirdParty.RECIPE_ID = "thirdparty";
    return ThirdParty;
})(index.AuthRecipe);

exports.ActiveDirectory = ActiveDirectory;
exports.Apple = Apple;
exports.Bitbucket = Bitbucket;
exports.BoxySAML = BoxySAML;
exports.Discord = Discord;
exports.Facebook = Facebook;
exports.Github = Github;
exports.Gitlab = Gitlab;
exports.Google = Google;
exports.GoogleWorkspaces = GoogleWorkspaces;
exports.LinkedIn = LinkedIn;
exports.Okta = Okta;
exports.Provider = Provider$1;
exports.ThirdParty = ThirdParty;
exports.Twitter = Twitter;
exports.matchRecipeIdUsingState = matchRecipeIdUsingState;
exports.mergeProviders = mergeProviders;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
exports.useContext = useContext;
