module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['dist', 'vitest.config.ts'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'promise/always-return': 'off',
    'import/no-unresolved': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'react/jsx-one-expression-per-line': 'off',
    quotes: 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'react/no-array-index-key': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        'react/prop-types': 'off',
        'consistent-return': 'off',
        '@typescript-eslint/no-unsafe-enum-comparison': 'off',
        'react/function-component-definition': 'off',
        'react/react-in-jsx-scope': 'off',
        'arrow-body-style': 'off',
        'no-restricted-syntax': 'off',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
      },
    },
    {
      files: ['*.js'],
      rules: {
        'global-require': 'off',
      },
    },
  ],
};
