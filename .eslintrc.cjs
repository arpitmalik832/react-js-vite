module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    jest: true,
    'cypress/globals': true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  extends: [
    'airbnb',
    'plugin:css-modules/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'react-app',
    'plugin:cypress/recommended',
  ],
  plugins: [
    'css-modules',
    'import',
    'jsx-a11y',
    'prettier',
    'react',
    'react-hooks',
    'cypress',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '18.2',
    },
  },
  rules: {
    // rules regarding react plugin
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': 0,
    'react/prop-types': 0,
    // rules regarding react-hooks plugin
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 0,
    // rules regarding css-modules plugin
    'css-modules/no-unused-class': [2, { camelCase: true }],
    'css-modules/no-undef-class': [2, { camelCase: true }],
    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': [2, { packageDir: '.' }],
    'import/prefer-default-export': 0,
    // ESLint plugin for prettier formatting
    // https://github.com/prettier/eslint-plugin-prettier
    'prettier/prettier': [
      1,
      {
        endOfLine: 'lf',
      },
    ],
    // Ensure <a> tags are valid
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': 2,
    // rules regarding no-console
    'no-console': 2,
    'no-debugger': 2,
    'no-unused-vars': 2,
    'prefer-destructuring': 2,
    'func-names': 2,
    camelcase: 0,
  },
  overrides: [
    {
      files: ['**/*.spec.js', '**/*.spec.jsx'],
      env: {
        jest: true,
      },
    },
  ],
};
