const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const { withSentryConfig } = require('@sentry/react-native/metro');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const filteredSourceExts = assetExts.filter(ext => ext !== 'svg');

const config = {
	transformer: {
		babelTransformerPath: require.resolve(
			'react-native-svg-transformer/react-native'
		),
	},
	resolver: {
		assetExts: [...filteredSourceExts, 'lottie'],
		sourceExts: [...sourceExts, 'svg'],
	},
};

module.exports = withSentryConfig(
	mergeConfig(getDefaultConfig(__dirname), config)
);
