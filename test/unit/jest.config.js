module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testRegex: ["(/test/unit/.*|(\\.|/)(test|spec))\\.tsx?$"],
    globals: {
        "ts-jest": {
            tsconfig: "test/unit/tsconfig.test.json",
        },
    },
};
