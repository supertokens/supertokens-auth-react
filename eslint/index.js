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
        }
    }
};