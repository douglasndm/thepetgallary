import React, { useCallback, useContext, useState } from 'react';
import { NativeSyntheticEvent } from 'react-native';
import ContextMenu, {
	ContextMenuOnPressNativeEvent,
} from 'react-native-context-menu-view';
import LottieView from 'lottie-react-native';

import { captureException } from '@services/exceptionsHandler';

import { saveImageOnGallery } from '@utils/images/save';

import CurrentPhotoContext from '@contexts/currentPhoto';

const dogLoading = require('@animations/dog_loading.lottie');
const catLoading = require('@animations/cat_loading.lottie');

import { Container, Photo } from '../styles';
import { PhotoContainer, lottieStyle } from './styles';

interface Props {
	item: APIItem;
	type?: 'Cat' | 'Dog';
	index: number;
}

const Image: React.FC<Props> = ({ item, type = 'Dog', index }: Props) => {
	const [isLoading, setIsLoading] = useState(true);

	const photoContext = useContext(CurrentPhotoContext);

	const Loading = useCallback(() => {
		return (
			<LottieView
				source={type === 'Cat' ? catLoading : dogLoading}
				style={lottieStyle.lottie}
				autoPlay
				loop
			/>
		);
	}, [type]);

	const onLoadEnd = () => {
		setIsLoading(false);
	};

	const onLoadStart = () => {
		setIsLoading(true);
	};

	const MemorizedImage = useCallback(
		() => (
			<PhotoContainer onPress={() => photoContext?.setCurrentPhoto(item)}>
				<Photo
					source={{ uri: item.url }}
					onLoadStart={onLoadStart}
					onLoadEnd={onLoadEnd}
				/>
			</PhotoContainer>
		),
		[item, photoContext]
	);

	const handleContextPress = useCallback(
		async (e: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>) => {
			if (e.nativeEvent.index === 0) {
				try {
					await saveImageOnGallery(item.url);
				} catch (error) {
					captureException({
						error,
						showAlert: true,
					});
				}
			}
		},
		[item]
	);

	return (
		<Container style={{ marginRight: index % 2 === 0 ? 10 : 0 }}>
			<ContextMenu
				actions={[{ title: 'Salvar na galeria' }]}
				onPress={handleContextPress}
			>
				<MemorizedImage />
			</ContextMenu>
			{isLoading && <Loading />}
		</Container>
	);
};

export default Image;
