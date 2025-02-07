/**
 * @format
 */

import { AppRegistry } from 'react-native';
import * as Sentry from '@sentry/react-native';

import './src/services/sentry';

import App from './src';
import { name as appName } from './app.json';

if (__DEV__) {
	require('./src/services/reactotron');
}

AppRegistry.registerComponent(appName, () => Sentry.wrap(App));
