import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Linking, ListRenderItem } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from '@react-native-vector-icons/ionicons';

import Header from '@components/header';
import Padding from '@components/padding';

import { Container, Content, PlaceButton, PlaceName, styles } from './styles';

interface PlaceItem {
	instagram: string;
	name: string;
}

const PlacesList: React.FC = () => {
	const [places, setPlaces] = useState<PlaceItem[]>([]);

	const loadData = useCallback(async () => {
		const placesResponse = await firestore()
			.collection('adoptionsPlaces')
			.get();

		const localPlaces: PlaceItem[] = [];

		placesResponse.forEach(doc => {
			localPlaces.push(doc.data());
		});

		setPlaces(localPlaces);
	}, []);

	useEffect(() => {
		loadData();
	}, []);

	const openInstagram = useCallback((url: string) => {
		Linking.openURL(url);
	}, []);

	const renderItem: ListRenderItem<PlaceItem> = useCallback(({ item }) => {
		return (
			<PlaceButton onPress={() => openInstagram(item.instagram)}>
				<Icon name="logo-instagram" size={30} color="#363535" />
				<PlaceName>{item.name}</PlaceName>
			</PlaceButton>
		);
	}, []);

	return (
		<Container>
			<Header />

			<Content>
				<FlatList
					data={places}
					renderItem={renderItem}
					ListFooterComponent={places.length > 5 ? <Padding /> : null}
					contentContainerStyle={styles.ListContent}
				/>
			</Content>
		</Container>
	);
};

export default PlacesList;
