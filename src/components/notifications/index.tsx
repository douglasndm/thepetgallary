import React, { useEffect } from 'react';
import { View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { showMessage } from 'react-native-flash-message';

const notification: React.FC = () => {
	useEffect(() => {
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			if (remoteMessage.notification) {
				const { title, body } = remoteMessage.notification;

				showMessage({
					message: title || 'Notificação',
					description: body,
					type: 'info',
					backgroundColor: '#f8cdb9',
					color: '#000',
				});
			}
		});

		return unsubscribe;
	}, []);

	return <View />;
};

export default notification;
