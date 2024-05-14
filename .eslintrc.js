// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    root: true,
    extends: [
        'expo',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    rules: {
        'react-hooks/exhaustive-deps': 'off'
    },
    ignorePatterns: [
        'scripts/**/*.[jt]s?(x)',
        'store/**/*.[jt]s?(x)',
    ],
    overrides: [
        {
            files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
            extends: ['plugin:testing-library/react']
        },
    ]
};
