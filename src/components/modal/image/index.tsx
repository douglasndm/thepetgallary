import React, { useContext } from 'react';
import { Modal } from 'react-native';

import CurrentPhotoContext from '@contexts/currentPhoto';

import { Button, ButtonText, Container, Image } from './styles';

const image: React.FC = () => {
	const photoContext = useContext(CurrentPhotoContext);

	return (
		<Modal transparent visible={!!photoContext?.currentPhoto}>
			<Container>
				<Button onPress={() => photoContext?.setCurrentPhoto(null)}>
					<ButtonText>X</ButtonText>
				</Button>

				{!!photoContext?.currentPhoto?.url && (
					<Image
						source={{
							uri: photoContext?.currentPhoto?.url,
						}}
					/>
				)}
			</Container>
		</Modal>
	);
};

export default image;
