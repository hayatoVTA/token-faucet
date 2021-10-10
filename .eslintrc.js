module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true,
    node: true,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  plugins: ["import", "typescript"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    parser: "typescript-eslint-parser",
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      tsx: true,
      jsx: false,
    },
  },
  rules: {
    // "node/no-unsupported-features/es-syntax": [
    //   "error",
    //   { ignores: ["modules"] },
    // ],
    "no-unused-vars": "off",
  },
};
