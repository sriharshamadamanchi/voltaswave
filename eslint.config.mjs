// eslint-disable-next-line import/no-unresolved
import parser from '@typescript-eslint/parser';
// eslint-disable-next-line import/no-unresolved
import tseslint from '@typescript-eslint/eslint-plugin';
import react from "eslint-plugin-react"
import react_hooks from "eslint-plugin-react-hooks"
import unused_imports from "eslint-plugin-unused-imports";
import _import from "eslint-plugin-import"
import globals from "globals";
import eslint from '@eslint/js';
import reactNative from 'eslint-plugin-react-native';
import reactNativeOrg from '@react-native/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin'

export default [
  {
    ignores: ["node_modules/"],

    settings: {
      react: {
        version: "detect"
      },

      "import/resolver": {
        node: {
          extensions: [".js", ".android.js", ".ios.js", ".svg", ".ts", ".tsx", ".android.tsx", ".ios.tsx", ".android.ts", ".ios.ts"]
        }
      }
    },
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/*.mjs"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.jest,
        ...globals.node,
        "__DEV__": "readonly",
        "NodeJS": "readonly"
      }
    },

    plugins: {
      eslint,
      react,
      'react-native': reactNative,
      '@react-native': reactNativeOrg,
      "react-hooks": react_hooks,
      "unused-imports": unused_imports,
      "import": _import,
      "@typescript-eslint": tseslint,
      '@stylistic': stylistic
    },

    rules: {
      "@typescript-eslint/no-require-imports": 0,
      "@typescript-eslint/no-empty-function": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "react/function-component-definition": 0,
      "unused-imports/no-unused-imports": 0,
      "unused-imports/no-unused-vars": 0,
      "react/no-unused-prop-types": 0,
      "no-process-env": 0,
      "no-process-exit": 0,
      "import/no-unresolved": [2, { "commonjs": true, "amd": true }],
      "import/newline-after-import": 2,
      "react/prop-types": 0,
      "eslint-comments/no-unlimited-disable": 0,
      "react/no-this-in-sfc": 0,
      "no-lone-blocks": 0,
      "function-call-argument-newline": 0,
      "no-console": 0,
      "no-undef": 2,
      "default-param-last": 0,
      "@typescript-eslint/no-unused-vars": 0,
      "require-yield": 0,
      "no-unreachable": 2,
      "no-constant-condition": 0,
      "react/jsx-no-duplicate-props": 2,
      "no-case-declarations": 0,
      "react/no-unescaped-entities": 0,
      "no-dupe-keys": 2,
      "no-empty": 2,
      "@stylistic/no-mixed-spaces-and-tabs": ["error"],
      "react/display-name": 0,
      "react/jsx-key": 2,
      "react/no-string-refs": 0,
      "react/no-children-prop": 0,
      "react/no-direct-mutation-state": 0,
      "@stylistic/array-bracket-spacing": 2,
      "@stylistic/block-spacing": 2,
      "brace-style": 2,
      "camelcase": 0,
      "comma-dangle": 2,
      "@stylistic/comma-spacing": ["error", { "before": false, "after": true }],
      "@stylistic/computed-property-spacing": ["error"],
      "arrow-body-style": 0,
      "arrow-parens": 2,
      "arrow-spacing": 2,
      "constructor-super": 2,
      "no-confusing-arrow": 2,
      "no-const-assign": 2,
      "react/jsx-props-no-spreading": 0,
      "react/state-in-constructor": 0,
      "prefer-named-capture-group": 0,
      "react/static-property-placement": 0,
      "no-dupe-class-members": 2,
      "no-duplicate-imports": 2,
      "no-this-before-super": 2,
      "no-useless-constructor": 2,
      "no-var": 0,
      "prefer-arrow-callback": 2,
      "prefer-const": 2,
      "prefer-destructuring": [
        "error", {
          "VariableDeclarator": {
            "array": false,
            "object": true
          },
          "AssignmentExpression": {
            "array": false,
            "object": false
          }
        }
      ],
      'prettier/prettier': 0,
      "prefer-template": 2,
      "rest-spread-spacing": 2,
      "sort-imports": [
        "error", {
          "ignoreCase": false,
          "ignoreDeclarationSort": true,
          "ignoreMemberSort": false,
          "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
        }
      ],
      "react/no-deprecated": 0,
      "radix": 2,
      "strict": 2,
      "no-multiple-empty-lines": [
        "error",
        {
          "max": 1,
          "maxEOF": 1
        }
      ],
      "no-useless-escape": 0,
      "sort-keys": 0,
      "react/no-object-type-as-default-prop": 0,
      "react/jsx-sort-default-props": 0,
      "react/sort-default-props": 0,
      "react/jsx-indent": 0,
      '@stylistic/indent': ['error', 2],
      "@stylistic/key-spacing": [
        "error",
        {
          "beforeColon": false,
          "afterColon": true
        }
      ],
      "no-ternary": 0,
      "react/forbid-component": 0,
      "multiline-ternary": 0,
      "max-len": 0,
      "react/destructuring-assignment": 0,
      "no-return-assign": 0,
      "no-use-before-define": 0,
      "react/jsx-no-bind": 0,
      "react/jsx-max-depth": 0,
      "react/forbid-component-props": 0,
      "react/jsx-handler-name": 0,
      "react/no-set-state": 0,
      "no-invalid-this": 0,
      "no-negated-condition": 0,
      "no-magic-numbers": 0,
      "sort-vars": 0,
      "no-bitwise": 0,
      "no-lonely-if": 0,
      "react/jsx-no-literals": 0,
      "max-lines-per-function": 0,
      "react/jsx-filename-extension": 0,
      "no-mixed-operators": 0,
      "consistent-return": 0,
      "require-unicode-regexp": 0,
      "react/sort-comp": 0,
      "max-lines": 0,
      "global-require": 0,
      "react/no-access-state-in-setstate": 0,
      "one-var": 0,
      "react/no-multi-comp": 0,
      "no-unused-expressions": 0,
      "@typescript-eslint/no-unused-expressions": 0,
      "max-statements-per-line": 0,
      "no-nested-ternary": 0,
      "max-classes-per-file": [2, 2],
      "line-comment-position": 0,
      "no-inline-comments": 0,
      "react/prefer-stateless-function": 2,
      "no-shadow": 0,
      "id-length": 0,
      "max-statements": 0,
      "prefer-promise-reject-errors": 0,
      "no-plusplus": 0,
      "max-params": 0,
      "react/no-unused-state": 0,
      "consistent-this": 0,
      "no-warning-comments": 0,
      "no-underscore-dangle": 0,
      "react/jsx-sort-props": 0,
      "react/jsx-indent-props": 0,
      "require-await": 0,
      "init-declarations": 0,
      "react/require-optimization": 0,
      "react/jsx-handler-names": 0,
      "class-methods-use-this": 0,
      "no-extra-parens": 0,
      "quotes": 0,
      "react/jsx-fragments": 0,
      "react/jsx-closing-bracket-location": 0,
      "react/no-unstable-nested-components": 0,
      "react/prefer-exact-props": 0,
      "react/jsx-newline": 0,
      "eqeqeq": 2,
      "quote-props": 0,
      "func-style": 0,
      "no-await-in-loop": 0,
      "require-atomic-updates": 0,
      "no-continue": 0,
      "@stylistic/no-trailing-spaces": ["error"],
      "@stylistic/no-whitespace-before-property": "error",
      "no-empty-function": 0,
      "react/jsx-one-expression-per-line": 0,
      "@stylistic/jsx-tag-spacing": 0,
      "react/jsx-closing-tag-location": 0,
      "react/no-did-mount-set-state": 0,
      "react/jsx-first-prop-new-line": 0,
      "space-infix-ops": 0,
      "react/jsx-wrap-multilines": 0,
      "react/jsx-curly-brace-presence": 0,
      "no-undefined": 0,
      "func-names": 0,
      "react/jsx-equals-spacing": [2, "always"],
      "no-sequences": 0,
      "complexity": 0,
      "handle-callback-err": 0,
      "no-loop-func": 0,
      "vars-on-top": 0,
      "array-callback-return": 0,
      "max-depth": 0,
      "no-alert": 0,
      "default-case": 0,
      "react/no-array-index-key": 0,
      "no-param-reassign": 0,
      "func-name-matching": 0,
      "object-property-newline": 0,
      "callback-return": 0,
      "no-unexpected-multiline": 0,
      "no-tabs": 0,
      "new-cap": 0,
      "react/require-default-props": 0,
      "react/jsx-max-props-per-line": 0,
      "array-bracket-newline": ["error", { "multiline": true }],
      "object-curly-spacing": ["error", "always"],
      "react/forbid-foreign-prop-types": 0,
      "react/forbid-prop-types": 0,
      "no-mixed-requires": 0,
      "no-prototype-builtins": 0,
      "no-eq-null": 0,
      "no-proto": 0,
      "react/default-props-match-prop-types": 0,
      "no-multi-assign": 0,
      "react/jsx-pascal-case": 0,
      "array-element-newline": 0,
      "object-curly-newline": 0,
      "padded-blocks": 0,
      "dot-location": 0,
      "wrap-iife": 0,
      "@stylistic/func-call-spacing": 2,
      "@stylistic/function-call-spacing": 2,
      "@stylistic/no-multi-spaces": ["error"],
      "@stylistic/jsx-props-no-multi-spaces": ["error"],
      "@stylistic/generator-star-spacing": [
        "error", {
          "before": false,
          "after": true
        }
      ],
      "@stylistic/jsx-curly-spacing": [
        2, { "when": "never", "spacing": {
          "objectLiterals": "always"
        } }
      ],
      "newline-per-chained-call": 0,
      "function-paren-newline": 0,
      "lines-around-comment": 2,
      "capitalized-comments": 0,
      "implicit-arrow-linebreak": 0,
      "eol-last": 2,
      "@stylistic/keyword-spacing": 2,
      "no-buffer-constructor": 0,
      "no-async-promise-executor": 0,
      "padding-line-between-statements": [2, { "blankLine": "always", "prev": "*", "next": "return" }],
      "react-native/no-unused-styles": 2
    }
  }
];
