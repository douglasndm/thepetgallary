import React, { useCallback, useRef } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAuth } from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';

import catLogo from '@animations/cat_logo.lottie';

import {
	Container,
	Content,
	TextContainer,
	AppTitle,
	ButtonIcon,
	Icon,
} from './styles';

const Header: React.FC = () => {
	const { name } = useRoute<RouteProp<AppRoutes>>();
	const { navigate, canGoBack, goBack } =
		useNavigation<NativeStackNavigationProp<AppRoutes>>();

	const animRef = useRef<LottieView>(null);

	const handleLogin = useCallback(() => {
		navigate('Login', {});
	}, [navigate]);

	return (
		<Container>
			{canGoBack() && (
				<ButtonIcon onPress={goBack}>
					<Icon name="arrow-back" />
				</ButtonIcon>
			)}

			<Content onPress={() => animRef.current?.play()}>
				<TextContainer>
					<AppTitle>The Pet Gallery</AppTitle>
				</TextContainer>

				<LottieView
					ref={animRef}
					source={catLogo}
					style={{
						width: 100,
						height: 100,
						marginLeft: -25,
					}}
					autoPlay
					loop={false}
				/>
			</Content>

			{!getAuth().currentUser && (
				<ButtonIcon onPress={handleLogin}>
					<Icon
						name={name === 'Login' ? 'person' : 'person-outline'}
					/>
				</ButtonIcon>
			)}
		</Container>
	);
};

export default Header;
