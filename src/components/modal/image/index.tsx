import React, { useCallback, useContext, useState } from 'react';
import { Modal } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import RNFetchBlob from 'rn-fetch-blob';
import { showMessage } from 'react-native-flash-message';

import CurrentPhotoContext from '@contexts/currentPhoto';

import { checkGalleryPermission } from '@utils/permissions/check';

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
		if (!photoContext?.currentPhoto) {
			return;
		}

		try {
			const { url } = photoContext?.currentPhoto;
			const extension = url.split('.').pop();

			const hasPermission = await checkGalleryPermission();

			if (!hasPermission) {
				return;
			}

			const config = RNFetchBlob.config({
				fileCache: true,
				appendExt: extension, // Extensão do arquivo
			});

			const result = await config.fetch('GET', url);

			await CameraRoll.saveAsset(result.path(), {
				album: 'The Pet Gallery',
			});

			photoContext.setCurrentPhoto(null);

			showMessage({
				message: 'Imagem salva com sucesso!',
				type: 'success',
			});
		} catch (error) {
			if (error instanceof Error) {
				console.error(error);
				showMessage({
					message: error.message,
					type: 'danger',
				});
			}
		}
	}, [photoContext?.currentPhoto]);

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
