import React from 'react';
import { Platform } from 'react-native';
import LottieView from 'lottie-react-native';

import { Container, Content, Text } from './styles';

const noConnection = Platform.select({
	ios: require('@animations/no_connection.lottie'),
	android: require('@animations/android/no_connection.zip'),
});

const NoInternet: React.FC = () => {
	return (
		<Container>
			<Content>
				<LottieView
					source={noConnection}
					style={{
						width: 250,
						height: 250,
					}}
					autoPlay
					loop
				/>
				<Text>No internet connection</Text>
			</Content>
		</Container>
	);
};

export default NoInternet;
