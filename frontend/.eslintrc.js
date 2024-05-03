module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // JavaScript
    "eslint:recommended",
    // Typescript
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-typescript/recommended",
    // Vue-Regeln: https://eslint.vuejs.org/rules/
    "plugin:vue/essential",
    "plugin:vue/recommended",
    "plugin:vue/strongly-recommended",
    // Vuetify-Regeln: https://github.com/vuetifyjs/eslint-plugin-vuetify
    "plugin:vuetify/base",
    "plugin:vuetify/recommended",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/component-name-in-template-casing": ["error", "kebab-case"],
    "vue/require-default-prop": "off",
    "vue/no-v-text-v-html-on-component": "off",
    "vue/multi-word-component-names": "off",
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
};
