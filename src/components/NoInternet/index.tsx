import React from 'react';
import LottieView from 'lottie-react-native';

const noConnection = require('@animations/noConnection.lottie');

import { Container, Content, Text } from './styles';

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
