module.exports = {
    setupFilesAfterEnv: ["./setupTests.js"],
    moduleNameMapper: {
     "\\.(css|scss)$": "identity-obj-proxy",
    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    transform: {
     "\\.[jt]sx?$": "babel-jest",
    },
    testPathIgnorePatterns: ["/node_modules/", "/build/"],
    collectCoverageFrom: ["src/**/*.{ts,tsx}"],
    collectCoverage: true,
    coverageReporters: ["lcov"],
    testEnvironment: "jsdom",
   };