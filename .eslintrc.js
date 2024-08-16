/* eslint-disable no-undef */

module.exports = {
    env: {
        'browser': true,
        'es2021': true
    },
    extends: [
        'plugin:react/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    overrides: [
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react',
        '@typescript-eslint'
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': ['off', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
        'no-restricted-imports': [
            'error',
            { patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*'] }
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        quotes: [2, 'single', { avoidEscape: true }],
        'react/jsx-curly-brace-presence': [
            'error', { props: 'always', children: 'never' }
        ],
        'react/jsx-indent': [2, 2, {
            checkAttributes: true,
            indentLogicalExpressions: true
        }],
    }
}
