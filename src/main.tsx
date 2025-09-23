import { registerRootComponent } from 'expo';
import * as Sentry from '@sentry/react-native';

import './src/services/sentry';

import App from './index';

registerRootComponent(Sentry.wrap(App));
