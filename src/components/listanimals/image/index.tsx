import React, { useCallback, useState } from 'react';
import LottieView from 'lottie-react-native';

import { Container, Photo } from '../styles';

const dogLoading = require('@animations/dog_loading.lottie');
const catLoading = require('@animations/cat_loading.lottie');

const demoPic = require('@assets/images/FB_IMG_1489097250499.jpg');

interface Props {
	item: APIItem;
	type: 'Cat' | 'Dog';
	index: number;
}

const Image: React.FC<Props> = ({ item, type = 'Dog', index }: Props) => {
	const [isLoading, setIsLoading] = useState(true);

	const Loading = useCallback(() => {
		return (
			<LottieView
				source={type === 'Cat' ? catLoading : dogLoading}
				style={{
					width: 170,
					height: 170,
					position: 'absolute',
					backgroundColor: 'pink',
				}}
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
			<Photo
				source={demoPic}
				//source={{ uri: item.url }}
				onLoadStart={onLoadStart}
				onLoadEnd={onLoadEnd}
			/>
		),
		[item.url]
	);

	return (
		<Container style={{ marginRight: index % 2 === 0 ? 10 : 0 }}>
			<MemorizedImage />
			{isLoading && <Loading />}
		</Container>
	);
};

export default Image;
