import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
        },
        rules: {
            "no-unused-vars": ["warn", { 
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_"
            }],
            "no-console": "warn",
            "quotes": ["error", "double", { avoidEscape: true }],
            "indent": ["error", 4, { SwitchCase: 1 }],
            "no-trailing-spaces": "error",
            "semi": ["error", "always"],
            "array-bracket-spacing": ["error", "always"],
            "object-curly-spacing": ["error", "always"],
        },
    },
];
