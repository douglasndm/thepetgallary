import appCheck from '@react-native-firebase/app-check';
import EnvConfig from 'react-native-config';

const rnfbProvider = appCheck().newReactNativeFirebaseAppCheckProvider();
rnfbProvider.configure({
	android: {
		provider: __DEV__ ? 'debug' : 'playIntegrity',
		debugToken: EnvConfig.APPCHECK_DEBUG_TOKEN_ANDROID,
	},
	apple: {
		provider: __DEV__ ? 'debug' : 'appAttestWithDeviceCheckFallback',
		debugToken: EnvConfig.APPCHECK_DEBUG_TOKEN_IOS,
	},
});

appCheck()
	.initializeAppCheck({
		provider: rnfbProvider,
		isTokenAutoRefreshEnabled: true,
	})
	.then(() => {
		console.log('AppCheck initialized');
	});
