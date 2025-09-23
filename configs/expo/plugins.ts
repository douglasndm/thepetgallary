type plugins = (string | [] | [string] | [string, any])[];

const configs: plugins = [
	'@react-native-firebase/app',
	'@react-native-firebase/app-check',
	'@react-native-firebase/auth',
	[
		'@sentry/react-native/expo',
		{
			url: 'https://sentry.io/',
			project: 'thepetgallery',
			organization: 'douglasndm',
		},
	],
];
export default configs;
