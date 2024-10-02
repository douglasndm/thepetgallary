import React, { useCallback, useContext, useState } from 'react';
import { Modal } from 'react-native';
import Share from 'react-native-share';
import { showMessage } from 'react-native-flash-message';

import CurrentPhotoContext from '@contexts/currentPhoto';

import {
	CloseButton,
	CloseButtonText,
	Container,
	ImageContainer,
	Image,
	Button,
	Text,
	LoadingContainer,
	Loading,
} from './styles';

const image: React.FC = () => {
	const photoContext = useContext(CurrentPhotoContext);

	const [isLoading, setIsLoading] = useState(true);

	const clearPhoto = () => {
		photoContext?.setCurrentPhoto(null);
	};

	const savePhoto = useCallback(async () => {
		try {
			await Share.open({
				url: photoContext?.currentPhoto?.url,
			});

			showMessage({
				message: 'Imagem salva com sucesso!',
				type: 'success',
			});
		} catch (error) {
			if (error instanceof Error) {
				showMessage({
					message: error.message,
					type: 'danger',
				});
			}
		}
	}, [photoContext?.currentPhoto?.url]);

	const onLoadEnd = () => {
		setIsLoading(false);
	};

	const onLoadStart = () => {
		setIsLoading(true);
	};

	return (
		<Modal transparent visible={!!photoContext?.currentPhoto}>
			<Container>
				<CloseButton onPress={clearPhoto}>
					<CloseButtonText>X</CloseButtonText>
				</CloseButton>

				{isLoading && (
					<LoadingContainer>
						<Loading />
					</LoadingContainer>
				)}

				<ImageContainer>
					{!!photoContext?.currentPhoto?.url && (
						<Image
							source={{
								uri: photoContext?.currentPhoto?.url,
							}}
							onLoadStart={onLoadStart}
							onLoadEnd={onLoadEnd}
						/>
					)}

					<Button onPress={savePhoto}>
						<Text>Salvar</Text>
					</Button>
				</ImageContainer>
			</Container>
		</Modal>
	);
};

export default image;
