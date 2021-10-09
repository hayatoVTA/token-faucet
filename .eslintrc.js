module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  // rules: {
  //   "node/no-unsupported-features/es-syntax": [
  //     "error",
  //     { ignores: ["modules"] },
  //   ],
  // },
};
