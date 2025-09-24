import { PermissionsAndroid, Platform } from 'react-native';
import {
	getMessaging,
	requestPermission,
	FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

async function requestUserPermission() {
	if (Platform.OS === 'android' && Platform.Version >= 33) {
		await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
		);
	}

	const authStatus = await requestPermission(getMessaging());
	const enabled =
		authStatus === FirebaseMessagingTypes.AuthorizationStatus.AUTHORIZED ||
		authStatus === FirebaseMessagingTypes.AuthorizationStatus.PROVISIONAL;

	if (enabled) {
		console.log('Authorization status:', authStatus);
	}
}

requestUserPermission();
