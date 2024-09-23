module.exports = {
    root: true,
    extends: '@react-native',
    plugins: [
        'react-hooks',
        'prettier'
    ],
    rules: {
        'react-hooks/rules-of-hooks': 'off',
        'prettier/prettier': 'error',
    },
};
