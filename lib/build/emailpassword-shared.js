'use strict';

var utils = require('./utils.js');
var jsxRuntime = require('react/jsx-runtime');
require('./index2.js');
var translationContext = require('./translationContext.js');

/*
 * Component.
 */
function Button(_a) {
    var type = _a.type, label = _a.label, disabled = _a.disabled, isLoading = _a.isLoading, onClick = _a.onClick;
    var t = translationContext.useTranslation();
    if (disabled === undefined) {
        disabled = false;
    }
    return (jsxRuntime.jsxs("button", utils.__assign({ type: type, disabled: disabled, onClick: onClick, "data-supertokens": "button" }, { children: [t(label), isLoading && "..."] })));
}

exports.Button = Button;
