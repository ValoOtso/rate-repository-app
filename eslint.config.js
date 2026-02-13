import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import babelParser from "@babel/eslint-parser";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      globals: {
        console: "readonly",
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    env: {
      "react-native/react-native": true,
    },

    plugins: {
      react,
      "react-native": reactNative,
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:jest/recommended",
    ],

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];
