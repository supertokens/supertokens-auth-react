module.exports = {
    rules: {
        "no-direct-window-object": {
            create: function(context) {
                return {
                    Identifier(node) {
                        if (node.name === "window") {
                            context.report(node, 'Do not access window object directly. Please use getWindowObject() instead');
                        };
                    }
                };
            }
        },
        "no-css-without-data-supertokens": {
            create: function(context) {
                return {
                    JSXOpeningElement(node) {
                        const css = node.attributes.find(attr => attr.name !== undefined && attr.name.name === "css");
                        const dataSTNode = node.attributes.find(attr => attr.name !== undefined && attr.name.name === "data-supertokens");
                        if (css !== undefined) {
                            if (dataSTNode === undefined || dataSTNode.value === undefined) {
                                context.report(node, 'No css definition without corresponding data-supertokens attribute');
                                return;
                            }

                            const dataSTValues = dataSTNode.value.value.split(" ");

                            if (css.value.expression.type === "MemberExpression") {

                                if (dataSTValues.includes(css.value.expression.property.name) === false) {
                                    context.report(node, `Css definition without corresponding className: ${css.value.expression.property.name}`);
                                }

                            } else if (css.value.expression.type === "ArrayExpression") {

                                css.value.expression.elements.forEach(element => {

                                    if (element.type === "MemberExpression") {

                                        if (element.object.name === "styles" && dataSTValues.includes(element.property.name) === false) {
                                            context.report(node, `Css definition without corresponding className: ${element.property.name}`);
                                        }

                                    }

                                });
                            }
                        }
                    }
                };
            }
        }
    }
};