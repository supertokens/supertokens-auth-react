module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testRegex: ["test/unit/.*ts"],
    globals: {
        "ts-jest": {
            tsconfig: "./tsconfig.test.json",
        },
    },
};
