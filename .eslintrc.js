// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir : __dirname,
        sourceType: 'module',
    },
    env: {
        node: true,
        jest: true,
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        quotes: ["error", "single"],
        'comma-dangle': ["error", "always"],
        'object-curly-spacing': ["error", "always"],
        'no-multi-spaces': "error",
        indent: ["error", 2],
        semi: ["error", "never"]
    }
}