module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["vuetify"],
  extends: [
    // JavaScript/TypeScript-Regeln
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    // Vue-Regeln: https://eslint.vuejs.org/rules/
    "plugin:vue/base",
    "plugin:vue/essential",
    "plugin:vue/strongly-recommended",
    "plugin:vue/recommended",
    "@vue/typescript",
    // Vuetify-Regeln: https://github.com/vuetifyjs/eslint-plugin-vuetify
    "plugin:vuetify/base",
    "plugin:vuetify/recommended",
    "prettier",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "off" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/component-name-in-template-casing": ["error", "kebab-case"],
    "vue/require-default-prop": "off",
    "vue/no-v-text-v-html-on-component": "off",
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
      env: {
        jest: true,
      },
    },
  ],
};
