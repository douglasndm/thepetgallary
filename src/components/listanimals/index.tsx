import React from 'react';
import {
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
} from 'react-native';

import Padding from '@components/padding';

import Image from './image';

interface Props {
	images: APIItem[];
	currentView: ICurrentView;
	ListHeaderComponent?:
		| React.ReactElement<any, string | React.JSXElementConstructor<any>>
		| React.ComponentType<any>
		| null
		| undefined;
	onScroll?:
		| ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
		| undefined;
}

const listanimals: React.FC<Props> = ({
	images,
	currentView,
	ListHeaderComponent,
	onScroll,
}: Props) => {
	return (
		<FlatList
			data={images}
			ListHeaderComponent={ListHeaderComponent}
			numColumns={2}
			renderItem={({ item, index }) => (
				<Image item={item} type={currentView} index={index} />
			)}
			onScroll={onScroll}
			ListFooterComponent={<Padding />}
			contentContainerStyle={{
				alignSelf: 'center',
			}}
		/>
	);
};

export default listanimals;
