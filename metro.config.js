const { mergeConfig } = require('@react-native/metro-config');
const { getDefaultConfig } = require('expo/metro-config');
const { getSentryExpoConfig } = require('@sentry/react-native/metro');

const defaultConfig = getSentryExpoConfig(__dirname);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
	resolver: {
		assetExts: [...defaultConfig.resolver.assetExts, 'lottie'],
	},
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
