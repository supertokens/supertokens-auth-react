module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    roots: ["<rootDir>/test/unit"],
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/test/unit/mockStyle.js",
    },
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "<rootDir>/test/unit/tsconfig.test.json",
            },
        ],
        "^.+\\.jsx?$": "babel-jest",
    },
    testRegex: "(test|spec)\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
