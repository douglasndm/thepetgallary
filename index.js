/**
 * @format
 */

import { AppRegistry } from 'react-native';
import * as Sentry from '@sentry/react-native';

import './src/services/sentry';

import App from './src';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Sentry.wrap(App));
