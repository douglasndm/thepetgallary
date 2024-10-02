import { Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

async function checkGalleryPermission() {
	if (Platform.OS === 'android') {
		const result = await request(
			PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
		);

		if (result !== RESULTS.GRANTED) {
			return false;
		}
	} else if (Platform.OS === 'ios') {
		const granted = await check(PERMISSIONS.IOS.MEDIA_LIBRARY);

		if (granted === RESULTS.DENIED) {
			const result = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);

			if (result === RESULTS.BLOCKED) {
				showMessage({
					message:
						'Aplicativo não tem permissão para salvar na sua biblioteca',
					type: 'danger',
				});
				return false;
			}
		}
	}

	return true;
}

export { checkGalleryPermission };
