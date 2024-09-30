module.exports = {
    root: true,
    extends: [
        '@react-native',
        '@rocketseat/eslint-config/react'
    ],
    plugins: [
        'react-hooks',
        'prettier'
    ],
    rules: {
        'react-hooks/rules-of-hooks': 'off',
        'prettier/prettier': 'error',
    },
};
