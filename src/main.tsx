import { registerRootComponent } from 'expo';
import * as Sentry from '@sentry/react-native';

import '@services/sentry';

import App from './index';

registerRootComponent(Sentry.wrap(App));
