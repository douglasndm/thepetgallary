import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';

import catLogo from '@animations/cat_logo.lottie';

import { Container, Content, TextContainer, AppTitle } from './styles';

const header: React.FC = () => {
	const animRef = useRef<LottieView>(null);

	return (
		<Container>
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
		</Container>
	);
};

export default header;
