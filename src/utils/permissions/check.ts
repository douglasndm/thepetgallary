import { Platform, PermissionsAndroid } from 'react-native';
import {
	PERMISSIONS,
	request,
	requestMultiple,
	RESULTS,
} from 'react-native-permissions';

async function requestSavePermission() {
	if (Platform.OS === 'android') {
		// Android: Solicitar permissão para acesso ao armazenamento
		const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);

		console.log(result);

		if (result === PermissionsAndroid.RESULTS.GRANTED) {
			return true; // Permissão concedida
		}
	} else if (Platform.OS === 'ios') {
		// iOS: Solicitar permissão para acessar a biblioteca de fotos
		const result = await requestMultiple([
			PERMISSIONS.IOS.PHOTO_LIBRARY,
			PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
		]);

		if (
			result['ios.permission.PHOTO_LIBRARY_ADD_ONLY'] === RESULTS.GRANTED
		) {
			return true; // Permissão concedida
		}
	}
	return false; // Permissão negada
}

export { requestSavePermission };
