"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var ThirdpartyWebJS = require("supertokens-web-js/recipe/thirdparty");
var utils = require("./authRecipe-shared.js");
var jsxRuntime = require("react/jsx-runtime");
var NormalisedURLPath = require("supertokens-web-js/utils/normalisedURLPath");
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

function ProviderButton(_a) {
    var logo = _a.logo,
        providerName = _a.providerName,
        displayName = _a.displayName;
    var t = translationContext.useTranslation();
    var providerStyleName = "provider".concat(providerName);
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
                    jsxRuntime.jsxs(
                        "div",
                        genericComponentOverrideContext.__assign(
                            { "data-supertokens": "providerButtonText" },
                            {
                                children: [
                                    t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_START"),
                                    displayName,
                                    t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_END"),
                                ],
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
            return jsxRuntime.jsx(
                "svg",
                genericComponentOverrideContext.__assign(
                    {
                        width: "18",
                        height: "18",
                        viewBox: "0 0 315 315",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                    },
                    {
                        children: jsxRuntime.jsx("path", {
                            fillRule: "evenodd",
                            clipRule: "evenodd",
                            d: "M77.105 1.63917C73.508 2.90917 68.328 7.66517 48.6 27.8102C9.78001 67.4512 4.335 73.2352 2.366 76.9282C0.576997 80.2832 0.5 84.9492 0.5 189.428V298.428L2.653 302.428C5.419 307.568 8.402 310.306 14 312.844C18.441 314.857 19.926 314.884 127 314.884C234.09 314.884 235.558 314.858 240 312.843C245.891 310.171 310.072 246.476 313.03 240.366C314.954 236.392 314.999 233.722 314.978 126.862C314.957 22.7132 314.867 17.2322 313.114 13.3722C310.846 8.37917 304.317 2.63917 299.142 1.08917C296.299 0.237168 266.809 -0.0508316 188.384 0.00716838C94.448 0.0761684 80.968 0.274168 77.105 1.63917ZM299.587 16.2342L302 19.0402V126.895V234.75L298.923 237.339L295.847 239.928H188.569H81.292L78.712 237.537C77.293 236.221 75.859 233.634 75.527 231.787C75.195 229.939 75.053 181.338 75.211 123.783C75.496 20.7532 75.531 19.1032 77.5 16.9152C78.6 15.6922 80.4 14.3202 81.5 13.8662C82.6 13.4122 131.577 13.1282 190.337 13.2342L297.173 13.4282L299.587 16.2342ZM189.775 79.4872C188.276 80.3002 186.578 81.8482 186.001 82.9262C184.177 86.3332 173.018 165.844 174 168.429C177.035 176.411 188.093 177.229 192.086 169.767C192.692 168.635 195.809 149.655 199.012 127.59C205.461 83.1672 205.462 82.7702 199.128 79.4942C195.412 77.5722 193.306 77.5712 189.775 79.4872ZM147.151 92.3012C145.86 93.0182 138.78 100.089 131.419 108.016C117.072 123.464 115.535 126.23 118.33 131.557C119.159 133.136 126.097 140.616 133.749 148.178C146.43 160.712 147.978 161.928 151.253 161.928C153.66 161.928 155.863 161.073 157.923 159.339C160.53 157.146 161 156.054 161 152.194C161 147.768 160.716 147.349 151.011 137.487L141.022 127.337L151.011 116.416C160.041 106.543 161 105.125 161 101.646C161 96.5122 159.53 94.0472 155.452 92.3432C151.342 90.6262 150.183 90.6202 147.151 92.3012ZM219.923 94.8512C217.643 97.1312 217 98.6762 217 101.873C217 106.272 218.273 108.028 231.174 121.43L236.951 127.433L227.491 137.575C217.182 148.627 215.888 150.869 217.139 155.509C218.403 160.197 221.481 162.428 226.684 162.428C231.123 162.428 231.269 162.315 245.459 147.864C260.272 132.777 262.086 129.914 260.113 124.725C259.055 121.943 233.866 94.4622 230.937 92.8942C227.407 91.0052 222.983 91.7912 219.923 94.8512Z",
                            fill: "black",
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
            return jsxRuntime.jsx(
                "svg",
                genericComponentOverrideContext.__assign(
                    {
                        width: "18",
                        height: "18",
                        viewBox: "0 0 1593 1594",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                    },
                    {
                        children: jsxRuntime.jsx("path", {
                            fillRule: "evenodd",
                            clipRule: "evenodd",
                            d: "M755.371 0.822553C753.587 1.24555 751.498 2.11455 750.729 2.75355C746.718 6.08155 746.699 5.58056 754.545 104.932C758.689 157.411 762.328 202.485 762.632 205.098L763.184 209.848H744.726C726.381 209.848 726.25 209.864 723.226 212.408C721.414 213.933 719.977 216.259 719.674 218.158C719.394 219.913 723.341 265.223 728.444 318.848L737.723 416.348L740.669 416.149C742.289 416.04 749.69 415.253 757.115 414.4C772.989 412.578 813.813 412.311 830.965 413.918C837.208 414.503 842.472 414.824 842.664 414.632C842.856 414.44 850.523 322.801 859.702 210.989L876.391 7.69355L874.409 5.02055C870.729 0.055553 869.505 -0.0424466 812.115 0.00655337C782.69 0.0315534 757.155 0.398553 755.371 0.822553ZM565.615 32.4186C552.965 37.0716 530.015 45.4686 514.615 51.0796C484.148 62.1796 480.115 64.4656 480.115 70.6336C480.115 72.2766 483.995 82.1086 488.736 92.4836C493.478 102.859 512.153 143.662 530.236 183.156C548.32 222.651 563.115 255.305 563.115 255.722C563.115 256.138 560.077 257.532 556.365 258.82C539.094 264.812 529.035 269.124 527.622 271.142C524.052 276.239 524.624 277.664 560.735 353.573C579.777 393.599 598.737 433.548 602.87 442.348C607.003 451.148 610.549 458.536 610.75 458.765C610.951 458.994 618.653 455.547 627.865 451.104C653.08 438.944 674.875 430.862 698.988 424.731C704.143 423.42 708.548 421.865 708.777 421.275C709.006 420.684 698.347 380.634 685.091 332.275C671.834 283.915 655.808 225.448 649.478 202.348C615.597 78.7125 602.973 33.0726 601.964 30.5636C600.329 26.4996 596.44 23.8386 592.23 23.9026C590.242 23.9336 578.265 27.7656 565.615 32.4186ZM1022.17 36.5976C1019.4 39.1596 1017.38 45.9386 992.619 135.803C978 188.853 965.914 232.383 965.761 232.535C965.609 232.688 959.213 230.53 951.549 227.74C931.496 220.44 931.001 220.334 926.683 222.383C924.683 223.332 922.644 224.86 922.152 225.778C921.661 226.696 911.079 266.35 898.637 313.898C886.195 361.445 874.932 404.38 873.608 409.307C872.283 414.235 871.384 418.45 871.608 418.674C871.832 418.899 880.476 421.241 890.815 423.879C916.054 430.32 936.711 437.651 959.49 448.252C964.921 450.78 969.702 452.848 970.113 452.848C970.525 452.848 976.728 440.136 983.898 424.598C991.068 409.06 1019.75 346.848 1047.64 286.348C1075.52 225.848 1107.79 155.873 1119.35 130.848C1130.9 105.823 1140.57 83.7506 1140.84 81.7986C1141.22 78.9866 1140.77 77.5966 1138.68 75.1026C1137.22 73.3706 1135.03 71.6546 1133.82 71.2896C1132.61 70.9236 1120.81 66.6616 1107.61 61.8176C1046.92 39.5476 1030.7 33.8476 1028.02 33.8476C1026.27 33.8476 1023.98 34.9246 1022.17 36.5976ZM329.005 148.532C245.629 218.213 248.776 215.262 250.73 221.938C251.335 224.006 273.753 247.432 321.615 296.014C360.115 335.093 391.75 367.421 391.914 367.854C392.078 368.287 386.17 373.621 378.785 379.708C371.4 385.794 365.078 391.502 364.736 392.393C364.395 393.283 364.115 395.861 364.115 398.121C364.115 402.223 364.199 402.313 416.365 453.74C445.103 482.071 477.192 513.722 487.675 524.077L506.736 542.903L524.175 525.558C542.748 507.086 555.863 495.894 573.615 483.366C579.665 479.097 585.011 475.24 585.494 474.797C585.978 474.353 580.844 466.196 574.085 456.669C544.09 414.391 470.535 310.468 415.313 232.348C382.267 185.598 353.7 145.661 351.831 143.598C348.861 140.319 347.867 139.848 343.915 139.848C339.701 139.848 338.695 140.434 329.005 148.532ZM1266.86 160.603C1265.34 161.563 1248.24 184.66 1228.86 211.931C1209.47 239.202 1183.49 275.757 1171.11 293.165C1158.74 310.572 1148.32 324.71 1147.96 324.581C1147.6 324.453 1142.05 319.848 1135.63 314.348C1120.81 301.641 1118.24 300.194 1113.19 301.708C1109.71 302.75 1107.81 305.149 1089.56 331.595C1041.95 400.595 1030.76 416.804 1013.94 441.099C1004.14 455.261 996.14 467.186 996.17 467.599C996.2 468.011 1000.75 471.244 1006.29 474.783C1026.66 487.806 1045.12 502.629 1064.51 521.544L1077.4 534.123L1112.55 498.735C1131.88 479.272 1170.41 440.398 1198.17 412.348C1225.93 384.298 1274.45 335.297 1305.99 303.457C1338.08 271.062 1363.91 244.196 1364.63 242.456C1366.98 236.843 1365.62 234.388 1355.24 225.499C1332.08 205.669 1278.42 161.08 1276.43 160.016C1273.35 158.37 1270.07 158.572 1266.86 160.603ZM145.518 334.381C142.968 335.672 137.54 344.388 114.831 383.649C99.6567 409.883 86.7447 432.664 86.1367 434.272C84.7277 438.001 85.6147 442.035 88.4167 444.642C90.4437 446.528 119.381 460.718 157.115 478.328C180.061 489.037 240.525 517.654 256.793 525.506L270.97 532.348L262.058 547.348C252.182 563.97 251.204 567.61 255.365 572.24C257.418 574.524 269.859 580.474 324.615 605.355C333.415 609.354 349.165 616.553 359.615 621.353C370.065 626.153 386.49 633.665 396.115 638.048C405.74 642.43 418.937 648.508 425.441 651.556C432.107 654.679 437.635 656.715 438.111 656.222C438.575 655.741 440.65 651.073 442.721 645.848C450.527 626.156 468.233 594.437 482.59 574.427C485.67 570.134 488.286 566.26 488.403 565.819C488.52 565.378 483.89 561.754 478.115 557.765C472.34 553.776 451.64 539.493 432.115 526.025C412.59 512.557 392.34 498.519 387.115 494.829C381.89 491.138 366.59 480.543 353.115 471.283C328.265 454.206 301.206 435.556 277.615 419.246C270.465 414.303 244.815 396.601 220.615 379.909C196.415 363.217 171.6 346.023 165.471 341.7C153.324 333.133 150.227 331.997 145.518 334.381ZM1454.14 360.033C1451.91 360.861 1447.53 363.841 1373.61 414.842C1287.56 474.22 1288.27 473.746 1287.31 472.517C1286.81 471.874 1282.69 464.927 1278.17 457.079C1269.79 442.539 1267.24 439.848 1261.89 439.848C1259.16 439.848 1261.37 438.394 1229.11 461.347C1215.09 471.325 1186.29 491.803 1165.11 506.853C1106.29 548.661 1096.11 555.969 1096.11 556.41C1096.11 556.633 1098.97 560.536 1102.46 565.082C1116.69 583.637 1130.43 606.122 1142.17 630.093L1150.28 646.663L1155.45 644.372C1158.29 643.112 1174.79 635.344 1192.11 627.109C1209.44 618.873 1231.04 608.635 1240.11 604.357C1257.3 596.254 1323.82 564.737 1354.11 550.34C1363.74 545.767 1397.94 529.553 1430.11 514.31C1518.36 472.5 1518.64 472.365 1520.45 469.777C1524.17 464.466 1523.53 463.03 1496.26 415.971C1482.04 391.428 1469.71 369.989 1468.85 368.327C1465.31 361.432 1459.39 358.093 1454.14 360.033ZM31.3707 581.891C26.9977 582.837 25.6537 584.122 23.8157 589.112C21.5067 595.379 3.7927 697.43 4.5147 700.305C4.8527 701.651 6.1477 703.938 7.3937 705.386C9.9457 708.353 9.4697 708.277 47.1147 711.767C58.9397 712.863 95.1647 716.26 127.615 719.314C160.065 722.369 192.015 725.359 198.615 725.96C205.215 726.56 210.808 727.236 211.044 727.462C211.28 727.688 210.257 734.954 208.772 743.61C205.433 763.065 205.403 765.788 208.494 769.122C211.134 771.972 212.318 772.202 232.615 773.807C254.085 775.505 355.259 783.745 375.115 785.413C411.55 788.474 410.718 788.467 411.449 785.736C411.8 784.423 412.098 780.198 412.111 776.348C412.169 758.857 417.544 724.291 424.135 699.017C426.238 690.954 427.793 684.193 427.592 683.992C427.231 683.63 369.058 668.328 324.615 656.903C311.965 653.652 282.49 645.97 259.115 639.834C235.74 633.697 207.39 626.273 196.115 623.335C184.84 620.397 170.44 616.634 164.115 614.973C157.79 613.311 126.515 605.163 94.6147 596.866C62.7147 588.569 36.1647 581.647 35.6147 581.484C35.0647 581.322 33.1547 581.504 31.3707 581.891ZM1546.11 615.815C1538.14 617.903 1517.44 623.289 1500.11 627.783C1482.79 632.277 1446.19 641.82 1418.78 648.988C1391.38 656.157 1368.74 661.812 1368.49 661.555C1368.23 661.298 1366.71 653.613 1365.11 644.477C1363.51 635.34 1361.72 626.985 1361.15 625.908C1359.64 623.097 1356.07 620.848 1353.12 620.848C1350.89 620.848 1319.22 629.338 1256.11 646.849C1218.37 657.324 1164.54 672.094 1162.31 672.591C1160.67 672.954 1160.18 673.576 1160.63 674.726C1160.98 675.618 1163.04 682.415 1165.21 689.831C1171.93 712.75 1176.96 739.931 1179.09 764.738C1179.62 771.002 1180.21 776.278 1180.4 776.463C1180.58 776.647 1184.75 776.373 1189.67 775.854C1194.59 775.334 1206.49 774.203 1216.11 773.34C1225.74 772.477 1237.66 771.337 1242.61 770.807C1247.56 770.277 1259.26 769.175 1268.61 768.359C1277.96 767.542 1297.76 765.739 1312.61 764.352C1327.46 762.965 1351.76 760.703 1366.61 759.324C1381.46 757.946 1398.56 756.353 1404.61 755.783C1410.66 755.214 1424.84 753.889 1436.11 752.838C1480.11 748.74 1523.98 744.648 1554.1 741.832C1587.92 738.671 1589.03 738.398 1591.9 732.558C1593.01 730.282 1592.01 723.182 1584.11 677.148C1579.12 648.108 1574.33 622.397 1573.46 620.013C1571.73 615.25 1567.31 611.801 1563.11 611.936C1561.74 611.981 1554.09 613.726 1546.11 615.815ZM1180.11 811.098C1180.1 829.653 1174.94 865.216 1168.58 890.527C1166.13 900.282 1164.46 908.593 1164.87 908.996C1165.28 909.4 1183.16 914.3 1204.61 919.885C1265.74 935.803 1343.25 956.012 1382.61 966.298C1434.97 979.976 1520.96 1002.4 1540.48 1007.47C1549.76 1009.88 1558.22 1011.85 1559.28 1011.85C1562.6 1011.85 1566.79 1009.06 1567.87 1006.14C1569.38 1002.05 1587.17 899.031 1587.14 894.521C1587.11 889.775 1583.01 885.25 1578.01 884.451C1576.14 884.152 1561.79 882.755 1546.11 881.347C1530.44 879.939 1498.49 876.975 1475.11 874.761C1451.74 872.547 1420.97 869.651 1406.73 868.326C1392.5 867 1380.69 865.761 1380.5 865.572C1380.32 865.382 1381.57 857.364 1383.29 847.752C1386.1 832.106 1386.28 829.975 1385.02 827.402C1381.71 820.637 1382.47 820.776 1324.61 816.341C1313.61 815.498 1288.41 813.469 1268.61 811.832C1248.81 810.194 1226.76 808.379 1219.61 807.797C1212.46 807.215 1201.66 806.315 1195.61 805.797C1178.62 804.342 1180.12 803.83 1180.11 811.098ZM397.115 818.912C392.44 819.344 376.015 820.879 360.615 822.323C345.215 823.767 328.115 825.357 322.615 825.855C276.577 830.032 196.789 837.342 170.544 839.788C140.378 842.599 95.6827 846.715 33.6837 852.39C4.40771 855.07 3.0157 855.448 0.533704 861.387C-0.782296 864.537 -0.220296 868.502 8.7057 919.052C13.9777 948.908 18.9107 974.817 19.6667 976.628C20.5917 978.841 22.2407 980.421 24.6967 981.447C28.2817 982.945 29.1557 982.763 70.9827 971.828C161.789 948.087 220.975 932.848 222.371 932.848C223.461 932.848 224.394 936.188 226.072 946.098C230.012 969.362 230.596 970.862 236.474 972.801C239.529 973.81 242.351 973.262 262.259 967.796C291.917 959.653 347.281 944.37 372.615 937.334C385.633 933.718 407.383 927.797 422.865 923.654C432.227 921.149 432.179 921.238 429.072 912.255C421.718 890.993 414.578 854.193 412.55 827.098L411.857 817.848L408.736 817.987C407.019 818.064 401.79 818.48 397.115 818.912ZM1153.04 939.543C1143.25 965.286 1122.61 1002.6 1106.45 1023.77C1103.72 1027.35 1103.3 1028.45 1104.33 1029.42C1105.04 1030.09 1111.46 1034.64 1118.61 1039.54C1125.76 1044.44 1143.99 1057.02 1159.11 1067.49C1174.24 1077.97 1196.06 1093.04 1207.61 1100.99C1219.16 1108.94 1244.81 1126.63 1264.61 1140.32C1284.41 1154 1316.59 1176.22 1336.11 1189.69C1355.64 1203.16 1376.56 1217.63 1382.61 1221.85C1420.7 1248.42 1436.69 1259.15 1439.29 1259.9C1441.18 1260.44 1443.59 1260.31 1445.92 1259.55C1449.29 1258.44 1450.47 1256.81 1461.18 1238.35C1467.56 1227.35 1480.36 1205.3 1489.63 1189.35C1511.51 1151.7 1511.5 1151.79 1493.61 1143.36C1488.66 1141.03 1472.01 1133.16 1456.61 1125.88C1441.21 1118.6 1420.96 1109.03 1411.61 1104.61C1402.26 1100.2 1381.34 1090.29 1365.11 1082.59C1348.89 1074.9 1332.31 1067.06 1328.28 1065.18C1321.16 1061.87 1320.98 1061.7 1322.37 1059.56C1323.16 1058.34 1327.25 1051.46 1331.46 1044.27C1341.99 1026.29 1341.77 1023.1 1329.61 1017.07C1324.33 1014.45 1310 1007.86 1235.11 973.62C1225.49 969.218 1203.52 959.144 1186.3 951.233C1169.07 943.321 1154.77 936.848 1154.52 936.848C1154.27 936.848 1153.6 938.061 1153.04 939.543ZM391.115 971.447C363.89 984.392 331.715 999.628 319.615 1005.3C307.515 1010.98 287.04 1020.67 274.115 1026.84C261.19 1033.01 233.965 1045.94 213.615 1055.57C193.265 1065.2 164.015 1079.06 148.615 1086.35C133.215 1093.65 110.49 1104.4 98.1147 1110.24C75.6867 1120.82 71.7627 1123.42 70.4827 1128.52C69.6017 1132.03 70.2547 1133.27 100.471 1185.75C127.515 1232.72 129.014 1234.84 135.115 1234.84C136.695 1234.84 145.163 1229.63 158.115 1220.7C169.39 1212.93 186.49 1201.13 196.115 1194.5C205.74 1187.86 220.163 1177.91 228.167 1172.39C236.171 1166.86 252.509 1155.6 264.473 1147.35C276.438 1139.1 290.133 1129.57 294.908 1126.18C299.682 1122.8 303.898 1120.21 304.276 1120.45C304.654 1120.68 308.659 1127.41 313.176 1135.39C317.692 1143.38 322.512 1150.8 323.886 1151.88C325.358 1153.04 327.921 1153.85 330.125 1153.85C333.294 1153.85 336.362 1152.07 350.24 1142.19C359.246 1135.78 379.665 1121.24 395.615 1109.87C411.565 1098.51 440.365 1078.04 459.615 1064.37C478.865 1050.71 494.989 1039.21 495.447 1038.81C495.904 1038.41 492.342 1032.79 487.531 1026.32C473.616 1007.61 462.768 989.878 451.909 968.098C446.356 956.96 441.543 947.863 441.214 947.88C440.884 947.898 418.34 958.503 391.115 971.447ZM1069.61 1066.17C1052.95 1083.09 1034.57 1098.84 1016.98 1111.27L1005.35 1119.49L1015.54 1133.92C1021.14 1141.85 1034.51 1160.72 1045.24 1175.85C1055.97 1190.97 1076.82 1220.45 1091.59 1241.35C1106.35 1262.25 1121.66 1283.85 1125.62 1289.35C1129.57 1294.85 1156.32 1332.65 1185.06 1373.35C1213.8 1414.05 1238.84 1448.81 1240.7 1450.6C1243.35 1453.14 1244.94 1453.85 1248.02 1453.85C1251.64 1453.85 1253.47 1452.58 1270.78 1438.07C1281.14 1429.39 1300.53 1413.14 1313.88 1401.96C1327.23 1390.79 1338.81 1380.69 1339.63 1379.52C1340.45 1378.36 1341.11 1375.66 1341.11 1373.52C1341.11 1369.76 1339.86 1368.37 1297.98 1325.72C1274.26 1301.56 1254.53 1281.6 1254.14 1281.36C1253.75 1281.12 1241.22 1268.37 1226.3 1253.04L1199.17 1225.15L1211.74 1214.78C1218.65 1209.08 1225.17 1203.33 1226.21 1202C1228.36 1199.26 1228.64 1194.38 1226.83 1191.25C1225.67 1189.25 1086.54 1051.57 1085.24 1051.14C1084.9 1051.02 1077.86 1057.79 1069.61 1066.17ZM485.54 1089.1C443.499 1131.55 280.64 1296.23 253.142 1324.09C240.232 1337.17 229.11 1348.88 228.427 1350.11C227.745 1351.34 227.17 1353.67 227.15 1355.29C227.102 1359.31 230.005 1361.98 277.478 1401.6C319.385 1436.57 319.323 1436.53 325.491 1433.72C326.947 1433.06 334.858 1422.9 344.761 1408.97C354.001 1395.98 370.38 1372.97 381.159 1357.85C391.939 1342.72 410.34 1316.85 422.051 1300.35C433.762 1283.85 443.681 1269.98 444.093 1269.53C444.506 1269.09 451.017 1273.92 458.563 1280.29C466.109 1286.65 473.371 1292.12 474.699 1292.46C478.081 1293.31 481.896 1292.16 484.35 1289.56C486.257 1287.54 597.115 1127.06 597.115 1126.32C597.115 1126.14 592.542 1123 586.953 1119.34C566.513 1105.95 545.465 1089.04 527.51 1071.6C520.853 1065.14 515.204 1059.85 514.957 1059.85C514.71 1059.85 501.473 1073.01 485.54 1089.1ZM970.615 1139.54C946.744 1151.7 918.648 1162.43 894.115 1168.75C884.345 1171.26 882.668 1171.98 882.965 1173.53C883.157 1174.53 890.275 1200.77 898.784 1231.85C907.292 1262.92 927.242 1335.82 943.117 1393.85C958.992 1451.87 975.842 1513.45 980.561 1530.69C985.28 1547.92 989.582 1562.85 990.122 1563.86C991.74 1566.88 996.205 1569.85 999.144 1569.85C1000.66 1569.85 1016.24 1564.64 1033.76 1558.28C1051.28 1551.92 1074.84 1543.35 1086.11 1539.25C1108.22 1531.21 1112.11 1528.77 1112.11 1522.97C1112.11 1521.39 1103.37 1500.99 1092.5 1477.23C1081.71 1453.65 1064.23 1415.45 1053.65 1392.35C1029.01 1338.56 1028.73 1337.9 1029.34 1337.28C1029.63 1337 1036.62 1334.35 1044.89 1331.4C1062.38 1325.14 1064.62 1323.87 1066.14 1319.26C1067.47 1315.23 1070.88 1322.91 1026.16 1228.89C1009.28 1193.39 992.347 1157.72 988.539 1149.62C984.731 1141.52 981.165 1134.9 980.615 1134.92C980.065 1134.94 975.565 1137.01 970.615 1139.54ZM616.923 1150.11C614.343 1155.74 605.506 1174.97 597.285 1192.85C589.064 1210.72 574.691 1242 565.345 1262.35C547.547 1301.1 512.746 1376.85 475.088 1458.82C461.702 1487.95 452.637 1508.91 452.361 1511.36C451.982 1514.72 452.374 1516 454.597 1518.64C456.08 1520.41 457.82 1521.85 458.464 1521.85C459.108 1521.85 478.755 1528.86 502.125 1537.42C556.721 1557.44 560.841 1558.85 564.747 1558.85C572.203 1558.85 570.669 1563.28 599.711 1457.85C614.332 1404.77 626.591 1361.06 626.954 1360.71C627.318 1360.36 634.59 1362.7 643.115 1365.91C668.473 1375.44 668.955 1375.2 675.503 1349.85C677.989 1340.22 689.269 1297.05 700.569 1253.91C711.869 1210.77 721.115 1175.12 721.115 1174.68C721.115 1174.24 719.878 1173.62 718.365 1173.3C687.342 1166.68 653.864 1155.31 629.924 1143.25C626.207 1141.38 622.816 1139.85 622.39 1139.86C621.964 1139.86 619.504 1144.47 616.923 1150.11ZM843.115 1178.9C821.669 1182.04 774.426 1182.56 756.715 1179.87C752.921 1179.29 749.712 1178.93 749.584 1179.08C749.457 1179.23 745.664 1224.35 741.156 1279.35C736.648 1334.35 729.22 1424.92 724.65 1480.63C718.962 1549.95 716.603 1583.08 717.175 1585.63C717.634 1587.67 719.184 1590.36 720.618 1591.6L723.227 1593.85H781.248H839.269L842.192 1590.92C844.994 1588.12 845.474 1586.76 845.223 1582.35C845.16 1581.25 841.735 1537.82 837.612 1485.85C833.488 1433.87 830.114 1389.91 830.115 1388.16V1384.97L848.699 1384.66L867.283 1384.35L870.199 1381.08C872.214 1378.82 873.115 1376.76 873.115 1374.4C873.115 1372.52 869.065 1328.15 864.115 1275.79C859.165 1223.44 855.115 1179.98 855.115 1179.23C855.115 1177.69 851.995 1177.6 843.115 1178.9Z",
                            fill: "black",
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
                    var response;
                    return genericComponentOverrideContext.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.signInAndUp(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "SUCCESS",
                                        isNewRecipeUser: response.createdNewRecipeUser,
                                        user: response.user,
                                        userContext: input.userContext,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            setStateAndOtherInfoToStorage: function (input) {
                return originalImp.setStateAndOtherInfoToStorage({
                    state: genericComponentOverrideContext.__assign(
                        genericComponentOverrideContext.__assign({}, input.state),
                        { rid: recipeId, redirectToPath: genericComponentOverrideContext.getRedirectToPathFromURL() }
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
        if (config === undefined || config.id === undefined || config.name === undefined) {
            throw new Error("Custom provider config should contain id and name attributes");
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
    var disableDefaultUI = config.disableDefaultUI === true;
    var style = config.style !== undefined ? config.style : "";
    var privacyPolicyLink = config.privacyPolicyLink;
    var termsOfServiceLink = config.termsOfServiceLink;
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
        disableDefaultUI: disableDefaultUI,
        privacyPolicyLink: privacyPolicyLink,
        termsOfServiceLink: termsOfServiceLink,
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
                        loginMethods === null || loginMethods === void 0 ? void 0 : loginMethods.thirdparty.enabled
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
        return _this;
    }
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
            // TODO Use correct doc link.
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
})(utils.AuthRecipe);

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
exports.normaliseThirdPartyConfig = normaliseThirdPartyConfig;
exports.redirectToThirdPartyLogin = redirectToThirdPartyLogin;
exports.useContext = useContext;
