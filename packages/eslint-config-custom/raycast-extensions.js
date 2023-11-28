/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "@raycast",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",

  rules: {
    complexity: ["error", 7],
    "@typescript-eslint/no-explicit-any": "error",
  },
  plugins: ["use-encapsulation", "@typescript-eslint"],
  overrides: [
    {
      files: ["*.tsx"],
      rules: {
        "use-encapsulation/prefer-custom-hooks": ["error"],
      },
    },
  ],
};
