import React, { useMemo } from 'react';
import {
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import Modal from '@components/modal/image';
import Padding from '@components/padding';

import Image from './image';

interface Props {
	images: APIItem[];
	ListHeaderComponent?:
		| React.ReactElement<any, string | React.JSXElementConstructor<any>>
		| React.ComponentType<any>
		| null
		| undefined;
	onScroll?:
		| ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
		| undefined;
}

const ListAnimals: React.FC<Props> = ({
	images,
	ListHeaderComponent,
	onScroll,
}: Props) => {
	const route = useRoute<RouteProp<AppRoutes>>();

	const imageType = useMemo(() => {
		if (route.name === 'DogsView') {
			return 'Dog';
		} else if (route.name === 'CatsView') {
			return 'Cat';
		}

		return undefined;
	}, [route.name]);

	return (
		<>
			<Modal />
			<FlatList
				data={images}
				ListHeaderComponent={ListHeaderComponent}
				numColumns={1}
				renderItem={({ item, index }) => (
					<Image item={item} type={imageType} index={index} />
				)}
				onScroll={onScroll}
				ListFooterComponent={<Padding />}

				//columnWrapperStyle={{ justifyContent: 'center' }}
			/>
		</>
	);
};

export default ListAnimals;
