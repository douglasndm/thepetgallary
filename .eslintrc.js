module.exports = {
	root: true,
	extends: ['@react-native', 'prettier'],
	plugins: ['react-hooks', 'prettier', 'jest'],
	rules: {
		'react-hooks/rules-of-hooks': 'off',
		'prettier/prettier': 'error',
		'react-native/no-inline-styles': 'off',
	},
};
