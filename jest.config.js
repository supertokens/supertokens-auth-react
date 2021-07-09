module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/test/unit/tsconfig.test.json",
        },
    },
    roots: ["<rootDir>/test/unit"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(test|spec)\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
