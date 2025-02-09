import { showMessage } from 'react-native-flash-message';

import { captureException as sentryCaptureException } from '@sentry/react-native';

interface ICustomData<T> {
	[data: string]: T;
}

interface ICaptureException {
	error: unknown;
	customData?: ICustomData<any>;
	showAlert?: boolean;
}

function captureException(props: ICaptureException): void {
	const { error, customData, showAlert = false } = props;

	if (error instanceof Error) {
		const message = error.message.toLowerCase();

		// check for ignored errors
		if (message.includes('user did not share')) return;
		if (message.includes('user canceled')) return;

		if (showAlert === true) {
			showMessage({
				message: error.message,
				type: 'danger',
			});
		}

		console.error(error);

		sentryCaptureException(error, customData);
	}
}

export { captureException };
