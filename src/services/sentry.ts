import * as Sentry from '@sentry/react-native';
import EnvConfig from 'react-native-config';

if (!__DEV__) {
	Sentry.init({
		dsn: EnvConfig.SENTRY_DSN,
		// Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
		// We recommend adjusting this value in production.
		tracesSampleRate: 1.0,
		// profilesSampleRate is relative to tracesSampleRate.
		// Here, we'll capture profiles for 100% of transactions.
		profilesSampleRate: 1.0,
	});
}
